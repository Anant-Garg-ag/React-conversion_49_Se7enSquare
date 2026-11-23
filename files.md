# Se7enSquare — Files Inventory & Data Sources

**Student Name:** Karmanya  
**Track:** Component 2 — Community Management  
**Assigned Legacy Pages:** `discovery.html`, `create-community.html`, `community-page.html`, `owner-dashboard.html`  
**Converted React Routes:** `/discovery`, `/create-community`, `/community-page`, `/owner-dashboard`  
**Backend Modules:** `communities`, `memberships`, `dashboard`, `in-memory-db`

---

# Part 1: Frontend Files (By Assigned Page)

## 1. Discovery Page (`/discovery`)
*Assigned legacy page: `discovery.html`*

| File & Link | Role | What It Does | Data Source ("Using Data From Where") |
| :--- | :--- | :--- | :--- |
| [Discovery.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/Discovery.jsx) | **Page Orchestrator** | Renders the overall layout, mounts `SideBar`, calls `useDiscovery()`, and passes state to subcomponents. | Receives all state/callbacks from `useDiscovery()`. |
| [useDiscovery.js](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Components/platform/hooks/useDiscovery.js) | **Custom Hook** | Central state machine: handles community fetching, category filtering, search debouncing, sorting, and optimistic join/leave toggling. | • `GET /api/communities`<br>• `GET /api/memberships?userId=:id`<br>• `GET /api/events`<br>• `localStorage('nexus_joined_communities')` |
| [DiscoveryHeader.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/Discovery/components/DiscoveryHeader.jsx) | **Subcomponent** | Header bar with search input field, profile button, and link to create community. | Props: `search`, `setSearch` passed from `Discovery.jsx`. |
| [CategoryFilterBar.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/Discovery/components/CategoryFilterBar.jsx) | **Subcomponent** | Horizontally scrollable category pills and dropdown menu to select sorting mode (`active`, `members`, `trending`, `newest`). | Props: `categories`, `activeCategory`, `sortBy`, `setSortBy` from `useDiscovery.js`. |
| [CommunityGrid.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/Discovery/components/CommunityGrid.jsx) | **Subcomponent** | Hero banner, community count badge, loading skeleton cards, zero-state message, and card grid container. | Props: `filtered`, `loading`, `totalMembers`, `totalOnline`, `eventCount`. |
| [CommunityCard.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/Discovery/components/CommunityCard.jsx) | **Subcomponent** | Individual community card: banner gradient, emoji avatar, dynamic member/online counters, description, and optimistic Join button. | Props: `community` object, `isJoined` boolean flag, `onToggleJoin` callback. |
| [discoveryData.js](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Components/platform/data/discoveryData.js) | **Data / Constants** | Sort labels (`SORT_LABELS`) and helper functions `memberCountOf()` and `onlineCountOf()`. | Static definitions + fallback calculation helpers. |
| [discovery.css](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/styles/discovery.css) | **Scoped Stylesheet** | Scoped styles for `.discovery-shell`, `.discovery-content`, responsive CSS grid cards, and filter pills. | Custom CSS variables (`--bg-primary`, `--accent`, etc.). |

---

## 2. Create Community Wizard (`/create-community`)
*Assigned legacy page: `create-community.html`*

| File & Link | Role | What It Does | Data Source ("Using Data From Where") |
| :--- | :--- | :--- | :--- |
| [CreateCommunity.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CreateCommunity.jsx) | **Page Orchestrator** | Renders 4-step wizard shell, step indicator, channel sub-tab, and live card preview. | Receives all state/handlers from `useCreateCommunity()`. |
| [useCreateCommunity.js](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Components/platform/hooks/useCreateCommunity.js) | **Custom Hook** | Manages form state across all 4 steps, auto-slug generation, step validation, channel CRUD, and backend submission. | • `POST /api/communities`<br>• `PATCH /api/communities/:id` (channels)<br>• `localStorage('user')`<br>• `localStorage('nexus_joined_communities')` |
| [CreateCommunityHeader.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CreateCommunity/components/CreateCommunityHeader.jsx) | **Subcomponent** | Progress bar and breadcrumbs showing the current step (1 to 4) with home navigation. | Props: `currentStep`, `steps` list. |
| [BasicInfoFields.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CreateCommunity/components/BasicInfoFields.jsx) | **Step 1 Subcomponent** | Form inputs for Community Name, auto-generated URL slug, Description, and Category dropdown. | Controlled inputs tied to hook state (`name`, `slug`, `desc`, `category`). |
| [BrandingPicker.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CreateCommunity/components/BrandingPicker.jsx) | **Step 2 Subcomponent** | Emoji avatar picker, 6 gradient banner swatches, website input, and tag pills editor. | Controlled inputs + presets from `createCommunityOptions.js`. |
| [PrivacyTypeSelector.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CreateCommunity/components/PrivacyTypeSelector.jsx) | **Step 3 Subcomponent** | Public vs. Private radio selection, default channel listing with inline addition/deletion, and permissions toggles. | Controlled inputs tied to hook state (`privacy`, `channels`, `permissions`). |
| [CommunityRulesInput.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CreateCommunity/components/CommunityRulesInput.jsx) | **Step 4 Subcomponent** | Multi-line text areas for community rules/guidelines and welcome announcements. | Controlled inputs tied to hook state (`rules`, `welcomeMsg`). |
| [CreateCommunityActions.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CreateCommunity/components/CreateCommunityActions.jsx) | **Subcomponent** | "Previous" and "Next / Create Community" buttons with loading spinner during submission. | Props: `currentStep`, `submitting`, `onPrev`, `onNext`. |
| [createCommunityOptions.js](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Components/platform/data/createCommunityOptions.js) | **Data / Constants** | Presets for categories, emojis (`ICONS`), gradient swatches (`BANNERS`), `DEFAULT_CHANNELS`, and regex URL validation patterns. | Static constants. |
| [create-community.css](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/styles/create-community.css) | **Scoped Stylesheet** | Styling for the stepper indicator, swatch color pickers, and split live-preview layout. | Custom CSS variables. |

