# Atelier Passus — Astro Migration Plan

Migrate the existing React SPA portfolio site to Astro with static generation.

## Agent instructions

- Do NOT run dev servers (`npm run dev`, `npm run preview`) — they block execution indefinitely.
- For verification steps, run `npm run build` instead and inspect the generated files in `dist/`. Check that expected HTML files exist and contain the right content using `cat` or `grep`.
- Example verification: `npm run build && cat dist/index.html | head -50` to confirm the homepage rendered correctly.
- Example route check: `ls dist/` and `ls dist/projects/` to confirm all expected pages were generated.
- When running builds (`npm run build`), run in the foreground — these exit on completion.

## Paths

- **Source (React):** `/Users/acoamaur/Development/atelier-passus`
- **Source pipeline (CDK):** `/Users/acoamaur/Development/atelier-passus-pipeline`
- **Target (Astro):** `/Users/acoamaur/Development/atelier-passus-astro`

## Source analysis

- 25+ projects, each with: title, headers, paragraphs, image gallery, optional video (Vimeo)
- Bilingual: Spanish (es) + French (fr) via i18n JSON files in `public/locales/`
- Hero page with rotating Vimeo background video
- Grid page showing project thumbnails
- Project detail pages with swipeable image gallery + text card
- ~300+ images across `src/images2/` (~32 project folders + icons)
- Custom SVG logo component
- Easter egg (Konami code)
- CSS: custom, no framework

## Checkpoints

### Phase 1: Scaffold and core structure

- [ ] 1.1 — Initialize Astro project in `/Users/acoamaur/Development/atelier-passus-astro` with React integration (`@astrojs/react`) and i18n support
- [ ] 1.2 — Create base layout (`layouts/Base.astro`) matching current `App.css`, `index.css` styles (fonts, colors, global reset)
- [ ] 1.3 — Port the SVG Logo component (`Logo.jsx` → `components/Logo.astro`)
- [ ] 1.4 — Verify: `npm run dev` serves the base layout with logo at `localhost:4321`. Success: page loads with no console errors, logo SVG renders visually

### Phase 2: Content migration

- [ ] 2.1 — Parse `text.js` and `public/locales/es/translations.json` + `fr/translations.json` to extract all project metadata into a content collection (`src/content/projects/`) — one markdown file per project with frontmatter (title, year, slug, card, headers, paragraphs, images list, video IDs)
- [ ] 2.2 — Copy `src/images2/` to `src/assets/images/` (Astro image pipeline compatible location)
- [ ] 2.3 — Copy `src/images2/iconos/` to `src/assets/icons/` for grid thumbnails
- [ ] 2.4 — Verify: content collection loads with `getCollection('projects')` in a test page. Success: test page lists all 25+ project titles and years

### Phase 3: Pages and routing

- [ ] 3.1 — Build Hero page (`pages/index.astro`) — Vimeo background iframe, logo overlay, link to projects. Port `Hero.css`
- [ ] 3.2 — Build Grid page (`pages/projects.astro`) — thumbnail grid of all projects sorted by year. Port `Grid.css`, `Card.css`
- [ ] 3.3 — Build dynamic project pages (`pages/[slug].astro`) — image gallery + text card. Port `RenderHelper.css`, `Content.css`
- [ ] 3.4 — Build static pages: contact, us, studio (these use the same RenderHelper pattern)
- [ ] 3.5 — Verify: all project routes resolve and display content with images. Success: every project slug returns 200, images load, text renders in default language

### Phase 4: Interactive components (React islands)

- [ ] 4.1 — Port image gallery as React island (`components/ImageGallery.tsx`) — swipe support, keyboard nav, image counter. Uses `react-swipeable`
- [ ] 4.2 — Port Hamburger menu + Menu overlay (`components/Menu.tsx`) — toggle state, navigation links
- [ ] 4.3 — Port Language switcher (`components/LanguageSwitcher.tsx`) — ES/FR toggle, updates displayed text
- [ ] 4.4 — Verify: gallery swipe, menu toggle, and language switch all work on a project page. Success: left/right arrow keys and swipe change images, hamburger opens/closes menu, language toggle switches displayed text

### Phase 5: i18n

- [ ] 5.1 — Set up Astro i18n routing (`/es/`, `/fr/` prefixes or default locale without prefix)
- [ ] 5.2 — Migrate translation JSON files and wire them to page templates
- [ ] 5.3 — Ensure language switcher navigates between locale versions of the same page
- [ ] 5.4 — Verify: switching language on any page shows translated content and updates URL. Success: `/es/projects` shows Spanish text, `/fr/projects` shows French text, switcher navigates between them

### Phase 6: Styling and polish

- [ ] 6.1 — Port all CSS files: `App.css`, `Hero.css`, `Grid.css`, `Card.css`, `RenderHelper.css`, `Menu.css`, `Hamburger.css`, `Content.css`, `Lines.css`, `Logo.css`, `Footer.css`, `Us.css`, `Studio.css`, `Contact.css`, `Lost.css`
- [ ] 6.2 — Responsive testing: verify mobile hamburger menu, grid layout, gallery swipe
- [ ] 6.3 — Port 404 page (`pages/404.astro`) matching `Lost.jsx`
- [ ] 6.4 — Port Easter egg (Konami code) as a client-side script
- [ ] 6.5 — Verify: visual parity with current site at `atelier-passus.com`. Success: hero video plays, grid layout matches, project pages show gallery + card, mobile layout works with hamburger menu

### Phase 7: Build and deploy readiness

- [ ] 7.1 — Configure `astro.config.mjs` for static output (`output: 'static'`)
- [ ] 7.2 — Run `npm run build` and verify `dist/` output is a complete static site
- [ ] 7.3 — Test locally with `npm run preview`
- [ ] 7.4 — Verify: all pages, images, galleries, and language switching work from the static build. Success: `npm run build` exits 0, `npm run preview` serves the full site, no broken images or 404s


