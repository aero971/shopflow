# ShopFlow — Frontend

A React UI for the ShopFlow backend (Spring Boot). Built to match the backend's
actual endpoints and response shapes — see "Known gaps vs. the spec" below for
where the two diverge.

## Stack

- React 18 + React Router 6
- Vite (dev server + build)
- Plain `fetch` for API calls (see `src/api/client.js`) — no extra HTTP library
- No CSS framework — hand-written styles in `src/styles/global.css`

## Setup

```bash
npm install
cp .env.example .env   # adjust VITE_API_BASE_URL if your backend isn't on :8080
npm run dev            # http://localhost:5173
```

The backend must be running (default `http://localhost:8080`) and must include
the CORS configuration added to `SecurityConfig.java` alongside this frontend —
without it, the browser will block every request from this app's origin.

An admin account is seeded by the backend's `DataInitializer`:
`admin@shopflow.com` / `admin123`.

## Project structure

```
src/
  api/          One file per backend domain (auth, products, cart, orders),
                all going through the shared apiFetch() in client.js
  context/      AuthContext (token/user, persisted to localStorage),
                CartContext (server cart, refreshed on auth change),
                ToastContext (global notifications)
  components/   Header, ProtectedRoute, AdminRoute, ProductCard,
                QuantityStepper, StatusBadge, EmptyState, ToastContainer
  pages/        One component per route (see App.jsx for the route table)
  styles/       global.css — design tokens + all component styles
```

## Testability

Every interactive element (buttons, inputs, cards, table rows, badges) carries
a `data-testid` attribute, since this app is meant to be the UI half of a
System Under Test for a separate Playwright/TestNG automation framework.
`data-testid` values are stable identifiers — safe to build Page Objects
against without depending on visible text or CSS classes.

## Known gaps vs. the original spec

The spec this was built from (FR-013, etc.) describes a fuller flow than the
current backend supports. Rather than build against endpoints that don't
exist, this frontend matches the backend as it stands today. Two gaps worth
knowing about if you extend the backend later:

1. **No shipping-details step at checkout.** `POST /api/orders/checkout` takes
   no request body — there's no way to submit or even view a shipping address
   at checkout, since there's also no "current user profile" endpoint yet to
   fetch the address on file. The Checkout page is a review-and-confirm screen
   only. Add a profile endpoint and a checkout request body if you want the
   spec's full FR-013 flow.
2. **Admin order list has no customer info.** `OrderResponse` doesn't include
   the ordering user's name or email, so `/admin/orders` can only show order
   id/date/status/total, not who placed each order. Add a user reference to
   `OrderResponse` if admins need that.

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```
