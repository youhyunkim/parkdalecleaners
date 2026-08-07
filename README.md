# Parkdale Cleaners

Website for Parkdale Cleaners — 3529 Johnson Ave, Bronx, NY 10463 · (718) 543-7690

A single-page static site. No build step, no dependencies — plain HTML, CSS and
a small amount of vanilla JavaScript. Open `index.html` in a browser and it works.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The whole page — all copy lives here |
| `assets/css/styles.css` | All styling |
| `assets/js/main.js` | Open/closed status, mobile menu, scroll reveals |
| `assets/img/*.svg` | Hand-drawn illustrations and icons |
| `assets/img/og-image.png` | Preview image shown when the link is shared |

## Editing the common things

**Phone number** — appears in several places. Search `index.html` for
`7185437690` and `543-7690` and replace all of them, including the
`"telephone"` field in the structured-data block at the bottom.

**Hours** — hours live in three places and must be kept in sync:

1. the table in the `#visit` section of `index.html`
2. the summary in the footer of `index.html`
3. the `HOURS` object at the top of `assets/js/main.js` (drives the
   "Open now / Closed" strip and the *Today* badge)
4. `openingHoursSpecification` in the JSON-LD block at the end of `index.html`
   (this is what Google reads)

**Services / items** — plain lists in `index.html` under `#services` and
`#items`. Delete any line for something you don't offer.

**Colors** — the palette is defined once at the top of `styles.css` under
`:root` (`--ink`, `--brass`, `--cream`).

## Before going live — please check these

These were written as reasonable defaults and should be confirmed or edited:

- **Services listed.** Alterations & repairs, wedding gown preservation, and
  leather & suede are on the page. Remove any you don't actually do, or that you
  send out rather than handle in house.
- **Domain.** `index.html` assumes `https://parkdalecleaners.com/` in the
  canonical link, the `og:` tags and the structured data. Update those to the
  real domain.
- **Map coordinates.** The `geo` latitude/longitude in the structured data is
  approximate for Johnson Ave. The embedded map itself searches by address and
  is accurate.
- **Photos.** The illustrations are original artwork, not photographs. Real
  photos of the storefront, the counter and the pressing equipment would be
  stronger — the hero image slot is `assets/img/hero-storefront.svg` in the
  `.hero__art` block, and any photo dropped in there will work.

## Deploying

**GitHub Pages** — push to `main`, then Settings → Pages → Source: *Deploy from
a branch*, branch `main`, folder `/ (root)`. Live in a minute or two at
`https://<user>.github.io/parkdalecleaners/`. For a custom domain, add it under
Settings → Pages and create a `CNAME` file containing the domain.

**Netlify / Vercel / Cloudflare Pages** — connect the repo, leave the build
command empty and set the publish directory to the repo root.

## Local preview

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```
