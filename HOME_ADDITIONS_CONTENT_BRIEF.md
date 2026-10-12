## Content Brief: home addition contractor

**Mode:** Improve existing page: https://www.monconbuild.com/services/home-additions
**Cluster:** `cl-additions` (OpenSEO). ADU queries are carved out to a future `/services/adu-builder` page.
**Prepared:** October 11, 2026

### Search Intent
Commercial and transactional. A homeowner is choosing who to hire for a room addition or second story. Google answers with a **local pack first**. Below it, organic results are mostly directories (Houzz, Yelp, Angi, HomeGuide) and a few contractor service pages. Informational questions such as "second story addition sacramento" return an AI Overview, forums and pros/cons articles, which is a chance to answer cost, timeline and feasibility questions on the page. Readers are adults who have usually already decided to add on instead of moving. They want to know whether we build their kind of addition, in their county, and whether it will look original.

**Demand for this page (Search Console, Apr 7 – Oct 7, 2026, in-area only):** about 301 impressions at positions 8–47.
| Query | Impr | Pos |
|---|---|---|
| best home addition contractors near me | 92 | 25.1 |
| expanding living space northern california | 74 | 32.9 |
| second story additions sacramento | 47 | 35.9 |
| home addition designers near me | 44 | 8.1 |
| home addition sacramento / sacramento ca | 32 | ~47 |
| second story additions folsom | 8 | 41.6 |

About 205 more impressions came from out-of-area searches (Pacifica 167, Lafayette, Piedmont, Sherman Oaks, Moorpark). The rewrite should make the page's geography clear (see "Information Gain") so Google stops testing it in the Bay Area and Southern California.

### Competitor Analysis
Directories are excluded (Houzz, Yelp, Angi, HomeGuide, BuildZoom, Facebook). Scores are Depth / Formatting / SEO / UX, each out of 10.

