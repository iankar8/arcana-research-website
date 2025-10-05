# Arcana Advisors Landing Page

A quiet, editorial one-pager built with Next.js, Tailwind CSS, and Framer Motion. The layout follows a Yutori rhythm with Pattern B typography (cursive kicker + grotesk title) to position Arcana Advisors as a disciplined AI partner for regulated finance.

## Features

- Yutori spacing, hairline rules, and Pattern B headings applied across sections
- Micro-interactions with reduced-motion support (fade + 12px translate, CTA scale)
- Nearly monochrome palette with >=4.5:1 text contrast and focused keyboard states
- Analytics events for nav, primary/secondary CTAs, research link, and contact form
- SEO metadata, open graph art, and Organization/WebSite schema markup
- Text-first Services, compliance callout, and contact form tuned for financial leaders

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Fonts**: DM Serif Display (italic) + Inter via `next/font`

## Installation

```bash
npm install
npm run dev
```

Visit http://localhost:3000 to preview.

## Configuration

- **Book intro link**: Update `BOOK_LINK` in `components/Hero.tsx` with your scheduling URL.
- **Contact email**: Update the `mailto:` target in `components/Contact.tsx`.
- **Form handling**: Replace the stubbed `handleSubmit` logic in `components/Contact.tsx` with your submission pipeline.
- **Analytics sink**: The helper in `lib/analytics.ts` dispatches DOM events and pushes to `window.dataLayer` if present. Swap or extend as needed.

## Project Structure

```
lp/
├── app/
│   ├── globals.css         # Global styles and utilities
│   ├── layout.tsx          # Root layout, metadata, schema
│   └── page.tsx            # Section assembly
├── components/
│   ├── Contact.tsx         # Contact form + CTA link
│   ├── Compliance.tsx      # Compliance note in hairline box
│   ├── Footer.tsx          # Footer rule + copy
│   ├── Header.tsx          # Sticky header with scroll blur
│   ├── Hero.tsx            # Hero headline, copy, CTAs
│   ├── Principles.tsx      # Operating beliefs list
│   ├── Research.tsx        # Research teaser link
│   ├── SectionHeading.tsx  # Pattern B kicker/title helper
│   ├── Services.tsx        # Text-first services list
│   └── ui/
│       └── Button.tsx      # Animated primary/ghost button
├── lib/
│   └── analytics.ts        # Event dispatcher helper
├── public/
│   └── og.svg              # OpenGraph artwork
├── tailwind.config.ts      # Tailwind theme tokens
└── README.md
```

## Quality Notes

- Sections sit on a 120px vertical rhythm (~`py-32`), halved naturally on small screens.
- `prefers-reduced-motion` disables transforms while keeping opacity reveals.
- Links use a center-out underline animation; disable with the `no-underline` utility when needed.
- Contact fields carry uppercase kickers and wide tracking to reinforce the editorial tone.

## License

Proprietary - Arcana Advisors © 2025