---

## 3. Community Page (`/community-page/:id`)
*Assigned legacy page: `community-page.html`*

| File & Link | Role | What It Does | Data Source ("Using Data From Where") |
| :--- | :--- | :--- | :--- |
| [CommunityPage.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CommunityPage.jsx) | **Page Orchestrator** | Renders header banner, 4 navigation tabs (`Overview`, `Channels`, `Members`, `Rules`), and tab panels. | Receives all state/handlers from `useCommunityPage()`. |
| [useCommunityPage.js](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Components/platform/hooks/useCommunityPage.js) | **Custom Hook** | Fetches community details, verifies ownership (`ownerId`), hydrates member roster by joining with `/users`, handles join/leave, and executes owner delete. | • `GET /api/communities/:id`<br>• `GET /api/memberships?communityId=:id`<br>• `GET /api/users?communityId=:id`<br>• `GET /api/events`<br>• `DELETE /api/communities/:id` |
| [CommunityBanner.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CommunityPage/components/CommunityBanner.jsx) | **Subcomponent** | Cover banner, community title, emoji avatar, dynamic stats, creator badge ("👑 Creator"), Settings button, and Owner Delete button. | Props from `community` object + `isOwner` boolean. |
| [CommunityNav.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CommunityPage/components/CommunityNav.jsx) | **Subcomponent** | 4-tab selector: Overview, Channels, Members, and Rules. | Props: `activeTab`, `setActiveTab`. |
| [CommunityAboutWidget.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CommunityPage/components/CommunityAboutWidget.jsx) | **Tab 1 Subcomponent** | Community bio, founding date, tags, and live chat message preview stream. | Props: `community` object + live message state. |
| [PostFeed.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CommunityPage/components/PostFeed.jsx) | **Tab 2 Subcomponent** | Channel list with access control: non-members see locked channels 🔒; members/owners can click to jump directly into `/chat`. | Props: `channelEntries`, `joined`, `isOwner`. |
| [CommunityMembersList.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CommunityPage/components/CommunityMembersList.jsx) | **Tab 3 Subcomponent** | Roster displaying avatar, full name, role badges (`owner`, `moderator`, `member`), and real-time search filtering. | Props: `filteredMembers`, `memberSearch`, `setMemberSearch`. |
| [CommunityRulesWidget.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CommunityPage/components/CommunityRulesWidget.jsx) | **Tab 4 Subcomponent** | Formatted numbered guideline cards. | Props: `rules` array from `community.rules` (or defaults). |
| [community-page.css](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/styles/community-page.css) | **Scoped Stylesheet** | Layout styles for community cover banner, channel list items, and member cards. | Custom CSS variables. |

---

## 4. Owner Dashboard (`/owner-dashboard`)
*Assigned legacy page: `owner-dashboard.html`*

| File & Link | Role | What It Does | Data Source ("Using Data From Where") |
| :--- | :--- | :--- | :--- |
| [OwnerDashboard.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/OwnerDashboard.jsx) | **Page Orchestrator** | Renders executive owner portal shell, telemetry metrics grid, audit activity list, and drill-down modal. | Receives all state/handlers from `useOwnerDashboard()`. |
| [useOwnerDashboard.js](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/OwnerDashboard/hooks/useOwnerDashboard.js) | **Custom Hook** | Fetches platform telemetry, live revenue numbers, and on-demand modal drill-down queries for communities, payments, and subscriptions. | • `GET /api/dashboard/stats`<br>• `GET /api/dashboard/revenue`<br>• `GET /api/communities`<br>• `GET /api/payments/history`<br>• `GET /api/subscriptions` |
| [OwnerHeader.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/OwnerDashboard/components/OwnerHeader.jsx) | **Subcomponent** | Top navigation bar with "Owner Portal" badge, profile link, and backend status dot. | Props: `currentUser` info. |
| [OwnerMetricsGrid.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/OwnerDashboard/components/OwnerMetricsGrid.jsx) | **Subcomponent** | Interactive metric KPI cards: Total Revenue, Monthly ARR, Active Communities, Active Events, Subscribers, and Organizers. | Props: `stats` and `revenue` objects + `onDrill` callback. |
| [RecentActivityList.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/OwnerDashboard/components/RecentActivityList.jsx) | **Subcomponent** | Status cards showing platform health, pending reports queue, pending appeals, and backend connectivity. | Props: `stats` object. |
| [SubscriptionsTab.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/OwnerDashboard/components/SubscriptionsTab.jsx) | **Subcomponent** | Drill-down modal presenting detailed tables (communities list, events list, payment transaction history, subscription plans). | Props: `drillContent`, `drillTitle`, `drillLoading`, `onClose`. |
| [ownerDashboardData.js](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Components/platform/data/ownerDashboardData.js) | **Data / Constants** | Default 0-state objects (`DEFAULT_STATS`, `DEFAULT_REVENUE`) and definitions for `REVENUE_CARDS`. | Static definitions. |
| [owner-dashboard.css](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/styles/owner-dashboard.css) | **Scoped Stylesheet** | Metric cards styling, badge colors, and tabular drill-down modal layout. | Custom CSS variables. |

