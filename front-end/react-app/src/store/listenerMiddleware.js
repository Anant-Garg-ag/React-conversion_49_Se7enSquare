import { createListenerMiddleware, isAnyOf, isRejected } from '@reduxjs/toolkit';
import { storeUserSession, clearUserSession } from '../services/api';
import { loginSuccess, profileUpdated, logout, loginUser } from './slices/authSlice';
import { toastShown, toastHidden, sidebarToggled, SIDEBAR_KEY } from './slices/uiSlice';

/**
 * Side effects that run after an action has updated the store.
 *
 * Listeners registered here:
 * 1. Auth session sync  — keeps localStorage in sync with authSlice so that
 *    apiRequest() and the fetch shim in main.jsx can read x-user-id / x-role.
 * 2. Toast auto-dismiss — hides the global toast banner after its duration.
 *    A newer toast cancels the previous timer so each toast gets its full time.
 * 3. Sidebar persistence — writes the collapsed flag to localStorage so it
 *    survives a page reload.
 * 4. Zero LocalStorage for Domain Data — domain state maintained strictly in Redux store memory.
 * 5. Global async-thunk error handler — catches unhandled rejected async
 *    thunks across all slices and fires a toast automatically, avoiding duplicate
 *    toasts for inline-handled SILENT_THUNKS.
 */
export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(loginSuccess, profileUpdated, loginUser.fulfilled),
  effect: (action) => {
    storeUserSession(action.payload);
  },
});

listenerMiddleware.startListening({
  actionCreator: logout,
  effect: () => {
    clearUserSession();
  },
});

listenerMiddleware.startListening({
  actionCreator: toastShown,
  effect: async (action, listenerApi) => {
    // A newer toast cancels the previous timer, so it gets its full duration
    listenerApi.cancelActiveListeners();
    await listenerApi.delay(action.payload.duration);
    listenerApi.dispatch(toastHidden());
  },
});

listenerMiddleware.startListening({
  actionCreator: sidebarToggled,
  effect: (_action, listenerApi) => {
    try {
      localStorage.setItem(SIDEBAR_KEY, String(listenerApi.getState().ui.sidebarCollapsed));
    } catch { /* storage unavailable */ }
  },
});

/**
 * Global async-thunk error listener.
 * Catches rejected createAsyncThunk actions and surfaces a toast.
 *
 * Registered SILENT_THUNKS handle their own notifications/errors inline
 * (e.g. form modals, unwrap catches), preventing duplicate error toasts.
 */
const SILENT_THUNKS = new Set([
  'communities/fetchList',
  'communities/fetchPage',
  'communities/fetchMyMemberships',
  'communities/join',
  'communities/leave',
  'auth/loginUser',
  'auth/registerUser',
  'events/register',
  'events/cancelRegistration',
  // Event Management inline-handled thunks
  'events/save',
  'events/updateStatus',
  // Organizer inline-handled thunks
  'organizer/upgrade',
  'organizer/promote',
  // Community Settings inline-handled thunks
  'communitySettings/save',
]);

listenerMiddleware.startListening({
  matcher: isRejected,
  effect: (action, listenerApi) => {
    const thunkType = action.type?.replace('/rejected', '');
    if (SILENT_THUNKS.has(thunkType)) return;

    const message = action.payload?.message || action.error?.message || 'An unexpected error occurred.';
    listenerApi.dispatch(toastShown({ msg: `⚠️ ${message}`, duration: 4500 }));
  },
});
