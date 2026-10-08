# Prakhar Shrivastava / Portfolio

A complete five-page React + TypeScript portfolio built from the supplied resume facts. Black, parchment and crimson; self-hosted Space Grotesk, Inter and DM Serif Display; responsive editorial layouts; original code-drawn project illustrations; and a lazy-loaded technical Three.js scene.

## Run

Requires Node.js 22.12+ or a compatible newer LTS version (developed with Node 24).

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite, normally http://127.0.0.1:5173.

```powershell
npm run check
npm test
npm run build
npm run preview
npm run format
npm run docs:source
```

The build produces `dist/`. `package-lock.json` pins dependencies; use `npm ci` in CI.

## Installation commands from scratch

The provided package.json already declares everything. These explicit commands are included for reference; you only need `npm install` with this checkout.

```powershell
npm install react react-dom react-router-dom three @react-three/fiber @react-three/drei framer-motion lucide-react @fontsource/inter @fontsource/space-grotesk @fontsource/dm-serif-display
npm install -D typescript vite @vitejs/plugin-react tailwindcss @tailwindcss/vite @types/react @types/react-dom @types/three @types/node
npm install -D vitest jsdom @testing-library/react @testing-library/user-event prettier
```

Tailwind uses its Vite plugin and the CSS-first `@theme` configuration in `src/index.css`; a legacy tailwind.config.js is not required. Component utilities handle reusable layout and spacing; authored styles implement the editorial composition and detailed responsive layouts.

## Folder structure

```text
portfolio/
  public/
    prakhar-profile.jpg
    favicon.svg
    og-image.svg
    _redirects
  scripts/
    export-source.mjs
  src/
    components/
      layout/Navbar.tsx
      layout/Footer.tsx
      home/Hero.tsx
      home/FeaturedProjects.tsx
      home/TechStack.tsx
      projects/ProjectVisual.tsx
      projects/Architecture.tsx
      three/TechnicalScene.tsx
      three/ScenePanel.tsx
      ui/Links.tsx
      ui/Reveal.tsx
      ui/PageHeading.tsx
    data/profile.ts
    data/projects.ts
    data/skills.ts
    hooks/usePageMeta.ts
    lib/contact.ts
    pages/Home.tsx
    pages/About.tsx
    pages/Projects.tsx
    pages/Education.tsx
    pages/Contact.tsx
    pages/NotFound.tsx
    test/setup.ts
    test/portfolio.test.tsx
    App.tsx
    main.tsx
    index.css
  .env.example
  .gitignore
  index.html
  package.json
  package-lock.json
  tsconfig.json
  vite.config.ts
  vitest.config.ts
  vercel.json
  README.md
  IMPLEMENTATION.md
```

`IMPLEMENTATION.md` contains exact relative paths and complete text for the application and configuration files. The JPEG and npm-generated lockfile are provided directly in the checkout.

## Personalize the missing information

- `src/data/profile.ts`: replace `YOUR_GITHUB_URL`, `YOUR_LINKEDIN_URL`, `YOUR_TWITTER_URL` and `YOUR_RESUME_URL`. To use a resume PDF, add `public/resume.pdf` and set `resume: '/resume.pdf'`. The original PDF was not supplied; no resume document or link is fabricated.
- `src/data/projects.ts`: replace `YOUR_MYTUBE_GITHUB_URL`, `YOUR_BLOG_GITHUB_URL`, `YOUR_BLOG_LIVE_URL`.
- Missing links appear as non-interactive, clearly marked Pending text instead of pointing to invalid URLs. After replacing a placeholder with a real URL, the shared component renders a functional external link automatically.
- `public/prakhar-profile.jpg`: currently the supplied artwork, copied without alteration. Replace this file with your photograph. Also update the two image alt descriptions in `Hero.tsx` and `About.tsx` to describe the replacement image accurately; no layout changes are needed.
- All academic figures, projects and skills come from the supplied brief. Appwrite was not confirmed in the resume data and is intentionally omitted. Project previews are labeled INTERFACE STUDY, not represented as screenshots of the original applications.

## Contact delivery

With no configured endpoint, the form validates input and creates a `mailto:` draft. The visitor explicitly opens their email app to review and send it. The UI never claims that the website sent an email.

To connect Formspree or a custom backend:

1. Copy `.env.example` to `.env.local`.
2. Set `VITE_CONTACT_ENDPOINT` to the real HTTPS endpoint.
3. Configure the provider/server to accept JSON fields `name`, `email`, `subject`, `message`, allow requests from your deployment origin, validate input, and handle spam/rate limiting.
4. Restart Vite or rebuild. Test delivery with your provider before publishing.

`src/lib/contact.ts` is the integration boundary. It handles timeout and non-success responses; the form preserves input when submission fails. A 2xx response means submission was accepted, not proof of email delivery. For EmailJS, implement its SDK integration in this module. Never put private API secrets into VITE_ environment variables, which are public in the browser bundle.

## Interaction and accessibility

- Semantic landmarks, one h1 per route, associated field labels, native required/email validation, status announcements, visible focus, skip link and route focus management.
- Mobile navigation is an expanding inline menu. Escape closes it and returns focus to its toggle. It is not a modal and does not trap focus.
- Framer Motion handles restrained page fades and section reveals. CSS and Motion respect reduced motion. No scroll-jacking or cursor-following UI.
- The desktop Three.js scene uses simple geometry, bounded DPR and local lighting, with no external models or environments. It pauses outside the viewport, in hidden tabs, when paused manually, or for reduced motion. React Three Fiber manages disposal on unmount.
- Mobile, coarse-pointer, low-core-count and unavailable-WebGL environments receive a lightweight SVG architecture illustration. WebGL errors have a static fallback.
- Fonts are bundled locally through Fontsource; no font CDN is required at runtime.

## Deployment and metadata

Deploy `dist/` to a static host. Client-side routes need an SPA fallback to `/index.html`; Vercel rewrites and a Netlify-compatible `_redirects` file are included. For other hosts, configure an equivalent rewrite.

Base title, description and OpenGraph tags are in `index.html`; page-specific title/description updates are in `usePageMeta.ts`. `public/og-image.svg` is an editable share-art placeholder. For production social previews, export it to a 1200×630 PNG/JPEG and use the deployed absolute image URL; many crawlers do not support SVG or execute client-side route metadata. Set `og:url` and a canonical URL after the final domain is known. Server rendering or prerendering is needed if distinct crawler-visible metadata per route is required.

## Validation

`npm run check` enforces strict TypeScript and unused-import checks. `npm test` checks page routes, home-to-project navigation, route focus, mobile-menu Escape behavior, unavailable URLs, contact field validation and the no-backend email draft flow. All 11 tests passed during implementation, along with the production build and HTTP checks for all five routes and the profile image. The test runner uses one thread to avoid a Windows fork-worker startup issue.

These DOM tests do not substitute for browser rendering checks. No browser surface was connected in the implementation session, so desktop/mobile overflow, visual appearance and GPU rendering could not be verified visually. Check these on the deployment preview before public release.

## Reference documentation

- [Tailwind Vite integration](https://tailwindcss.com/docs/installation/using-vite)
- [React Three Fiber performance guidance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
