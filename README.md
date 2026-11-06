# Tidoco Landing Pages (React + TypeScript)

Production-ready, highly accessible React + TypeScript implementation of the two Tidoco landing pages:
1. **Business landing page** (`/` or `/business`)
2. **Client landing page** (`/clients` or `/client`)

Visual design directly references and faithfully recreates the original design specifications:
- Source business design: `index.html` / `tidoco-dashboard-mockup.html`
- Source client design: `client-homepage.html`

---

## Routes & Page Switching

- **`/` or `/business`**: Tidoco Business landing page focusing on schedule organization, calendar control, client relationships, and business metrics. Includes a header button ("For clients") to switch seamlessly to the Client view.
- **`/clients` or `/client`**: Tidoco Client landing page focusing on local salon discovery, service comparison, and friction-free booking. Includes a header button ("For businesses") to switch back to the Business view.
- Supports browser history navigation (`pushState`/`popState`), direct deep-linking, and URL query fallbacks (`?page=client` / `?page=business`).

---

## Multilingual Support (English, Hebrew, Arabic & RTL)

The application supports 3 languages with bidirectional layout management:
- **English (`en`)** — Left-to-Right (LTR) default
- **Hebrew (`he` / עברית)** — Right-to-Left (RTL) with localized typography (Heebo/Rubik)
- **Arabic (`ar` / العربية)** — Right-to-Left (RTL) with localized typography (Noto Sans Arabic)

### Key Internationalization Features:
- **Language Switcher**: Integrated dropdown in both Header and Footer with native script labels (`English`, `עברית`, `العربية`).
- **Dynamic RTL Layout**: Dynamically sets `<html dir="rtl" lang="he|ar">`, mirrors tilted phone and dashboard previews (`rotate(-1.4deg)` / `rotate(-1.5deg)`), flips floating callout badges, adjusts arrows (`←` / `→`, `↖` / `↗`), and aligns UI controls.
- **Persistence & URL Parameters**: Language preference is stored in `localStorage` and can be bookmarked or deep-linked via `?lang=he` or `?lang=ar`.
- **Complete Translation Dictionary**: Covers all headings, leads, buttons, mock dashboard/phone content, categories, modals, and footer copy.

---

## Interactive Prototype Features

### 1. Business Dashboard Mockup
- **Metrics Live Updates**:
  - Initial state displays **$50** revenue, **3** today's appointments, and **1** pending request.
  - Toggling status on pending appointments (e.g. Daniel Alon) directly updates Today's Revenue and decrements Pending Requests.
- **Add Appointments**: Interactive modal form to manually schedule appointments with client name, service, time slot, and price. Automatically updates dashboard metrics and prepends to the appointments list.
- **Manage Services**: Modal editor to add new services with custom durations and pricing to the business catalog.
- **Dashboard Subtabs**:
  - `◆ Dashboard`: main overview with greeting, metrics, quick actions, and today's appointments.
  - `▣ Calendar`: interactive time-slot view of today's schedule with booked and open slots.
  - `✂ Services`: catalog of services offered with durations and pricing.
  - `● Profile`: business profile settings demo.
- **Floating Callout Badges**:
  - `pop-booking`: "Booking confirmed (Daniel Alon · just now)"
  - `pop-time`: "More time for you (Your day, in one view)"
  - `pop-count`: Dynamic counter displaying today's scheduled appointment count.

### 2. Client App Phone Mockup
- **Location**: Shows current location as "Tel Aviv" with location dropdown indicator.
- **Live Search & Filter**:
  - Real-time text search across salon names and individual service offerings.
  - Filter modal with category selection and distance slider (1.0 to 10.0 km).
  - Clear / reset filter controls with a no-results state if no matches occur.
- **Category Filter Pills**: Interactive buttons for **Haircut**, **Nails**, **Facial**, **Spa**, and **Massage** with clear active selection styling.
- **Favorite Hearts Toggle**: Heart icons toggle saved state on any salon card.
- **Booking Flow Modal**:
  - Click any salon card or service to initiate the prototype booking modal.
  - Select service, pick date & time slot, enter client information, and confirm.
  - Displays prototype confirmation screen with clear demo disclaimer, and stores the booking in the client's `Bookings` list.
- **Bottom Navigation**:
  - `◆ Home`: Main discovery and salon listings.
  - `▦ Bookings`: Displays active scheduled prototype appointments with cancel capability and empty state.
  - `♥ Favorites`: Displays favorited salons with empty state when none are saved.
  - `● Profile`: Demo client account view with disclaimer.

---

## Configuration & External Integrations

Store links and contact endpoints are centralized in [`src/config/links.ts`](src/config/links.ts):

| Integration | Configuration File | Status / Placeholder |
|---|---|---|
| **Apple App Store** | `src/config/links.ts` | Configurable placeholder: `https://apps.apple.com/app/tidoco/id0000000000?demo=placeholder` |
| **Google Play Store** | `src/config/links.ts` | Configurable placeholder: `https://play.google.com/store/apps/details?id=com.tidoco.app&demo=placeholder` |
| **Support Email** | `src/config/links.ts` | `mailto:hello@tdco.app` |
| **Backend API** | Prototype State | Local mock data (`src/data/mockData.ts`) with typed models |

*To connect real production stores, update the `STORE_LINKS` object in `src/config/links.ts` with the published URLs.*

---

## Project Scripts

```bash
# Start development server
npm run dev

# Run TypeScript typecheck
npm run type-check

# Run unit and integration tests (Vitest + React Testing Library)
npm test

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

