# THE FRAME — A Visual Techniques Guide

An editorial-style web guide that helps Media Studies students move from the
**effect they want to create** to the **visual technique that creates it**, when
planning music videos and other visual media products.

Students choose a mood, meaning or impact (tension, isolation, power, nostalgia…)
and the site suggests relevant camera, editing, lighting, colour, staging,
performance and symbolic techniques — each explained in clear, assessment-ready
language with a "how to use it" and an "avoid this" note.

---

## How to run it

There is **no build step and no installation**. It's plain HTML, CSS and
JavaScript.

- **Easiest:** double-click `index.html` to open it in a browser. It works
  straight from the file system, including offline.
- **Recommended for classroom display / phones on the same network:** serve the
  folder so it behaves exactly like a hosted site. From this folder, run either:

  ```bash
  python3 -m http.server 8000
  # then visit http://localhost:8000
  ```

  or

  ```bash
  npx serve .
  ```

- **To publish for students:** run `bash tools/deploy.sh`. It pushes to **GitHub
  Pages** and deploys the same static files to the custom domain on Cloudflare.
  There is no backend.

The two public addresses are:

- <https://jameshartnz-collab.github.io/visual-techniques/> — the established
  teacher-facing GitHub Pages address.
- <https://mvtechniques.mrhart.org/> — the shorter custom-domain copy.

Both addresses remain live independently and are updated by the same deploy
command. Cloudflare deployment requires James's existing Wrangler login; the
GitHub Pages copy continues to deploy from `main` even if Cloudflare is
temporarily unavailable.

> Tip: press the **number keys 1–6** to jump between the six sections. The site
> is fully responsive and is designed to read clearly on a classroom projector
> as well as on student devices.

---

## The six sections

| # | Section | What it does |
|---|---------|--------------|
| 1 | **Home** | Sets up the core idea: videos are built from deliberate choices, not random cool shots. |
| 2 | **Effect Finder** | Pick the effect you want → get the techniques that create it, ranked, plus matching recipes. |
| 3 | **Technique Explorer** | The full database, searchable and filterable by category, difficulty and effect. |
| 4 | **Combinations** | Seven prebuilt "visual recipes" (Alienation, Power, Anxiety, Nostalgia, Chaos, Intimacy, Surrealism). |
| 5 | **Gallery** | Placeholder slots for real example images — they appear here automatically once you add them. |
| 6 | **My Plan** | Students pick 3–5 techniques, then **copy** or **download** a planning summary. Saved in the browser. |

---

## Folder structure

```
Visual Techniques/
├── index.html              ← the whole app shell (nav + footer)
├── css/
│   └── styles.css          ← all styling / the editorial design system
├── js/
│   └── app.js              ← rendering, routing, filters, planner
├── data/
│   └── techniques.js       ← ⭐ THE CONTENT — edit this to change everything
├── assets/
│   └── examples/           ← drop technique example images here
│       └── SEARCH-QUERIES.md  ← per-technique search queries (auto-generated)
└── README.md
```

---

## Editing the content (no coding needed)

**Everything you see is generated from one file: `data/techniques.js`.** Open it
in any text editor. It contains three lists:

- `EFFECTS` — the moods/impacts students can choose from.
- `TECHNIQUES` — the techniques, each tagged with the effects it serves.
- `COMBINATIONS` — the prebuilt visual recipes.

### Add or edit a technique

Copy an existing technique block, paste it into the `TECHNIQUES` list, and edit
the fields:

```js
{
  id: "low-angle-shot",     // unique, lowercase-with-dashes. Also the image filename.
  name: "Low-Angle Shot",
  category: "camera",        // camera | editing | lighting | colour |
                             // mise-en-scene | performance | symbolism | sound-image
  difficulty: "easy",        // easy | moderate | advanced
  blurb: "What it is, in plain English.",
  creates: "The effect / meaning it creates for an audience.",
  useInMV: "How a student could use it in their own music video.",
  example: "A concrete shot or editing example.",
  mistakes: "Common mistakes or overused choices to avoid.",
  related: ["high-angle-shot", "centred-framing"], // other technique ids
  effects: ["power", "status"],                     // which EFFECT ids it serves
  queries: ["low angle hero shot", "looking up at character"] // image search terms
}
```

The first effect listed in `effects` is treated as the **strongest** match, so
it ranks higher in the Effect Finder for that effect.

### Add a new effect

Add an object to the `EFFECTS` list (`id`, `label`, `tagline`, `hint`), then tag
techniques with that new `id` in their `effects` array.

### Add a new recipe

Add an object to `COMBINATIONS` with a `name`, `summary`, a list of technique
`techniques` ids, and a `note` explaining why they work together.

### Add a new category

Add an object to `CATEGORIES`, then add a colour for it in `css/styles.css`
(search for `--cat-` to see the existing category colours and copy the pattern).

---

## Visual examples

Each technique shows a cinematic still. The stills share a grounded contemporary
indie-film style and are composed so students can recognise each technique without
labels or diagrams. They appear on every technique card and fill the Gallery.

The site loads an **optimised JPEG** first and falls back to the generated **SVG
panel** for any technique whose photo isn't done yet — so it always looks finished:

```
assets/examples/<id>.jpg   ← optimised photo (shipped to the live site)
assets/examples/<id>.svg   ← generated fallback panel (always present)
```

### Workflow for adding photos

Full-size originals live in `assets/examples2/` (kept out of the deploy). To turn
them into the lightweight versions the site serves, run:

```bash
bash tools/optimise-photos.sh --missing-only
```

This reads every image in `assets/examples2/` and writes a max-1280px, ~quality-82
JPEG to `assets/examples/<id>.jpg`. Name each source after the technique's id
(e.g. `silhouette.png`) at a **16:9** aspect ratio. The original PNGs and the
`examples2/` folder are git-ignored, so only the small JPEGs are published — the
optimised JPEG set is much smaller than the full-size originals.

Use `--missing-only` when adding a batch so completed JPEGs are preserved. Run
the script without that option only when you intentionally want to refresh every
optimised JPEG from its full-size original.

**`assets/examples/SEARCH-QUERIES.md`** lists a suggested filename and search
terms for every technique, so you can quickly find clean, legally reusable photos.

### Using legal images only

Use sources you're allowed to reuse:

- Creative Commons / royalty-free libraries (Pexels, Pixabay, Unsplash, Wikimedia Commons).
- Your own production stills or screenshots from material you have rights to.
- When using a search engine's image tool, filter by **usage rights / Creative Commons** first.

Avoid copyrighted music-video stills unless they are only temporary placeholders
clearly labelled for replacement.

---

## Design notes

- **Type:** Fraunces (display serif) + Inter (body). Falls back to system fonts offline.
- **Layout:** fluid type via `clamp()`, so it stays large and legible on a 4K
  classroom display and reshapes cleanly down to phones.
- **Colour:** high contrast on warm paper; each production category has a
  consistent colour that is always paired with a text label (never colour alone),
  for accessibility.
- **No dependencies, no tracking, no backend.** Student plans are stored only in
  their own browser via `localStorage`.

---

## Quick customisation ideas

- Change the headline/intro copy in `js/app.js` → `renderHome()`.
- Re-theme the whole site by editing the colour tokens at the top of
  `css/styles.css` (`:root { … }`).
- Add your school name to the footer in `index.html`.
