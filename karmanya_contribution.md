# Se7enSquare — Project Documentation & Individual Contribution (Karmanya)

**Student Name:** Karmanya  
**Component Track:** Component 2 — Community Management  
**Assigned Pages:** `discovery.html`, `create-community.html`, `community-page.html`, `owner-dashboard.html`

---

# Part 1: Project Setup, Dependencies, Execution Steps, and Testing Instructions

## 1. Project Overview & Architecture
**Se7enSquare** is a modern full-stack gaming community, moderation, and esports engagement platform.
- **Frontend:** Built with **React 19**, **Vite 8**, and **React Router 7**, featuring responsive scoped layouts, custom hooks, and thin orchestrator components.
- **Backend:** Built with **NestJS 10** and **TypeScript**, providing RESTful APIs, Swagger documentation, global exception filters, and dual-tier Role-Based Access Control (RBAC).
- **Persistence:** Synchronous file-backed database engine in `back-end/src/common/utils/in-memory-db.ts` syncing directly with `back-end/db.json`.

---

## 2. Prerequisites & Dependencies

### Prerequisites
- **Node.js:** Version 20.x or higher
- **npm:** Version 10.x or higher
- **Web Browser:** Google Chrome, Edge, or Firefox

### Frontend Dependencies (`front-end/react-app/package.json`)
- `react`, `react-dom` — Core UI rendering library.
- `react-router-dom` — Client-side SPA routing and navigation guards.
- `vite`, `@vitejs/plugin-react` — Frontend build tool and development server.
- `eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` — Linting and code quality.

### Backend Dependencies (`back-end/package.json`)
- `@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express` — Scalable TypeScript server framework.
- `@nestjs/swagger`, `swagger-ui-express` — OpenAPI / Swagger interactive documentation (`/api/docs`).
- `class-validator`, `class-transformer` — Runtime DTO constraint validation.
- `helmet`, `express-rate-limit` — HTTP security headers and rate limiting.
- `google-auth-library` — OAuth 2.0 token verification.
- `winston`, `winston-daily-rotate-file` — Structured application and audit logging.

---

## 3. Environment Configuration

### Frontend Environment File (`front-end/react-app/.env`)
```env
VITE_API_URL=http://localhost:3000/api
VITE_GOOGLE_CLIENT_ID=784045223165-rgmes9ee44r52abkaau43h8oj27qr3na.apps.googleusercontent.com
```

### Backend Environment File (`back-end/.env`)
```env
PORT=3000
GOOGLE_CLIENT_ID=784045223165-rgmes9ee44r52abkaau43h8oj27qr3na.apps.googleusercontent.com
NODE_ENV=development
```

---

## 4. Execution Steps (Step-by-Step)

### Step 1: Install Backend Dependencies & Start Server
Open a terminal in the project root:
```bash
cd back-end
npm install
npm run build
npm start
```
* **Server Address:** `http://localhost:3000`
* **Swagger API Documentation:** `http://localhost:3000/api/docs`

### Step 2: (Optional) Seed Database
To reset or populate clean demonstration records:
```bash
cd back-end
npm run seed
```

### Step 3: Install Frontend Dependencies & Start Dev Server
Open a second terminal window:
```bash
cd front-end/react-app
npm install
npm run dev
```
* **Client Address:** `http://localhost:5173`
* Opens the live Se7enSquare application connected to the backend.

---

## 5. Testing Instructions

### A. Automated Compilation & Build Tests
Run from terminal to verify zero build errors:

1. **Frontend Build Test:**
   ```bash
   cd front-end/react-app
   npm run build
   ```
   *Expected Result:* `built in ~400ms` with exit code `0`.

2. **Backend Build Test:**
   ```bash
   cd back-end
   npm run build
   ```
   *Expected Result:* `nest build` completes successfully with exit code `0`.

---

### B. Functional & API Testing

