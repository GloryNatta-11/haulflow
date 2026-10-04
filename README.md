# HAULFLOW: From Dispatch to Done.

Demo SaaS for dumpster rental and hauling operations. React + Vite + Tailwind v4, mock data, Firebase-ready.

## Run
    npm install
    npm run dev

## Deploy (Vercel)
Import the GitHub repo. Framework preset: Vite. Build `npm run build`, output `dist`. `vercel.json` handles SPA routing.

## Architecture
- `src/services/auth.js`: mock auth. Replace with Firebase Auth (same method names). Role must come from a server-set custom claim.
- `src/lib/permissions.js`: one permission matrix used by nav, routes and buttons.
- `src/data/mock.js`: mock data. Replace with Firestore-backed services later.

## Security notes
Hiding buttons is UX only. Enforce with Firestore Security Rules: tenant isolation by `companyId`, drivers can only update `status` on their own jobs, activities are create-only, role fields never client-writable. Use Cloud Functions for status-transition validation, audit logging, double-booking checks, job numbers and custom claims. Never commit secrets; only public web config belongs in `VITE_` variables.

## Status
Foundation, login, dashboard, a first Jobs list and the Driver view are built. Schedule, Customers, Drivers, Trucks, Containers, Activity, Reports and Settings are routed placeholders.
