# Ledgerly — UI research notes

Before building each part I studied real-world references on [Mobbin](https://mobbin.com) (sections, screens and flows). For each part I looked at 3–5 references, noted the shared pattern, then built an original version. No brand styling, copy, logos or assets were reused.

| Section / page | References looked at | Pattern used | Why |
| --- | --- | --- | --- |
| Hero | Anchor, Intercom (fintech), Fruitful, Vizcom | Two-column: eyebrow → H1 → one-line sub → primary + secondary button → small trust line; product visual on the right, stacks below on mobile | Every fintech reference leads with a single product object instead of photography. Fruitful's "auto paycheck split" confirmed the split idea reads instantly when shown as a UI card. |
| Logo marquee | Legora, Notion, Voiceflow (inline strips); Granola, Intercom (logo grids); Givingli, Grammarly | Caption inline on the left behind a hairline divider, logos on the right as mark + wordmark in one muted tone; marquee for motion, static 4×2 grid for reduced motion | Minimal references keep caption and logos on one line and give every logo a glyph, which reads as real brands. Each marquee copy is wider than a 1920px screen so there is never a gap; reduced-motion users get the Granola-style grid instead of a half-empty row. |
| Problem stats | Wise, Amplemarket, monday.com, Legora | Three equal cards, number very large, one short line of context under it | Wise's card version makes each stat a self-contained unit, which works better with count-up than a loose row. |
| Payment split | Contra and Square invoice flows (line items, totals, tax rows) | Receipt rows: label · dotted leader · right-aligned mono amount; total row under a rule | Invoices in both flows use right-aligned tabular amounts; the leader line keeps label and amount connected at any width. |
| How it works | Braintrust, Mews, FLORA, Intercom (plus PayPal, Wise, Grammarly earlier) | Three equal cards: visual panel on top with a mini product UI for the step, then left-aligned "01 / 03", title and one line; small arrows between cards | Cards with a built UI per step explain the flow faster than text alone, and left-aligned text reads better than centered columns. |
| Feature tabs | Apollo, Framer, Cursor, Ada | Tab strip on top, text + bullets left, mock UI card right; auto-advance progress inside the active tab | Apollo's tab strip with the active tab filled, plus a progress bar, signals auto-advance clearly. Becomes an accordion on mobile since tab strips overflow at 390px. |
| Who it's for | Framer "is for" sub-nav, Apollo tabs, Charma | Segmented tab control; panel with photo left (metric as a caption card on the photo), quote with avatar right, "what they use most" chips at the bottom | Putting the metric on the photo removes the empty gap; the chips tie each audience to concrete features. |
| Testimonials | Slash, Charma, Contractbook, Fluz, Clay, Craft | Featured story: portrait left, quote right, a 3-up result row underneath; six smaller cards in an auto-scrolling loop (pauses on hover, focus or a Pause button; static grid for reduced motion) | Slash and Contractbook pair a person with numbers, which reads as evidence. The loop shows all six without cut-off cards, and the pause control meets WCAG 2.2.2 for moving content. |
| Security | Maze, Grammarly, Grain, Garden | Full-width inverse section, short heading, badge grid with icon + label | Maze's dark block with a 3-up icon grid is the clearest; we kept badges as text chips (no certification logos we don't have). |
| Pricing | HoneyBook, Amie, PamPam, Oku; Vanta, Maze, Sprig; Meetup, Square, DoorDash (pricing pages) | Header left with the Monthly/Yearly toggle right; cards ordered name → price → button (aligned across cards) → three key numbers as receipt rows → "Everything in X, plus" list; one "Every plan includes" strip under the cards; yearly shows struck-through monthly price and the saving | Vanta/Maze's "Everything in X, plus" stops repeating features; Sprig/HoneyBook put the button high so it lines up. Key numbers (FX fee, accounts, invoices) are what freelancers compare first, so they get their own block. |
| FAQ | Zendesk, HubSpot, Pangram, beehiiv | Heading left, single-column accordion right with full-width rows and a +/− indicator | Zendesk's single column with dividers reads best; heading on the left (HubSpot-style) uses desktop width without making long questions wrap. |
| Blog preview (home) | Retool, Rox, Chronicle, Duolingo | Title left with a "Read all articles" link right, then the three latest posts as cards (cover, category, title, date) | Same card as /blog so the two feel connected; three posts is enough to show the topics without competing with the CTA. |
| Final CTA | Linear, Dovetail, Dropbox, OpenTable | Full-width dark band: headline, primary + secondary button and three reassurance points left; tilted receipt with a "$0 DUE" stamp right | A dark band clearly ends the page; the receipt keeps the product's visual language without leaving a lone card in empty space. |
| Footer | BAGGU, Spade, Employment Hero, In Common With | Link columns + newsletter field on one row, legal row, oversized wordmark cropped by the bottom edge | BAGGU's cropped wordmark; Spade's compact newsletter input with an inline submit. |
| Invoice / receipt cards | Square client view, Shopify bill, Descript invoice, fal invoices | Header (number, client), rows with right-aligned amounts, status pill, total under a rule | All references put status as a small pill next to the total; we turned it into a stamp for the hero moment. |
| Contact | DoorDash Merchant help, GetYourGuide help, SoundCloud form | Form left with labels above inputs; support cards right | Labels above inputs (not placeholders) is consistent across refs and better for accessibility. Success state reuses the receipt pattern. |
| Blog index | GetYourGuide, NYT, Sweatpals | Featured post on top, filter chips, 3-column card grid with category, title, excerpt, date | Chip filters (Sweatpals) are lighter than a sidebar; card anatomy follows GetYourGuide. Covers are built UI, not photos. |
| 404 | Snowflake, GetYourGuide, Shopify | Centered object + headline + one line + two buttons, nav and footer kept | All refs keep it short and centered; the receipt with an "UNPAID" stamp ties it to the product. |
| Flows | Contra "Sending an invoice", Square "Creating an invoice" | Send → client pays → status updates | Informed the three How-it-works steps and the copy for the Invoices feature tab. |

