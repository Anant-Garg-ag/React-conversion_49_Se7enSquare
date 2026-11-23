# Se7enSquare — Complete Component 2 (Community Management) Master Notes

**Student Name:** Karmanya  
**Track:** Component 2 — Community Management  
**Assigned Legacy Pages:** `discovery.html`, `create-community.html`, `community-page.html`, `owner-dashboard.html`  
**Converted React Routes:** `/discovery`, `/create-community`, `/community-page`, `/owner-dashboard`  
**Backend Modules:** `communities`, `memberships`, `dashboard`, `in-memory-db`

---

## Table of Contents
1. [Master File Index (Quick Reference Matrix)](#1-master-file-index-quick-reference-matrix)
2. [Module 1: Discovery (`/discovery`) — Detailed File Breakdown](#2-module-1-discovery-discovery--detailed-file-breakdown)
3. [Module 2: Create Community Wizard (`/create-community`) — Detailed File Breakdown](#3-module-2-create-community-wizard-create-community--detailed-file-breakdown)
4. [Module 3: Community Details Hub (`/community-page`) — Detailed File Breakdown](#4-module-3-community-details-hub-community-page--detailed-file-breakdown)
5. [Module 4: Owner Telemetry & Revenue Dashboard (`/owner-dashboard`) — Detailed File Breakdown](#5-module-4-owner-telemetry--revenue-dashboard-owner-dashboard--detailed-file-breakdown)
6. [Backend Modules & Persistence Engine — Detailed File Breakdown](#6-backend-modules--persistence-engine--detailed-file-breakdown)
7. [System-Wide Flow Logic & Data Architecture](#7-system-wide-flow-logic--data-architecture)
8. [Comprehensive Viva / Interview Q&A Guide](#8-comprehensive-viva--interview-qa-guide)

---

# 1. Master File Index (Quick Reference Matrix)

Below is the exhaustive index of all 45 files under Karmanya's contribution.

### A. Frontend Page Orchestrators (4 Files)
| # | File Name | Link | Role |
|---|---|---|---|
| 1 | `Discovery.jsx` | [Discovery.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/Discovery.jsx) | Page Orchestrator for Community Exploration |
| 2 | `CreateCommunity.jsx` | [CreateCommunity.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CreateCommunity.jsx) | Page Orchestrator for 4-Step Creation Wizard |
| 3 | `CommunityPage.jsx` | [CommunityPage.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CommunityPage.jsx) | Page Orchestrator for Community Hub & Tabs |
| 4 | `OwnerDashboard.jsx` | [OwnerDashboard.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/OwnerDashboard.jsx) | Page Orchestrator for Executive Telemetry Portal |

### B. Frontend Custom Hooks (4 Files)
| # | File Name | Link | Role |
|---|---|---|---|
| 5 | `useDiscovery.js` | [useDiscovery.js](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Components/platform/hooks/useDiscovery.js) | State machine for community search, filtering, and optimistic joins |
| 6 | `useCreateCommunity.js` | [useCreateCommunity.js](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Components/platform/hooks/useCreateCommunity.js) | Wizard state machine, auto-slug generator, step validation, and submission |
| 7 | `useCommunityPage.js` | [useCommunityPage.js](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Components/platform/hooks/useCommunityPage.js) | Hydrates community details, roster joining, and owner cascading delete |
| 8 | `useOwnerDashboard.js` | [useOwnerDashboard.js](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/OwnerDashboard/hooks/useOwnerDashboard.js) | Telemetry stats aggregation, revenue metrics, and on-demand drill-down queries |

### C. Frontend Presentation Subcomponents (20 Files)
| # | File Name | Link | Belongs To |
|---|---|---|---|
| 9 | `DiscoveryHeader.jsx` | [DiscoveryHeader.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/Discovery/components/DiscoveryHeader.jsx) | Discovery |
| 10 | `CategoryFilterBar.jsx` | [CategoryFilterBar.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/Discovery/components/CategoryFilterBar.jsx) | Discovery |
| 11 | `CommunityGrid.jsx` | [CommunityGrid.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/Discovery/components/CommunityGrid.jsx) | Discovery |
| 12 | `CommunityCard.jsx` | [CommunityCard.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/Discovery/components/CommunityCard.jsx) | Discovery |
| 13 | `CreateCommunityHeader.jsx` | [CreateCommunityHeader.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CreateCommunity/components/CreateCommunityHeader.jsx) | Create Community |
| 14 | `BasicInfoFields.jsx` | [BasicInfoFields.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CreateCommunity/components/BasicInfoFields.jsx) | Create Community (Step 1) |
| 15 | `BrandingPicker.jsx` | [BrandingPicker.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CreateCommunity/components/BrandingPicker.jsx) | Create Community (Step 2) |
| 16 | `PrivacyTypeSelector.jsx` | [PrivacyTypeSelector.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CreateCommunity/components/PrivacyTypeSelector.jsx) | Create Community (Step 3) |
| 17 | `CommunityRulesInput.jsx` | [CommunityRulesInput.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CreateCommunity/components/CommunityRulesInput.jsx) | Create Community (Step 4) |
| 18 | `CreateCommunityActions.jsx` | [CreateCommunityActions.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CreateCommunity/components/CreateCommunityActions.jsx) | Create Community |
| 19 | `CommunityBanner.jsx` | [CommunityBanner.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CommunityPage/components/CommunityBanner.jsx) | Community Page |
| 20 | `CommunityNav.jsx` | [CommunityNav.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CommunityPage/components/CommunityNav.jsx) | Community Page |
| 21 | `CommunityAboutWidget.jsx` | [CommunityAboutWidget.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CommunityPage/components/CommunityAboutWidget.jsx) | Community Page (Tab 1) |
| 22 | `PostFeed.jsx` | [PostFeed.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CommunityPage/components/PostFeed.jsx) | Community Page (Tab 2) |
| 23 | `CommunityMembersList.jsx` | [CommunityMembersList.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CommunityPage/components/CommunityMembersList.jsx) | Community Page (Tab 3) |
| 24 | `CommunityRulesWidget.jsx` | [CommunityRulesWidget.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CommunityPage/components/CommunityRulesWidget.jsx) | Community Page (Tab 4) |
| 25 | `OwnerHeader.jsx` | [OwnerHeader.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/OwnerDashboard/components/OwnerHeader.jsx) | Owner Dashboard |
| 26 | `OwnerMetricsGrid.jsx` | [OwnerMetricsGrid.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/OwnerDashboard/components/OwnerMetricsGrid.jsx) | Owner Dashboard |
| 27 | `RecentActivityList.jsx` | [RecentActivityList.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/OwnerDashboard/components/RecentActivityList.jsx) | Owner Dashboard |
| 28 | `SubscriptionsTab.jsx` | [SubscriptionsTab.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/OwnerDashboard/components/SubscriptionsTab.jsx) | Owner Dashboard (Drill-Down Modal) |

### D. Frontend Data & Options Constants (3 Files)
| # | File Name | Link | Role |
|---|---|---|---|
| 29 | `discoveryData.js` | [discoveryData.js](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Components/platform/data/discoveryData.js) | Sort labels and fallback count extraction helpers |
| 30 | `createCommunityOptions.js` | [createCommunityOptions.js](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Components/platform/data/createCommunityOptions.js) | Presets for categories, emojis, gradients, and regex patterns |
| 31 | `ownerDashboardData.js` | [ownerDashboardData.js](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Components/platform/data/ownerDashboardData.js) | 0-state objects and metric card configs for revenue grid |

### E. Frontend Scoped Stylesheets (4 Files)
| # | File Name | Link | Scoped Element Targets |
|---|---|---|---|
| 32 | `discovery.css` | [discovery.css](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/styles/discovery.css) | `.discovery-shell`, `.discovery-content`, `.discovery-filter-bar` |
| 33 | `create-community.css` | [create-community.css](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/styles/create-community.css) | `.create-community-page`, `.step-indicator`, `.preview-card` |
| 34 | `community-page.css` | [community-page.css](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/styles/community-page.css) | `.community-banner`, `.community-nav`, `.member-item` |
| 35 | `owner-dashboard.css` | [owner-dashboard.css](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/styles/owner-dashboard.css) | `.owner-metrics-grid`, `.drill-modal`, `.metric-card` |

### F. Backend Controllers, Services, DTOs & Persistence (11 Files)
| # | File Name | Link | Role |
|---|---|---|---|
| 36 | `communities.controller.ts` | [communities.controller.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/communities/communities.controller.ts) | REST endpoints for `/api/communities` (`GET`, `POST`, `PATCH`, `DELETE`) |
| 37 | `communities.service.ts` | [communities.service.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/communities/communities.service.ts) | Business logic: dynamic counting, owner resolution, cascading delete |
| 38 | `create-community.dto.ts` | [create-community.dto.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/communities/dto/create-community.dto.ts) | Runtime input constraints for community creation |
| 39 | `update-community.dto.ts` | [update-community.dto.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/communities/dto/update-community.dto.ts) | Runtime constraints for updating community fields and channels |
| 40 | `memberships.controller.ts` | [memberships.controller.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/memberships/memberships.controller.ts) | REST endpoints for `/api/memberships` |
| 41 | `memberships.service.ts` | [memberships.service.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/memberships/memberships.service.ts) | Membership persistence, duplicate protection, and deletion |
| 42 | `create-membership.dto.ts` | [create-membership.dto.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/memberships/dto/create-membership.dto.ts) | Runtime validation for `userId` and `communityId` |
| 43 | `dashboard.controller.ts` | [dashboard.controller.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/dashboard/dashboard.controller.ts) | REST endpoints for `/api/dashboard/stats` and `/api/dashboard/revenue` |
| 44 | `dashboard.service.ts` | [dashboard.service.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/dashboard/dashboard.service.ts) | Live telemetry aggregation and payments calculation |
| 45 | `in-memory-db.ts` | [in-memory-db.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/common/utils/in-memory-db.ts) | Synchronous JSON persistence engine, ID sequencing (`nextId`) |
| 46 | `db.json` | [db.json](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/db.json) | The single physical JSON file database on disk |

---

# 2. Module 1: Discovery (`/discovery`) — Detailed File Breakdown

### 2.1 [Discovery.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/Discovery.jsx)
- **Role:** Page Orchestrator (Under 60 lines of JSX).
- **Using Data From:** Invokes `useDiscovery()` hook to receive all reactive state variables and handlers.
- **What It Renders:**
  - Standard app container `<div className="discovery-shell">`
  - Global navigation `<SideBar />`
  - Top header `<DiscoveryHeader />`
  - Filter bar `<CategoryFilterBar />`
  - Main cards display `<CommunityGrid />`
  - Toast banner for notifications.

### 2.2 [useDiscovery.js](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Components/platform/hooks/useDiscovery.js)
- **Role:** Business logic & state machine hook for Discovery.
- **Using Data From:**
  1. `apiRequest('/communities')` — Fetches active communities (filters out suspended).
  2. `apiRequest('/memberships?userId=${user.id}')` — Synchronizes user's server-side memberships into a `Set`.
  3. `apiRequest('/events')` — Retrieves event count to show total platform events.
  4. `localStorage('nexus_joined_communities')` — Fast local fallback for joined communities.
- **Key Functions & Logic:**
  - `filtered` (`useMemo`): Filters communities by search query `q`, active category, and excludes suspended communities; sorts by `active`, `members`, `trending`, or `newest`.
  - `toggleJoin(id, e)`: Implements **Optimistic UI Update**:
    1. Flips the ID in `joinedIds` (`Set`) and updates `localStorage`.
    2. Dispatches `POST /api/memberships` (or `DELETE /api/memberships/:id`).
    3. If the network fails, catches the error, rolls back the `Set` and `localStorage`, and triggers `showToast('⚠️ ...')`.

### 2.3 [DiscoveryHeader.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/Discovery/components/DiscoveryHeader.jsx)
- **Role:** Header component.
- **Using Data From:** Props (`search`, `setSearch`) passed down from orchestrator.
- **What It Does:** Controlled search input box that triggers live filtering as the user types, accompanied by a link button to `/create-community`.

### 2.4 [CategoryFilterBar.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/Discovery/components/CategoryFilterBar.jsx)
- **Role:** Category & Sorting Bar.
- **Using Data From:** Props (`categories`, `activeCategory`, `onSelectCategory`, `sortBy`, `onSelectSort`).
- **What It Does:** Renders horizontally scrollable pills for categories (`All`, `FPS`, `MOBA`, `RPG`, etc.). Contains a dropdown to toggle between sorting modes (`Most Active`, `Most Members`, `Trending`, `Recently Created`).

### 2.5 [CommunityGrid.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/Discovery/components/CommunityGrid.jsx)
- **Role:** Grid Container.
- **Using Data From:** Props (`communities`, `loading`, `totalMembers`, `totalOnline`, `eventCount`, `joinedIds`, `onToggleJoin`).
- **What It Does:**
  - Displays hero summary banner with aggregated statistics (Total Communities, Total Members, Events).
  - Renders skeleton loading cards while `loading === true`.
  - Renders zero-state empty container if no communities match the filter.
  - Maps matching items to `<CommunityCard />`.

### 2.6 [CommunityCard.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/Discovery/components/CommunityCard.jsx)
- **Role:** Card item.
- **Using Data From:** Props (`community`, `isJoined`, `onToggleJoin`).
- **What It Does:** Displays the community's gradient banner, emoji avatar, category badge, dynamic member count, dynamic online count, and Join/Leave button. Clicking the card navigates to `/community-page?id=${community.id}`.

### 2.7 [discoveryData.js](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Components/platform/data/discoveryData.js)
- **Role:** Constants and helper utilities.
- **What It Contains:**
  - `SORT_LABELS`: Human-readable labels for sorting modes.
  - `memberCountOf(c)`: Extracts `c.memberCount ?? c.members ?? 0`.
  - `onlineCountOf(c)`: Extracts `c.onlineCount ?? c.online ?? 0`.

### 2.8 [discovery.css](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/styles/discovery.css)
- **Role:** Scoped Stylesheet.
- **What It Does:** Enforces layout containment using `.discovery-shell` and `.discovery-content`, single-page vertical scrolling, sticky category pills, and CSS grid layout (`grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`).

---

# 3. Module 2: Create Community Wizard (`/create-community`) — Detailed File Breakdown

### 3.1 [CreateCommunity.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CreateCommunity.jsx)
- **Role:** Page Orchestrator.
- **Using Data From:** Invokes `useCreateCommunity(navigate)`.
- **What It Renders:** 
  - Tabs toggle: "Create Community" (4-step wizard) vs "Add Channel" (standalone channel creation).
  - Stepper indicator `<CreateCommunityHeader />`.
  - Active step subcomponent (`BasicInfoFields`, `BrandingPicker`, `PrivacyTypeSelector`, or `CommunityRulesInput`).
  - Action buttons `<CreateCommunityActions />`.
  - Split-screen live preview card showing how the community card will look in real-time.

### 3.2 [useCreateCommunity.js](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Components/platform/hooks/useCreateCommunity.js)
- **Role:** Wizard state machine & validation hook.
- **Using Data From:**
  - `getStoredUser()` — Resolves creator's `userId`.
  - `apiRequest('/communities')` — Loads existing communities for the standalone channel creator dropdown.
  - `localStorage('nexus_joined_communities')` & `localStorage('nexus_owned_community_ids')` — Stores created community ID.
- **Key Functions & Logic:**
  - `handleNameChange(val)`: Updates `name` and automatically creates an alphanumeric hyphenated URL `slug`.
  - `validateStep(step)`: Enforces validation rules:
    - Step 1: Name (3–50 chars), Description (10–200 chars).
    - Step 2: Website URL pattern validation, max 5 tags (2–20 chars each).
  - `submitCreateCommunity()`: Builds payload with name, desc, slug, category, icon, banner, channels, rules, and ownerId. Calls `POST /api/communities`. On success, adds to joined & owned local lists and navigates to `/community-page?id=${id}`.
  - `submitCreateChannel()`: Calls `PATCH /api/communities/:id` to append a new channel `{ id, name, type }` to an existing community.

### 3.3 [CreateCommunityHeader.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CreateCommunity/components/CreateCommunityHeader.jsx)
- **Role:** Wizard progress header.
- **Using Data From:** Props (`currentStep`, `steps`).
- **What It Does:** Renders progress numbers 1 to 4 with status checkmarks and titles ("Basic Info", "Appearance", "Channels", "Settings & Rules").

### 3.4 [BasicInfoFields.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CreateCommunity/components/BasicInfoFields.jsx)
- **Role:** Step 1 subcomponent.
- **Using Data From:** Hook state (`name`, `slug`, `desc`, `category`, `handleNameChange`, `setDesc`, `setCategory`).
- **What It Does:** Inputs for Community Name, auto-slug preview (`se7ensquare.com/c/your-slug`), Description textarea, and Category dropdown selector.

### 3.5 [BrandingPicker.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CreateCommunity/components/BrandingPicker.jsx)
- **Role:** Step 2 subcomponent.
- **Using Data From:** Presets from `createCommunityOptions.js` + Hook state (`icon`, `banner`, `website`, `tags`).
- **What It Does:** Grid of 9 emoji avatars (`⚡`, `🚀`, `🔥`, etc.), 7 preset gradient banner swatches, website input field, and comma-separated tag input.

### 3.6 [PrivacyTypeSelector.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CreateCommunity/components/PrivacyTypeSelector.jsx)
- **Role:** Step 3 subcomponent.
- **Using Data From:** Hook state (`privacy`, `channels`, `permissions`, `showAddCh`, `newChName`, `newChType`, `handleAddChannel`, `handleDeleteChannel`).
- **What It Does:** Radio cards to toggle `Public` (anyone can find & join) vs `Private` (invite only). Channel list manager showing default channels (`#announcements`, `#general`, `#help`, `#voice-lounge`) with buttons to delete or add custom text/voice channels.

### 3.7 [CommunityRulesInput.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CreateCommunity/components/CommunityRulesInput.jsx)
- **Role:** Step 4 subcomponent.
- **Using Data From:** Hook state (`rules`, `setRules`, `welcomeMsg`, `setWelcomeMsg`).
- **What It Does:** Text areas for community guidelines (one per line) and an optional welcome announcement broadcast to new members upon joining.

### 3.8 [CreateCommunityActions.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CreateCommunity/components/CreateCommunityActions.jsx)
- **Role:** Bottom button controls.
- **Using Data From:** Props (`currentStep`, `submitting`, `onPrev`, `onNext`).
- **What It Does:** "Back" button (disabled on step 1) and "Continue" / "Create Community" button with loading spinner state.

### 3.9 [createCommunityOptions.js](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Components/platform/data/createCommunityOptions.js)
- **Role:** Preset options & validation rules.
- **What It Contains:**
  - `URL_PATTERN`: Regex for website validation.
  - `CATEGORIES`: `['FPS', 'MOBA', 'RPG', 'Strategy', 'Sports', 'Indie', 'Speedrunning', 'Other']`.
  - `ICONS`: 9 preset emoji icons.
  - `BANNERS`: 7 modern CSS gradient strings.
  - `DEFAULT_CHANNELS`: Default 4 channels.
  - `DEFAULT_PERMISSIONS`: Default invite and automod flags.

### 3.10 [create-community.css](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/styles/create-community.css)
- **Role:** Scoped Stylesheet.
- **What It Does:** Responsive 2-column layout (form wizard on the left, live preview card sticky on the right), swatch styling, and stepper lines.

---

# 4. Module 3: Community Details Hub (`/community-page`) — Detailed File Breakdown

### 4.1 [CommunityPage.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CommunityPage.jsx)
- **Role:** Page Orchestrator.
- **Using Data From:** Extracts `?id=` from `useSearchParams()` and invokes `useCommunityPage(id, navigate)`.
- **What It Renders:**
  - Navigation header `<SideBar />`
  - Cover header `<CommunityBanner />`
  - Tab navigation `<CommunityNav />`
  - Conditional active tab component:
    - Overview $\rightarrow$ `<CommunityAboutWidget />`
    - Channels $\rightarrow$ `<PostFeed />`
    - Members $\rightarrow$ `<CommunityMembersList />`
    - Rules $\rightarrow$ `<CommunityRulesWidget />`

### 4.2 [useCommunityPage.js](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Components/platform/hooks/useCommunityPage.js)
- **Role:** State machine & data hydration hook for Community Page.
- **Using Data From:**
  1. `GET /api/communities/:id` (with auth headers `x-role` and `x-user-id`) — Loads community details.
  2. `GET /api/memberships?userId=:id` — Reconciles joined status.
  3. `GET /api/events` — Loads events linked to this community.
  4. Parallel `GET /api/memberships?communityId=:id` and `GET /api/users?communityId=:id` — Hydrates full member roster with real avatars and roles.
  5. `DELETE /api/communities/:id` — Owner deletion endpoint.
- **Key Functions & Logic:**
  - `isOwner`: Evaluated as `(user.id && String(community?.ownerId) === String(user.id)) || user.role === 'admin'`. Protects owner-only actions.
  - `toggleJoin()`: Toggles membership, calls `POST /api/memberships` or `DELETE /api/memberships/:id`.
  - `handleDelete()`: Confirms action, dispatches `DELETE /api/communities/:id`, cleans `localStorage`, and redirects to `/discovery`.

### 4.3 [CommunityBanner.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CommunityPage/components/CommunityBanner.jsx)
- **Role:** Hero Cover Banner.
- **Using Data From:** Props (`community`, `isOwner`, `joined`, `onToggleJoin`, `onDelete`).
- **What It Does:** Renders gradient banner, emoji avatar, community name, category, member count, "👑 Creator" badge (if owner), "Delete Community" button (if owner), and Join/Leave toggle button.

### 4.4 [CommunityNav.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CommunityPage/components/CommunityNav.jsx)
- **Role:** Tab navigation bar.
- **Using Data From:** Props (`activeTab`, `setActiveTab`).
- **What It Does:** 4 tab pill buttons: Overview, Channels, Members, Rules.

### 4.5 [CommunityAboutWidget.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CommunityPage/components/CommunityAboutWidget.jsx)
- **Role:** Overview Tab component.
- **Using Data From:** Props (`community`, `foundedLabel`).
- **What It Does:** Community bio, founding date, tags, and live chat preview stream showing recent messages.

### 4.6 [PostFeed.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CommunityPage/components/PostFeed.jsx)
- **Role:** Channels Tab component.
- **Using Data From:** Props (`channelEntries`, `joined`, `isOwner`).
- **What It Does:** Access-controlled channel list. If the user is NOT a member and NOT an owner, channels show lock icons 🔒 with a "Join community to view and chat" notice. If the user is a member/owner, clicking a channel navigates directly into `/chat`.

### 4.7 [CommunityMembersList.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CommunityPage/components/CommunityMembersList.jsx)
- **Role:** Members Tab component.
- **Using Data From:** Props (`filteredMembers`, `memberSearch`, `setMemberSearch`, `loading`).
- **What It Does:** Real-time member search input and roster cards displaying user avatar/initials, full name, role badges (`👑 Owner`, `🛡️ Moderator`, `Member`), and online status indicator.

### 4.8 [CommunityRulesWidget.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/CommunityPage/components/CommunityRulesWidget.jsx)
- **Role:** Rules Tab component.
- **Using Data From:** Props (`rules`).
- **What It Does:** Renders formatted, numbered guideline cards for community behavior and server policies.

### 4.9 [community-page.css](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/styles/community-page.css)
- **Role:** Scoped Stylesheet.
- **What It Does:** Header banner layout, avatar overlay, role badges, channel item hover effects, and member roster cards.

---

# 5. Module 4: Owner Telemetry & Revenue Dashboard (`/owner-dashboard`) — Detailed File Breakdown

### 5.1 [OwnerDashboard.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/OwnerDashboard.jsx)
- **Role:** Page Orchestrator.
- **Using Data From:** Invokes `useOwnerDashboard()`.
- **What It Renders:**
  - Executive layout with `<SideBar />`
  - Top bar `<OwnerHeader />`
  - Telemetry & revenue cards `<OwnerMetricsGrid />`
  - Platform audit & health log `<RecentActivityList />`
  - On-demand drill-down modal `<SubscriptionsTab />`

### 5.2 [useOwnerDashboard.js](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/OwnerDashboard/hooks/useOwnerDashboard.js)
- **Role:** Telemetry & drill-down data coordination hook.
- **Using Data From:**
  - `GET /api/dashboard/stats` — Real platform stats (communities, events, users, pending queues).
  - `GET /api/dashboard/revenue` — Live financial metrics (Total Revenue, Monthly ARR, Subscription Revenue).
  - `GET /api/communities`, `GET /api/users`, `GET /api/payments/history`, `GET /api/subscriptions` — Called on-demand when clicking KPI cards.
- **Key Functions & Logic:**
  - `openDrill(kind, filter)`: Opens modal, sets `drillLoading = true`, fetches specific relational records based on `kind` (`communities`, `events`, `revenue`, `subscriptions`, `organisers`), and populates `drillContent`.

### 5.3 [OwnerHeader.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/OwnerDashboard/components/OwnerHeader.jsx)
- **Role:** Header component.
- **Using Data From:** Props (`currentUser`).
- **What It Does:** Renders title, "👑 Owner Portal" badge, and live backend connection health badge.

### 5.4 [OwnerMetricsGrid.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/OwnerDashboard/components/OwnerMetricsGrid.jsx)
- **Role:** KPI Metric Cards Grid.
- **Using Data From:** Props (`stats`, `revenue`, `onDrill`).
- **What It Does:** Renders cards for:
  - Total Revenue & Monthly ARR
  - Subscription vs Organizer vs Featured Event revenue
  - Active Communities (with suspended count)
  - Active Events (with pending count)
  - Premium Users count
  - Verified Organizers count  
  Clicking any card invokes `onDrill(kind)` to open the granular breakdown modal.

### 5.5 [RecentActivityList.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/OwnerDashboard/components/RecentActivityList.jsx)
- **Role:** Telemetry & Platform Health status.
- **Using Data From:** Props (`stats`).
- **What It Does:** Displays live system uptime status, pending moderation report count, and pending appeal queues.

### 5.6 [SubscriptionsTab.jsx](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Pages/OwnerDashboard/components/SubscriptionsTab.jsx)
- **Role:** Tabular Drill-Down Inspection Modal.
- **Using Data From:** Props (`drillModalOpen`, `drillTitle`, `drillLoading`, `drillContent`, `onClose`).
- **What It Does:** Renders interactive data tables depending on what card was clicked:
  - Communities table (Name, Category, Owner, Members, Status).
  - Events table (Title, Community, Date, Registrations, Status).
  - Payments history table (Transaction ID, User, Amount, Type, Date).
  - Subscriptions breakdown table (Plan distribution: Free, Plus, Ultra Pro).

### 5.7 [ownerDashboardData.js](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/Components/platform/data/ownerDashboardData.js)
- **Role:** Default metrics and revenue card configurations.
- **What It Contains:**
  - `DEFAULT_STATS`: Default 0-state statistics.
  - `DEFAULT_REVENUE`: Default 0-state revenue numbers.
  - `REVENUE_CARDS`: Metadata defining title, icons, drill keys, and prefixes.

### 5.8 [owner-dashboard.css](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/front-end/react-app/src/styles/owner-dashboard.css)
- **Role:** Scoped Stylesheet.
- **What It Does:** Grid layouts for KPI cards, metric pill badges, and modal dialog styles.

---

# 6. Backend Modules & Persistence Engine — Detailed File Breakdown

### 6.1 [communities.controller.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/communities/communities.controller.ts)
- **Role:** NestJS REST Controller.
- **Protected By:** `@ApiTags('communities')`, `@ApiHeader({ name: 'x-role' })`, `@Roles(...)`.
- **Endpoints Defined:**
  - `GET /api/communities`: Returns all active communities with dynamically calculated member counts.
  - `GET /api/communities/:id`: Returns single community with dynamic counts and owner name.
  - `POST /api/communities`: Creates new community (validates via `CreateCommunityDto`).
  - `PATCH /api/communities/:id`: Updates community or adds channels.
  - `DELETE /api/communities/:id`: Deletes community (requires `owner`, `admin`, or creator).

### 6.2 [communities.service.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/communities/communities.service.ts)
- **Role:** Core Business Logic & Relational Computation.
- **Using Data From:** In-Memory collections in `in-memory-db.ts` (`db.communities`, `db.memberships`, `db.users`, etc.).
- **Key Methods:**
  - `findAll()`: Maps through `db.communities`. Dynamically counts `realMemberCount = db.memberships.filter(m => m.communityId === c.id).length`. Resolves `ownerName` from `db.users`. Computes `onlineCount = Math.round(realMemberCount * 0.4)`. **Eliminates all dummy/hardcoded data!**
  - `findOne(id)`: Returns single community with calculated fields; throws `NotFoundException` if missing.
  - `create(payload)`: Generates sequential ID via `nextId('community')`, resolves `ownerId`, appends to `db.communities`, and calls `saveDb()`.
  - `update(id, payload)`: Enforces **Plan-Based Channel Caps** via `SubscriptionsService`:
    - `free`: Max 4 channels.
    - `plus`: Max 20 channels.
    - `ultra_pro`: Unlimited channels.
    Throws `ForbiddenException` if limit exceeded.
  - `remove(id)`: **Cascading Deletion**: Deletes community and automatically filters out related entries from `db.memberships`, `db.events`, `db.posts`, and `db.reports`, then calls `saveDb()`.

### 6.3 [create-community.dto.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/communities/dto/create-community.dto.ts)
- **Role:** Validation Data Transfer Object.
- **Constraints (via `class-validator`):**
  - `name`: `@IsString()`, `@Length(3, 50)`
  - `description`: `@IsString()`, `@Length(10, 200)`
  - `ownerId`: `@IsNumber()`, `@IsOptional()`
  - `category`: `@IsString()`, `@IsOptional()`
  - `tags`: `@IsArray()`, `@IsString({ each: true })`, `@IsOptional()`
  - `visibility`: `@IsEnum(['public', 'private'])`, `@IsOptional()`

### 6.4 [update-community.dto.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/communities/dto/update-community.dto.ts)
- **Role:** Validation DTO for partial updates.
- **Constraints:** Extends `PartialType(CreateCommunityDto)` and allows updating channel arrays.

### 6.5 [memberships.controller.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/memberships/memberships.controller.ts)
- **Role:** NestJS REST Controller for Community Memberships.
- **Endpoints Defined:**
  - `GET /api/memberships`: Returns memberships (filterable by `?communityId=` or `?userId=`).
  - `POST /api/memberships`: Creates a membership record (joins community).
  - `DELETE /api/memberships/:id`: Removes a membership record (leaves community).

### 6.6 [memberships.service.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/memberships/memberships.service.ts)
- **Role:** Membership Business Logic.
- **Key Methods:**
  - `create(payload)`:
    - Validates that `userId` exists in `db.users`.
    - Validates that `communityId` exists in `db.communities`.
    - Prevents duplicates: Throws `BadRequestException('User is already a member of this community')` if record already exists.
    - Generates sequential ID via `nextId('membership')`, appends to `db.memberships`, and persists via `saveDb()`.
  - `remove(id)`: Removes matching membership record and persists to `db.json`.

### 6.7 [create-membership.dto.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/memberships/dto/create-membership.dto.ts)
- **Role:** Validation DTO.
- **Constraints:** Enforces numeric `@IsNumber()` on `userId` and `communityId`.

### 6.8 [dashboard.controller.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/dashboard/dashboard.controller.ts)
- **Role:** Dashboard Telemetry Controller.
- **Endpoints Defined:**
  - `GET /api/dashboard/stats`: Returns live platform counts.
  - `GET /api/dashboard/revenue`: Protected by `@Roles(AppRole.OWNER, AppRole.ADMIN)`. Returns revenue summary.

### 6.9 [dashboard.service.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/modules/dashboard/dashboard.service.ts)
- **Role:** Telemetry & Revenue Aggregation Service.
- **Key Methods:**
  - `getStats()`: Computes active vs suspended communities, active events, pending reports, pending appeals, total memberships, and total messages.
  - `getRevenueStats()`: Calls `paymentsService.summary()` to calculate actual revenue, counts premium subscriptions (`sub.plan !== 'free'`), and counts verified organizers.

### 6.10 [in-memory-db.ts](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/src/common/utils/in-memory-db.ts)
- **Role:** Synchronous File-Backed Database Engine.
- **Key Mechanics:**
  - `db`: In-memory JavaScript object containing arrays for `users`, `communities`, `memberships`, `events`, `posts`, `reports`, `subscriptions`, `payments`, etc.
  - `saveDb()`: Synchronously writes the entire database state to disk using `fs.writeFileSync(DB_FILE, JSON.stringify({ counters, db }, null, 2), 'utf-8')`.
  - `nextId(entity)`: Auto-increments and persists sequential IDs so keys never collide across server restarts.
  - Startup migration: Reads `db.json` on boot, synchronizes counter offsets, and applies schema migrations.

### 6.11 [db.json](file:///d:/IIIT%20SRI%20CITY/rajat_react/React-conversion_49_Se7enSquare/back-end/db.json)
- **Role:** The Physical Persistence File.
- **What It Contains:** Formatted JSON data storing all entity collections and counter state.

---

# 7. System-Wide Flow Logic & Data Architecture

### 7.1 Architecture Flow Diagram
```
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────┤
│ [Page Orchestrator] (Discovery / Create / Community / Owner)   │
│         │ (invokes custom hook)                                 │
│         ▼                                                       │
│ [Custom Hook] (useDiscovery / useCreate / useCommunityPage ...) │
│   ├── State Machines & Validations                              │
│   ├── Optimistic UI State Updates                               │
│   └── Network Layer (apiRequest / fetch with x-role & x-user-id)│
│         │ (renders props & callbacks)                           │
│         ▼                                                       │
│ [Subcomponents] (Cards, Grids, Steppers, Pickers, Modals)       │
└───────────────────────────────┬─────────────────────────────────┘
                                │ HTTP Requests (/api/...)
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────────┤
│ [Controllers] (@Roles Guard, Swagger, Parameter Validation)     │
│         │ (delegates to)                                        │
│         ▼                                                       │
│ [Services] (CommunitiesService, MembershipsService ...)         │
│   ├── Dynamic Relational Counting (No Dummy Data!)             │
│   ├── Plan-Based Channel Limits (Free: 4, Plus: 20)             │
│   └── Cascading Deletions across collections                    │
│         │ (reads/writes to)                                     │
│         ▼                                                       │
│ [Database Engine] (in-memory-db.ts)                             │
│   ├── In-Memory Arrays (sub-millisecond lookups)                │
│   ├── Sequential ID Generation (nextId)                         │
│   └── Synchronous Disk Persistence via saveDb()                 │
│         │ (persists to)                                         │
│         ▼                                                       │
│ [Disk Storage] (db.json)                                        │
└─────────────────────────────────────────────────────────────────┘
```

---

# 8. Comprehensive Viva / Interview Q&A Guide

### Q1: What was your specific track and assigned responsibilities?
> **Answer:** "I was responsible for Component 2: Community Management. I converted four legacy pages into React SPA routes:
> 1. `discovery.html` $\rightarrow$ `Discovery.jsx` (Community search, filtering, and joining)
> 2. `create-community.html` $\rightarrow$ `CreateCommunity.jsx` (4-step creation wizard)
> 3. `community-page.html` $\rightarrow$ `CommunityPage.jsx` (Community hub, channels, member roster, and deletion)
> 4. `owner-dashboard.html` $\rightarrow$ `OwnerDashboard.jsx` (Platform telemetry, revenue metrics, and drill-downs)  
> I also engineered their dedicated custom hooks, subcomponents, and corresponding NestJS backend controllers, services, and DTOs."

### Q2: How did you eliminate dummy or hardcoded data in the application?
> **Answer:** "In the legacy implementation, community cards and dashboards had static numbers like '1.2k members' hardcoded in HTML. I replaced all of them with real relational computations in `CommunitiesService` and `DashboardService`. For every community, `memberCount` is dynamically computed by counting matching records in `db.memberships`. Online counts are derived dynamically, owner names are resolved by joining with `db.users`, and revenue is calculated from actual transactions in `db.payments`."

### Q3: Explain the Optimistic UI update pattern used when joining a community.
> **Answer:** "When a user clicks 'Join':
> 1. The custom hook (`useDiscovery` or `useCommunityPage`) immediately updates the local React state (`joinedIds`) and writes to `localStorage`. The button changes to '✓ Joined' with zero latency.
> 2. An async `POST /api/memberships` request is sent to the backend with `{ userId, communityId }`.
> 3. The backend validates IDs, ensures no duplicate exists, appends the record, and calls `saveDb()`.
> 4. If the network call fails, the catch block rolls back the React state and `localStorage` to their previous values and notifies the user with an alert toast."

### Q4: What happens behind the scenes when a community is deleted?
> **Answer:** "When an owner or admin deletes a community, `CommunitiesService.remove(id)` executes a **cascading delete**. It deletes the community record and simultaneously purges all associated records from `db.memberships`, `db.events`, `db.posts`, and `db.reports`, saving the changes atomically to `db.json`. This maintains referential integrity and prevents orphaned data."

### Q5: How is security and Role-Based Access Control (RBAC) enforced?
> **Answer:** "We use a dual-tier RBAC architecture:
> - **Frontend:** React Router routes are guarded with `<ProtectedRoute allowedRoles={['owner', 'admin']}>`. Non-privileged users are redirected to their allowed dashboard.
> - **Backend:** Controllers use NestJS `@Roles(...)` decorators with an RBAC guard. Every request from the frontend carries `x-role` and `x-user-id` headers. Sensitive routes like `/api/dashboard/revenue` strictly require `admin` or `owner` privileges."

### Q6: Why did you adopt the 'Thin Orchestrator + Custom Hook' design pattern?
> **Answer:** "To ensure clean architecture, high testability, and separation of concerns. Page files like `Discovery.jsx` and `CommunityPage.jsx` remain under 60–100 lines and only handle layout and subcomponent mounting. All state variables, side-effects, API calls, and caching live inside custom hooks (`useDiscovery`, `useCreateCommunity`, etc.). This decouples business logic from UI rendering."
