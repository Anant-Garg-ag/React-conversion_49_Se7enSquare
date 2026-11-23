import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { apiRequest } from '../../services/api';
import { logout } from './authSlice';

/**
 * Communities slice — shared by Discovery, Community Page, Create Community, and event pages.
 *
 * Key improvements over the original implementation (Karmanya):
 *
 * 1. membershipMap: normalized { [communityId]: membershipId } lookup so leaveCommunity
 *    can delete directly without a redundant GET /memberships round-trip.
 *
 * 2. True dual-layer optimistic updates: joining/leaving instantly updates BOTH the
 *    joinedIds array AND the memberCount on the community card/banner, with automatic
 *    rollback when the API request fails.
 *
 * 3. SWR caching guard on fetchCommunityList: skips redundant network calls when the
 *    list was fetched within the last 60 seconds (configurable via LIST_CACHE_MS).
 *
 * 4. discoveryFilter: search, category, and sortBy lifted into Redux so navigation
 *    between pages preserves the user's filter state.
 */

export const JOINED_KEY = 'nexus_joined_communities';

/** Cache window: community list is considered fresh for 60 seconds. */
const LIST_CACHE_MS = 60_000;

function readJoinedIds() {
  try {
    const list = JSON.parse(localStorage.getItem(JOINED_KEY) || '[]');
    return Array.isArray(list) ? list.map(String) : [];
  } catch {
    return [];
  }
}

/** Helper: mutate memberCount on a community in state.all and state.current, clamped to 0. */
function adjustMemberCount(state, communityId, delta) {
  const id = String(communityId);
  const inAll = state.all.find((c) => String(c.id) === id);
  if (inAll) inAll.memberCount = Math.max(0, (inAll.memberCount || 0) + delta);
  if (String(state.current.community?.id) === id) {
    state.current.community.memberCount = Math.max(
      0,
      (state.current.community.memberCount || 0) + delta
    );
  }
}

const isActive = (c) => (c.status || 'active').toLowerCase() !== 'suspended';

// ─── Async Thunks ─────────────────────────────────────────────────────────────

/**
 * Fetches the community list. Skips the request when the cached list is still
 * fresh (within LIST_CACHE_MS) unless force=true is passed as the argument.
 */
export const fetchCommunityList = createAsyncThunk(
  'communities/fetchList',
  async () => {
    const data = await apiRequest('/communities');
    return Array.isArray(data) ? data : [];
  },
  {
    condition: (force = false, { getState }) => {
      if (force) return true;
      const { all, listLoading, lastFetched } = getState().communities;
      if (listLoading) return false; // already in-flight, don't double-fetch
      const isFresh = lastFetched && Date.now() - lastFetched < LIST_CACHE_MS;
      // Skip if we have data and the cache is still valid
      return !(all.length > 0 && isFresh);
    },
  }
);

/**
 * Fetches the logged-in user's memberships from the server.
 * Returns both the joined community IDs and a normalized membershipMap
 * ({ communityId -> membershipId }) so leaveCommunity needs zero extra requests.
 */
export const fetchMyMemberships = createAsyncThunk(
  'communities/fetchMyMemberships',
  async (_, { getState }) => {
    const userId = getState().auth.user?.id;
    const mems = await apiRequest(`/memberships?userId=${userId}`);
    if (!Array.isArray(mems)) return { joinedIds: [], membershipMap: {} };
    const joinedIds = mems.map((m) => String(m.communityId));
    const membershipMap = Object.fromEntries(
      mems.map((m) => [String(m.communityId), String(m.id)])
    );
    return { joinedIds, membershipMap };
  },
  { condition: (_, { getState }) => Boolean(getState().auth.user?.id) }
);

export const joinCommunity = createAsyncThunk('communities/join', async (communityId, { getState }) => {
  const userId = getState().auth.user?.id;
  let membershipId = null;
  try {
    const res = await apiRequest('/memberships', {
      method: 'POST',
      body: JSON.stringify({ userId: Number(userId), communityId: Number(communityId) }),
    });
    membershipId = res?.id ? String(res.id) : null;
  } catch (err) {
    // Duplicate joins are harmless: the membership already exists
    if (!/already a member/i.test(err.message)) throw err;
  }
  return { communityId: String(communityId), membershipId };
});

/**
 * Uses the cached membershipMap for a direct DELETE — no extra GET needed.
 * Falls back to a GET lookup if the map entry is missing (e.g. after a cold start).
 */
export const leaveCommunity = createAsyncThunk('communities/leave', async (communityId, { getState }) => {
  const userId = getState().auth.user?.id;
  let membershipId = getState().communities.membershipMap[String(communityId)];

  if (!membershipId) {
    // Fallback: fetch memberships to find the record (should rarely happen)
    const mems = await apiRequest(`/memberships?userId=${userId}`);
    const target = Array.isArray(mems)
      ? mems.find(
          (m) =>
            String(m.communityId) === String(communityId) &&
            String(m.userId) === String(userId)
        )
      : null;
    membershipId = target?.id ? String(target.id) : null;
  }

  if (membershipId) {
    await apiRequest(`/memberships/${membershipId}`, { method: 'DELETE' });
  }
  return String(communityId);
});

