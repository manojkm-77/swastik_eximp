# Swastik Eximp — Website

This is a lightweight, responsive marketing site scaffold for Swastik Eximp.

Quick start

1. Open `index.html` in a browser (no server required) or serve with a static server.

2. Contact form wiring

- Netlify Forms: The form includes `data-netlify="true"` and a hidden `form-name`. Deploy to Netlify and form submissions will be captured automatically.
- Formspree/Other endpoint: set the `data-endpoint` attribute on the form (in `index.html`) to your POST URL (e.g. `https://formspree.io/f/your-id`) and the site will send a `POST` with form fields.

3. Deploy

- GitHub Pages: push the repo to GitHub and enable Pages for the repository branch (no config required for a static site).
- Netlify: connect the repo to Netlify, it will use `netlify.toml`. Netlify offers form handling and serverless functions if you need backend logic.

Enhancements added by assistant

- Sticky header with active link highlighting and smooth scroll.
- Section entrance animations using IntersectionObserver.
- Product inquiry modal with pre-fill feature and client-side validation.
- WhatsApp floating CTA and cookie consent banner.
- SEO: Open Graph tags, canonical, Organization schema, `sitemap.xml` and `robots.txt`.
- CSS design tokens and responsive refinements down to 375px.

Form submission examples

- Formspree: set `data-endpoint="https://formspree.io/f/your-id"` on the form element.
- EmailJS: follow EmailJS docs and set endpoint or use their client integration.


Files

- index.html — Main site (form has `data-netlify` and optional `data-endpoint`)
- assets/css/style.css — Styles
- assets/js/main.js — Minimal interactivity and optional form POST handler
- netlify.toml — Basic Netlify config

Customization

- Update product details in the `#products` section.
- Replace placeholder social links in the footer.
- Replace or enhance hero visual with an image or brand asset (see `assets/images/hero.svg`).


Files

- index.html — Main site
- assets/css/style.css — Styles
- assets/js/main.js — Minimal interactivity

Customization

- Update product details in the `#products` section.
- Replace placeholder social links in the footer.
- Replace or enhance hero visual with an image or custom SVG.
