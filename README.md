# Harsh Shah | Developer Portfolio

## Project Overview
- **Goal**: Deliver a single-page, modern developer portfolio for Harsh Shah that demonstrates frontend craft, motion design, and interaction skills in a dark themed, glassmorphic interface.
- **Core Features**: Hero with typing and rotating titles, particle backdrop, skills animation, project filtering + modal details, experience timeline, validated contact form, theme toggle, scroll-triggered animations, and preloader.

## Completed Features
1. Loading screen with glassmorphic indicator and fade-out transition.
2. Fixed glass navbar with mobile drawer, active link observation, and smooth scroll.
3. Hero section featuring custom canvas particles, parallax cards, typing animation, title rotation, metrics, and resume download button.
4. About section with glass cards, hoverable profile image, and animated skills progress bars.
5. Project gallery with category filters, glassmorphic cards, and modal detail panels.
6. Experience timeline with gradient spine, logo markers, and responsive layouts.
7. Contact section with validated form, mailto integration, status messaging, and social links.
8. Theme toggle (dark / light) with localStorage persistence.
9. Scroll-triggered intersection animations and parallax effects with reduced-motion support.
10. Accessible footer with dynamic year and back-to-top control.

## Entry Points
| Path | Description |
|---|---|
| `/index.html` | Single-page portfolio entry. Sections: Hero, About, Projects, Experience, Contact, Footer. |

## Unimplemented / Deferred Items
- Project modal links for live demos and repositories are placeholders and should be updated with real URLs.
- Contact form currently uses `mailto` integration. A serverless email service (e.g. Formspree, Netlify Forms) can be added if credentials are available.
- Experience timeline logos use letterforms; replace with official vector logos if assets are provided.
- Hero resume download references a placeholder PDF. Swap with current resume before publishing.

## Recommended Next Steps
1. Replace temporary project modal links with production demo and repository URLs.
2. Update `assets/Harsh_Shah_Resume.pdf` with the latest resume document.
3. Review copy and imagery for brand consistency (e.g. custom portrait, project screenshots).
4. Set up analytics (e.g. plausible.io, GoSquared) if visitor tracking is desired.
5. Run Lighthouse audits and tune asset sizes if further performance optimisation is needed.

## Public URLs
- Production: _Not deployed. Use the Publish tab to generate a live URL._
- APIs: None — all interactions run client-side.

## Data Models & Storage
- _No persistent datasets or Table API usage in this release._
- _Project modal content lives inside `js/main.js` as a JavaScript object._

## Development Notes
- **Tech Stack**: Semantic HTML5, custom CSS with glassmorphism – no CSS framework, vanilla JavaScript for all interactivity.
- **Performance**: No third-party animation libraries; custom canvas particles and IntersectionObserver reduce bundle weight.
- **Accessibility**: ARIA labels, focus management for mobile navigation, modal close helpers, keyboard-friendly controls, reduced-motion sniffing.
- **Responsive Design**: Mobile-first breakpoints with CSS grid/flex layouts for each section.

## How to Deploy
To publish the site and obtain a shareable URL, open the **Publish** tab and use the one-click deployment. The platform will handle hosting and share a live link.