// Community Page: the community record itself
export const fetchCommunityPage = createAsyncThunk('communities/fetchPage', async (id) => {
  try {
    return await apiRequest(`/communities/${id}`);
  } catch (err) {
    throw new Error(
      err.isNetworkError
        ? 'Could not reach the backend. Is the NestJS server running?'
        : `Could not load community — ${err.message}`,
      { cause: err }
    );
  }
});

// Community Page: approved events and the member list, loaded in parallel with the community
export const fetchCommunityExtras = createAsyncThunk('communities/fetchExtras', async (community) => {
  const [allEvents, mems, users] = await Promise.all([
    apiRequest('/events').catch(() => []),
    apiRequest(`/memberships?communityId=${community.id}`).catch(() => []),
    apiRequest(`/users?communityId=${community.id}`).catch(() => []),
  ]);

  const events = (Array.isArray(allEvents) ? allEvents : []).filter(
    (e) => String(e.communityId) === String(community.id) && e.status === 'approved'
  );

  const usersById = new Map((Array.isArray(users) ? users : []).map((u) => [String(u.id), u]));
  const members = (Array.isArray(mems) ? mems : []).map((m) => {
    const u = usersById.get(String(m.userId));
    const isOwner = u && String(u.id) === String(community.ownerId);
    const isMod = !isOwner && (u?.role === 'moderator' || u?.role === 'community_manager');
    return {
      userId: m.userId,
      name: u ? (u.fullName || u.username) : `User #${m.userId}`,
      avatar: u?.avatar,
      role: isOwner ? 'owner' : (isMod ? 'moderator' : 'member'),
      status: u?.status || 'active',
    };
  });

  return { communityId: String(community.id), events, members };
});

export const deleteCommunity = createAsyncThunk('communities/delete', async (id) => {
  await apiRequest(`/communities/${id}`, { method: 'DELETE' });
  return String(id);
});

