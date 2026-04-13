# DnD Campaign Wiki — Repository Context

## Purpose

This repository holds content and source material for the **Chronicles of Morgan** D&D campaign. The `wiki/` directory is a **VitePress** static site that serves as the campaign wiki, deployed to **GitLab Pages** at `https://hellesvik.gitlab.io/dnd/`.

## Stack

- **VitePress** (static site generator, Markdown → HTML)
- **Vue 3** (custom components: `WikiInfobox`, `WikiBadge`, `WikiHome`)
- **TailwindCSS** is NOT used here — styling is plain CSS in `wiki/.vitepress/theme/custom.css`
- **GitLab CI/CD** (`.gitlab-ci.yml` at repo root) builds and deploys on push to `main`

## Directory Layout

```
dnd/
├── .gitlab-ci.yml          # CI pipeline — builds wiki, deploys to GitLab Pages
├── wiki/                   # VitePress site root
│   ├── .vitepress/
│   │   ├── config.ts       # Site config: nav, sidebar, head, base path
│   │   └── theme/
│   │       ├── index.ts    # Theme setup — registers custom Vue components
│   │       ├── custom.css  # Global styles (gold/amber "Dark Codex" palette)
│   │       ├── WikiHome.vue    # Home page portal layout
│   │       ├── WikiInfobox.vue # Fandom-style infobox (float-right sidebar)
│   │       └── WikiBadge.vue   # Inline tag badges
│   ├── index.md            # Home page (uses WikiHome component)
│   ├── characters/         # One .md per character + index.md
│   ├── places/             # One .md per location + index.md
│   ├── factions/           # One .md per faction + index.md
│   ├── events/             # One .md per major event + index.md
│   ├── sessions/           # One .md per session recap + index.md
│   └── public/
│       └── favicon.svg
├── Context/                # Raw campaign notes (source material, not published)
├── Sesjon*/                # Original session PDFs in Norwegian (source material)
└── Tools/                  # Utility scripts
```

## How to Run Locally

```bash
cd wiki
npm install
npm run dev       # http://localhost:5173/dnd/
npm run build     # output → wiki/.vitepress/dist/
npm run preview   # serve built site at http://localhost:4173/dnd/
```

## Design System

The wiki uses a **"Dark Codex" aesthetic** — warm gold/amber accent on dark backgrounds, serif display headings (Cinzel), humanist body text (Source Sans 3). No emojis anywhere. No purple, no neon colors, no SaaS patterns. See `custom.css` for all variables.

---

## Adding a New Session (Step-by-Step Agent Playbook)

When the user provides a new session summary (PDF, text, or markdown), follow these steps in order. The session number is the next integer after the highest existing one in `wiki/sessions/`.

### 1. Create the session file

Create `wiki/sessions/session-XX.md` following the established format:

```markdown
# Session XX — [Short Title]

| | |
|---|---|
| **Date** | YYYY-MM-DD |
| **Players** | [Name](/characters/slug), [Name](/characters/slug) |
| **Location** | [Place](/places/slug) |

## Recap

[Narrative paragraphs with internal links to characters, places, events, and factions.]

### [Subsection for each scene/beat]

[Details...]

## Key Events

- Bullet list summarizing the major beats
- Each referencing relevant wiki pages

## New Characters

- [Name](/characters/slug) — one-line description
```

Rules:
- Every character, place, faction, and event reference MUST be a markdown link to the correct wiki page.
- Use the existing slug conventions: lowercase, hyphens, no special characters (e.g., `galrok` not `gal-rok`, `morgans-keep` not `morgan's-keep`).
- Match the narrative tone of prior sessions — third person, past tense, detailed but not overwrought.

### 2. Create pages for NEW entities

If the session introduces new characters, places, factions, or events that don't have wiki pages yet:

**New character** — create `wiki/characters/[slug].md`:
```markdown
# [Name]

<WikiInfobox type="character">

### [Name]

| | |
|---|---|
| **Race** | [Race] |
| **Role** | [Role] |
| **Status** | Active |
| **First Seen** | [Session XX](/sessions/session-XX) |

</WikiInfobox>

**[Name]** is a [short description].

## Role in the Story

[Paragraphs with links.]

## Relationships

- **[Other Character](/characters/slug)** — relationship description
```

**New place** — create `wiki/places/[slug].md` using `type="place"` in the infobox.
**New event** — create `wiki/events/[slug].md` using `type="event"` in the infobox.
**New faction** — create `wiki/factions/[slug].md` using `type="faction"` in the infobox.

### 3. Update the sidebar in `config.ts`

Open `wiki/.vitepress/config.ts` and add entries to the relevant sidebar sections:

- **Always** add the new session to the `/sessions/` sidebar `items` array.
- If new characters were created, add them to the correct group (`Player Characters` or `NPCs`) in the `/characters/` sidebar.
- If new places were created, add them to the `/places/` sidebar.
- If new events were created, add them to the `/events/` sidebar.
- If new factions were created, add them to the `/factions/` sidebar.

### 4. Update index pages

Add rows/entries to the relevant index files:

- **`wiki/sessions/index.md`** — Add a new row to the session log table at the bottom.
- **`wiki/characters/index.md`** — If new characters, add them to the appropriate section (Allies, Antagonists, Scholars, Other).
- **`wiki/places/index.md`** — If new places, add them to the appropriate category.
- **`wiki/events/index.md`** — If new major events, add a new `wiki-timeline-entry` div.
- **`wiki/factions/index.md`** — If new factions, add a row to the table.

### 5. Update the home page component

Open `wiki/.vitepress/theme/WikiHome.vue`:

- Update the `count` numbers in the `categories` array if you added new entity pages.
- Update the `recentSessions` array: add the new session at the top, remove the oldest (keep 3 entries).

### 6. Update cross-links in existing pages

If an existing character, place, or event is significantly involved in the new session, consider updating their page to reference it (e.g., adding a paragraph under "Adventures" or "Events").

### 7. Build and verify

```bash
cd wiki && npm run build
```

Fix any build errors. The build must exit cleanly before committing.

### Checklist (verify before committing)

- [ ] Session file created with correct numbering and format
- [ ] All entity names link to existing wiki pages (no dead links)
- [ ] New entity pages created for any characters/places/events/factions introduced
- [ ] Sidebar in `config.ts` updated for all new pages
- [ ] Index pages updated (sessions, characters, places, events, factions as needed)
- [ ] `WikiHome.vue` counts and recent sessions updated
- [ ] No emojis anywhere
- [ ] `npm run build` passes with no errors
- [ ] All internal links use correct slugs (lowercase, hyphenated)
