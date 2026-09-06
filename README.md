# Shekh Manzur Elahi — Portfolio

Static portfolio site. No build step, no dependencies to install — plain HTML, CSS and
JavaScript, deployed to Render and updated automatically on every push to `main`.

## Structure

```
index.html              Home page — hero, about, skills, experience,
                        6 featured projects, education, credentials, contact
projects.html           Full project archive (all 11) with filters + search
404.html                Not-found page
render.yaml             Render deploy config (Blueprint services only)
robots.txt              Crawler rules
sitemap.xml             Search-engine sitemap
assets/
  favicon.svg           Browser tab icon
  css/style.css         All styling for every page
  js/projects.js        Project data — the single source of truth
  js/main.js            All behaviour (theme, 3D background, filters, modal…)
```

Every path in the HTML is **relative** (`assets/css/style.css`, not `/assets/...`),
so the site works identically from a subfolder, a custom domain, or the local file
system.

## Local preview

The pages load CSS and JS as separate files, so opening `index.html` directly with
`file://` works in most browsers but is not how it is served. To preview it the way
Render does, run any static server from this folder:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>. With XAMPP, browsing to the folder under
`htdocs/` does the same thing.

## Deploying

Render watches the repository and redeploys on every push to `main`:

```bash
git add -A
git commit -m "Update portfolio"
git push
```

Render clones the whole repository and serves it — there is no build step and no
bundler, so subfolders like `assets/` are published exactly as they appear here.

**The one thing that breaks the live site** is pushing `index.html` without the
files it references. The pages load their CSS and JS from `assets/`, so if that
folder is missing from the repository the deployed site renders unstyled. Use
`git add -A` (not `git add index.html`) and check `git status` is clean before
pushing.

If the service was created by hand in the Render dashboard, confirm:

- **Build Command** — empty
- **Publish Directory** — `.` (the repository root)

## Adding a project

Projects are data-driven. Add one object to the array in
[`assets/js/projects.js`](assets/js/projects.js) and it appears automatically on both
pages, in the right filter categories, with a working detail modal.

```js
{
  key:   'unique-id',            // also used for the #project-unique-id deep link
  cat:   'laravel fullstack',    // space-separated filter categories
  tone:  'pb-1',                 // banner colour class (pb-1 … pb-11)
  icon:  'fa-cubes',             // Font Awesome icon name
  title: 'Project Name',
  blurb: 'Short description shown on the card.',
  chips: ['Laravel', 'MySQL'],   // small tags on the card
  role:  'Your role · Company',  // shown in the modal
  desc:  'Longer description shown in the modal.',
  points: ['Highlight one', 'Highlight two'],
  stack:  ['Full', 'tech', 'stack'],
  links:  [{ href: 'https://…', icon: 'fab fa-github', label: 'GitHub' }]
  // for a private repo use: [{ private: true, icon: 'fas fa-lock', label: 'Private Repo' }]
}
```

The home page shows the first 6; change `data-limit="6"` on the grid in
`index.html` to show more or fewer.

## Editing styles or scripts

**After changing `assets/css/style.css` or anything in `assets/js/`, bump the version
number in all three HTML files:**

```
assets/css/style.css?v=2.1   →   ?v=2.2
assets/js/projects.js?v=2.1  →   ?v=2.2
assets/js/main.js?v=2.1      →   ?v=2.2
```

Browsers cache these files aggressively. Without the bump, returning visitors keep
running the old version and your changes appear not to work.

```bash
# bump every reference at once
sed -i 's/?v=2\.1/?v=2.2/g' index.html projects.html 404.html
```

## Notes

- Themes: dark/light, saved to `localStorage`, respects `prefers-color-scheme` on
  first visit.
- The 3D background uses Three.js from a CDN. If it fails to load or the visitor has
  reduced-motion enabled, the page falls back to CSS gradients — nothing breaks.
- Contact form opens WhatsApp with the message pre-filled; there is no backend.