export const createCommunity = createAsyncThunk('communities/create', async (payload) => {
  const created = await apiRequest('/communities', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  if (!created?.id) throw new Error('Unexpected response from the server.');
  return created;
});

// Channels live on the community record: there is no /channels API
export const addChannel = createAsyncThunk('communities/addChannel', async ({ communityId, name, type }) => {
  const community = await apiRequest(`/communities/${communityId}`);
  const existing = Array.isArray(community?.channels) ? community.channels : [];
  const channel = {
    id: String(Date.now()),
    name: name.trim().toLowerCase().replace(/\s+/g, '-'),
    type,
  };
  await apiRequest(`/communities/${communityId}`, {
    method: 'PATCH',
    body: JSON.stringify({ channels: [...existing, channel] }),
  });
  return { communityName: community.name, channel };
});

// ─── State ────────────────────────────────────────────────────────────────────

const emptyCurrent = { community: null, loading: true, error: '', members: null, events: [] };

const initialState = {
  all: [],
  listLoading: true,
  listError: '',
  lastFetched: null,          // SWR: timestamp of the last successful list fetch
  joinedIds: readJoinedIds(),
  membershipMap: {},          // { [communityId]: membershipId } — avoids re-fetching on leave
  current: emptyCurrent,
  discoveryFilter: {          // Persists search/category/sort across route changes
    search: '',
    category: 'All',
    sortBy: 'active',
  },
};

const addId = (ids, id) => (ids.includes(id) ? ids : [...ids, id]);
const removeId = (ids, id) => ids.filter((x) => x !== id);

// ─── Slice ────────────────────────────────────────────────────────────────────

const communitiesSlice = createSlice({
  name: 'communities',
  initialState,
  reducers: {
    /** Discovery filter actions — keep search/category/sort in Redux so they survive navigation. */
    searchChanged(state, action) {
      state.discoveryFilter.search = action.payload;
    },
    categoryChanged(state, action) {
      state.discoveryFilter.category = action.payload;
    },
    sortByChanged(state, action) {
      state.discoveryFilter.sortBy = action.payload;
    },
    filterReset(state) {
      state.discoveryFilter = initialState.discoveryFilter;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── Community List ───────────────────────────────────────────────────
      .addCase(fetchCommunityList.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(fetchCommunityList.fulfilled, (state, action) => {
        state.listLoading = false;
        state.all = action.payload;
        state.listError = '';
        state.lastFetched = Date.now(); // stamp for SWR cache check
      })
      .addCase(fetchCommunityList.rejected, (state, action) => {
        state.listLoading = false;
        state.all = [];
        state.listError = action.error.message || 'Could not load communities.';
      })

      // ── Memberships ──────────────────────────────────────────────────────
      .addCase(fetchMyMemberships.fulfilled, (state, action) => {
        state.joinedIds = action.payload.joinedIds;
        state.membershipMap = action.payload.membershipMap;
      })

      // ── Join: optimistic — updates joinedIds AND memberCount immediately. ──
      // On success: also stores the new membershipId in the map.
      // On failure: rolls back both joinedIds and memberCount.
      .addCase(joinCommunity.pending, (state, action) => {
        const id = String(action.meta.arg);
        state.joinedIds = addId(state.joinedIds, id);
        adjustMemberCount(state, id, +1);
      })
      .addCase(joinCommunity.fulfilled, (state, action) => {
        const { communityId, membershipId } = action.payload;
        if (membershipId) state.membershipMap[communityId] = membershipId;
      })
      .addCase(joinCommunity.rejected, (state, action) => {
        const id = String(action.meta.arg);
        state.joinedIds = removeId(state.joinedIds, id);
        adjustMemberCount(state, id, -1); // undo the optimistic increment
      })

      // ── Leave: optimistic — updates joinedIds AND memberCount immediately. ──
      // On failure: rolls back both.
      .addCase(leaveCommunity.pending, (state, action) => {
        const id = String(action.meta.arg);
        state.joinedIds = removeId(state.joinedIds, id);
        adjustMemberCount(state, id, -1);
      })
      .addCase(leaveCommunity.fulfilled, (state, action) => {
        // Clean up the membership map entry now that the record is gone
        delete state.membershipMap[action.payload];
      })
      .addCase(leaveCommunity.rejected, (state, action) => {
        const id = String(action.meta.arg);
        state.joinedIds = addId(state.joinedIds, id);
        adjustMemberCount(state, id, +1); // undo the optimistic decrement
      })

      // ── Community Page ───────────────────────────────────────────────────
      .addCase(fetchCommunityPage.pending, (state, action) => {
        // Opening a different community must not flash the previous one's data
        if (String(state.current.community?.id) !== String(action.meta.arg)) {
          state.current = { ...emptyCurrent };
        } else {
          state.current.loading = true;
        }
      })
      .addCase(fetchCommunityPage.fulfilled, (state, action) => {
        state.current.loading = false;
        state.current.community = action.payload;
        state.current.error = '';
      })
      .addCase(fetchCommunityPage.rejected, (state, action) => {
        state.current.loading = false;
        state.current.community = null;
        state.current.error = action.error.message;
      })
      .addCase(fetchCommunityExtras.fulfilled, (state, action) => {
        // Ignore a late response for a community that is no longer open
        if (String(state.current.community?.id) !== action.payload.communityId) return;
        state.current.events = action.payload.events;
        state.current.members = action.payload.members;
      })
      .addCase(fetchCommunityExtras.rejected, (state) => {
        state.current.members = [];
      })

      // ── Create / Delete ──────────────────────────────────────────────────
      .addCase(createCommunity.fulfilled, (state, action) => {
        const created = action.payload;
        state.all.push(created);
        state.joinedIds = addId(state.joinedIds, String(created.id));
      })
      .addCase(deleteCommunity.fulfilled, (state, action) => {
        state.all = state.all.filter((c) => String(c.id) !== action.payload);
        state.joinedIds = removeId(state.joinedIds, action.payload);
        delete state.membershipMap[action.payload];
      })

      // ── Logout: clear per-user state ─────────────────────────────────────
      .addCase(logout, (state) => {
        state.joinedIds = [];
        state.membershipMap = {};
        state.current = emptyCurrent;
      });
  },
});

export const { searchChanged, categoryChanged, sortByChanged, filterReset } =
  communitiesSlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectAllCommunities = (state) => state.communities.all;
export const selectCommunityListLoading = (state) => state.communities.listLoading;
export const selectCommunityListError = (state) => state.communities.listError;
export const selectJoinedIds = (state) => state.communities.joinedIds;
export const selectMembershipMap = (state) => state.communities.membershipMap;
export const selectCurrentCommunity = (state) => state.communities.current;
export const selectDiscoveryFilter = (state) => state.communities.discoveryFilter;

/** Public list: suspended communities are hidden. Memoized — only rebuilt when `all` changes. */
export const selectCommunityList = createSelector(
  [selectAllCommunities],
  (all) => all.filter(isActive)
);

/** Communities the logged-in user has joined (for Dashboard / sidebar). */
export const selectJoinedCommunities = createSelector(
  [selectAllCommunities, selectJoinedIds],
  (all, ids) => {
    const joined = new Set(ids);
    return all.filter((c) => joined.has(String(c.id)));
  }
);

/** Communities owned by the logged-in user. */
export const selectOwnedCommunities = createSelector(
  [selectAllCommunities, (state) => state.auth.user?.id],
  (all, userId) => (userId == null ? [] : all.filter((c) => String(c.ownerId) === String(userId)))
);

export default communitiesSlice.reducer;
