/*
 * Stream Industrial — Brokerage & Marketing Hub content.
 *
 * This is the ONLY file you need to edit to update the dashboard.
 * Every entry below is a plain object; copy an existing one, change the
 * values, and keep the commas between entries. Dates are YYYY-MM-DD.
 * Links can be SharePoint / OneDrive / Box / website URLs. Use "" when a
 * link doesn't exist yet and the button will be hidden.
 *
 * When the placeholder content has been replaced, set meta.sampleData to
 * false to hide the "Sample data" banner.
 */
window.DASHBOARD_DATA = {
  meta: {
    lastUpdated: "2026-10-08",
    sampleData: false,
    // Where the "+ New marketing request" button goes (Microsoft Form, email, etc.)
    requestLink: "https://airtable.com/shrDILYHH00BiB7xF",
    // Group photo shown at the top of the Team tab ("" to hide).
    teamPhoto: "assets/team-photo.jpg"
  },

  // Marketing queue. owner = the marketing coordinator on the request. status: Requested | In Progress | In Review | Complete
  // priority: High | Normal | Low
  // type: Flyer | BOV / OM | Pitch Deck | Tour Book | Social | Email Blast | Case Study | Signage | Website
  queue: [
    { title: "Signage Coordination", property: "APEX Elgin (Scannell Properties)", type: "Signage", owner: "Kaitlyn Maloney", broker: "Ben Dickey", status: "Requested", priority: "Normal", due: "", link: "" },
    { title: "Launch Event Invite", property: "Flightline (MS IND Portfolio)", type: "Event", owner: "Marissa Rupert", broker: "Brian Duffy", status: "Requested", priority: "Normal", due: "", link: "" },
    { title: "Brochure — 2315-2317 Lanmeier", property: "Flightline (MS IND Portfolio)", type: "Brochure", owner: "Marissa Rupert", broker: "Brian Duffy", status: "Requested", priority: "Normal", due: "", link: "" },
    { title: "Brochure — 695 Touhy", property: "Flightline (MS IND Portfolio)", type: "Brochure", owner: "Marissa Rupert", broker: "Brian Duffy", status: "Requested", priority: "Normal", due: "", link: "" },
    { title: "E-Blast — 1341-1371 Howard", property: "1341-1371 Howard", type: "E-Blast", owner: "", broker: "", status: "In Review", priority: "Normal", due: "", link: "" },
    { title: "Brochure — 787 Belden", property: "787 Belden", type: "Brochure", owner: "", broker: "", status: "In Review", priority: "Normal", due: "", link: "" },
    { title: "Signage — 787 Belden", property: "787 Belden", type: "Signage", owner: "", broker: "", status: "In Review", priority: "Normal", due: "", link: "" },
    { title: "E-Blast — 27735 Diehl", property: "27735 Diehl", type: "E-Blast", owner: "", broker: "", status: "In Progress", priority: "Normal", due: "", link: "" },
    { title: "Realty Ads", property: "Flightline (MS IND Portfolio)", type: "Advertising", owner: "", broker: "Brian Duffy", status: "Complete", priority: "Normal", due: "", link: "" },
    { title: "Press Release", property: "Flightline (MS IND Portfolio)", type: "Press Release", owner: "", broker: "Brian Duffy", status: "Complete", priority: "Normal", due: "", link: "" },
    { title: "Sizzle Reel", property: "Flightline (MS IND Portfolio)", type: "Video", owner: "", broker: "Brian Duffy", status: "Complete", priority: "Normal", due: "", link: "" },
    { title: "Landing Page", property: "Flightline (MS IND Portfolio)", type: "Website", owner: "", broker: "Brian Duffy", status: "Complete", priority: "Normal", due: "", link: "" },
    { title: "Landing Page", property: "APEX Elgin (Scannell Properties)", type: "Website", owner: "", broker: "Ben Dickey", status: "In Progress", priority: "Normal", due: "", link: "" },
    { title: "Press Release", property: "APEX Elgin (Scannell Properties)", type: "Press Release", owner: "", broker: "Ben Dickey", status: "Complete", priority: "Normal", due: "", link: "" },
    { title: "Announcement", property: "APEX Elgin (Scannell Properties)", type: "Announcement", owner: "", broker: "Ben Dickey", status: "Complete", priority: "Normal", due: "", link: "" },
    { title: "Brochure", property: "APEX Elgin (Scannell Properties)", type: "Brochure", owner: "", broker: "Ben Dickey", status: "Complete", priority: "Normal", due: "", link: "" }
  ],

  // Final, client-ready presentations. type: Pitch | BOV / OM | Tour Book | Market Update | Case Study
  presentations: [
  ],

  // Research tab: who to ask, plus link groups (same shape as resources).
  research: {
    contact: "Hannah Webster",
    // The Quarter market reports, newest first. file is a PDF path or link.
    // status: "Launched" | "In Progress" (stats and file can stay empty until launch)
    reports: [
      { quarter: "Q3 2026", title: "The Quarter — Chicago Industrial", file: "", status: "In Progress", stats: [],
        takeaway: "Research is putting together the Q3 2026 report. Stats and the PDF will appear here once it launches." },
      { quarter: "Q2 2026", title: "The Quarter — Chicago Industrial", file: "research/Q2_2026_CHI_Industrial_Quarter_Report.pdf", status: "Launched",
        stats: [
          { label: "Total vacancy", value: "5.6%" },
          { label: "Net absorption", value: "3.5M SF" },
          { label: "Leasing activity", value: "15.0M SF" },
          { label: "Under construction", value: "18.4M SF" }
        ],
        takeaway: "Vacancy fell to 5.58%, the lowest in a year. The I-80 Joliet Corridor led leasing for the second straight quarter at 3.2M SF, and the construction pipeline grew to 18.4M SF across 60 buildings." },
      { quarter: "Q1 2026", title: "The Quarter — Chicago Industrial", file: "research/Q1_2026_CHI_Industrial_Quarter_Report_v1.pdf", status: "Launched",
        stats: [
          { label: "Total vacancy", value: "5.8%" },
          { label: "Net absorption", value: "839K SF" },
          { label: "Leasing activity", value: "15.2M SF" },
          { label: "Under construction", value: "15.0M SF" }
        ],
        takeaway: "Vacancy eased to 5.77% from 5.84% in Q4 2025. The I-80 Joliet Corridor posted 5.3M SF of leasing, led by General Mills' 1.5M SF renewal; Ferrara's 998K SF move-out weighed on the I-55 Corridor." }
    ],
    // Deal Reel: notable transactions, newest quarter first.
    // Seeded from the Key Lease Transactions in The Quarter (market-wide deals).
    deals: [
      { quarter: "Q2 2026", tenant: "KeHE Foods", address: "21533 Cherry Hill Rd", city: "Joliet", submarket: "I-80 Joliet Corridor", sf: 1195754, type: "New Lease" },
      { quarter: "Q2 2026", tenant: "Hyundai Translead", address: "3835 Youngs Rd", city: "Channahon", submarket: "I-80 Joliet Corridor", sf: 906517, type: "New Lease" },
      { quarter: "Q2 2026", tenant: "Distribution 2000", address: "1120-1140 Remington Blvd", city: "Romeoville", submarket: "I-55 Corridor", sf: 453568, type: "New Lease" },
      { quarter: "Q2 2026", tenant: "HH Global", address: "8725 31st St", city: "Somers", submarket: "SE Wisconsin", sf: 434913, type: "Renewal/Expansion" },
      { quarter: "Q2 2026", tenant: "Custom Goods", address: "21520-21540 SW Frontage Rd", city: "Shorewood", submarket: "I-80 Joliet Corridor", sf: 376006, type: "New Lease" },
      { quarter: "Q2 2026", tenant: "Diageo", address: "1701 Remington Blvd", city: "Bolingbrook", submarket: "I-55 Corridor", sf: 361000, type: "Renewal" },
      { quarter: "Q2 2026", tenant: "RJW Logistics", address: "2601 Internationale Pky", city: "Woodridge", submarket: "I-55 Corridor", sf: 356621, type: "Renewal" },
      { quarter: "Q2 2026", tenant: "Tesla Motors", address: "16342 W 163rd St", city: "Lockport", submarket: "I-80 Joliet Corridor", sf: 308988, type: "Renewal" },
      { quarter: "Q2 2026", tenant: "CoreCentric Solutions", address: "1717 W Harvester Rd", city: "West Chicago", submarket: "Fox Valley", sf: 282622, type: "New Lease" },
      { quarter: "Q1 2026", tenant: "General Mills", address: "30131 Ridgeway Blvd", city: "Wilmington", submarket: "I-80 Joliet Corridor", sf: 1508425, type: "Renewal" },
      { quarter: "Q1 2026", tenant: "Hyundai", address: "2200-2600 Channahon Rd", city: "Joliet", submarket: "I-80 Joliet Corridor", sf: 1380070, type: "New Lease" },
      { quarter: "Q1 2026", tenant: "Saddle Creek Logistics", address: "2550 Logistics Dr", city: "Elwood", submarket: "I-80 Joliet Corridor", sf: 1114575, type: "Renewal" },
      { quarter: "Q1 2026", tenant: "Crane Worldwide Logistics", address: "9130 W 55th St", city: "McCook", submarket: "I-290 South", sf: 992151, type: "New Lease" },
      { quarter: "Q1 2026", tenant: "RJW Logistics", address: "26220 W 143rd St", city: "Plainfield", submarket: "I-55 Corridor", sf: 788000, type: "New Lease" },
      { quarter: "Q1 2026", tenant: "Amazon", address: "201 Emerald Rd", city: "Joliet", submarket: "I-80 Joliet Corridor", sf: 746801, type: "Renewal" },
      { quarter: "Q1 2026", tenant: "Elogistek", address: "160 Southcreek Pky", city: "Romeoville", submarket: "I-55 Corridor", sf: 648960, type: "New Lease" },
      { quarter: "Q1 2026", tenant: "LG Electronics", address: "14746 S Gougar Rd", city: "Lockport", submarket: "I-80 Joliet Corridor", sf: 363224, type: "Renewal" },
      { quarter: "Q1 2026", tenant: "Learjet", address: "251 Wille Rd", city: "Des Plaines", submarket: "O'Hare", sf: 333988, type: "Renewal" }
    ],
    groups: [
      { group: "Market Reports", items: [
        { label: "Submarket snapshots", link: "" }
      ]},
      { group: "Comps & Data", items: [
        { label: "Lease comps tracker", link: "" },
        { label: "Sale comps tracker", link: "" },
        { label: "Availability & vacancy by submarket", link: "" },
        { label: "Labor & drive-time data", link: "" }
      ]},
      { group: "Maps", items: [
        { label: "Submarket map (Chicago MSA)", link: "" },
        { label: "Competitive set maps", link: "" }
      ]}
    ]
  },

  // Resource library. Each group renders as a card of links.
  resources: [
    { group: "Templates", items: [
      { label: "PowerPoint pitch template", link: "", note: "Fade Smoothly transitions only" },
      { label: "BOV / Offering Memorandum template", link: "" },
      { label: "Tour book template (portrait & landscape)", link: "" },
      { label: "Leasing flyer template", link: "" },
      { label: "Case study template", link: "" },
      { label: "Bio templates (1–4 bios)", link: "" },
      { label: "Color books / floor plan availability", link: "" }
    ]},
    { group: "Brand", items: [
      { label: "Stream brand guidelines", link: "" },
      { label: "Logos & brand icon", link: "" },
      { label: "Approved water & topo imagery", link: "" },
      { label: "Headshots (hi-res + web)", link: "" },
      { label: "Email signature options", link: "" }
    ]},
    { group: "Social & Digital", items: [
      { label: "Social templates (IG 1080×1080, LI 1200×627, Story 1080×1920)", link: "" },
      { label: "Email blast template", link: "" },
      { label: "Content calendar", link: "" }
    ]},
    { group: "Tools & Process", items: [
      { label: "Marketing request form (Airtable)", link: "https://airtable.com/shrDILYHH00BiB7xF" },
      { label: "Marketing request turnaround times", link: "" },
      { label: "Deal / pipeline tracker", link: "" },
      { label: "Signage vendor ordering", link: "" }
    ]},
    // Vendor contact cards: an item may carry contact lines and an optional logo image.
    { group: "Signage", items: [
      { label: "Landmark Visibility Solutions, Inc.", link: "https://www.landmarkvisibilitysolutions.com",
        logo: "",
        contact: { name: "Nick Prager", title: "President", address: "641 Industrial Dr Unit E, Cary, IL 60013", phone: "847.971.2981", web: "www.landmarkvisibilitysolutions.com" } }
    ]}
  ],

  // Portfolio. status: Available | Under LOI | Leased | Coming Soon | For Sale
  // links: any of flyer, website, om, photos, tourBook, map, drive — "" to hide.
  portfolio: [
  ],

  // Chicago IND + Marketing team processes, in order.
  // who: "IND" | "MKT" | "IND + MKT". Optional: note, link.
  process: [
    { title: "New Business Pitch or Client Presentation", steps: [
      { who: "IND", text: "Submit Marketing Airtable request", link: "https://airtable.com/shrDILYHH00BiB7xF" },
      { who: "MKT", text: "Set a kickoff call" },
      { who: "MKT", text: "Send a brief", note: "Brief template to be created" },
      { who: "IND", text: "Fill out the brief before kickoff" },
      { who: "IND + MKT", text: "Kickoff meeting: discuss and solidify strategy for the meeting or presentation. Walk away with a general content outline." },
      { who: "MKT", text: "Design the presentation shell" },
      { who: "MKT", text: "Send markup link" },
      { who: "IND", text: "Mark up by a specific date" },
      { who: "MKT", text: "Provide a final version and schedule an interactive walkthrough if needed" },
      { who: "MKT", text: "Upload to the IND dashboard" }
    ]},
    { title: "New Assignment Onboarding", steps: [
      { who: "IND", text: "Submit Marketing Airtable request", link: "https://airtable.com/shrDILYHH00BiB7xF" },
      { who: "IND", text: "Provide Marketing with the official \u2018online\u2019 date" },
      { who: "IND", text: "Supply Marketing any previous or existing deliverables (e-blasts, flyers, brochures)" },
      { who: "IND", text: "Submit a second Airtable request if a press release is needed" },
      { who: "IND", text: "Note any existing signage that needs to be removed and replaced" }
    ]},
    { title: "E-Blast, Site Plan & Brochure/Flyer Request", steps: [
      { who: "IND", text: "Submit Marketing Airtable request", link: "https://airtable.com/shrDILYHH00BiB7xF" },
      { who: "IND", text: "Supply Marketing with any previous or existing deliverables" },
      { who: "IND", text: "Send high-resolution CoStar or final photography images" },
      { who: "MKT", text: "Send draft for review" },
      { who: "IND + MKT", text: "Finalize" },
      { who: "IND", text: "Upload to CoStar" },
      { who: "MKT", text: "Add to the dashboard" }
    ]},
    { title: "Signage (Installation / Removal)", steps: [
      { who: "IND", text: "Submit Marketing Airtable request", link: "https://airtable.com/shrDILYHH00BiB7xF" },
      { who: "IND", text: "Note any existing signage that needs to be removed and replaced" },
      { who: "IND", text: "Note what information (contacts and logos) needs to be included" },
      { who: "IND", text: "Highlight the exact signage placement on a Google Maps screenshot" },
      { who: "MKT", text: "Request a quote from the signage vendor" },
      { who: "IND", text: "Approve the quote" },
      { who: "MKT", text: "Send the invoice to Liz to be processed" }
    ]},
    { title: "Branding & Positioning", steps: [
      { who: "IND", text: "Submit Marketing Airtable request", link: "https://airtable.com/shrDILYHH00BiB7xF" },
      { who: "MKT", text: "Schedule a kickoff call" }
    ]},
    { title: "Press Release", steps: [
      { who: "IND", text: "Submit Marketing Airtable request", link: "https://airtable.com/shrDILYHH00BiB7xF" },
      { who: "MKT", text: "Send the Amplification Form" },
      { who: "IND", text: "Complete the Amplification Form" },
      { who: "MKT", text: "Draft with the team and National Marketing" },
      { who: "MKT", text: "Send draft to ownership for review and communicate any edits with National Marketing" },
      { who: "MKT", text: "Once approved, help post creative announcements with the team locally and amplify National posts" }
    ]},
    { title: "New Deal / Leasing Announcement", steps: [
      { who: "IND", text: "Submit Marketing Airtable request", link: "https://airtable.com/shrDILYHH00BiB7xF" },
      { who: "IND", text: "Supply Marketing with the broker credit and deal details" }
    ]},
    { title: "Broker / Client Event", steps: [
      { who: "IND", text: "Submit Marketing Airtable request", link: "https://airtable.com/shrDILYHH00BiB7xF" },
      { who: "IND", text: "Supply Marketing with an overview of the event goal and details: budget, headcount, attendee list, important dates and anything else to note" }
    ]}
  ],

  // Who owns each active assignment.
  assignmentTeams: [
    { name: "Flightline", client: "MS IND Portfolio", roles: [
      { role: "IND Lead / Approver", person: "Brian Duffy" },
      { role: "MKT Lead", person: "Marissa Rupert" },
      { role: "MKT Designer", person: "Michael Krzewicki" }
    ]},
    { name: "APEX Elgin", client: "Scannell Development", roles: [
      { role: "IND Lead / Approver", person: "Ben Dickey" },
      { role: "MKT Lead", person: "Marissa Rupert" },
      { role: "MKT Designer", person: "Jason Thompson" }
    ]}
  ],

  // Team roster. group: Brokerage | Marketing | Research
  // Optional: focus ("Go-to for" line) and photo (square headshot path).
  team: [
    { name: "Brian Duffy", role: "Managing Director", group: "Brokerage", email: "brian.duffy@streamrealty.com", phone: "630.743.3313" },
    { name: "Ben Dickey", role: "Vice President", group: "Brokerage", email: "ben.dickey@streamrealty.com", phone: "224.465.3468" },
    { name: "Joe Connor", role: "Senior Associate", group: "Brokerage", email: "joe.connor@streamrealty.com", phone: "816.508.0232" },
    { name: "Brian Daly", role: "Senior Associate", group: "Brokerage", email: "brian.daly@streamrealty.com", phone: "847.544.6730" },
    { name: "Mario Macioce", role: "Associate", group: "Brokerage", email: "mario.macioce@streamrealty.com", phone: "312.767.3546" },
    { name: "Kennedy Arundel", role: "Associate", group: "Brokerage", email: "kennedy.arundel@streamrealty.com", phone: "773.580.1107" },
    { name: "Chad Meyer", role: "Associate", group: "Brokerage", email: "chad.meyer@streamrealty.com", phone: "614.561.5985" },
    { name: "Alyssa Aucoin", role: "Analyst", group: "Brokerage", email: "alyssa.aucoin@streamrealty.com", phone: "630.450.6837" },
    { name: "Liz Megginson", role: "Transaction Manager", group: "Brokerage", email: "liz.megginson@streamrealty.com", phone: "224.343.0090" },
    { name: "Marissa Rupert", role: "Strategic Marketing Director", group: "Marketing", email: "marissa.rupert@streamrealty.com", phone: "224.595.3797", focus: "Strategy, brand standards, campaign direction", photo: "assets/team/marissa-rupert.jpg" },
    { name: "Jason Thompson", role: "Senior Creative Manager", group: "Marketing", email: "jason.thompson@streamrealty.com", phone: "", focus: "Creative direction, concepting and content strategy", photo: "assets/team/jason-thompson.jpg" },
    { name: "Michael Krzewicki", role: "Creative Manager", group: "Marketing", email: "michael.krzewicki@streamrealty.com", phone: "312.900.0339", focus: "Property marketing, branding and business development presentations", photo: "assets/team/michael-krzewicki.jpg" },
    { name: "Celia Burch", role: "Senior Graphic Designer", group: "Marketing", email: "celia.burch@streamrealty.com", phone: "213.418.4102", focus: "Design, layout and collateral", photo: "assets/team/celia-burch.jpg" },
    { name: "Kaitlyn Maloney", role: "Senior Marketing Coordinator", group: "Marketing", email: "kaitlyn.maloney@streamrealty.com", phone: "773.372.2912", focus: "Intake, scheduling and project coordination", photo: "assets/team/kaitlyn-maloney.jpg" },
    { name: "Hannah Webster", role: "Senior Research Analyst", group: "Research", email: "hannah.webster@streamrealty.com", phone: "815.505.1234" }
  ]
};
