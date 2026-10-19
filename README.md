# The Cuts — Local Business Website

A responsive, single-page barber shop website built with plain HTML, CSS, and JavaScript. No framework, build step, or package installation required.

## Files

- `index.html` — page structure and editable business content
- `styles.css` — layout, typography, colors, responsive mobile navigation
- `script.js` — mobile menu, current year, and appointment form email handoff
- `assets/` — reserved for local images or other assets you add

## Run locally

Open `index.html` in your browser. For a local server, you can run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Before publishing — customize these details

1. Replace **The Cuts** with the real business name.
2. In `index.html`, update the phone number, street address, opening hours, prices, service descriptions, and testimonials.
3. Replace the demo map block with a real Google Maps embed or the correct map link.
4. In `script.js`, change `BUSINESS_EMAIL` from `hello@example.com` to the business's real email address. The form opens the visitor's email app; it does not store submissions on a server.
5. Replace the sample testimonials with genuine reviews and get permission before publishing customer photos.
6. Update the Google Fonts and Unsplash image URLs if you want to self-host assets. Images currently load from Unsplash and require internet access.
7. Add the real Instagram/Facebook/TikTok URLs and update the social links.
8. Test the site on mobile and desktop, and check all contact links before going live.

## Deployment

You can publish this static site using GitHub Pages, Netlify, Cloudflare Pages, or any ordinary web host. Upload the contents of this folder. No backend is included.

## Important

This is a starter/demo site. The contact details, address, prices, and testimonials are sample content and must be replaced before it represents a real business.
