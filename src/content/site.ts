/**
 * Every word, link, number and hotspot on the homepage lives here. Components only read it.
 *
 * Honesty rules (docs/DECISIONS.md):
 * - Business claims carry { needsConfirm, source }. Anything not verified on vpconstro.com,
 *   the client's Instagram or the brief is marked TODO(client) and listed in CLIENT_QUESTIONS.md.
 * - No invented reviews, prices, years, team names or certifications.
 * - Copy style: sentence case, no em or en dashes, no arrows on links.
 */

export type Claim = { value: string; needsConfirm: boolean; source: string };
export type Point = { x: number; y: number }; // percentages of the image box
export type Thermal = { kind: "cold" | "warm"; strength: number; rx: number; ry: number }; // radii in % of width/height

export type Finding = {
  id: "damp" | "socket" | "tile" | "sill";
  title: string;
  body: string;
  method: string;
  link: { label: string; href: string };
  thermal: Thermal;
  /** Hotspot per image. `linework` is the SVG placeholder room shown until the photos arrive. */
  at: { desktop: Point; mobile: Point; lineworkDesktop: Point; lineworkMobile: Point };
};

export type ImageSlot = {
  file: string;
  width: number;
  height: number;
  alt: string;
  usedIn: string;
  thermal?: boolean;
  real?: boolean;
};

const WA_NUMBER = "919657555588";

/** Prefilled WhatsApp messages. All but `sample` are verbatim from vpconstro.com. */
export const waMessages = {
  book: "Hello FlatProof, I want to book a Pre-Possession Inspection (125+ points check).",
  general: "Hello FlatProof, I would like to book an inspection service.",
  checklist: "Hello FlatProof, please share the complete 125+ points inspection checklist.",
  sample: "Hello FlatProof, please share the full sample report.",
  leak: "Hello FlatProof, I want to book Water Leakage Rectification and Waterproofing.",
  carpet: "Hello FlatProof, I want to book a Carpet Area Measurement audit.",
  rental: "Hello FlatProof, I want to book a Rental Flat Inspection.",
  consult: "Hello FlatProof, I would like to consult with your Engineering team.",
  construction: "Hello FlatProof, I want to discuss a Building Construction or Infra Project.",
} as const;

export type WaKey = keyof typeof waMessages;