#### 1. Test Community Endpoints (`/api/communities`):
```bash
powershell -NoProfile -Command "Invoke-RestMethod -Uri 'http://localhost:3000/api/communities/1' -Method Get -Headers @{ 'x-user-id' = '4'; 'x-role' = 'user' }"
```
*Expected Result:* Returns status `200 OK` with dynamic `memberCount: 3`, `onlineCount: 1`, and `ownerName: "player01"` (no static dummy counts).

#### 2. Test Platform Analytics (`/api/dashboard/stats`):
```bash
powershell -NoProfile -Command "Invoke-RestMethod -Uri 'http://localhost:3000/api/dashboard/stats' -Method Get -Headers @{ 'x-user-id' = '1'; 'x-role' = 'admin' }"
```
*Expected Result:* Returns calculated real metrics (`totalUsers`, `totalCommunities`, `totalEvents`, `totalMemberships`).

---

### C. Manual Browser Workflow Testing

1. **Community Discovery (`/discovery`):**
   - Click category filter pills (`All`, `Gaming`, `FPS`) $\rightarrow$ cards re-render instantly to match selected category.
   - Type in the search box $\rightarrow$ community list filters dynamically based on debounced search.
   - Click "Join Community" $\rightarrow$ button optimistically updates to "✓ Joined" and increases member count.
2. **Community Creation (`/create-community`):**
   - Fill in Community Name $\rightarrow$ verify URL slug is generated automatically.
   - Choose category, emoji avatar, and gradient banner $\rightarrow$ observe instant preview updates.
   - Advance through wizard steps and click "Create Community" $\rightarrow$ new community is persisted to `db.json`.
3. **Community Hub (`/community-page/:id`):**
   - Logged in as creator $\rightarrow$ displays "👑 Creator" badge, Settings, and Delete buttons.
   - Non-members $\rightarrow$ channel list displays lock icons 🔒 with a join prompt.
   - Members $\rightarrow$ clicking a channel navigates directly into `/chat` with channel context.
4. **Owner Dashboard (`/owner-dashboard`):**
   - Log in as Owner (`owner@gameunity.local`) $\rightarrow$ verify access to `/owner-dashboard` and real revenue metrics.
   - Log in as regular player (`player01`) $\rightarrow$ attempting to access `/owner-dashboard` redirects safely to `/dashboard`.

---

# Part 2: Individual Contribution (Karmanya)

**Component Track:** Component 2 — Community Management  
**Assigned Legacy Pages:** `discovery.html`, `create-community.html`, `community-page.html`, `owner-dashboard.html`  
**Reason:** These pages cover the end-to-end community lifecycle: discovering hubs, creating communities with custom branding, viewing individual community details and channels, and owner-level management and revenue analytics.

---

## 1. Specific File Names Developed or Modified

### A. Frontend Page Orchestrators (4 files)
1. `Discovery.jsx` (`front-end/react-app/src/Pages/Discovery.jsx`) — Orchestrator for community exploration.
2. `CreateCommunity.jsx` (`front-end/react-app/src/Pages/CreateCommunity.jsx`) — Orchestrator for the 4-step creation wizard.
3. `CommunityPage.jsx` (`front-end/react-app/src/Pages/CommunityPage.jsx`) — Orchestrator for the community details hub.
4. `OwnerDashboard.jsx` (`front-end/react-app/src/Pages/OwnerDashboard.jsx`) — Orchestrator for owner telemetry and analytics.

### B. Frontend Subcomponents (20 files)
* **Discovery Subcomponents:**
  1. `DiscoveryHeader.jsx` — Navigation header and profile avatar link.
  2. `CategoryFilterBar.jsx` — Horizontal scrollable category pills and sort dropdown.
  3. `CommunityGrid.jsx` — Featured banner, count display, loading skeleton, card grid.
  4. `CommunityCard.jsx` — Community card item with optimistic Join/Leave toggle.
