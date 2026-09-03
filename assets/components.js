/* Every part of both Straddie twins, one plain sentence each. Read from the repositories on 2 September 2026.
   build: first (minjerribah-living-twin) or second (second-island). status: running, partial, designed.
   The pages count from this list, so the counts on screen are the list, not a claim typed elsewhere. */
window.TWIN_COMPONENTS = [
  /* ---------------- FIRST BUILD: the world ---------------- */
  { build: 'first', area: 'world', name: 'The island', file: 'src/world/island.js', status: 'running', what: 'The ground everything stands on: a height map of the island, 908 by 1314 cells at 32 metres, with the map projection, land cover and named regions every other part reads.' },

  /* ---------------- FIRST BUILD: environment ---------------- */
  { build: 'first', area: 'environment', name: 'Tide', file: 'src/systems/environment/tide.js', status: 'running', what: 'The tide at the Dunwich standard port from a seven-constituent harmonic model, read at stations around the island so high water at Amity Point is not high water at the Gorge.' },
  { build: 'first', area: 'environment', name: 'Daylight', file: 'src/systems/environment/daylight.js', status: 'running', what: 'Sunrise, sunset, the sun\'s height and the moon\'s phase for the island\'s latitude and longitude, worked out exactly for any minute.' },
  { build: 'first', area: 'environment', name: 'Weather', file: 'src/systems/environment/weather.js', status: 'running', what: 'A simulated sky that keeps the island living; when the clock is live and a real reading is fresh, the real reading wins and the screen says so.' },

  /* ---------------- FIRST BUILD: ecology ---------------- */
  { build: 'first', area: 'ecology', name: 'Vegetation', file: 'src/systems/ecology/vegetation.js', status: 'running', what: 'What grows where, from the land cover, so the trees on screen follow the ground.' },
  { build: 'first', area: 'ecology', name: 'Koalas', file: 'src/systems/ecology/koala.js', status: 'running', what: 'Koalas in the forest patches, moving and at risk on the roads; a koala hit reaches the rescue call, the notice bar and the chronicle.' },
  { build: 'first', area: 'ecology', name: 'Whales', file: 'src/systems/ecology/whales.js', status: 'running', what: 'Whales off the headland in their season, drawn in daylight and not at night.' },
  { build: 'first', area: 'ecology', name: 'Shorebirds', file: 'src/systems/ecology/shorebirds.js', status: 'running', what: 'Shorebirds on the flats and beaches.' },
  { build: 'first', area: 'ecology', name: 'Marine life', file: 'src/systems/ecology/marine.js', status: 'running', what: 'Life in the water around the island.' },
  { build: 'first', area: 'ecology', name: 'Dunes', file: 'src/systems/ecology/dunes.js', status: 'running', what: 'The sand dunes and how they move.' },
  { build: 'first', area: 'ecology', name: 'Lakes', file: 'src/systems/ecology/lakes.js', status: 'running', what: 'The island\'s lakes and the water table beneath them.' },

  /* ---------------- FIRST BUILD: infrastructure ---------------- */
  { build: 'first', area: 'infrastructure', name: 'Power', file: 'src/systems/infrastructure/power.js', status: 'running', what: 'Electricity supply and demand across the island.' },
  { build: 'first', area: 'infrastructure', name: 'Water', file: 'src/systems/infrastructure/water.js', status: 'running', what: 'Water supply and use.' },
  { build: 'first', area: 'infrastructure', name: 'Waste', file: 'src/systems/infrastructure/waste.js', status: 'running', what: 'Rubbish and recycling, including bin night.' },
  { build: 'first', area: 'infrastructure', name: 'Telecoms', file: 'src/systems/infrastructure/telecoms.js', status: 'running', what: 'Phone and internet coverage.' },
  { build: 'first', area: 'infrastructure', name: 'Below the sand', file: 'src/systems/infrastructure/subterranean.js', status: 'running', what: 'A proposed production works below the sand. It is not built, not approved, not funded, not sited and not consented, and every screen about it opens by saying so.' },
  { build: 'first', area: 'infrastructure', name: 'Contributed features', file: 'src/systems/infrastructure/contributed.js', status: 'running', what: 'Public features an islander pinned on the map himself: picnic tables, bubblers, bus stops, each with who put it there and when.' },

  /* ---------------- FIRST BUILD: economy ---------------- */
  { build: 'first', area: 'economy', name: 'Businesses', file: 'src/systems/economy/businesses.js', status: 'running', what: 'Every business from the pack, with trading hours graded published, listed or estimate, and closed ones kept closed so they are not re-added from a stale directory.' },
  { build: 'first', area: 'economy', name: 'Tourism', file: 'src/systems/economy/tourism.js', status: 'running', what: 'Visitors and what they spend, by season and school holidays.' },
  { build: 'first', area: 'economy', name: 'Housing', file: 'src/systems/economy/housing.js', status: 'running', what: 'Dwellings, occupancy and holiday lettings.' },
  { build: 'first', area: 'economy', name: 'Jobs', file: 'src/systems/economy/jobs.js', status: 'running', what: 'Who works where.' },
  { build: 'first', area: 'economy', name: 'Prices', file: 'src/systems/economy/prices.js', status: 'running', what: 'What things cost on an island where everything arrives by barge.' },
  { build: 'first', area: 'economy', name: 'Community ledger', file: 'src/systems/economy/chour.js', status: 'running', what: 'The community contribution ledger. It counts money only, on purpose, and the reason is written in the file.' },

  /* ---------------- FIRST BUILD: people ---------------- */
  { build: 'first', area: 'people', name: 'Events', file: 'src/systems/agents/events.js', status: 'running', what: 'What is on today, from the events pack, with the organiser and the source.' },
  { build: 'first', area: 'people', name: 'Population', file: 'src/systems/agents/population.js', status: 'running', what: 'Around two thousand generated residents with homes, jobs and relationships. No real person is in it.' },
  { build: 'first', area: 'people', name: 'Needs', file: 'src/systems/agents/needs.js', status: 'running', what: 'What residents need through a day: food, rest, work, company.' },
  { build: 'first', area: 'people', name: 'Schedules', file: 'src/systems/agents/schedule.js', status: 'running', what: 'The daily round: get up, go to work, walk the dog, put the bins out, go to bed.' },
  { build: 'first', area: 'people', name: 'Social ties', file: 'src/systems/agents/social.js', status: 'running', what: 'Who knows whom, and how that carries news and mood.' },
  { build: 'first', area: 'people', name: 'Visitors', file: 'src/systems/agents/visitors.js', status: 'running', what: 'Day trippers and holiday makers arriving by boat.' },

  /* ---------------- FIRST BUILD: movement ---------------- */
  { build: 'first', area: 'movement', name: 'Navigation', file: 'src/systems/movement/navigation.js', status: 'running', what: 'Finding a way along the road graph. Some requests fail because the geography pack does not carry every street, and the twin counts the failure rather than drawing a road that is not there.' },
  { build: 'first', area: 'movement', name: 'Traffic', file: 'src/systems/movement/traffic.js', status: 'running', what: 'Vehicles on the roads.' },
  { build: 'first', area: 'movement', name: 'Crowds', file: 'src/systems/movement/crowd.js', status: 'running', what: 'People on foot in the townships and on the beaches.' },
  { build: 'first', area: 'movement', name: 'Ferry', file: 'src/systems/movement/ferry.js', status: 'running', what: 'The boats and the barge on the published timetable, and what a cancelled barge does to the day.' },

  /* ---------------- FIRST BUILD: civic ---------------- */
  { build: 'first', area: 'civic', name: 'Policy levers', file: 'src/systems/civic/policy.js', status: 'running', what: 'Sixty-four researched levers with who decides each: nineteen are the council seat\'s to decide, eighteen you can fund but not decide, twenty-six you can only ask for, one you can only watch.' },
  { build: 'first', area: 'civic', name: 'Council', file: 'src/systems/civic/council.js', status: 'running', what: 'The council process: commission a study, lodge the thing, wait for the information request.' },
  { build: 'first', area: 'civic', name: 'Sentiment', file: 'src/systems/civic/sentiment.js', status: 'running', what: 'Public mood by group, moved by what happens on the island.' },
  { build: 'first', area: 'civic', name: 'Budget', file: 'src/systems/civic/budget.js', status: 'running', what: 'What a study or a work costs and who pays.' },
  { build: 'first', area: 'civic', name: 'Consultation', file: 'src/systems/civic/consultation.js', status: 'running', what: 'Consultations and petitions; a petition is a list of names unless a consultation came back in favour.' },
  { build: 'first', area: 'civic', name: 'Legislation', file: 'src/systems/civic/legislation.js', status: 'running', what: 'Which Acts bind which person, and why.' },

  /* ---------------- FIRST BUILD: story ---------------- */
  { build: 'first', area: 'story', name: 'Director', file: 'src/systems/narrative/director.js', status: 'running', what: 'Watches the island for moments worth telling.' },
  { build: 'first', area: 'story', name: 'Storylines', file: 'src/systems/narrative/storylines.js', status: 'running', what: 'Threads that open and close over days. The layer is thin against its brief and the repository says so.' },
  { build: 'first', area: 'story', name: 'Chronicle', file: 'src/systems/narrative/chronicle.js', status: 'running', what: 'The island\'s own written record of what happened.' },

  /* ---------------- FIRST BUILD: render layers ---------------- */
  { build: 'first', area: 'render', name: 'Camera', file: 'src/render/camera.js', status: 'running', what: 'Five ways of looking: planner, street, follow, drone and cinematic, with bookmarks for the townships and a photo mode.' },
  { build: 'first', area: 'render', name: 'Terrain', file: 'src/render/layers/terrain.js', status: 'running', what: 'The ground, drawn from the height map.' },
  { build: 'first', area: 'render', name: 'Ocean', file: 'src/render/layers/ocean.js', status: 'running', what: 'The sea, following the tide at each station. The bay side renders too green and the repository lists that as a known fault.' },
  { build: 'first', area: 'render', name: 'Sky', file: 'src/render/layers/sky.js', status: 'running', what: 'Sky, sun and moon, following daylight.' },
  { build: 'first', area: 'render', name: 'Flora', file: 'src/render/layers/flora.js', status: 'running', what: 'Trees and scrub on the ground.' },
  { build: 'first', area: 'render', name: 'Buildings', file: 'src/render/layers/buildings.js', status: 'running', what: 'Houses and buildings. About 1,900 of them are placed by rule where roughly 1,050 real footprints exist and are not yet used.' },
  { build: 'first', area: 'render', name: 'Roads', file: 'src/render/layers/roads.js', status: 'running', what: 'The road network.' },
  { build: 'first', area: 'render', name: 'People', file: 'src/render/layers/people.js', status: 'running', what: 'About 2,300 people drawn at a township in four draw calls.' },
  { build: 'first', area: 'render', name: 'Event sites', file: 'src/render/layers/eventsite.js', status: 'running', what: 'What is on, on the ground.' },
  { build: 'first', area: 'render', name: 'Contributed map', file: 'src/render/layers/contributed.js', status: 'running', what: 'Survey-post markers for the islander-pinned features, with nameplates.' },
  { build: 'first', area: 'render', name: 'Vehicles', file: 'src/render/layers/vehicles.js', status: 'running', what: 'Cars and the barge.' },
  { build: 'first', area: 'render', name: 'Fauna', file: 'src/render/layers/fauna.js', status: 'running', what: 'Koalas in the trees, whales off the headland, birds.' },
  { build: 'first', area: 'render', name: 'Weather effects', file: 'src/render/layers/weatherfx.js', status: 'running', what: 'Rain, haze and wind you can see.' },
  { build: 'first', area: 'render', name: 'Underground', file: 'src/render/layers/underground.js', status: 'running', what: 'The proposed works below the sand, drawn only as proposed.' },
  { build: 'first', area: 'render', name: 'Info views', file: 'src/render/layers/infoview.js', status: 'running', what: 'Twenty-two views that paint data over the ground in five groups: land, water, life, people, networks. Every view resolves to published state.' },
  { build: 'first', area: 'render', name: 'Selection', file: 'src/render/layers/selection.js', status: 'running', what: 'What you clicked, highlighted.' },
  { build: 'first', area: 'render', name: 'Post effects', file: 'src/render/layers/postfx.js', status: 'running', what: 'Colour and light finishing on the whole picture.' },
  { build: 'first', area: 'render', name: 'Soundscape', file: 'src/audio/audio.js', status: 'running', what: 'A generative soundscape with a mixer: surf, wind, birds, engines.' },

  /* ---------------- FIRST BUILD: boards ---------------- */
  { build: 'first', area: 'boards', name: 'Today', file: 'src/ui/panels/today.js', status: 'running', what: 'The noticeboard the island opens as: the date, the tide, the light, the crossing, the conditions, each marked real or a simulation.' },
  { build: 'first', area: 'boards', name: 'Heads-up bar', file: 'src/ui/panels/hud.js', status: 'running', what: 'The bar across the top: air, wind, swell, tide, UV, fire danger, crossing conditions, the clock and its mode.' },
  { build: 'first', area: 'boards', name: 'Notifications', file: 'src/ui/panels/notifications.js', status: 'running', what: 'Things that just happened.' },
  { build: 'first', area: 'boards', name: 'Info views', file: 'src/ui/panels/infoviews.js', status: 'running', what: 'The switch for the twenty-two data views.' },
  { build: 'first', area: 'boards', name: 'Inspector', file: 'src/ui/panels/inspector.js', status: 'running', what: 'Click anything and this fills: what it is, where the record came from, how much weight it holds.' },
  { build: 'first', area: 'boards', name: 'Civic board', file: 'src/ui/panels/civic.js', status: 'running', what: 'The levers, who decides them, the in tray, groups, consultation and the budget.' },
  { build: 'first', area: 'boards', name: 'Siting bench', file: 'src/ui/panels/build.js', status: 'running', what: 'Try a thing in a place and see what it would touch.' },
  { build: 'first', area: 'boards', name: 'Events', file: 'src/ui/panels/events.js', status: 'running', what: 'The island calendar.' },
  { build: 'first', area: 'boards', name: 'Below the sand', file: 'src/ui/panels/subterranean.js', status: 'running', what: 'The proposed works, screen by screen, each opening by saying nothing in it is built.' },
  { build: 'first', area: 'boards', name: 'Chronicle', file: 'src/ui/panels/chronicle.js', status: 'running', what: 'The island log, with severity filters and search.' },
  { build: 'first', area: 'boards', name: 'Legislation', file: 'src/ui/panels/legislation.js', status: 'running', what: 'Which Acts apply to whom.' },
  { build: 'first', area: 'boards', name: 'Map', file: 'src/ui/panels/map.js', status: 'running', what: 'A map with a full-screen mode; click to fly there.' },
  { build: 'first', area: 'boards', name: 'Arrival screens', file: 'src/ui/panels/onboarding.js', status: 'running', what: 'The screens you meet first, with three doors onto the island.' },
  { build: 'first', area: 'boards', name: 'How it works', file: 'src/ui/panels/howitworks.js', status: 'running', what: 'Seven short screens that explain the machine with the island behind them; press Y.' },
  { build: 'first', area: 'boards', name: 'Settings', file: 'src/ui/panels/settings.js', status: 'running', what: 'Quality, sound and interface options.' },

  /* ---------------- FIRST BUILD: designed, not written ---------------- */
  { build: 'first', area: 'environment', name: 'Fire', file: 'src/systems/environment/fire.js', status: 'designed', what: 'Fire danger, ignition, spread and track closures. Designed, not written; reported at start-up as missing.' },
  { build: 'first', area: 'environment', name: 'Coast', file: 'src/systems/environment/coast.js', status: 'designed', what: 'Erosion and accretion, and the Amity Point shoreline problem. Designed, not written.' },
  { build: 'first', area: 'environment', name: 'Groundwater', file: 'src/systems/environment/groundwater.js', status: 'designed', what: 'The aquifer, the lakes and the borefield. Designed, not written.' },
  { build: 'first', area: 'render', name: 'Presentation read models', file: 'src/systems/presentation/readmodels.js', status: 'designed', what: 'Shared helpers so panels describe a day rather than an instant. Designed, not written.' },
  { build: 'first', area: 'boards', name: 'Stewardship board', file: 'src/ui/panels/ecology.js', status: 'designed', what: 'A board for the living island beside the civic one. Designed, not written.' },
  { build: 'first', area: 'boards', name: 'Scanned assets', file: 'assets/ (empty)', status: 'designed', what: 'Real scanned objects placed on the island. The contract for how they arrive is written; no asset has been delivered and the folder is empty.' },
  { build: 'first', area: 'data', name: 'Participation lanes', file: 'docs/PARTICIPATION.md', status: 'designed', what: 'Ten ways for islanders to put something in, from a spoken correction to a scan. Designed; only the typed-in intake exists.' },

  /* ---------------- FIRST BUILD: data and tools ---------------- */
  { build: 'first', area: 'data', name: 'Data packs', file: 'data/*.json', status: 'running', what: 'Thirteen files of content: geography, places, businesses, ecology, residents, transport, civic, events, narrative, soundscape, the works below the sand, legislation and lore, each record naming its source.' },
  { build: 'first', area: 'data', name: 'Feeds', file: 'data/feeds/', status: 'partial', what: 'Synced feeds from real sources with a freshness date: weather, wildlife rescue, the noticeboard, the events engine. Only the weather feed is read by the running twin, and it goes stale after a day.' },
  { build: 'first', area: 'data', name: 'Connectors', file: 'tools/connectors/', status: 'partial', what: 'Fifteen named real sources. Four have a built reader, three are refused with the reason, seven are defined with no data in hand.' },
  { build: 'first', area: 'data', name: 'The gate', file: 'tools/gate-audit.mjs', status: 'running', what: 'The checker every pack must pass: sources resolve, one confidence scale, no invented word, no em dash, coordinates inside the bay. It was red with twelve findings at the last commit.' },
  { build: 'first', area: 'data', name: 'Headless run', file: 'tools/headless.mjs', status: 'running', what: 'The whole island in a terminal with no picture: a simulated year in about five minutes, and a determinism check that runs the world twice and compares.' },
  { build: 'first', area: 'data', name: 'Emissions', file: 'tools/connectors/emit-*.mjs', status: 'running', what: 'Three files the twin can write for a person to send: a day of the island, a noticeboard notice, a rescue draft. The twin never posts anything anywhere by itself.' },

  /* ---------------- SECOND BUILD: kernel ---------------- */
  { build: 'second', area: 'kernel', name: 'Clock', file: 'src/kernel/clock.js', status: 'running', what: 'One tick is one island minute, 1,440 a day. Nothing under the simulation reads the real clock.' },
  { build: 'second', area: 'kernel', name: 'Record', file: 'src/kernel/record.js', status: 'running', what: 'The shape every fact must take: its source, where in the source, when it was true, when it was believed, how sure, and which register it sits in.' },
  { build: 'second', area: 'kernel', name: 'Store', file: 'src/kernel/store.js', status: 'running', what: 'Where entities live, laid out for speed and for the same result every run.' },
  { build: 'second', area: 'kernel', name: 'World', file: 'src/kernel/world.js', status: 'running', what: 'Runs the systems in a declared order every tick, so nothing depends on the order they were registered.' },
  { build: 'second', area: 'kernel', name: 'Seeded randomness', file: 'src/kernel/rng.js', status: 'running', what: 'Named streams of random numbers from one seed, so the same island happens again on anyone\'s machine.' },
  { build: 'second', area: 'kernel', name: 'Fault hooks', file: 'src/kernel/faults.js', status: 'running', what: 'Switches that break the build on purpose, so every checking tool can be proven to notice.' },
  { build: 'second', area: 'kernel', name: 'Hash', file: 'src/kernel/hash.js', status: 'running', what: 'Fingerprints of the world state, compared between two runs.' },

  /* ---------------- SECOND BUILD: world ---------------- */
  { build: 'second', area: 'world', name: 'Two-time store', file: 'src/world/bitemporal.js', status: 'running', what: 'Every fact keeps when it was true and when it was believed. A correction closes the old belief and adds a new one; nothing is overwritten.' },
  { build: 'second', area: 'world', name: 'Source ladder', file: 'src/world/ladder.js', status: 'running', what: 'Four rungs: instrument, observation, model, simulation. The best fresh rung answers a question; a stale reading drops a rung; the answer is a value or "not known as at" a date.' },
  { build: 'second', area: 'world', name: 'Pack loader', file: 'src/world/data.js', status: 'running', what: 'Loads the committed data files and checks every record. It never touches the network.' },
  { build: 'second', area: 'world', name: 'Island wiring', file: 'src/world/island.js', status: 'running', what: 'Builds the world from the packs, declares which published fields exist and which record explains an absence.' },
  { build: 'second', area: 'world', name: 'Sandworm calculators', file: 'src/world/tunnels.js, src/world/ground.js', status: 'running', what: 'Tunnel and wet-sand calculators for the sibling subterranean project. Outside the ferry page.' },

  /* ---------------- SECOND BUILD: systems ---------------- */
  { build: 'second', area: 'systems', name: 'Sun', file: 'src/systems/solar.js', status: 'running', what: 'The sun\'s position for the island, checked against eighteen identities.' },
  { build: 'second', area: 'systems', name: 'Tide', file: 'src/systems/tide.js', status: 'running', what: 'Ships zero constituents because no published table for the Dunwich port has been obtained, so the panel reads "contested or unknown" with the date rather than a number.' },
  { build: 'second', area: 'systems', name: 'Crossings', file: 'src/systems/crossings.js', status: 'running', what: 'The boat timetables read against the island clock: three services, two operators, two landing points, 76 sailings. Passenger and vehicle crossings are never one figure.' },

  /* ---------------- SECOND BUILD: pages ---------------- */
  { build: 'second', area: 'pages', name: 'The ferry page', file: 'index.html', status: 'running', what: 'The page for a person: can I get off the island, and can my car. Eight panels, twenty-eight values, every value carrying the record it came from.' },
  { build: 'second', area: 'pages', name: 'The lab', file: 'lab.html', status: 'running', what: 'The instrument bench: a calibration target, the island clock, the sun and tide panels, and the controls that step time.' },

  /* ---------------- SECOND BUILD: data ---------------- */
  { build: 'second', area: 'data', name: 'Crossings pack', file: 'data/crossings.json', status: 'running', what: 'The owner\'s transcription of the SeaLink timetables and the Gold Cats departure sign, sealed so a drift is caught.' },
  { build: 'second', area: 'data', name: 'Bus pack', file: 'data/transport-gtfs.json', status: 'running', what: 'TransLink\'s island bus feed, derived with its receipt, so the page can say whether a bus meets the boat.' },
  { build: 'second', area: 'data', name: 'Tide pack', file: 'data/tide.json', status: 'running', what: 'Zero constituents and a record that says the table was not obtained.' },
  { build: 'second', area: 'data', name: 'Sources', file: 'data/_sources.json', status: 'running', what: 'Every source by id with its licence text and the date it was read. A record may not name a source that is not here.' },
  { build: 'second', area: 'data', name: 'Connectors', file: 'tools/ingest/', status: 'partial', what: 'Five fetchers with receipts: OpenStreetMap, TransLink, past weather, the 2021 census, the Atlas of Living Australia. Their outputs wait in a sealed inbox for a licence decision; only the bus pack is committed.' },

  /* ---------------- SECOND BUILD: instruments ---------------- */
  { build: 'second', area: 'instruments', name: 'Selftest', file: 'tools/selftest.mjs', status: 'running', what: 'Breaks a copy of the build 33 ways and checks that the right tool notices each one and names it. Writes the jurisdiction matrix.' },
  { build: 'second', area: 'instruments', name: 'The gate', file: 'tools/gate.mjs', status: 'running', what: 'Fourteen rules over the files: provenance on every record, no wall clock in the simulation, no em dash, no personal data, the two-crossings rule, and more.' },
  { build: 'second', area: 'instruments', name: 'Headless', file: 'tools/headless.mjs', status: 'running', what: 'The whole simulation in a terminal: a simulated year in a fraction of a second.' },
  { build: 'second', area: 'instruments', name: 'Determinism', file: 'tools/determinism.mjs', status: 'running', what: 'Two runs from one seed, and the name of the first system that drifted if they differ.' },
  { build: 'second', area: 'instruments', name: 'Bench', file: 'tools/bench.mjs', status: 'running', what: 'Frame time against a budget, reporting the worst frame rather than the average.' },
  { build: 'second', area: 'instruments', name: 'Shot', file: 'tools/shot.mjs', status: 'running', what: 'Checks a picture of the calibration scene pixel by pixel.' },
  { build: 'second', area: 'instruments', name: 'Interface probe', file: 'tools/uiprobe.mjs', status: 'running', what: 'Every panel has a name, every number points at a record on disk, and an unknown value shows the marker and no number.' },
  { build: 'second', area: 'instruments', name: 'Crossing checks', file: 'tools/check-crossings.mjs', status: 'running', what: 'Forty checks over the timetable pack and the crossings system.' },
  { build: 'second', area: 'instruments', name: 'Does the bus meet the boat', file: 'tools/connections.mjs', status: 'running', what: 'Answers that question for a day from the packs, with no model in the loop.' },
  { build: 'second', area: 'instruments', name: 'The board', file: 'tools/board.mjs', status: 'running', what: 'The noticeboard where every finding is posted; a finding that lives only in a chat is treated as never made.' },
];
