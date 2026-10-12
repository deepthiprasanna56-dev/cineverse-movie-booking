# CineVerse

A cinematic, responsive movie ticket booking experience built with React, Vite, Tailwind CSS, React Router, Lucide icons, and Framer Motion.

## Features

- Cinematic home page with featured, now showing, trending, and coming soon films.
- 20-film sample catalogue with title-matched poster artwork, including new F1, Superman, Sinners, and Minecraft titles.
- Movie discovery with title search, genre, language, and rating filters, sorting, and empty states.
- Movie detail pages with synopsis, cast and crew, rating, trailer, city-specific cinemas, formats, dates, and showtimes.
- Interactive A–J seat map with numbered seats, unavailable seats, classic, premium, and recliner pricing.
- Live booking totals, validated customer checkout, printable demo ticket, and booking reference.
- Responsive login and sign-up demo flows with show/hide password controls.
- Motion effects, keyboard focus styles, reduced-motion support, and mobile navigation.
- A skippable cinematic welcome sequence that plays once per browser session.

## Screenshots

Capture the home, movie discovery, seat selection, checkout, and confirmation screens at desktop and mobile sizes for the assignment submission. The attached CineVerse reference image shows the intended screen sequence.

## Technology

- React 19 and Vite
- Tailwind CSS 4
- React Router DOM
- Lucide React
- Framer Motion

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite.

## Verify and build

```sh
npm run lint
npm run build
npm run preview
```

The production output is written to `dist/`.

## Demo limitations

This is a frontend assignment demo. Movie, cinema, and showtime data are sample data. Bookings and selections are stored in the current browser session for refresh continuity. Checkout does not connect to a payment gateway, and confirmation does not reserve real cinema seats. Login and sign-up do not create or authenticate real accounts. Movie artwork and trailer playback load from external image and video services.

## GitHub

Create an empty repository on GitHub, then run these commands from the project folder:

```sh
git init -b main
git add .
git commit -m "Build CineVerse movie ticket booking website"
git remote add origin https://github.com/YOUR_USERNAME/cineverse-movie-booking.git
git push -u origin main
```

If this project already has Git history, add the new repository as `origin` and push the current `main` branch.

## Deploy to Netlify

1. Import the GitHub repository in Netlify.
2. Set the build command to `npm run build`.
3. Set the publish directory to `dist`.
4. Deploy. `public/_redirects` includes the single-page-app fallback.

## Deploy to Vercel

1. Import the GitHub repository in Vercel.
2. Select the Vite framework preset.
3. Use `npm run build` as the build command and `dist` as the output directory.
4. Deploy. `vercel.json` rewrites app routes to the SPA entry point.
