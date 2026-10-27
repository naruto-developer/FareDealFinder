# FareDealFinder

Flight-planning website based on the sibling FareFinderUS project, built with **Next.js 16 App Router, React 19, TypeScript and Tailwind CSS 4**.

## Run locally

From this folder in PowerShell:

```powershell
npm.cmd ci
npm.cmd run dev
```

Browser URL: http://localhost:3000 (or the available port printed by Next.js).

```powershell
npm.cmd run build
npm.cmd run start
```

## Features

- `/flight-services`: Our journeys, with links to the flight categories.
- `/how-it-works`: The trip enquiry and itinerary review process.
- Responsive home page, mobile navigation and tap-to-call support.
- Airport autocomplete using the included airport dataset.
- Round-trip, one-way and two-leg multi-city trip planning.
- Search summary with a contact form that posts to `/api/submit-mail-form`.
- Handlebars flight enquiry email delivered through Nodemailer when SMTP is configured.
- Flight-service pages, deal categories, destination guides and airline pages, including generated airline slug content.
- About, contact and policy pages; cookie preferences and optional consent-controlled analytics.
- Branded logo, favicon and social preview; canonical metadata, structured data, sitemap and robots rules.

This is a human-assisted flight enquiry website. It does not search live fares, reserve tickets or process payments.

## Configuration

Copy `.env.example` to `.env.local` and configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` and `SMTP_TO` to enable email delivery. Without SMTP, the email endpoint returns an error. Leave `NEXT_PUBLIC_GA_MEASUREMENT_ID` empty to disable analytics.

- `lib/siteMetadata.ts`: site name, description and canonical origin. `https://faredealfinder.com` is the default assumed domain; change it to your actual domain before deployment.
- `lib/contactDetails.ts`: public contact details. The source project's business operator, phone and address are retained; confirm these before launch. `info@faredealfinder.com` is an assumed mailbox and must be provisioned separately.
- `templates/mail.html`: branded enquiry email.
- `public/faredealfinder-logo.svg` and `.png`: editable vector logo and rendered logo.
- `public/banner.png`, `app/icon.png`, `app/favicon.ico`: sharing image and browser icons.

No source-project credentials, Git history, dependencies or build cache were copied. Hosting, DNS and email provisioning are separate from this local project.

## Checks

```powershell
npm.cmd run build
npx.cmd tsc --noEmit
```

Validation completed: production build (43 generated pages), standalone TypeScript check, and HTTP checks for 17 page/API/asset routes passed. Empty enquiry payload correctly returned HTTP 400. SMTP delivery was not tested because credentials are not configured. Interactive browser and responsive visual checks were unavailable in this session.
