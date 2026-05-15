# OWNDAYS x MELLER - Product Listing Page

Frontend assignment implementation for the OWNDAYS x MELLER sunglasses collaboration page.

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4

## Features Implemented

- Responsive layout:
  - Desktop: sticky top nav + 3-column product grid + right-side modal panel
  - Mobile: hamburger menu overlay + single-column product list + full-screen modal
- Product listing rendered from API (`8` products)
- Product card color swatches:
  - supports `hex_code` fill
  - supports pattern image swatches when `path` is provided
  - product image switches based on selected SKU
- Product detail modal:
  - model name, SKU image carousel, variant chips, frame type, localized description
  - price format (`¥7,800+tax` in grid, `¥7,800 税込` in modal)
  - ONLINE STORE CTA with out-of-stock disabled state
- "HOW TO STYLE THEM" horizontal carousel with `+` quick-open modal trigger
- Keyboard support: `ESC` closes mobile menu and modal
- Basic SEO metadata + Open Graph tags

## Data Source

- Products API: `https://api-one-alpha-60.vercel.app/meller/products.json`
- Image base URL: `https://static.lenskart.com/media/owndays/img/`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run lint
npm run build
```