---

# Part 2: Backend Modules & Persistence

These backend files power the APIs called by your 4 frontend pages:

| File & Link | Role | What It Does | Data Source ("Using Data From Where") |
| :--- | :--- | :--- | :--- |
| [communities.controller.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/communities/communities.controller.ts) | **NestJS Controller** | Exposes `/api/communities` REST routes (`GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id`) protected by `@Roles(...)` and Swagger documentation. | Dispatches incoming HTTP requests to `CommunitiesService`. |
| [communities.service.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/communities/communities.service.ts) | **NestJS Service** | **Core Business Logic**: dynamically computes `memberCount` and `onlineCount`, resolves `ownerName` from `db.users`, enforces plan-based channel caps, and performs **cascading deletion** across 5 collections. | Reads & writes to `db.communities`, `db.memberships`, `db.users`, `db.events`, `db.posts`, `db.reports`. |
| [create-community.dto.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/communities/dto/create-community.dto.ts) | **Validation DTO** | Runtime constraints using `class-validator` (name: 3–50 chars, desc: 10–200 chars, ownerId, tags, channels, visibility). | Incoming HTTP request body. |
| [update-community.dto.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/communities/dto/update-community.dto.ts) | **Validation DTO** | Optional partial fields for updating communities or channels. | Incoming HTTP request body. |
| [memberships.controller.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/memberships/memberships.controller.ts) | **NestJS Controller** | Exposes `/api/memberships` routes (`GET /`, `POST /`, `DELETE /:id`) to query, join, or leave communities. | Dispatches requests to `MembershipsService`. |
| [memberships.service.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/memberships/memberships.service.ts) | **NestJS Service** | Checks user and community existence, prevents duplicate joins, generates sequential IDs, and saves to database. | Reads & writes to `db.memberships`, `db.users`, `db.communities`. |
| [create-membership.dto.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/memberships/dto/create-membership.dto.ts) | **Validation DTO** | Enforces integer `userId` and `communityId` on join requests. | Incoming HTTP request body. |
| [dashboard.controller.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/dashboard/dashboard.controller.ts) | **NestJS Controller** | Exposes `/api/dashboard/stats` and `@Roles(AppRole.OWNER, AppRole.ADMIN) /api/dashboard/revenue`. | Dispatches requests to `DashboardService`. |
| [dashboard.service.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/dashboard/dashboard.service.ts) | **NestJS Service** | Aggregates live system statistics (active communities, users, events, reports) and revenue summary. | Reads from `db.communities`, `db.users`, `db.events`, `db.reports`, `db.subscriptions`, `db.payments`. |
| [in-memory-db.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/common/utils/in-memory-db.ts) | **Database Engine** | In-memory cache synced synchronously with `fs.writeFileSync(DB_FILE)` on every write, sequential ID generator (`nextId`), and schema types (`CommunityRecord`, `MembershipRecord`). | Persisted directly to `back-end/db.json`. |
| [db.json](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/db.json) | **File Database** | The single source of persistent truth containing all JSON collections and entity counters. | Written synchronously by `saveDb()` in `in-memory-db.ts`. |

---

# Quick Study Summary: Where Data Flows

```
[ db.json ] ◄── Synchronous File Persistence ──► [ in-memory-db.ts ]
                                                           │
                                                           ▼
                                         [ Backend Services & Controllers ]
                                         • communities.service.ts
                                         • memberships.service.ts
                                         • dashboard.service.ts
                                                           │
                                                           ▼ (REST API /api/...)
                                            [ Frontend Custom Hooks ]
                                            • useDiscovery.js
                                            • useCreateCommunity.js
                                            • useCommunityPage.js
                                            • useOwnerDashboard.js
                                                           │
                                                           ▼ (State & Callbacks)
                                           [ Frontend Thin Orchestrators ]
                                           • Discovery.jsx
                                           • CreateCommunity.jsx
                                           • CommunityPage.jsx
                                           • OwnerDashboard.jsx
                                                           │
                                                           ▼ (Props)
                                            [ Presentation Subcomponents ]
                                            (Cards, Pickers, Feeds, Modals)
```
