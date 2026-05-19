# OWNDAYS x MELLER — Product Listing Page

Frontend implementation for the **OWNDAYS x MELLER** sunglasses collaboration landing page. Built against the [Frontend Test specification](https://github.com/frontend-otm/api/blob/main/meller/FRONTEND_TEST.md).

## Live Demo

[https://owndays-meller-project.vercel.app/](https://owndays-meller-project.vercel.app/)

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Data fetching | [TanStack React Query](https://tanstack.com/query) (SSR prefetch + client hydration) |
| HTTP client | Axios |
| Image carousel (modal) | [Embla Carousel](https://www.embla-carousel.com/) |

## Features

### Layout & navigation

- **Desktop (≥1024px):** sticky navbar, 3-column product grid, right-side product detail panel (616px)
- **Mobile (<1024px):** hamburger menu overlay, single-column product grid, full-screen product modal
- In-page anchors: ABOUT, PRODUCTS, STORES (+ legal links in mobile menu)

### Product grid

- Renders all **8 products** from the API
- Per card: model name, SKU label, price (`¥7,800+tax`), color swatches (max 4)
- Swatches support solid `hex_code`, dual-tone gradient, and pattern images via `path`
- Selecting a swatch updates the card image to that SKU’s primary image
- **Sold out** overlay when `selling_setting.in_stock === 0` (card not clickable)

### Product detail modal

- Opens from product card or “HOW TO STYLE THEM” carousel `+` button
- SKU image carousel (Embla), color variant chips, frame type, Japanese description
- Modal price format: `¥7,800 税込`
- **ONLINE STORE** CTA links to OWNDAYS with `?sku={id}`; disabled when out of stock
- Close via overlay tap, close button, or **Escape**

### “HOW TO STYLE THEM” section

- Horizontally scrollable lifestyle carousel
- Tap `+` on a slide to open the matching product modal (by model + color)

### Other

- Scroll-triggered product card entrance animation
- SEO metadata + Open Graph image (`/images/meta_ogp.jpg`)
- Keyboard: **Esc** closes mobile menu and product modal

## Data Source

| Resource | URL |
|----------|-----|
| Products API | `GET https://api-one-alpha-60.vercel.app/meller/products.json` |
| API schema docs | [PRODUCTS_README.md](https://github.com/frontend-otm/api/blob/main/meller/PRODUCTS_README.md) |
| Image base URL (default) | `https://storage.owndays.com/storage/` |

Image paths from the API are appended to the image base URL, e.g.:

```text
products/36ebdac7-….webp
→ https://storage.owndays.com/storage/products/36ebdac7-….webp
```

## Environment Variables

All variables are optional; defaults match `app/config/env.ts`.

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | API host | `https://api-one-alpha-60.vercel.app` |
| `NEXT_PUBLIC_IMAGE_BASE_URL` | Prefix for product/swatch images | `https://storage.owndays.com/storage/` |
| `NEXT_PUBLIC_ONLINE_STORE_BASE` | OWNDAYS product store base | `https://www.owndays.com/jp/ja/products` |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for Open Graph | `http://localhost:3000` (or Vercel URL on deploy) |

Create `.env.local` to override:

```env
NEXT_PUBLIC_API_BASE_URL=https://api-one-alpha-60.vercel.app
NEXT_PUBLIC_IMAGE_BASE_URL=https://storage.owndays.com/storage/
NEXT_PUBLIC_ONLINE_STORE_BASE=https://www.owndays.com/jp/ja/products
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Prerequisites

- **Node.js 20+**
- **npm** 10+

## Getting Started

```bash
# Install dependencies
npm install

# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Run production server locally
npm run start
```

## Validation

```bash
npm run lint
npm run build
```

## Project Structure

```text
app/
├── components/          # UI components (cards, modal, navbar, swatches)
│   ├── navbar/
│   ├── footer/
│   └── product-detail-modal/
├── sections/            # Page sections (hero, products, style carousel)
├── hooks/               # Component logic (menu, modal, carousel, product card)
├── contexts/            # Product detail modal state
├── services/            # API + React Query options
├── lib/                 # Product helpers, API client, style-carousel utils
├── constants/           # Navigation, carousel slides, CTA classes
├── types/               # TypeScript types for API models
├── config/              # Environment-backed URLs
└── utils/               # Formatting helpers (price)
```

## Design Reference

Visual design follows the Figma file provided in the assignment email (not included in this repository).

## License

Private — frontend assignment submission.
