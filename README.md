# Stream Industrial — Brokerage & Marketing Dashboard

One page where the Industrial brokerage and marketing teams can see what's going on:

| Section | What it's for |
|---|---|
| **In the Queue** | Marketing requests by stage: Requested → In Progress → In Review → Complete. Filter by type or owner |
| **Pursuits** | Library of final, client-ready decks (pitches, BOVs, tour books, market updates) with the outcome |
| **Resources** | Templates, brand standards, research/market data, social, tools & process links |
| **Portfolio** | Every property with submarket, available SF, clear height, status, broker lead, and quick links (flyer, website, OM, photos, tour book, map, folder). Sortable and filterable |
| **Research** | The Quarter market reports (PDF) with headline stats, plus research data and tools, and who to ask |
| **Process** | Step-by-step IND + Marketing processes (pitch, onboarding, collateral, signage, branding, press release, deal announcement, events), showing who owns each step, plus the leads for each active assignment |
| **Team** | Who's on the brokerage, marketing and research teams |

Each section is its own tab. The search box at the top searches every tab at once and shows the number of matches on each tab. Links like `index.html#portfolio` open straight to a tab.

## Viewing it

It's a static site with no build step. Any of these work:

- **Open locally:** double-click `index.html`.
- **GitHub Pages:** repo *Settings → Pages → Deploy from branch*, choose the branch and `/ (root)`.
- **SharePoint / Teams:** upload the folder to a document library and link to `index.html`, or host it on any internal web server.

## Updating content

All content lives in **`data/dashboard.js`**. You don't need to touch the HTML, CSS or JS.

1. Open `data/dashboard.js` (on GitHub, click the pencil icon to edit in the browser).
2. Find the section you want (`queue`, `presentations`, `research`, `resources`, `portfolio`, `process`, `assignmentTeams`, `team`).
3. Copy an existing entry, paste it, and change the values. Keep the comma between entries.
4. Paste SharePoint/OneDrive/website URLs into `link` / `links` fields. Leave `""` if there's no link yet; the dashboard shows "link needed" or a greyed-out button.
5. Update `meta.lastUpdated`, then commit.

When the placeholder entries have been replaced with real ones, set `meta.sampleData: false` to hide the yellow "Sample data" banner. Set `meta.requestLink` to the team's intake form (for example a Microsoft Form) so the **+ New marketing request** button goes there.

Allowed values:

- Queue `status`: `Requested`, `In Progress`, `In Review`, `Complete`
- Queue `priority`: `High`, `Normal`, `Low`
- Portfolio `status`: `Available`, `Under LOI`, `Leased`, `Coming Soon`, `For Sale`
- Portfolio `links` keys: `flyer`, `website`, `om`, `photos`, `tourBook`, `map`, `drive`

Dates are `YYYY-MM-DD`. Items due within 3 days are flagged, and overdue items are marked in orange.

## Live queue (Claude artifact)

When the dashboard is opened as its Claude artifact, the In the Queue board reads from the artifact's shared database (`tasks` collection) instead of `data/dashboard.js`. Anyone with Contributor access or above can drag a card to another column, or use its "Move to" menu, and the move saves for everyone. The static copy in this repo (GitHub Pages, SharePoint) still shows the `queue` list from `data/dashboard.js` and is read-only.

## Brand

Uses the "Midnight" look: a full Stream Navy page with Pacific Blue highlights, Merriweather headlines and Nunito Sans text. Stream Blue is kept off navy surfaces, per the brand contrast rule. The theme is the last block in `assets/styles.css`; delete that block to go back to the light page with a navy header.

## Files

```
index.html          page layout
assets/styles.css   brand styling
assets/app.js       rendering, filters, search, sorting
data/dashboard.js   ← all content (edit this)
research/           The Quarter PDFs linked from the Research tab
assets/team/        headshots
```
