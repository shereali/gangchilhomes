# Smell Report — Gangchil Homes

- Mode: `smell`
- Surface: `frontend/` (Nuxt 3 — public site, auth, dashboard, admin)
- Date: 2026-08-31
- Score: **2/10 — IDENTITY FAILURE**

Every major surface (homepage, properties, detail tabs, compare, auth, dashboard, admin) shares the same reflexes: emoji as icons, navy-and-gold "luxury" palette, gradient text and buttons, stat monuments, glassmorphism, and shouty VIP copy. The design could be swapped onto any luxury brokerage without a second thought.

---

## Findings

### 1. Emoji icon tells — STRONG (decoration)
Visible in nearly every file: hero tag `🏛️`, mobile drawer `🏠🏢🗺️🏖️👔⚖️`, modals `💳📞📅`, dashboard nav `📊❤️📅🏢📥`, empty states `🔍⚖️`, property tabs `🎓🚇🏥`, contact cards `🏢🌊🍃`, login `🛡️👔👤`, signup `🛡️🗺️🏢🏗️💼🔒`, admin `📥📜`.

Reflex: emoji-as-icons because no icon system was chosen, even though `lucide-vue-next` is installed and unused.

Fix: `deslop` — replace with lucide icons; give every icon a real semantic name.

### 2. Luxury domain-default trap — STRONG (color)
Navy `#0A1128`, gold `#D4AF37`, emerald, white. The visual identity of every "premium brokerage" ever. The hue has no project-level reason — nothing about RAJUK verification, escrow, or Bangladeshi land law is inherently navy-and-gold.

Reflex: luxury real estate = navy and gold.

Fix: `deslop`/`recolor` — keep one disciplined accent, flatten gradients, tint neutrals warm (deed/paper), make verification green a semantic role rather than a decoration.

### 3. Gradient everywhere — STRONG (color)
Gradient gold text in the hero (`highlight-gold`), `--color-gold-gradient` on brand icon, `btn-emerald`/`btn-gold` gradient buttons, gradient CTA box (`seller-cta-box`), gradient dashboard header, gradient EMI result card. Gradients are used as the "premium" finish on every important object.

Reflex: gradients = expensive.

Fix: flat single-hue surfaces; elevation comes from shadow and density, not gradients.

### 4. Stat monuments — STRONG (depth/proof)
Trust bar: `৳ 650+ Cr`, `100% Verified`, `15 Minutes`, `0% Encumbrance` at 2.2rem with per-item random colors (`#60A5FA`, `#F59E0B`). Seller CTA stat bubbles (`28 Days`, `2% Only`). Dashboard KPI cards, admin KPI cards. Numbers presented as self-evident proof with no story.

Reflex: big numbers = trust.

Fix: convert to proof with context — a claim sentence plus a supporting line; shrink monument scale; remove per-item colors.

### 5. Unearned blur — STRONG (depth)
`backdrop-filter: blur(24px)` on the hero search box, `blur(16px)` on sticky header, floating compare bar, `blur(10px)` map badge, `blur(8px)` card icon actions and `btn-outline-white`. There is no elevation system justifying any of it.

Reflex: glassmorphism = modern.

Fix: solid opaque surfaces; keep blur only on modal/drawer overlays where it separates the attention plane.

### 6. Center stack — PRESENT (composition)
Every section header is the same centered `section-tag` pill + title + subtitle: hero, categories, map, agents, contact. The homepage is a vertical stack of centered blocks.

Reflex: the safe middle.

Fix: left-align light-section headers; hero stays centered only because it is a decide surface. Break the monotony with one editorial composition (a lead feature card, a split trust row).

### 7. Default type — PRESENT (type)
Outfit + Plus Jakarta Sans, the standard AI pairing, with voice achieved by weight (800/900) and 0.68–0.78rem uppercase micro-labels on nearly every card. Display font applied to every number including stat monuments.

Reflex: heavy display font = premium.

Fix: tune a real scale, kill the micro-labels, restrict display usage, use weight contrast instead of shouting.

### 8. Bounce/pulse everywhere — PRESENT (motion)
Infinite `pulse-glow` on the floating WhatsApp button and `btn-hunter-pulse`, `floatSmooth`, no `prefers-reduced-motion` handling anywhere. Decorative motion on the most repeated element of the site.

Reflex: pulsing = attention = alive.

Fix: remove infinite decorative animation; keep only input-driven transitions.

### 9. Feature tile grid — FAINT→PRESENT (composition)
Trust bar is 4 equal stat columns; category grid is 4 equal cards with no priority; agent cards identical. Equal cards with nothing prioritized.

Reflex: uniform grid = organized.

Fix: give the category section a lead card; make the trust bar proof rows instead of equal columns.

### 10. Inline style chaos — STRONG (system)
Hundreds of inline `style=` attributes with raw hex (`#059669`, `#D4AF37`, `#60A5FA`, `#F59E0B`, `#25D366`, `#E11D48`) bypassing the token system (`--color-emerald`, `--color-gold`) that was built in `main.css`. Every element re-decides the palette ad hoc.

Reflex: no trust in the tokens.

Fix: on touched surfaces, remove inline color, use tokens.

### 11. Copy filler — PRESENT (voice)
"LUXURY", "VIP", "PREMIUM", "ELITE" repeated everywhere, "0% Dispute Guaranteed", "Supreme Court legal panel", "Client-Hunter". The voice is hype, not evidence. Specifics (RAJUK, Katha/Bigha, escrow banks, 15-minute SLA) are genuinely good and get buried by the shouting.

Reflex: louder = more convincing.

Fix: sentence-case, strip "luxury/VIP/premium" filler on touched surfaces; keep the concrete Bangladeshi specifics.

---

## Dominant diagnosis
The product has real substance (RAJUK/CDA verification, escrow settlement, katha/bigha units, NRB concierge) but the surface defaults to generic "luxury tech" dressing. This is an identity failure, not a polish problem: fix composition and color first (`deslop`), then type, depth, motion, and decoration.

## Fix priority
1. Composition: center stack, stat monuments, feature grid hierarchy
2. Color: gradient text/buttons, domain-default palette, inline hex
3. Type: micro-labels, weight shouting, display-font abuse
4. Depth: unearned blur removal
5. Motion: infinite pulse removal
6. Decoration: emoji → lucide