## Photo credits

Stock photos from [Unsplash](https://unsplash.com) (free licence, not Unsplash+), hotlinked from Unsplash's CDN as their API guidelines ask. Edit `lib/images.ts` to swap any photo. Scene photos are used in the hero, audience tabs and blog; portraits are listed separately below.

| Slot | Photo | Photographer |
| --- | --- | --- |
| hero | Laptop on a wooden desk with a small plant | [Kari Shea](https://unsplash.com/@karishea) |
| designer | Designer working on a drawing tablet next to colour swatches | [Theme Photos](https://unsplash.com/@themephotos) |
| developer | Laptop showing code on a desk | [AltumCode](https://unsplash.com/@altumcode) |
| writer | Fountain pen resting on a lined notebook | [Aaron Burden](https://unsplash.com/@aaronburden) |
| studio | Small team meeting around a table in a studio | [Cherrydeck](https://unsplash.com/@cherrydeck) |
| overseas | Person working on a laptop by an airport window at sunrise | [Daniel Gomez](https://unsplash.com/@naturelensephotographer) |
| tax | Calculator and receipts on a desk next to a laptop | [Jakub Żerdzicki](https://unsplash.com/@jakubzerdzicki) |
| rates | Two people talking over coffee at a wooden table | [Phil Desforges](https://unsplash.com/@storybyphil) |
| fx | Pile of euro banknotes in different denominations | [Ibrahim Boran](https://unsplash.com/@ibrahimboran) |
| checklist | Monthly planner with two pens | [2H Media](https://unsplash.com/@2hmedia) |
| team | Team working around a long wooden table | [CoWomen](https://unsplash.com/@cowomen) |

### Portraits

Used for testimonial and hero avatars at the user's request. The names and quotes beside them are fictional placeholders; swap in real customers (with their consent) before launch.

| Slot | Photographer |
| --- | --- |
| sofia | [Clay Elliot](https://unsplash.com/@ibidsy) |
| tomas | [Jurica Koletić](https://unsplash.com/@juricakoletic) |
| priya | [Annika Palmari](https://unsplash.com/@palmariannika) |
| daniel | [Ryan Hoffman](https://unsplash.com/@ryanhoffman007) |
| hannah | [Troy Spoelma](https://unsplash.com/@spoelee4) |
| lucas | [LinkedIn Sales Solutions](https://unsplash.com/@linkedinsalesnavigator) |
| grace | [Christina @ wocintechchat.com](https://unsplash.com/@wocintechchat) |
| avatar1 | [Michael Dam](https://unsplash.com/@michaeldam) |
| avatar2 | [Danny Postma](https://unsplash.com/@dannypostma) |
| avatar3 | [Christina @ wocintechchat.com](https://unsplash.com/@wocintechchat) |
| avatar4 | [Joseph Gonzalez](https://unsplash.com/@miracletwentyone) |
