# HUMSJ Online Market

A modern, responsive e-commerce website for Haramaya University Muslim Students' Jema'a with three stores:
- Sumeya Boutique
- Abuzar Stationery & Electronics
- RCC Mini Market

No backend required. Data persists in `localStorage` and can be reset by clearing the `humsj_market_data` key in the browser.

## Run locally
- Open `index.html` in a browser (double-click or drag into a tab).
- Navigate to a shop via the top menu or hero buttons.
- Admin dashboard: open `admin.html?store=sumeya` (or `abuzar`, `rcc`).

## Features
- Dark/Light mode with toggle (persists per device)
- Responsive layout, rounded cards, hover animations
- Product grids with out-of-stock badge
- Checkout form collecting: name, phone, campus, block, room
- Separate admin per store (via `?store=...`)
- CRUD for products: add, edit, delete, adjust quantity
- Contact cards per shop with Telegram links

## Customize
- Products and contacts are defined in `assets/app.js` under `defaults()`.
- Replace sample Unsplash image URLs with your own.
- Colors and styles in `assets/styles.css` (palette at top of file).
- Brand text is in the headers/footers of `index.html`, `shop.html`, `admin.html`.

## Data reset
- Open DevTools → Application/Storage → Local Storage → remove key `humsj_market_data`.

## Deploy
- Host the folder with any static hosting provider (Netlify, GitHub Pages, Vercel). No build step required.
