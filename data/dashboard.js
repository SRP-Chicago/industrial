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
    sampleData: true,
    // Where the "+ New marketing request" button goes (Microsoft Form, email, etc.)
    requestLink: "mailto:?subject=Industrial%20Marketing%20Request",
    // Group photo shown at the top of the Team tab ("" to hide).
    teamPhoto: "assets/team-photo.jpg"
  },

  // Marketing queue. status: Requested | In Progress | In Review | Complete
  // priority: High | Normal | Low
  // type: Flyer | BOV / OM | Pitch Deck | Tour Book | Social | Email Blast | Case Study | Signage | Website
  queue: [
    { title: "Pitch deck — 3PL user requirement", property: "Sample: I-55 Logistics Center", type: "Pitch Deck", owner: "Kaitlyn Maloney", broker: "Brian Duffy", status: "In Progress", priority: "High", due: "2026-10-12", link: "" },
    { title: "Leasing flyer refresh (new availability)", property: "Sample: O'Hare Cargo Park Bldg 2", type: "Flyer", owner: "Celia Burch", broker: "Ben Dickey", status: "In Review", priority: "Normal", due: "2026-10-10", link: "" },
    { title: "BOV — single-tenant NNN", property: "Sample: Elk Grove Distribution", type: "BOV / OM", owner: "Hannah Webster", broker: "Joe Connor", status: "Requested", priority: "High", due: "2026-10-20", link: "" },
    { title: "Tour book — 5 building I-80 tour", property: "Client: Sample Manufacturer", type: "Tour Book", owner: "Kaitlyn Maloney", broker: "Brian Duffy", status: "Requested", priority: "Normal", due: "2026-10-15", link: "" },
    { title: "LinkedIn carousel — Q3 leasing wins", property: "Team", type: "Social", owner: "Michael Krzewicki", broker: "Team", status: "In Progress", priority: "Normal", due: "2026-10-17", link: "" },
    { title: "Email blast — spec building delivery", property: "Sample: Joliet Gateway Bldg A", type: "Email Blast", owner: "Michael Krzewicki", broker: "Ben Dickey", status: "Requested", priority: "Low", due: "2026-10-28", link: "" },
    { title: "Case study — 450K SF build-to-suit", property: "Sample: Romeoville Commerce Ctr", type: "Case Study", owner: "Celia Burch", broker: "Joe Connor", status: "In Review", priority: "Normal", due: "2026-10-09", link: "" },
    { title: "Site signage — For Lease banner", property: "Sample: Bolingbrook Crossing", type: "Signage", owner: "Kaitlyn Maloney", broker: "Brian Duffy", status: "Complete", priority: "Normal", due: "2026-10-03", link: "" },
    { title: "Property website launch", property: "Sample: I-55 Logistics Center", type: "Website", owner: "Michael Krzewicki", broker: "Brian Duffy", status: "Complete", priority: "High", due: "2026-09-30", link: "" }
  ],

  // Final, client-ready presentations. type: Pitch | BOV / OM | Tour Book | Market Update | Case Study
  presentations: [
    { title: "Landlord pitch — 1.2M SF portfolio assignment", client: "Sample Institutional Owner", type: "Pitch", date: "2026-09-24", team: "Brian Duffy, Joe Connor", outcome: "Won", link: "", notes: "Strong submarket comps section and a 90-day marketing timeline." },
    { title: "Q3 Chicago Industrial market update", client: "Internal / Clients", type: "Market Update", date: "2026-10-03", team: "Hannah Webster", outcome: "", link: "", notes: "Use slides 4–9 for any client meeting this quarter." },
    { title: "Tenant rep — food & beverage cold storage search", client: "Sample F&B Company", type: "Tour Book", date: "2026-09-12", team: "Ben Dickey", outcome: "Pending", link: "", notes: "" },
    { title: "BOV — 210K SF Class A bulk", client: "Sample Private Owner", type: "BOV / OM", date: "2026-08-29", team: "Joe Connor, Hannah Webster", outcome: "Won", link: "", notes: "Lease-up scenarios laid out cleanly on one page." },
    { title: "Developer pitch — spec 300K SF", client: "Sample Developer", type: "Pitch", date: "2026-08-15", team: "Brian Duffy, Ben Dickey", outcome: "Lost", link: "", notes: "Debrief: client wanted more on labor-shed data." }
  ],

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
    { group: "Research & Market Data", items: [
      { label: "The Quarter — Chicago Industrial", link: "" },
      { label: "Lease & sale comps tracker", link: "" },
      { label: "Submarket map (Chicago MSA)", link: "" },
      { label: "Labor & drive-time data", link: "" }
    ]},
    { group: "Social & Digital", items: [
      { label: "Social templates (IG 1080×1080, LI 1200×627, Story 1080×1920)", link: "" },
      { label: "Email blast template", link: "" },
      { label: "Content calendar", link: "" }
    ]},
    { group: "Tools & Process", items: [
      { label: "Marketing request form", link: "" },
      { label: "Marketing request turnaround times", link: "" },
      { label: "Deal / pipeline tracker", link: "" },
      { label: "Signage vendor ordering", link: "" }
    ]}
  ],

  // Portfolio. status: Available | Under LOI | Leased | Coming Soon | For Sale
  // links: any of flyer, website, om, photos, tourBook, map, drive — "" to hide.
  portfolio: [
    { name: "Sample: I-55 Logistics Center", address: "Address TBD, Romeoville, IL", submarket: "I-55 Corridor", availableSF: 412000, clearHeight: "40'", status: "Available", broker: "Brian Duffy", links: { flyer: "", website: "", photos: "", map: "", drive: "" } },
    { name: "Sample: O'Hare Cargo Park Bldg 2", address: "Address TBD, Elk Grove Village, IL", submarket: "O'Hare", availableSF: 86500, clearHeight: "32'", status: "Under LOI", broker: "Ben Dickey", links: { flyer: "", website: "", photos: "", map: "", drive: "" } },
    { name: "Sample: Joliet Gateway Bldg A", address: "Address TBD, Joliet, IL", submarket: "I-80 / Joliet", availableSF: 625000, clearHeight: "40'", status: "Coming Soon", broker: "Ben Dickey", links: { flyer: "", website: "", photos: "", map: "", drive: "" } },
    { name: "Sample: Elk Grove Distribution", address: "Address TBD, Elk Grove Village, IL", submarket: "O'Hare", availableSF: 154000, clearHeight: "28'", status: "For Sale", broker: "Joe Connor", links: { om: "", photos: "", map: "", drive: "" } },
    { name: "Sample: Bolingbrook Crossing", address: "Address TBD, Bolingbrook, IL", submarket: "I-55 Corridor", availableSF: 0, clearHeight: "36'", status: "Leased", broker: "Brian Duffy", links: { flyer: "", photos: "", drive: "" } },
    { name: "Sample: Romeoville Commerce Ctr", address: "Address TBD, Romeoville, IL", submarket: "I-55 Corridor", availableSF: 0, clearHeight: "40'", status: "Leased", broker: "Joe Connor", links: { photos: "", drive: "" } },
    { name: "Sample: Aurora Business Park", address: "Address TBD, Aurora, IL", submarket: "I-88 / Fox Valley", availableSF: 238000, clearHeight: "36'", status: "Available", broker: "Joe Connor", links: { flyer: "", website: "", tourBook: "", map: "", drive: "" } },
    { name: "Sample: Lake County Flex Center", address: "Address TBD, Waukegan, IL", submarket: "Lake County", availableSF: 47200, clearHeight: "24'", status: "Available", broker: "Ben Dickey", links: { flyer: "", map: "", drive: "" } },
    { name: "Sample: Kenosha Logistics Park", address: "Address TBD, Kenosha, WI", submarket: "SE Wisconsin", availableSF: 520000, clearHeight: "40'", status: "Available", broker: "Brian Duffy", links: { flyer: "", website: "", photos: "", map: "", drive: "" } }
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
