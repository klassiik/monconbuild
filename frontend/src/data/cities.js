// City landing page content. Each entry is intentionally unique — written around
// the real building context of that community (permitting authority, elevation and
// climate, common architecture, and notable local regulations) so the pages are
// genuinely differentiated and not templated doorway pages.

export const CITIES = [
  {
    slug: 'auburn',
    name: 'Auburn',
    county: 'Placer County',
    region: 'Sierra Foothills',
    elevation: '~1,200 ft',
    zip: '95603',
    geo: { lat: 38.8966, lng: -121.0769 },
    tagline: 'General contractor & finish carpentry in Auburn, CA',
    intro:
      "Auburn sits at the gateway to the Sierra foothills, a Gold Rush town where historic Old Town Victorians share the map with ranch homes, mid-century builds, and newer hillside developments. Monument Construction has worked throughout Auburn and unincorporated Placer County for over 25 years, and that range of housing stock is exactly what we're built for.",
    localContext: [
      "Much of Auburn's character comes from older homes that were never meant for the way we live now — compartmentalized floor plans, undersized kitchens, and additions layered on over decades. A large share of our Auburn work is opening those homes up, adding square footage that actually matches the original architecture, and correcting the structural shortcuts that turn up once walls come off.",
      "Auburn's foothill setting also shapes the work. Sloped and oak-wooded lots mean foundations, drainage, and deck framing get real engineering attention, and much of the area falls within a Wildland-Urban Interface fire zone where ember-resistant materials and defensible-space clearances aren't optional."
    ],
    considerations: [
      { title: 'Permitting', text: 'Projects inside city limits go through the City of Auburn; homes in the surrounding foothills are permitted by the Placer County Community Development Resource Agency. We handle plans, submittals, and inspections for both.' },
      { title: 'Terrain & climate', text: 'Hillside and oak-woodland lots at roughly 1,200 ft, with hot dry summers and mild wet winters — a climate that rewards stable, warp-resistant trim materials and proper exterior detailing.' },
      { title: 'Fire-hardening', text: 'Many Auburn-area properties are in a WUI fire zone. We build to current ember-resistant standards — enclosed eaves, appropriate vents, and non-combustible exterior details where required.' },
      { title: 'Older-home structure', text: 'Historic and mid-century Auburn homes routinely need foundation, framing, or code updates uncovered mid-project. We plan for it rather than getting surprised by it.' }
    ],
    neighborhoods: ['Old Town Auburn', 'North Auburn', 'Christian Valley', 'Bowman', 'Ophir'],
    popularServices: ['home-additions', 'complete-remodeling', 'finish-carpentry', 'general-construction'],
    nearby: ['grass-valley', 'placerville', 'el-dorado-hills'],
  },
  {
    slug: 'grass-valley',
    name: 'Grass Valley',
    county: 'Nevada County',
    region: 'Sierra Foothills',
    elevation: '~2,400 ft',
    zip: '95945',
    geo: { lat: 39.2191, lng: -121.0611 },
    tagline: 'Historic-home remodeling & construction in Grass Valley, CA',
    intro:
      "Grass Valley is one of the best-preserved Gold Rush towns in California, and its housing reflects it — Victorians, Craftsman bungalows, and mining-era cottages downtown, giving way to forested acreage as you head out of town. Restoring and updating these homes without erasing their character is some of the most rewarding work we do.",
    localContext: [
      "Working on Grass Valley's older homes means matching what's already there: milling trim and moldings to period profiles, rebuilding porches and staircases, and blending additions so seamlessly that they read as original. Our finish-carpentry background is what makes that possible — most of these details can't be bought off a shelf.",
      "Beyond downtown, Grass Valley's forested lots at 2,400 ft bring a four-season climate with real snow and a high wildfire-severity rating. That drives decisions on framing, exterior materials, deck design, and the ember-resistant detailing the area increasingly requires."
    ],
    considerations: [
      { title: 'Permitting', text: 'Work is permitted through the City of Grass Valley or Nevada County depending on location. We manage submittals and inspections and are used to the added review that comes with historic properties.' },
      { title: 'Historic character', text: 'Period-appropriate trim, moldings, doors, and cabinetry — custom-milled in our shop to match existing profiles rather than approximated with stock materials.' },
      { title: 'Fire & forest lots', text: 'Grass Valley sits in a high fire-severity zone. We build with defensible space and ember-resistant construction in mind on wooded and rural parcels.' },
      { title: 'Rural systems', text: 'Many outlying properties are on well and septic. We coordinate additions and ADUs around those systems and the setbacks they require.' }
    ],
    neighborhoods: ['Downtown Grass Valley', 'Alta Sierra', 'Cedar Ridge', 'Chicago Park'],
    popularServices: ['complete-remodeling', 'custom-woodwork', 'finish-carpentry', 'home-additions'],
    nearby: ['auburn', 'placerville'],
  },
  {
    slug: 'el-dorado-hills',
    name: 'El Dorado Hills',
    county: 'El Dorado County',
    region: 'Sierra Foothills',
    elevation: '~800 ft',
    zip: '95762',
    geo: { lat: 38.6857, lng: -121.0822 },
    tagline: 'High-end remodeling & custom woodwork in El Dorado Hills, CA',
    intro:
      "El Dorado Hills is one of the region's most sought-after communities — largely newer, master-planned neighborhoods of substantial custom homes set into rolling foothills. The work here leans toward high-end: kitchen and bath remodels, built-in cabinetry, and additions that hold up to the standard of the homes around them.",
    localContext: [
      "Homeowners in Serrano, Blackstone, and the surrounding developments tend to invest in staying put and elevating what they have — reconfiguring open-concept living spaces, building custom entertainment and office built-ins, and expanding primary suites and outdoor living areas. Our finish-carpentry roots show in exactly this kind of detail-driven work.",
      "The larger footprints and hillside lots common to El Dorado Hills mean additions and structural changes get careful engineering, and the newer construction means we're often working to a high finish standard from the first day of demo to the last piece of trim."
    ],
    considerations: [
      { title: 'Permitting', text: 'El Dorado Hills is unincorporated, so projects are permitted through El Dorado County. We handle the full plan-check and inspection process.' },
      { title: 'High-end finishes', text: 'Custom cabinetry, built-ins, wainscoting, and trim carpentry executed to the finish level these homes are held to.' },
      { title: 'HOA coordination', text: 'Many neighborhoods have architectural-review requirements. We work within HOA design guidelines for exterior additions and changes.' },
      { title: 'Larger footprints', text: 'Room additions, primary-suite expansions, and outdoor living spaces engineered for the larger, often hillside, lots typical of the area.' }
    ],
    neighborhoods: ['Serrano', 'Blackstone', 'Marble Valley', 'Governors Village'],
    popularServices: ['complete-remodeling', 'custom-woodwork', 'home-additions', 'finish-carpentry'],
    nearby: ['placerville', 'sacramento'],
  },
  {
    slug: 'placerville',
    name: 'Placerville',
    county: 'El Dorado County',
    region: 'Sierra Foothills',
    elevation: '~1,860 ft',
    zip: '95667',
    geo: { lat: 38.7296, lng: -120.7985 },
    tagline: 'Remodeling, additions & ADUs in Placerville, CA',
    intro:
      "Placerville — the old \"Hangtown\" — is the El Dorado County seat and one of the foothills' most historic towns, with a protected Main Street district and a wide mix of older in-town homes and rural acreage stretching toward Apple Hill. That split, historic downtown on one side and rural parcels on the other, defines the work here.",
    localContext: [
      "In town, much of our Placerville work is sensitive renovation of older homes: updating systems and layouts while preserving the details that give these houses their value. On the rural properties surrounding Placerville, the demand shifts toward home additions, shop and outbuilding construction, and accessory dwelling units (ADUs) that add rental or multi-generational space.",
      "Placerville's foothill elevation and forested, fire-prone surroundings shape the construction just as they do across the county — defensible space, ember-resistant detailing, and drainage on sloped lots all factor into how we build here."
    ],
    considerations: [
      { title: 'Permitting', text: 'Projects go through the City of Placerville or El Dorado County depending on location. We manage plans, submittals, and inspections for both, including the extra review historic-district properties can require.' },
      { title: 'ADUs on rural lots', text: "California's ADU rules make added dwelling space more attainable than ever. We design and build ADUs around each property's setbacks, access, and well/septic systems." },
      { title: 'Historic renovation', text: 'Careful updates to older Placerville homes — matching trim and profiles and respecting the character of the original build.' },
      { title: 'Fire-prone terrain', text: 'Forested foothill parcels call for defensible-space planning and ember-resistant construction on additions and outbuildings.' }
    ],
    neighborhoods: ['Historic Downtown', 'Gold Hill', 'Apple Hill corridor', 'Pollock Pines (nearby)'],
    popularServices: ['home-additions', 'complete-remodeling', 'general-construction', 'residential-projects'],
    nearby: ['el-dorado-hills', 'south-lake-tahoe', 'auburn'],
  },
  {
    slug: 'south-lake-tahoe',
    name: 'South Lake Tahoe',
    county: 'El Dorado County',
    region: 'Lake Tahoe Basin',
    elevation: '~6,200 ft',
    zip: '96150',
    geo: { lat: 38.9399, lng: -119.9772 },
    tagline: 'Cabin remodels & alpine construction in South Lake Tahoe, CA',
    intro:
      "Building in South Lake Tahoe is unlike anywhere else we work. At 6,200 feet, everything is governed by heavy snow loads, a short building season, and the Tahoe Regional Planning Agency (TRPA) — the basin's dedicated environmental authority. Cabin renovations and second-home remodels here demand a contractor who plans around all three.",
    localContext: [
      "TRPA regulations are the defining factor of any Tahoe project. Land-coverage limits, Best Management Practices (BMPs) for erosion and runoff, and basin-specific design standards all have to be built into a project from the start — not discovered midway. We scope Tahoe work with those constraints front and center.",
      "The alpine climate drives the rest. Roofs, decks, and additions are engineered for serious snow load; the tight seasonal window means schedules are planned carefully; and defensible space matters as much here as anywhere in the Sierra. Most of our Tahoe work is renovating and expanding cabins and vacation homes to live well in every season."
    ],
    considerations: [
      { title: 'TRPA compliance', text: 'Tahoe basin projects must meet Tahoe Regional Planning Agency rules — land coverage, BMPs, and design standards. We build these requirements into the plan from day one.' },
      { title: 'Snow-load engineering', text: 'Roofs, decks, and additions engineered for heavy alpine snow load at 6,200 ft, with detailing that stands up to freeze-thaw cycles.' },
      { title: 'Short build season', text: "Tahoe's construction window is short. We plan scope, materials, and scheduling around it to keep projects moving." },
      { title: 'Cabin & second homes', text: 'Renovations and additions to vacation homes and cabins, built for year-round durability and low-maintenance ownership.' }
    ],
    neighborhoods: ['Al Tahoe', 'Bijou', 'Tahoe Keys', 'Montgomery Estates'],
    popularServices: ['complete-remodeling', 'home-additions', 'general-construction', 'custom-woodwork'],
    nearby: ['placerville'],
  },
  {
    slug: 'sacramento',
    name: 'Sacramento',
    county: 'Sacramento County',
    region: 'Sacramento Valley',
    elevation: '~30 ft',
    zip: '95818',
    geo: { lat: 38.5616, lng: -121.4944 },
    tagline: 'Craftsman & bungalow remodeling in Sacramento, CA',
    intro:
      "Sacramento's established neighborhoods — Land Park, East Sacramento, Curtis Park, Midtown — are full of the early-20th-century Craftsman bungalows, Tudors, and mid-century homes that reward skilled remodeling. We bring finish-carpentry precision to updating these homes without stripping away the character that makes them worth owning.",
    localContext: [
      "The classic Sacramento remodel is a whole-house or kitchen update on an older home: reworking a chopped-up floor plan, restoring or matching original millwork, and adding thoughtful square footage that reads as though it was always there. In the city's historic and conservation districts, that sensitivity isn't just good taste — it's often required by design review.",
      "The valley setting brings its own realities. Triple-digit summers put a premium on stable materials and sound exterior detailing, and Sacramento's expansive clay soils and mature street trees mean foundations and additions on older homes get real attention before the finish work begins."
    ],
    considerations: [
      { title: 'Permitting', text: 'Projects in the city go through the City of Sacramento; surrounding communities are permitted by Sacramento County. We handle plan-check and inspections, including historic-district design review where it applies.' },
      { title: 'Period-correct remodeling', text: 'Craftsman, Tudor, and mid-century detailing — millwork, built-ins, and trim matched to the era of the home.' },
      { title: 'Valley climate', text: 'Hot, dry summers reward warp-resistant materials and careful exterior detailing on these older homes.' },
      { title: 'Older foundations', text: "Sacramento's clay soils and mature landscaping mean foundations and additions on older homes get careful structural planning." }
    ],
    neighborhoods: ['Land Park', 'East Sacramento', 'Curtis Park', 'Midtown'],
    popularServices: ['complete-remodeling', 'home-additions', 'finish-carpentry', 'custom-woodwork'],
    nearby: ['el-dorado-hills', 'placerville'],
  },
  {
    slug: 'davis',
    name: 'Davis',
    county: 'Yolo County',
    region: 'Sacramento Valley',
    elevation: '~52 ft',
    zip: '95616',
    geo: { lat: 38.5449, lng: -121.7405 },
    tagline: 'Remodeling, additions & ADUs in Davis, CA',
    intro:
      "Davis is a university town with a housing stock all its own — early-1900s bungalows in the Old East and Old North conservation districts, waves of mid-century ranch homes, and the compact infill neighborhoods the city is known for. With UC Davis anchoring constant demand for housing, much of the work here is making established homes live larger and smarter.",
    localContext: [
      "The classic Davis project is getting more out of a lot that isn't getting any bigger: opening up a compartmentalized ranch floor plan, remodeling a kitchen that hasn't changed since the house was built, or adding an accessory dwelling unit (ADU) for rental income or family in a market where campus-driven demand keeps every square foot valuable. In the older core neighborhoods, that work has to respect the conservation-district character — original siding profiles, porch details, and trim that stock materials don't match.",
      "Davis has also been serious about energy performance longer than almost any city in California — it helped pioneer residential energy standards back in the 1970s — and today's projects are expected to meet high bars for insulation, glazing, and efficiency. Combined with the valley's triple-digit summers and expansive clay soils, that shapes everything from foundation planning to window and material selection."
    ],
    considerations: [
      { title: 'Permitting', text: 'Projects inside the city go through the City of Davis Building Division; surrounding rural properties are permitted by Yolo County. We manage plans, submittals, and inspections for both, including the added review in conservation districts.' },
      { title: 'ADUs & infill', text: "Strong rental demand near UC Davis makes ADUs one of the most requested projects in town. We design and build them around each lot's setbacks, alley access, and the city's ADU standards." },
      { title: 'Energy standards', text: "Davis expects high energy performance from remodels and additions. We build to current Title 24 requirements with insulation, glazing, and shading choices suited to hot valley summers." },
      { title: 'Older-home character', text: 'Bungalows and mid-century ranches in the core neighborhoods call for period-matched trim, siding, and porch detailing — the kind of millwork our finish-carpentry background is built for.' }
    ],
    neighborhoods: ['Old East Davis', 'Old North Davis', 'College Park', 'South Davis'],
    popularServices: ['home-additions', 'complete-remodeling', 'finish-carpentry', 'custom-woodwork'],
    nearby: ['sacramento'],
  },
];

export const getCityBySlug = (slug) => CITIES.find((c) => c.slug === slug);

export const cityStaticPaths = () => CITIES.map((c) => `service-areas/${c.slug}`);
