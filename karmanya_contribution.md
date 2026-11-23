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

### Redux Toolkit Architecture & Class Requirements Alignment (Branch: `karmanya/redux-improvements`)

The Redux architecture for **Component 2 (Community Management)** was engineered to satisfy 100% of the project evaluation requirements:

| Class Requirement | Implementation in Component 2 | Satisfied In |
| :--- | :--- | :--- |
| **1. One-to-One Repository Mapping** | `communitiesSlice.js` maps 1:1 to the backend `communities` repository (`communities.controller.ts` / `communities.service.ts`). | `communitiesSlice.js` |
| **2. Formula: CRUD Ops = Repos * 4** | All 4 CRUD operations implemented: **Create** (`createCommunity`), **Read** (`fetchCommunityList`, `fetchCommunityPage`), **Update** (`updateCommunity`), **Delete** (`deleteCommunity`). | `communitiesSlice.js` |
| **3. Strict Thunk Pattern (DB-First -> Fulfilled Only)** | Dispatches async thunks to the NestJS backend first; state is updated **strictly in `.fulfilled`** after database write confirmation. In `.pending`, only in-flight loading indicators are set. Zero optimistic mutations before DB response. | `communitiesSlice.js` |
| **4. No Local Storage (Pure In-Memory Variables)** | **Zero localStorage usage** for domain state. `joinedIds`, `membershipMap`, and forms are maintained purely in Redux store variables, initialized in memory and hydrated via backend thunks (`fetchMyMemberships`). | `communitiesSlice.js`, `listenerMiddleware.js` |
| **5. All Display Data & Actions from Redux (No useState)** | **Eliminated all 13 `useState` hooks** from `useCreateCommunity.js`. All form fields (`name`, `slug`, `desc`, `category`, `banner`, `channels`, etc.) and the **Live Preview** card read and dispatch directly from/to `state.communities.createForm`. `CommunityPage` active tab and search also driven by Redux. | `useCreateCommunity.js`, `useCommunityPage.js` |
| **6. State Clearing on Component Navigation** | Transient view and draft form states are wiped on route unmount via cleanup reducers: `clearCurrentCommunity()`, `resetCreateForm()`, and `filterReset()`, preventing ghost data or dirty forms when moving between components. | `useCommunityPage.js`, `useCreateCommunity.js`, `useDiscovery.js` |
| **7. Reselect Memoization** | `communitySelectors.js` provides 6 memoized selectors (`selectFilteredCommunities`, `selectDiscoveryStats`, `selectDiscoveryCategories`, etc.) preventing unnecessary re-renders. | `communitySelectors.js` |
| **8. App-Wide Safety Net & Pre-bound Hooks** | `store/hooks.js` (`useAppDispatch`, `useAppSelector`) and an `isRejected` global listener in `listenerMiddleware.js` automatically displaying toast alerts on API failure across all slices. | `hooks.js`, `listenerMiddleware.js` |

#### Commit Progression Summary on `karmanya/redux-improvements`:
1. `af31803` — `feat(redux): optimize communitiesSlice with membershipMap, SWR cache and persistent discovery filters`
2. `1a2e76e` — `feat(redux): add communitySelectors.js with Reselect memoization for Component 2`
3. `c0674d4` — `feat(redux): add store/hooks.js and global async-thunk error listener`
4. `3bbabf1` — `docs: document Redux contributions in karmanya_contribution.md`
5. `5801561` — `feat(redux): purge localStorage, enforce strict DB-first thunk lifecycle and add updateCommunity 4th CRUD operation`
6. `a22ec60` — `feat(redux): eliminate useState in wizard and view hooks; add component unmount cleanup`
7. *(Upcoming)* — `docs: update contribution report with comprehensive class requirements mapping`



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