| # | URL | Key H2 Sections | Est. Words | Score | Main Gap |
|---|-----|-----------------|------------|-------|----------|
| 1 | monstercontractor.com/room-addition-auburn/ | Room Addition Auburn (H1/H2/H3 repeated), Room Addition Services, Adding to Your Property, Who is Monster Contractor | ~1,100 | 23/40 (6/5/7/5) | Keyword-repetitive, long list of addition "types" with no detail, no real projects, no local permitting |
| 2 | barbourconstruction.org/home-addition-contractors-california/ | Types of Home Additions (room, kitchen extension, second-story, garage), Our Process (4 steps), FAQ (4) | ~650 | 23/40 (5/6/6/6) | Mixes Bay Area and Sacramento, generic permitting, no photos or case studies |
| 3 | auburnfoothillsconstruction.com (pack #1, organic #1 for "home addition contractor auburn ca") | Rooted in Auburn, Auburn Remodeling Services, testimonials | ~275 | 16/40 (2/5/3/6) | No additions content at all; wins on its Google Business Profile (14 reviews). Uses AI-looking images |
| 4 | blueheavenconstructions.com (pack #1, Sacramento) | Our Services → "Home & Room Additions" blurb | ~45 on additions | 13/40 (1/4/3/5) | Wins on its profile only; additions copy is reused kitchen text |

**Competitor average:** about 520 words. Nobody in this market has a substantive additions page. The organic results are winnable on content, and the map pack is won on reviews (see the Oct 10 competitive landscape report).

### Content Gaps and Opportunities
**Topic gaps (no competitor covers these):**
- Who issues the permit in each county: Placer County CDRA vs City of Auburn, Nevada County vs City of Grass Valley, El Dorado County vs City of Placerville, TRPA in the Tahoe basin, Sacramento City vs County, Yolo County vs City of Davis.
- Foothill site conditions that change an addition: sloped lots and foundations, WUI fire-zone construction (enclosed eaves, ember-resistant vents), well and septic setbacks that limit where an addition can go, snow-load engineering above 6,000 ft, HOA architectural review in El Dorado Hills.
- Second-story feasibility: whether the existing foundation and framing can carry a second floor, structural engineering, and living arrangements during construction.
- Making the addition look original: matching trim profiles, rooflines, siding and window details. This is Monument's finish-carpentry strength and nobody else mentions it.

**Depth gaps:** every competitor's process is four generic steps. Ours can say what happens at each step locally (site walk, engineering, plan check with the specific authority, inspections).

**Quality gaps:** no competitor shows real addition projects with a town and scope. Auburn Foothills appears to use generated images. There is no owner perspective anywhere.

**Problems on our current page to fix:**
- **Remove published prices.** The FAQ "How much does a home addition cost in Placer County?" (`frontend/src/data/faqs.js`, `homeAdditionsFAQs`) gives $200–$500/sq ft, $40k–$100k and $150k–$400k+. That breaks the project rule of no published prices for Monument's own work. Rewrite it around what drives cost and an itemized quote after a site visit.
- **Remove or source the "50–80% of its cost back" value claim** in "Why Add On vs. Moving?" (and check the property-value FAQ for the same claim). It is unsourced.
- **Broaden Process step 2.** It only mentions Placer County; cover all five counties.
- Keep: the 4-step process structure, the license box, and the additions feature list (expand it into the Types section).

### Winning Outline

**H1:** Home Addition Contractor for the Sierra Foothills &amp; Sacramento Region
**URL Slug:** /services/home-additions (keep, do not change)
**Target Word Count:** ~1,500 words including FAQs (competitor average ~520; current page ~700)

**Intro (keep / rewrite) (~110 words)**
- Primary keyword "home addition contractor" in the first sentence. Mention Colfax as home base and the five counties. Introduce the finish-carpenter angle: additions that look like they were always there.
- Format: 2 short paragraphs plus the existing CTA buttons.

**H2: Types of Home Additions We Build (~320 words) (strengthen; replaces the bare feature list)**
Secondary keyword "room addition" in the H2 body. Each H3 gets 1–2 short paragraphs.
- H3: Room Additions and Primary Suites (~70): bedrooms, family rooms, primary suite with bath. Secondary: "primary suite addition".
- H3: Second-Story Additions (~90). **FS target:** answer "Can you add a second story to a one-story house?" in 40–60 words: yes if the foundation and framing can carry it, which a structural engineer confirms before design. Secondary: "second story addition". Mention Sacramento and Folsom homes here, where those searches come from.
- H3: Bump-Outs and Kitchen Extensions (~50)
- H3: Garage Conversions and In-Law Suites (~50)
- H3: Sunrooms and Enclosed Porches (~40). Link the Sunroom Addition portfolio photo.
- Short ADU note (~30): we build ADUs too. Link to the ADU page when it exists; until then, link to Contact. Don't expand ADU here.

**H2: What Changes an Addition in the Foothills (~300 words) (new; main information gain)**
Use the primary keyword once in the body. Format: a lead-in sentence, then a table.
| Site condition | What it affects | How we plan for it |
|---|---|---|
| Sloped and oak-wooded lots | Foundation, drainage, deck framing | Engineered foundations, drainage planned before framing |
| WUI fire zones (Auburn, Grass Valley, Placerville) | Exterior materials, eaves, vents | Ember-resistant construction to current code |
| Well and septic | Where the addition can sit (setbacks) | Site layout around existing systems before design |
| Snow load (Truckee, South Lake Tahoe) | Roof framing, decks, short build season | Engineered for snow load, scheduled around the season |
| HOA review (El Dorado Hills) | Exterior design approval | Plans prepared to HOA guidelines |
| Older homes | Hidden structural and code issues | Planned for at the site walk, not discovered mid-job |
Close with 1–2 sentences on Title 24 energy requirements for new conditioned space.

**H2: Who Permits Your Addition (~150 words) (new)**
Format: a short table (county → permitting authority), each row linking its city page. Content already exists in `frontend/src/data/cities.js`; reuse it, don't contradict it. Secondary: "home addition permit". **FS target:** "Do I need a permit for a home addition in California?" Yes, a building permit is required for added square footage, plus planning or HOA approval where applicable.

**H2: Additions That Look Like They Were Always There (~150 words) (new; differentiator)**
The finish-carpentry angle: milling trim to match existing profiles, carrying rooflines and siding through, matching window and door casing. Link to Finish Carpentry and Custom Woodwork. First-person, plain-spoken.

**H2: Our Home Addition Process (~250 words) (keep and strengthen)**
Keep the 4 steps and make each locally specific:
1. Site walk and design (soil, slope, access, septic, existing structure)
2. Engineering and permits (structural engineer where needed; plan check with the right city or county)
3. Construction (we self-perform the carpentry and schedule the trades; inspections at each phase)
4. Finish work and walkthrough
Add one sentence on living at home during construction (how we separate the work area).

**H2: Recent Home Additions (~100 words plus 3–4 photos) (new; needs owner input)**
For each project: photo, town, type, and one challenge solved. Example: "Sunroom addition, Placer County — tied into an existing roofline on a sloped lot." Use the real Additions photo already in the portfolio. **Owner to supply 2–3 more projects with town names.** Do not use stock or generated images. Image alt text: include "home addition" plus the town.

**H2: Why Homeowners Hire Us for Additions (~100 words) (keep and strengthen)**
Keep the license box (CSLB #801602 link) and 25+ years. Add owner on the job (William Rogers), DIY Network, and a finish carpenter running every job. No star ratings or review counts.

**H2: Home Addition FAQs (~300 words, 6 questions, 40–60 words each) (rewrite)**
1. How much does a home addition cost? Cost drivers only (size, foundation, second story vs ground floor, finishes, site conditions); we give an itemized quote after a site visit. **No dollar figures.**
2. Do I need a permit for a home addition in California? (FS target)
3. How long does a home addition take? Phases: design and engineering, plan check, construction. Use ranges only if you can stand behind them.
4. Can we live at home during construction?
5. Will the addition match my house?
6. Should I build an addition or an ADU? Short answer, then link to the ADU page when it exists.

**CTA (keep):** free consultation, phone, contact form. Mention "home addition" and the service area in the CTA line.

**Schema:** keep the Service schema. The FAQ component outputs FAQPage markup; leaving it does no harm, but don't expect it to produce rich results.

### Recommended Meta Tags

**Title** (52 characters; matches the site's service-page pattern)
Home Addition Contractor | Colfax & Placer County CA

**Meta Description** (149 characters)
Room additions, second stories and primary suites built to match your home. Licensed contractor #801602 serving the foothills. Call for a free quote.

### Unique Angle and Information Gain
This would be the only additions page in the market that explains, county by county, **what actually changes an addition in the Sierra foothills**: who issues the permit (Placer CDRA, the City of Auburn, Nevada County, El Dorado County, TRPA), how slope, WUI fire rules, well and septic setbacks and snow load shape the design, and how a finish carpenter makes the new space match the original house. It would be backed by real Monument projects with town names and an owner who has built in these communities for 25 years. Every competitor offers a generic list of addition types and a four-step process. None shows real local projects or names a single permitting authority. Being specific about place also tells Google which region the page serves, which should cut the Bay Area and Southern California impressions.

### E-E-A-T Requirements
- Byline or short bio: William Rogers, finish carpenter and licensed GC, 25+ years, DIY Network. One or two sentences near the process or "Why us" section.
- CSLB #801602 linked to the CSLB license lookup (already on the page; keep it).
- Real project photos with town and scope. No stock or generated images.
- Permitting facts consistent with `cities.js`. Where a rule is cited (Title 24, WUI Chapter 7A, TRPA land coverage), name it plainly and don't overstate it.
- A visible "Last updated" date, optional.
- **Do not** add star ratings, review counts or price figures (project rules).

### Internal Linking Opportunities
This page is a spoke under Services; it links to the city pages and related services.
1. "second-story additions in Sacramento" → /service-areas/sacramento (from the Second-Story H3)
2. "home additions in El Dorado Hills" → /service-areas/el-dorado-hills (from the HOA row or permit table)
3. "additions in South Lake Tahoe" → /service-areas/south-lake-tahoe (snow-load row; "tahoe residential additions" has 40 impressions)
4. "finish carpentry" → /services/finish-carpentry (from "Look Like They Were Always There")
5. "see the sunroom addition" → /portfolio (from Recent Additions)

Already in place: "building and remodeling in Grass Valley" → /service-areas/grass-valley (PR #328). Keep it.

### Open Items for the Owner
- 2–3 real addition projects: town, type, one challenge solved, and photos.
- Confirm timeline ranges you're comfortable publishing, or say "it depends" and explain the phases.
- Confirm the WUI, snow-load and HOA examples match work you've actually done.