export const waHref = (key: WaKey) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessages[key])}`;

export const site = {
  brand: {
    name: "FlatProof Inspections",
    short: "FlatProof",
    productOf: "A product of VP Constructions",
  },

  seo: {
    /** Pitch demo: keep out of search until the client adopts it (FP-D17). */
    noindex: true,
    url: "https://flatproof.vercel.app",
    title: "FlatProof Inspections | Pre-possession flat inspection in Pune",
    description:
      "Two engineers check your new flat against 125+ points, scan the walls with a thermal camera, measure carpet area by laser and send a snag report within 24 hours. Pune and PCMC.",
  },

  contact: {
    phone: { display: "+91 96575 55588", href: "tel:+919657555588" },
    email: { display: "info@vpconstro.com", href: "mailto:info@vpconstro.com" },
    address: ["A-23 Gold Craft Society", "Vishrantwadi, Pune 411015"],
    areas: { value: "Pune and PCMC", needsConfirm: true, source: "brief, vpconstro.com" } satisfies Claim, // TODO(client): exact areas
    instagram: {
      handle: "@flatproof.inspections",
      href: "https://www.instagram.com/flatproof.inspections/",
      /** Opens a DM thread; the posts ask people to DM "INSPECT". */
      dmHref: "https://ig.me/m/flatproof.inspections",
      dmKeyword: "INSPECT",
    },
    facebook: {
      href: "https://www.facebook.com/profile.php?id=61595743364212",
      /** Theirs (logo matches) but a personal profile with no posts, not a Page (FP-D12). */
      show: false,
    },
  },

  claims: {
    properties: { value: "100+ properties inspected in Pune", needsConfirm: true, source: "vpconstro.com stats" },
    points: { value: "125+", needsConfirm: true, source: "vpconstro.com" },
    turnaround: { value: "24 hours", needsConfirm: true, source: "vpconstro.com" },
    nonDestructive: { value: "100% non-destructive", needsConfirm: true, source: "vpconstro.com" },
    warranty: { value: "Warranty-backed waterproofing", needsConfirm: true, source: "vpconstro.com" }, // TODO(client): warranty terms
  } satisfies Record<string, Claim>,

  nav: {
    links: [
      { label: "Checks", href: "#checks" },
      { label: "How it works", href: "#process" },
      { label: "Report", href: "#report" },
      { label: "Services", href: "#services" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Book on WhatsApp",
    ctaShort: "Book",
    open: "Menu",
    close: "Close menu",
    home: "FlatProof Inspections, back to top",
    skip: "Skip to content",
  },

  hero: {
    title: "Don’t take possession in the dark.",
    lead: "Two engineers check your new flat against 125+ points, scan the walls with a thermal camera and measure the carpet area by laser. You get a snag report for your builder within 24 hours.",
    primary: { label: "Book on WhatsApp", wa: "book" as WaKey },
    secondary: { label: "See a sample report", href: "#report" },
    lens: {
      hintPointer: "Move the camera over the room",
      hintTouch: "Drag the camera or tap the photo",
      toggle: "Thermal view",
      pause: "Pause scan",
      play: "Play scan",
      scanning: "Scanning",
      found: "Found {n} of {total}",
      complete: "Your inspection covers 125+ points.",
      completeLink: { label: "See all 125+ checks", href: "#checks" },
      caption: "Simulated scan for illustration. The defects are real ones from our checklist and site visits.",
      srIntro: "What the thermal camera finds in this room",
      stageLabel: "A new flat with four hidden defects. Use the Thermal view switch to see all of them.",
    },
    findings: [
      {
        id: "damp",
        title: "Damp behind the skirting",
        body: "Cold patch on the thermal image: water inside the wall. Our sample report measured 86% moisture.",
        method: "Thermal camera and moisture meter",
        link: { label: "See the sample report", href: "#report" },
        thermal: { kind: "cold", strength: 0.85, rx: 7, ry: 9 },
        at: {
          desktop: { x: 72, y: 77 },
          mobile: { x: 70, y: 77 },
          lineworkDesktop: { x: 71.9, y: 73.2 },
          lineworkMobile: { x: 68.5, y: 74.4 },
        },
      },
      {
        id: "socket",
        title: "Socket wired the wrong way",
        body: "Neutral and earth reversed, earthing inactive. Appliances can get damaged.",
        method: "Polarity test",
        link: { label: "See the electrical checks", href: "#checks" },
        thermal: { kind: "warm", strength: 0.9, rx: 2.4, ry: 3.6 },
        at: {
          desktop: { x: 86, y: 55 },
          mobile: { x: 85, y: 55 },
          lineworkDesktop: { x: 86.8, y: 54.8 },
          lineworkMobile: { x: 87, y: 55.3 },
        },
      },
      {
        id: "tile",
        title: "Hollow under the tile",
        body: "A tap sounds hollow where the mortar bed has gaps. Hollow tiles can crack and come loose.",
        method: "Acoustic tap test",
        link: { label: "See the masonry checks", href: "#checks" },
        thermal: { kind: "cold", strength: 0.35, rx: 8, ry: 4 },
        at: {
          desktop: { x: 80, y: 90 },
          mobile: { x: 48, y: 90 },
          lineworkDesktop: { x: 80.6, y: 90.2 },
          lineworkMobile: { x: 50, y: 90.5 },
        },
      },
      {
        id: "sill",
        title: "Sill set on loose filler",
        body: "Loose white cement under the granite and no seal at the frame. Rain can get in at that joint.",
        method: "Tap test and visual check",
        link: { label: "See the case file", href: "#case" },
        thermal: { kind: "cold", strength: 0.6, rx: 11, ry: 2.2 },
        at: {
          desktop: { x: 62, y: 45.5 },
          mobile: { x: 50, y: 30.5 },
          lineworkDesktop: { x: 62.5, y: 44.9 },
          lineworkMobile: { x: 50, y: 30.2 },
        },
      },
    ] satisfies Finding[],
  },

  stakes: {
    title: "Every new flat looks perfect on handover day.",
    /** `mark: true` phrases get an amber cloud underline as they light up. */
    body: [
      { text: "Fresh paint and putty hide " },
      { text: "hollow tiles", mark: true },
      { text: ", " },
      { text: "damp inside the walls", mark: true },
      { text: ", " },
      { text: "sockets wired the wrong way", mark: true },
      { text: " and " },
      { text: "a carpet area smaller than your agreement", mark: true },
      { text: ". You’ve put your savings into this flat, and the builder still needs your signature on the possession letter. That’s your best chance to get defects fixed." },
    ],
  },

  checks: {
    title: "125+ checks. Each one has a method.",
    intro: "The checklist covers four trades. Here are some of the points on each list; your report covers all of them.",
    total: 125,
    unit: "checks",
    categories: [
      {
        id: "electrical",
        name: "Electrical and safety",
        count: 28,
        items: [
          { check: "Phase, neutral and earth polarity", method: "Polarity check" },
          { check: "MCB trip test", method: "Trip current test" },
          { check: "Socket earthing", method: "Earth loop impedance test" },
          { check: "Switchboard insulation", method: "Insulation check" },
          { check: "DB dressing", method: "Visual check" },
        ],
      },
      {
        id: "plumbing",
        name: "Plumbing and sanitary",
        count: 32,
        items: [
          { check: "Drain slope", method: "Gradient check" },
          { check: "Trap seals against back-odour", method: "Seal check" },
          { check: "Flush tank volume", method: "Volume check" },
          { check: "Diverter valve pressure", method: "Pressure check" },
          { check: "Hot-water flow", method: "Flow check" },
          { check: "Hidden leaks", method: "Thermal camera and moisture meter" },
        ],
      },
      {
        id: "masonry",
        name: "Masonry and finishes",
        count: 38,
        items: [
          { check: "Hollow tiles", method: "Acoustic tap test" },
          { check: "Wall plumb", method: "Plumb check" },
          { check: "Plaster shrinkage or structural crack", method: "Crack assessment" },
          { check: "Paint uniformity", method: "Visual check" },
          { check: "Floor level", method: "Level check" },
        ],
      },
      {
        id: "openings",
        name: "Doors, windows and balconies",
        count: 27,
        items: [
          { check: "UPVC track weep holes", method: "Water drainage check" },
          { check: "Toughened glass", method: "Scratch check" },
          { check: "Safety railing anchorage", method: "Anchorage test" },
          { check: "Weather seals", method: "Continuity check" },
        ],
      },
    ],
    examplesLabel: "Some of the {count} checks",
    cta: { label: "Get the full checklist on WhatsApp", wa: "checklist" as WaKey },
  },

  process: {
    title: "One visit, one report.",
    steps: [
      {
        title: "Inspection on site",
        body: "Two civil and MEP engineers check the flat against the 125+ point list. Nothing gets drilled or broken.",
        image: "tap-test",
      },
      {
        title: "Thermal and laser checks",
        body: "A thermal camera and a pinless moisture meter find damp inside walls. A laser meter measures every room for the carpet-area audit.",
        image: "engineer-thermal",
      },
      {
        title: "Snag report within 24 hours",
        body: "A PDF with photos, every defect tagged by severity, ready to send to your builder.",
        image: null,
      },
    ],
    tools: [
      { id: "thermal", name: "Thermal camera", use: "Finds damp and leaks inside walls" },
      { id: "moisture", name: "Pinless moisture meter", use: "Reads moisture without drilling" },
      { id: "laser", name: "Laser distance meter", use: "Measures every room" },
    ],
    reportLink: { label: "See a sample report", href: "#report" },
    lineage: "FlatProof is a product of VP Constructions, a Pune firm that builds homes, commercial projects and roads.",
  },

  report: {
    title: "This is what you hand your builder.",
    sub: "A sample report. Every snag gets photo evidence, a severity tag and the fix we recommend.",
    sheet: {
      label: "Sample report",
      heading: "Snag report",
      meta: [
        { term: "Ref", value: "FP-PUNE-2026-088" },
        { term: "Unit", value: "804, Tower B" },
        { term: "Type", value: "3BHK" },
        { term: "Area", value: "1,480 sq ft" },
        { term: "Snags", value: "18 tagged" },
      ],
      findings: [
        {
          severity: "critical" as const,
          tag: "Critical",
          title: "Thermal moisture anomaly, master bedroom wall",
          body: "Infrared scan shows 86% subsurface moisture behind the skirting. Source: an unsealed AC drain conduit on the outer wall.",
          fix: "Fix: high-pressure injection grouting and facade weatherproofing.",
          thumb: "thermal",
        },
        {
          severity: "medium" as const,
          tag: "Medium",
          title: "Kitchen 16A socket, neutral and earth reversed",
          body: "Wired with neutral and earth swapped and an inactive earthing loop. Risk of appliance damage.",
          fix: "Fix: rewire at the DB before kitchen appliances go in.",
          thumb: "socket",
        },
        {
          severity: "audit" as const,
          tag: "RERA audit",
          title: "Carpet area, laser measured",
          body: "Agreement 1,120.00 sq ft. Measured 1,088.40 sq ft. Short by 31.60 sq ft.",
          fix: "CAD dimension sheet attached for the builder.",
          thumb: "plan",
        },
      ],
      footer: "Showing 3 of 18 snags.",
    },
    primary: { label: "Get the full sample on WhatsApp", wa: "sample" as WaKey },
    secondary: { label: "Book an inspection", wa: "book" as WaKey },
  },

  carpet: {
    title: "Measured: 31.60 sq ft short.",
    body: "You pay for carpet area under RERA. We measure every room with a laser meter, compare it with your agreement and give you a CAD dimension sheet for the builder.",
    readout: [
      { label: "Agreement carpet area", value: 1120.0 },
      { label: "Measured carpet area", value: 1088.4 },
      { label: "Short by", value: 31.6, deficit: true },
    ],
    unit: "sq ft",
    calc: {
      label: "Your agreement rate",
      unit: "₹ per sq ft",
      placeholder: "Rate per sq ft",
      result: "{rupees} paid for area you didn’t get",
      empty: "Enter your rate to see what 31.60 sq ft is worth.",
    },
    note: "Plan is illustrative. Figures from sample report FP-PUNE-2026-088.",
    cta: { label: "Book a carpet-area audit", wa: "carpet" as WaKey },
  },

  caseFile: {
    title: "What looks like a minor patch today becomes a major expense tomorrow.",
    body: "On a recent pre-possession inspection in Pune, our engineers flagged this under a window sill. The granite slab sat on loose white cement and filler instead of compacted cement-sand mortar.",
    /** Boxes in % of the cropped photo; set against assets/case/window-sill.png. */
    notes: [
      { key: "a", label: "Hollow sub-base", text: "White cement can’t carry the slab’s load when it fills thick gaps.", box: { x: 4, y: 38, w: 46, h: 21 } },
      { key: "b", label: "No bond", text: "Dry filler keeps the granite from bonding with the wall below.", box: { x: 50, y: 30, w: 24, h: 16 } },
      { key: "c", label: "No seal", text: "Nothing waterproofs the joint where the window frame meets the stone.", box: { x: 3, y: 15, w: 92, h: 10 } },
    ],
    photoAlt:
      "A black granite window sill under a white UPVC window. Below the sill, loose white cement and filler crumble away, and an engineer’s finger points into the gap.",
    instagram: { label: "More from our site visits on Instagram" },
  },

  services: {
    title: "Every service books on WhatsApp.",
    sub: "Pick one and we’ll open a chat with the details filled in.",
    action: "Ask on WhatsApp",
    items: [
      {
        id: "pre-possession",
        name: "Pre-possession inspection",
        summary: "125+ points, a thermal scan and the carpet area, with a snag report in 24 hours.",
        wa: "book" as WaKey,
        image: "tap-test",
      },
      {
        id: "leak",
        name: "Water-leak detection and waterproofing",
        summary: "A thermal scan finds the source without breaking walls. Warranty-backed waterproofing fixes it.",
        wa: "leak" as WaKey,
        image: "engineer-thermal",
      },
      {
        id: "carpet",
        name: "Carpet-area measurement",
        summary: "Laser measurement, RERA carpet area against built-up area, and a CAD dimension sheet.",
        wa: "carpet" as WaKey,
        image: "laser-measure",
      },
      {
        id: "rental",
        name: "Rental flat inspection",
        summary: "Move-in and move-out condition logs with photos, for tenants and owners.",
        wa: "rental" as WaKey,
        image: "handover-couple",
      },
      {
        id: "consultancy",
        name: "Consultancy",
        summary: "Structural stability, crack diagnosis, society handover and redevelopment advice.",
        wa: "consult" as WaKey,
        image: "crack-diagnosis",
      },
      {
        id: "construction",
        name: "Building construction and infrastructure",
        byline: "By VP Constructions",
        summary: "Turnkey homes and commercial buildings, roads and civic projects.",
        wa: "construction" as WaKey,
        image: null, // TODO(client): real VP Constructions project photos (FP-D16)
      },
    ],
  },

  faq: {
    title: "Before you book",
    items: [
      {
        q: "When should I book?",
        a: "Once the builder gives you a possession date, before you sign the possession letter. Already have the keys? Message us and we’ll tell you what we can still check.",
        show: true,
      },
      {
        q: "What do I get?",
        a: "A PDF snag report within 24 hours: every defect with a photo, a severity tag and a recommended fix, ready for your builder. Carpet-area audits add a CAD dimension sheet.",
        show: true,
      },
      {
        q: "Will you break walls or tiles?",
        a: "No. Every check is non-destructive: thermal camera, pinless moisture meter, laser meter and tap tests.",
        show: true,
      },
      {
        q: "Who does the inspection?",
        a: "Two civil and MEP engineers from FlatProof, a product of VP Constructions.",
        show: true,
      },
      {
        q: "Do you inspect rental flats?",
        a: "Yes. We log the flat’s condition at move-in and move-out with photos, for tenants and owners.",
        show: true,
      },
      { q: "Which areas do you cover?", a: "Pune and PCMC.", show: true },
      {
        q: "What can I do with the report?",
        a: "Send it to your builder and ask for the fixes before you take possession.",
        show: true, // TODO(client): add the RERA s.14(3) sentence only after the wording is verified officially (FP-D15)
      },
      {
        q: "How do I book?",
        a: "WhatsApp or call +91 96575 55588, or DM “INSPECT” to @flatproof.inspections on Instagram.",
        show: true,
      },
      // Hidden until the client confirms the answer (CLIENT_QUESTIONS.md):
      { q: "How long does the inspection take?", a: "TODO(client)", show: false },
      { q: "Do I need to be there?", a: "TODO(client)", show: false },
      { q: "How much does it cost?", a: "TODO(client)", show: false },
      { q: "Do you inspect resale flats?", a: "TODO(client)", show: false },
    ],
  },

  /** Renders nothing until real, attributable reviews exist. */
  testimonials: [] as { quote: string; name: string; project: string }[],

  cta: {
    title: "Book before you sign.",
    body: "Hand the builder a snag list, not your hard-earned money.",
    primary: { label: "Book on WhatsApp", wa: "book" as WaKey },
    call: "Call",
    email: "Email",
    dm: "DM “{keyword}” on Instagram",
  },

  footer: {
    services: "Services",
    contact: "Contact",
    follow: "Follow",
    year: 2026,
  },

  floatingWa: { label: "Book on WhatsApp" },

  notFound: {
    title: "This page isn’t on the plan.",
    body: "The address may be old or mistyped.",
    home: "Back to the homepage",
  },

  images: {
    "hero-desktop": {
      file: "hero-desktop",
      width: 2560,
      height: 1440,
      alt: "An empty new flat in Pune on handover day: a plain wall, a sliding window over a black granite sill, a switchboard and glossy floor tiles.",
      usedIn: "Hero, tablets and desktops",
      thermal: true,
    },
    "hero-mobile": {
      file: "hero-mobile",
      width: 1600,
      height: 2000,
      alt: "An empty new flat in Pune on handover day: a sliding window over a black granite sill, a switchboard, skirting and glossy floor tiles.",
      usedIn: "Hero, phones",
      thermal: true,
    },
    "engineer-thermal": {
      file: "engineer-thermal",
      width: 2400,
      height: 1600,
      alt: "An engineer kneels and points a thermal camera at the skirting of a freshly painted wall.",
      usedIn: "How it works, step 2; water-leak service",
    },
    "tap-test": {
      file: "tap-test",
      width: 1600,
      height: 2000,
      alt: "An engineer taps a glossy floor tile with a small steel tapping tool to listen for hollow spots.",
      usedIn: "How it works, step 1; pre-possession service",
    },
    "laser-measure": {
      file: "laser-measure",
      width: 2400,
      height: 1600,
      alt: "A laser distance meter on the floor of an empty room sends a red beam to the opposite wall.",
      usedIn: "Carpet-area section; carpet-area service",
    },
    "handover-couple": {
      file: "handover-couple",
      width: 1600,
      height: 2000,
      alt: "A young couple in their new flat look at a report on a phone, holding the keys.",
      usedIn: "Final call to action; rental service",
    },
    "crack-diagnosis": {
      file: "crack-diagnosis",
      width: 2000,
      height: 2000,
      alt: "A crack-width gauge held against a hairline crack in a plastered wall.",
      usedIn: "Consultancy service",
    },
    "case-window-sill": {
      file: "case-window-sill",
      width: 1200,
      height: 900,
      alt: "A black granite window sill under a white UPVC window. Below the sill, loose white cement and filler crumble away, and an engineer’s finger points into the gap.",
      usedIn: "Case file",
      real: true,
    },
  } satisfies Record<string, ImageSlot>,
} as const;

export type Site = typeof site;
export type ImageKey = keyof typeof site.images;
