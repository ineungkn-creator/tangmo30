# Chapter 30 — A Little Birthday Letter

A mobile-first birthday letter built with React, Vite, TypeScript and Tailwind CSS. The visual direction is a handmade scrapbook: paper texture, a folding envelope, handwritten details and polaroid-style memories.

## Personal details included
- Birthday: 22 November 2026 — Chapter 30
- Relationship anniversary: 9 August 2026
- Shared detail: both were born on Friday
- Tone: warm, sincere and understanding

## Run locally

```bash
npm install
npm run dev
```

## Personalize

- Edit Thai copy, dates, captions and memories in `src/App.tsx`.
- Add eight photos as `public/images/photo-01.jpg` through `photo-08.jpg`.
- Add an optional music file at `public/music/our-song.mp3`.
- The page uses placeholders if photos are not present. Music is user-initiated; it does not autoplay.

## Build

```bash
npm run build
npm run preview
```

Vite outputs the static site to `dist/`.

## Deploy to Cloudflare Pages

1. Push this project to a GitHub repository.
2. In Cloudflare, open **Workers & Pages** and create a Pages project connected to the repository.
3. Set the build command to `npm run build` and the output directory to `dist`.
4. Deploy. Cloudflare provides a `*.pages.dev` URL.
5. Open the deployed URL on a phone using mobile data before creating and printing the QR code.

No backend or database is required. Anyone with the public URL can view the page, so only include photos and personal details that you are comfortable sharing through a public link.
# neung-tangmo