* **Create Community Subcomponents:**
  5. `CreateCommunityHeader.jsx` — Progress breadcrumbs with RBAC home navigation.
  6. `BasicInfoFields.jsx` — Name, auto-slug generator, description, category, website inputs.
  7. `BrandingPicker.jsx` — Avatar emoji selector, banner gradient picker, and tag pills.
  8. `PrivacyTypeSelector.jsx` — Public/Private radio cards and member permissions.
  9. `CommunityRulesInput.jsx` — Guidelines editor and welcome announcement input.
  10. `CreateCommunityActions.jsx` — Stepper navigation and plan limit guard.
* **Community Page Subcomponents:**
  11. `CommunityBanner.jsx` — Cover banner, creator badge, join toggle, and owner delete button.
  12. `CommunityNav.jsx` — Tab navigation bar (`Overview`, `Channels`, `Members`, `Rules`).
  13. `CommunityAboutWidget.jsx` — Community bio, foundation date, tags, and recent messages stream.
  14. `PostFeed.jsx` — Channels list with member and owner chat access gating.
  15. `CommunityMembersList.jsx` — Member roster with real-time search and role badges.
  16. `CommunityRulesWidget.jsx` — Formatted rules display.
* **Owner Dashboard Subcomponents:**
  17. `OwnerHeader.jsx` — Executive header with owner permission badge.
  18. `OwnerMetricsGrid.jsx` — Real-time KPI cards for revenue, users, and communities.
  19. `RecentActivityList.jsx` — Platform health status and audit log events.
  20. `SubscriptionsTab.jsx` — Drill-down modal for inspecting granular details.

### C. Frontend Custom Hooks & Schemas (8 files)
21. `useDiscovery.js` — Community fetch, memoized filtering, search debouncing, and join/leave sync.
22. `useCreateCommunity.js` — Wizard state machine, auto-slug generation, and submission guard.
23. `useCommunityPage.js` — Community details fetch, complete auth headers injection, tab handling, and owner delete.
24. `useOwnerDashboard.js` — Stats, revenue, and drill-down data coordination.
25. `discoveryData.js` — Category options and offline demo fallbacks.
26. `createCommunityOptions.js` — Banner gradients, categories, and validation constants.
27. `defaultCommunityData.js` — Fallback rules and zero-state definitions.
28. `ownerDashboardData.js` — Default 0-state metrics.

### D. Scoped Stylesheets (4 files)
29. `discovery.css` — Scoped containment (`.discovery-shell`, `.discovery-content`, `.discovery-filter-bar`).
30. `create-community.css` — Stepper bar, swatches, and preview card layout.
31. `community-page.css` — Banner area, navigation pills, and member cards.
32. `owner-dashboard.css` — KPI grid and drill-down modal styles.

### E. Backend Modules, Controllers, Services & Database (8 files)
33. `communities.controller.ts` — Endpoints for `/api/communities` (`GET`, `POST`, `PATCH`, `DELETE`).
34. `communities.service.ts` — Dynamic member counting, owner name resolution, and cascading deletion logic.
35. `create-community.dto.ts` — Runtime validation constraints for community creation.
36. `memberships.controller.ts` — Endpoints for `/api/memberships` (join, leave, query).
37. `memberships.service.ts` — Persistence of community memberships in database.
38. `dashboard.service.ts` — Dynamic platform statistics and revenue aggregation.
39. `in-memory-db.ts` — Type definitions (`CommunityRecord`, `UserRecord`), entity counters, and persistent syncing to `db.json`.
40. `security.middleware.ts` — Local development rate limiter configuration.

---

### Redux Toolkit Architecture (Branch: `karmanya/redux-improvements`)

The following Redux improvements were authored by Karmanya on the `karmanya/redux-improvements` branch as a contribution to the team's centralized state management layer:

#### Commit 1 — `communitiesSlice.js` Optimization
**File:** `front-end/react-app/src/store/slices/communitiesSlice.js`

