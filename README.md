# Founders @ UIUC Website

Source for https://foundersillinois.org. Built with Next.js (App Router, TypeScript) as a static site and hosted on GitHub Pages.

## Updating the site (no coding needed for most changes)

Almost everything on the site comes from the files in `content/`. Edit the file, save, and push to `main`. GitHub rebuilds and publishes it in a couple of minutes.

| To change… | Edit |
| --- | --- |
| Events (dates, times, locations, flyers) | `content/events.ts` |
| Members on the People page | `content/team.json` (photos go in `public/members/`) |
| Subteam names, blurbs, group photos | `content/teams.ts` |
| About > team pages, R&D projects | `content/initiatives.ts` |
| Projects / startups page | `content/startups.ts` |
| Forge page | `content/forge.ts` |
| Sponsors, podcast, hero photos, community photos, globe majors | `content/media.ts` |
| Links, email, homepage stats, nav, newsletter, application settings | `content/site.ts` |
| Runway mini game cards | `content/runway.ts` |

Notes:
- Anything written like `[TODO: ...]` shows on the site as a yellow placeholder until it's replaced.
- The "active members" stat counts `content/team.json`, so it updates itself.
- Events move from "Coming up" to "Past" on their own once their date passes.
- R&D projects have a `term` (like `"Fall 2026"`). Add next semester's projects with a new term, and the old ones stay as history.
- **Applications:** set `applyUrl` and flip `applicationsOpen` to `true` in `content/site.ts`. While it's `false`, the Apply page shows the "remind me" button instead.
- **Forge applications:** paste the link into `applyUrl` in `content/forge.ts` and the Apply button appears.
- **Contact form:** while `contactFormEndpoint` is `null`, messages open the sender's email app. Paste a Formspree endpoint to send them straight from the page.

## Running it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
npm run typecheck
```

## Hosting

- **GitHub Pages:** every push to `main` builds the site and publishes it to foundersillinois.org (`.github/workflows/deploy.yml`). In the repo, Settings > Pages > Source must be set to **GitHub Actions**.
- **Other branches** are built too (a red X on the commit means the build broke) but never go live. Do work on a branch, then merge into `main` when it's ready.
- **Domain:** `public/CNAME` holds foundersillinois.org. The domain's DNS points at GitHub Pages; keep the registrar account renewed.
- **Old links:** `/forge.html`-style URLs still work, and `/teams` and `/skyward` forward to their new pages.

## Folder map

- `app/`: one folder per page (`app/events/page.tsx` is `/events`), plus `globals.css` (all styles) and `layout.tsx` (header, footer, fonts).
- `components/`: reusable pieces (header, team browser, newsletter signup, calendar buttons, the Runway game).
- `content/`: the editable data described above.
- `public/`: images, member photos and the favicon.
- `legacy/`: the old hand-written HTML site, kept for reference only. It isn't deployed.
