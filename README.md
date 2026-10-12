# Reel House

A responsive movie discovery and ticket booking experience built with React, Vite, and Tailwind CSS.

## Run locally

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

## Features

- Search and filter the current film selection.
- View film details, ratings, and showtime booking options.
- Select a cinema, date, showtime, and up to eight seats.
- Review a live ticket total and see a booking confirmation.
- Responsive layouts and sign-in/create-account screens.

The booking and account flows are front-end demos. They do not connect to a payment processor, ticketing service, or account backend. Film artwork is loaded from Unsplash.

## Deploy

### Netlify

Import the GitHub repository in Netlify and use the `npm run build` build command with `dist` as the publish directory. The included `public/_redirects` keeps the app routes working on refresh.

### Vercel

Import the repository in Vercel. Vite is detected automatically; use `npm run build` and `dist` as the output directory.