| Improvement | Description |
| :--- | :--- |
| **`membershipMap`** | Stores `{ communityId → membershipId }` from `fetchMyMemberships`. `leaveCommunity` now reads directly from the map and fires a single `DELETE`, eliminating the redundant `GET /memberships` round-trip that existed on every Leave click. |
| **True dual-layer optimistic updates** | `joinCommunity.pending` and `leaveCommunity.pending` now update BOTH `joinedIds` AND `memberCount`/`onlineCount` on community cards and banners simultaneously. The new `adjustMemberCount()` helper mutates both `state.all` and `state.current.community`. Automatic rollback in `.rejected` keeps UI consistent on failure. |
| **SWR caching (`LIST_CACHE_MS = 60s`)** | `fetchCommunityList` gains a `condition` guard that skips the network call when the list was last fetched within 60 seconds. Prevents loading skeleton flashes on every revisit to `/discovery`. |
| **Persistent discovery filters** | `search`, `category`, and `sortBy` lifted from local `useState` into `communitiesSlice.discoveryFilter` with actions `searchChanged`, `categoryChanged`, `sortByChanged`, `filterReset`. User filters now survive navigating into a community and returning to `/discovery`. |

#### Commit 2 — `communitySelectors.js` (Reselect Memoization)
**File:** `front-end/react-app/src/store/selectors/communitySelectors.js` *(new file)*

A dedicated selector module for Component 2, parallel to `adminSelectors.js` for Component 5:

| Selector | Returns |
| :--- | :--- |
| `selectFilteredCommunities` | Memoized filter+sort pipeline consuming `discoveryFilter`; replaces inline `useMemo` in `useDiscovery`. |
| `selectDiscoveryStats` | `{ totalCommunities, totalMembers, totalOnline }` in one cached pass. |
| `selectDiscoveryCategories` | Unique sorted category pill list derived from live community data. |
| `selectIsCommunityJoined(id)` | Factory selector returning a boolean for a specific community's join status. |
| `selectCommunityById(id)` | Looks up any community (including suspended) by ID for event pages and admin panels. |
| `selectOwnedCommunitiesCount` | Count of communities owned by the logged-in user for dashboard badges. |

#### Commit 3 — App-Wide Redux Infrastructure
**Files:** `front-end/react-app/src/store/hooks.js` *(new)*, `front-end/react-app/src/store/listenerMiddleware.js` *(extended)*

| Addition | Description |
| :--- | :--- |
| **`store/hooks.js`** | `useAppDispatch` and `useAppSelector` wrappers providing a single import path; store changes only require updating one file instead of every hook across all 5 tracks. |
| **Global `isRejected` listener** | Catches every rejected `createAsyncThunk` action across all 17 slices and fires a toast automatically — the safety net for unhandled API failures across the whole app. A `SILENT_THUNKS` exclusion set prevents duplicate toasts for thunks that have dedicated inline error handling. |



1. **Eliminated All Dummy Data:**
   - Removed all static member placeholders across Discovery, Community Page, and Owner Dashboard.
   - Computes live counts (`memberCount`, `onlineCount`, `totalMemberships`, `subscriptionRevenue`) directly from relational database records in `in-memory-db.ts` / `db.json`.
2. **Thin Orchestrator & Hook Architecture:**
   - Isolated presentation from state; kept all 4 page files under 80–120 lines of JSX.
   - Encapsulated 100% of state, network calls, and validations into custom hooks.
3. **Cascading Referential Integrity:**
   - Implemented cascading delete in `communities.service.ts`: deleting a community automatically cleans up associated memberships, channels, and events.
4. **Dual-Tier Role-Based Access Control:**
   - Frontend: Route protection with `<ProtectedRoute allowedRoles={['owner', 'admin']}>` and role-based brand redirecting (`getHomeRoute`).
   - Backend: Method-level guards with `@Roles(AppRole.OWNER, AppRole.ADMIN)` on sensitive revenue endpoints.
5. **Layout Scoping & CSS Containment:**
   - Engineered `.discovery-shell` and `.discovery-content` scoped styles to enforce single vertical scroll containers and prevent filter bar compression.
6. **Robust Network Authentication:**
   - Injected mandatory `x-role` and `x-user-id` headers across all API calls, preventing 401 Unauthorized errors on protected community endpoints.
