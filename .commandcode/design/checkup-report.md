# Checkup Report — Gangchil Homes

- Mode: `checkup` (post-deslop re-run)
- Surface: `frontend/` (Nuxt 3 — public site, auth, dashboard, admin)
- Date: 2026-08-31
- Score: **40/60 — WATCH**

The deslop pass resolved the bulk of the visual and color-system findings: gradients, emoji icons, stat monuments, unearned blur, and infinite pulse motion are gone. The remaining failures are behavioral — keyboard/modal accessibility and sub-16px mobile form inputs — plus a set of small contained watches.

---

## Vitals

| Vital | Status | Score |
|---|---|---|
| Intentionality | Healthy | 10/10 |
| Readability | Watch | 5/10 |
| Usability | Healthy | 10/10 |
| Responsiveness | Watch | 5/10 |
| Speed | Healthy | 10/10 |
| Accessibility | Critical | 0/10 |
| **Total** | **Watch** | **40/60** |

### Intentionality — Healthy (10/10)
Fixed since the last checkup. Flat surfaces replaced gradients, the hero reads "verified Bangladeshi brokerage" (RAJUK tag, gold accent, concrete subtitle), the trust bar is a consistent proof row, section headers are left-aligned, and icons are authored SVGs. The surface no longer looks assembled from defaults.

### Readability — Watch (5/10)
Contrast improved (gold-bright on navy, `#CBD5E1` on trust bar). Remaining watches:
- `#94A3B8` still used for secondary text on dark (footer, NRB card, admin sidebar) — around 3.5:1, borderline at 0.78–0.85rem.
- `--color-text-light: #94A3B8` token remains in `:root` and is still referenced by footer/desc text.
- `.card-bottom-pill`, badges, and micro-labels at 0.68–0.78rem remain small but are non-critical content.

### Usability — Healthy (10/10)
All primary flows verified intact after the deslop edits: hero search → filtered listings → detail → schedule/compare; list-property → success; login → role dashboards; admin queue → approvals. Compare, EMI, favorites, and role-switch composables all still wired. No regression from the template edits (build passed, exit 0).

### Responsiveness — Watch (5/10)
- **Critical (unaddressed):** `.form-input/.form-select/.form-textarea` and `.search-input-field input/select` are `font-size: 0.95rem` — below 16px, so iOS Safari auto-zooms on focus on narrow screens. The checkup reference prescribes `1rem` on screens under 640px.
- Search grid reflow is intact (5-col desktop → 2-col @992 → 1-col @640).
- Touch targets below 44px remain: 40px card icon actions, 42px WhatsApp card buttons, 34px drawer close, 36px modal close.
- No `pointer: coarse` / `hover: hover` detection; hover-only affordances (card lift, icon action) lack touch equivalents.

### Speed — Healthy (10/10)
Static demo data, lazy-loaded card images, async Leaflet import. Dev server serves the shell with correct title/meta on a free port; no jank observed in probes.

### Accessibility — Critical (0/10)
Remaining blockers:
- **No Escape-to-close or focus trap** on any overlay: mobile drawer, lightbox, modals (Schedule, EMI, callback, compare). No `@keydown.esc`, no focus containment, no body scroll lock. Keyboard users can tab behind the modal.
- **Icon-only buttons** now have `aria-label` (PropertyCard compare/favorite/WhatsApp, floating stack, admin actions) — fixed. But the drawer close, modal close, and lightbox prev/next buttons rely on `✕`/`‹ ›` glyphs with aria-label where present — the lightbox prev/next buttons have no labels.
- **Reduced motion** now handled globally — fixed.
- **Focus-visible** ring now global — fixed.
- `:focus-visible` on dark surfaces uses emerald ring at 3px with offset — good, but the `outline: none` reset in `main.css` remains for `input/select/textarea`; the `:focus-visible` override covers it.
- Color-only state remains in some badges (blue-on-light-blue `badge-status`) — minor.

---

## Prescriptions (priority order)

1. **Accessibility (blocks shipping)**
   - Add Escape-to-close + focus trap + body scroll lock to the mobile drawer, lightbox, and all modals (Schedule, EMI, callback, comparison). Wire `@keydown.esc` and a focus-in containment on the overlay; return focus to the trigger on close.
   - Give the lightbox prev/next and gallery buttons `aria-label`s; they currently expose glyph-only names.
   - Bump all touch targets to 44px minimum: card icon actions (40→44), WhatsApp card button (42→44), drawer close (34→44), modal close (36→44).

2. **Responsive / iOS zoom (blocks mobile shipping)**
   - Add `@media (max-width: 640px)` rule: `.form-input, .form-select, .form-textarea, .search-input-field input, .search-input-field select { font-size: 1rem; }` — prevents iOS auto-zoom on focus.

3. **Readability (contained)**
   - Raise `#94A3B8` secondary text on dark surfaces to `#CBD5E1` in the footer, NRB card, and admin sidebar; retire the `--color-text-light` token or retune it.

4. **Interaction polish**
   - Add hover/active equivalents for touch on card icon actions and quick chips; `@media (hover: hover)` scoping so touch devices don't get stuck hover states.

## Mode mapping
- `interaction` — Escape/focus-trap, aria-labels on lightbox, touch targets
- `responsive` — sub-16px input fix, touch hover scoping
- `recolor` — retire `#94A3B8` on dark, retune `--color-text-light`
