# Review Report — Gangchil Homes

- Mode: `review`
- Surface: `frontend/` (Nuxt 3 — public site, auth, dashboard, admin)
- Date: 2026-08-31
- Score: **21/50 — MIDDLE**

The product does its job: search, verify, compare, schedule, transact. But the first impression is "template luxury brokerage," and the hierarchy, color, type, and interaction systems all show assembled-from-defaults DNA. The strongest assets are the domain specifics (RAJUK/CDA approval, katha/bigha units, escrow banks, NRB concierge, 15-minute SLA) — they deserve a surface that looks as specific as they are.

---

## First Read

The page is a navy-and-gold hero with a centered tag pill, gradient gold text, a glass search box, and four equal stat columns. It looks like every premium real estate site. There is no artifact on the first viewport that could only belong to Gangchil Homes — the trust bar, the category cards, the search box would all survive being pasted onto a Miami or Dubai brokerage.

---

## Lenses

| Lens | Score | Read |
|---|---|---|
| First impression | 3/10 | Template luxury; no memorable point of view |
| Hierarchy | 4/10 | Centered headers + equal cards flatten priority |
| Color voice | 3/10 | Navy/gold/emerald + gradients carry no meaning |
| Type voice | 5/10 | Legible, but weight-shouting and micro-labels |
| Interaction feel | 6/10 | Flows work; states and motion are incomplete |
| **Total** | **21/50** | **Middle — direction is right, surface is generic** |

### First impression — 3/10
Hero tag pill + gradient headline + glass search + four stat monuments is the default luxury stack. Nothing on the first viewport says "Bangladeshi land law, escrow, verification." The one strong signal — RAJUK/CDA — is a small pill. Gradients and glass read "template," not "trust."

### Hierarchy — 4/10
Every section header is identical (centered tag pill → title → subtitle). The trust bar is four equal columns of unrelated numbers in different colors. Category cards are equal with no lead. Squint test: the page is a uniform grid of navy, gold, and white blocks; the eye has no single dominant thing to land on after the hero.

### Color voice — 3/10
Navy + gold + emerald with random inline hexes (`#60A5FA`, `#F59E0B`, `#2563EB`, `#EC4899`) per element. Color never carries a job: verification emerald, warning amber, money gold — it's decoration. The palette is the industry's first reflex for "luxury brokerage."

### Type voice — 5/10
Outfit/Plus Jakarta is legible, and the scale (3.4rem hero → 2.35rem section → 1.05rem body) is sane. But weight 800–900 everywhere plus 0.68–0.78rem uppercase micro-labels on every card is shouting, not hierarchy. Display font is applied to every number, turning stat monuments louder.

### Interaction feel — 6/10
Compare, schedule, save, EMI, role-switch all work with real feedback states. Gaps: no focus-visible styling, icon buttons without labels, no Escape/focus trap in overlays, infinite pulse on WhatsApp, no reduced-motion, touch targets below 44px. The flows are honest; the states are unfinished.

---

## Experience Walkthrough

- **Arrival**: the hero makes a promise — verified luxury assets. The promise is carried by a gradient word and a glass box, not by proof.
- **Choose**: the search box is genuinely multi-intent (buy/lease/plots/resorts) and works. This is the best element on the page.
- **Explore**: filters (RAJUK only, open house, budget in BDT) are real and useful. The map with price-tag markers is a strong artifact.
- **Detail**: six tabs (overview/history/valuation/comparables/schools/community) are substantive. The sticky inquiry card is functional.
- **Act**: schedule viewing, WhatsApp, compare — all complete with confirmation states.
- **Resolve**: success screens exist everywhere (viewing confirmed, inquiry dispatched, listing live). The product closes loops.

The experience story works. The visual layer is wearing someone else's clothes.

---

## Recommendations (priority order)

1. **Redesign the first impression** — replace the gradient/glass/stat stack with a proof-forward hero: the property artifact (a verified plot or flat), the RAJUK/escrow trust line, and one dominant action.
2. **Recolor with meaning** — keep navy as brand, make emerald the single verification/action role, gold the money role, kill gradients, remove per-item inline hexes.
3. **Relayout section headers** — left-align light sections; give the trust bar a proof-row treatment; make one category card the lead.
4. **Typeset** — one display voice, weight contrast instead of weight shouting, kill the 0.68rem micro-labels, stop applying display to every number.
5. **Interaction hardening** — focus-visible, aria-labels, Escape/trap, reduced-motion, 44px targets.
6. **Voice pass** — strip "LUXURY/VIP/PREMIUM" filler; let the concrete specifics (RAJUK, Katha/Bigha, escrow, 15-min SLA) carry the pitch.

## Mode mapping
- `deslop` — emoji → lucide, remove gradient text, stat monuments, unearned blur, pulse motion, feature-grid flatness
- `typeset` — scale, micro-label, display-font discipline
- `interaction` — focus, labels, overlay behavior, reduced-motion
- `voice` — copy filler removal
- `finish` — final pre-ship friction pass on the touched surfaces
