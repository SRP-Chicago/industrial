/* Stream Industrial — Brokerage & Marketing Hub
   Renders everything from window.DASHBOARD_DATA (data/dashboard.js). */
(function () {
  "use strict";

  var D = window.DASHBOARD_DATA || {};
  var STATUSES = ["Requested", "In Progress", "In Review", "Complete"];
  var LINK_LABELS = { flyer: "Flyer", website: "Website", om: "OM", photos: "Photos", tourBook: "Tour Book", map: "Map", drive: "Folder" };
  var state = { q: "", queueType: "", queueOwner: "", presType: "", submarket: "", status: "", sortKey: "name", sortDir: 1 };

  // ---------- helpers ----------
  function $(id) { return document.getElementById(id); }

  function h(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else node.setAttribute(k, v);
    });
    (children || []).forEach(function (c) {
      if (c == null || c === false) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function parseDate(s) {
    if (!s) return null;
    var p = String(s).split("-");
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }
  function today() { var d = new Date(); d.setHours(0, 0, 0, 0); return d; }
  function daysUntil(s) { var d = parseDate(s); return d ? Math.round((d - today()) / 864e5) : null; }
  function fmtDate(s, withYear) {
    var d = parseDate(s);
    if (!d) return "";
    var o = { month: "short", day: "numeric" };
    if (withYear) o.year = "numeric";
    return d.toLocaleDateString("en-US", o);
  }
  function fmtSF(n) { return n ? Number(n).toLocaleString("en-US") : "—"; }
  function slug(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-"); }
  function uniq(arr) { return arr.filter(function (v, i) { return v && arr.indexOf(v) === i; }).sort(); }
  function matches(obj) {
    if (!state.q) return true;
    return values(obj).join(" ").toLowerCase().indexOf(state.q) !== -1;
  }
  function values(o) {
    if (o == null) return [];
    if (typeof o !== "object") return [String(o)];
    return Object.keys(o).reduce(function (acc, k) { return acc.concat(values(o[k])); }, []);
  }
  function fmtBigSF(n) {
    if (n >= 1e6) return (n / 1e6).toFixed(2).replace(/\.?0+$/, "") + "M";
    if (n >= 1e3) return Math.round(n / 1e3) + "K";
    return String(n);
  }

  function fillSelect(sel, values, allLabel) {
    sel.innerHTML = "";
    sel.appendChild(h("option", { value: "", text: allLabel }));
    values.forEach(function (v) { sel.appendChild(h("option", { value: v, text: v })); });
  }

  function linkButton(url, label) {
    if (url) return h("a", { class: "link-btn", href: url, target: "_blank", rel: "noopener", text: label + " ↗" });
    return h("span", { class: "link-btn link-btn--pending", title: "Add a link in data/dashboard.js", text: "Link coming" });
  }

  function dueBadge(item) {
    if (item.status === "Complete" || !item.due) return null;
    var n = daysUntil(item.due);
    if (n < 0) return h("span", { class: "pill pill--overdue", text: "Overdue" });
    if (n <= 3) return h("span", { class: "pill pill--soon", text: n === 0 ? "Due today" : "Due in " + n + "d" });
    return null;
  }

  function statusPill(status) {
    var map = { "Available": "available", "Under LOI": "loi", "Leased": "leased", "Coming Soon": "coming", "For Sale": "sale" };
    return h("span", { class: "pill pill--" + (map[status] || "type"), text: status });
  }

  function empty(msg) { return h("p", { class: "empty", text: msg || "Nothing matches your filters." }); }

  // ---------- overview ----------
  function renderOverview() {
    var queue = D.queue || [];
    var open = queue.filter(function (t) { return t.status !== "Complete"; });
    var overdue = open.filter(function (t) { return t.due && daysUntil(t.due) < 0; }).length;
    var portfolio = D.portfolio || [];
    var avail = portfolio.filter(function (p) { return p.status !== "Leased"; });
    var sf = avail.reduce(function (s, p) { return s + (Number(p.availableSF) || 0); }, 0);
    var pres90 = (D.presentations || []).filter(function (p) { var n = daysUntil(p.date); return n !== null && n >= -90; }).length;

    var stats = [
      { value: open.length, label: "In the queue", sub: overdue ? overdue + " overdue" : "Nothing overdue", href: "#queue" },
      { value: queue.filter(function (t) { return t.status === "In Review"; }).length, label: "Awaiting review", sub: "Needs broker sign-off", href: "#queue" },
      { value: pres90, label: "Final decks shared", sub: "Last 90 days", href: "#presentations" },
      { value: portfolio.length, label: "Portfolio properties", sub: avail.length + " active listings", href: "#portfolio" },
      { value: fmtBigSF(sf), label: "SF available", sub: "Across active listings", href: "#portfolio" }
    ];
    var box = $("stats");
    box.innerHTML = "";
    stats.forEach(function (s) {
      box.appendChild(h("a", { class: "stat", href: s.href }, [
        h("div", { class: "stat__value", text: String(s.value) }),
        h("div", { class: "stat__label", text: s.label }),
        h("div", { class: "stat__sub", text: s.sub })
      ]));
    });

    var up = $("updates");
    up.innerHTML = "";
    (D.updates || []).slice(0, 6).forEach(function (u) {
      up.appendChild(h("li", null, [h("span", { class: "date-chip", text: fmtDate(u.date) }), h("span", { text: u.text })]));
    });
    if (!up.children.length) up.appendChild(h("li", { text: "No updates yet." }));

    var soon = open
      .filter(function (t) { return t.due && daysUntil(t.due) <= 14; })
      .sort(function (a, b) { return parseDate(a.due) - parseDate(b.due); });
    var ds = $("due-soon");
    ds.innerHTML = "";
    soon.forEach(function (t) {
      ds.appendChild(h("li", null, [
        h("span", { class: "date-chip", text: fmtDate(t.due) }),
        h("div", null, [
          h("div", { class: "title", text: t.title }),
          h("div", { class: "sub", text: [t.property, t.owner, t.status].filter(Boolean).join(" · ") })
        ]),
        dueBadge(t)
      ]));
    });
    if (!soon.length) ds.appendChild(h("li", { text: "Nothing due in the next two weeks." }));

    var lu = $("last-updated");
    if (D.meta && D.meta.lastUpdated) lu.textContent = "Last updated " + fmtDate(D.meta.lastUpdated, true);
  }

  // ---------- queue ----------
  function renderQueue() {
    var board = $("board");
    board.innerHTML = "";
    var items = (D.queue || []).filter(function (t) {
      return matches(t) && (!state.queueType || t.type === state.queueType) && (!state.queueOwner || t.owner === state.queueOwner);
    });
    STATUSES.forEach(function (status) {
      var col = items
        .filter(function (t) { return t.status === status; })
        .sort(function (a, b) {
          var pa = a.priority === "High" ? 0 : 1, pb = b.priority === "High" ? 0 : 1;
          return pa - pb || (parseDate(a.due) || 0) - (parseDate(b.due) || 0);
        });
      var column = h("div", { class: "column" }, [
        h("div", { class: "column__head" }, [h("span", { text: status }), h("span", { class: "column__count", text: String(col.length) })])
      ]);
      col.forEach(function (t) {
        column.appendChild(h("article", { class: "task" + (t.priority === "High" ? " task--high" : "") + (status === "Complete" ? " task--complete" : "") }, [
          h("p", { class: "task__title", text: t.title }),
          h("p", { class: "task__prop", text: t.property || "" }),
          h("div", { class: "task__row" }, [
            h("span", { class: "pill pill--type", text: t.type }),
            t.priority === "High" ? h("span", { class: "pill pill--high", text: "High" }) : null,
            t.due ? h("span", { text: "Due " + fmtDate(t.due) }) : null,
            dueBadge(t)
          ]),
          h("div", { class: "task__people", text: [t.owner && "Owner: " + t.owner, t.broker && "Broker: " + t.broker].filter(Boolean).join(" · ") }),
          t.link ? h("a", { href: t.link, target: "_blank", rel: "noopener", text: "Open draft ↗" }) : null
        ]));
      });
      if (!col.length) column.appendChild(h("p", { class: "empty", text: "—" }));
      board.appendChild(column);
    });
  }

  // ---------- presentations ----------
  function renderPresentations() {
    var box = $("presentations-list");
    box.innerHTML = "";
    var items = (D.presentations || [])
      .filter(function (p) { return matches(p) && (!state.presType || p.type === state.presType); })
      .sort(function (a, b) { return parseDate(b.date) - parseDate(a.date); });
    items.forEach(function (p) {
      var outcome = p.outcome ? h("span", { class: "pill pill--" + slug(p.outcome), text: p.outcome }) : null;
      box.appendChild(h("article", { class: "card" }, [
        h("div", { class: "card__top" }, [h("span", { class: "pill pill--type", text: p.type }), h("span", { class: "card__date", text: fmtDate(p.date, true) })]),
        h("h3", { class: "card__title", text: p.title }),
        h("p", { class: "card__sub", text: [p.client, p.team].filter(Boolean).join(" · ") }),
        p.notes ? h("p", { class: "card__notes", text: p.notes }) : null,
        h("div", { class: "card__foot" }, [linkButton(p.link, "Open deck"), outcome])
      ]));
    });
    if (!items.length) box.appendChild(empty());
  }

  // ---------- best in class ----------
  function renderBest() {
    var box = $("best-list");
    box.innerHTML = "";
    var items = (D.best || []).filter(matches);
    items.forEach(function (b) {
      box.appendChild(h("article", { class: "card" }, [
        h("div", { class: "card__top" }, [h("span", { class: "pill pill--type", text: b.category })]),
        h("h3", { class: "card__title", text: b.title }),
        h("p", { class: "quote", text: "“" + b.why + "”" }),
        h("div", { class: "card__foot" }, [h("span", { class: "card__sub", text: b.by || "" }), linkButton(b.link, "View")])
      ]));
    });
    if (!items.length) box.appendChild(empty());
  }

  // ---------- resources ----------
  function renderResources() {
    var box = $("resources-list");
    box.innerHTML = "";
    var shown = 0;
    (D.resources || []).forEach(function (g) {
      var groupHit = state.q && g.group.toLowerCase().indexOf(state.q) !== -1;
      var items = (g.items || []).filter(function (i) { return groupHit || matches(i); });
      if (!items.length) return;
      shown++;
      var ul = h("ul");
      items.forEach(function (i) {
        var label = i.link
          ? h("a", { href: i.link, target: "_blank", rel: "noopener", text: i.label })
          : h("span", { class: "muted-link", text: i.label });
        ul.appendChild(h("li", null, [
          h("div", null, [label, i.note ? h("span", { class: "res-note", text: i.note }) : null]),
          i.link ? null : h("span", { class: "soon", text: "link needed" })
        ]));
      });
      box.appendChild(h("div", { class: "panel" }, [
        h("h3", { class: "panel__title" }, [h("span", { class: "square", "aria-hidden": "true" }), g.group]),
        ul
      ]));
    });
    if (!shown) box.appendChild(empty());
  }

  // ---------- portfolio ----------
  function renderPortfolio() {
    var tbody = document.querySelector("#portfolio-table tbody");
    tbody.innerHTML = "";
    var key = state.sortKey, dir = state.sortDir;
    var items = (D.portfolio || [])
      .filter(function (p) {
        return matches(p) && (!state.submarket || p.submarket === state.submarket) && (!state.status || p.status === state.status);
      })
      .sort(function (a, b) {
        var va = a[key], vb = b[key];
        if (key === "availableSF") return ((Number(va) || 0) - (Number(vb) || 0)) * dir;
        return String(va || "").localeCompare(String(vb || ""), undefined, { numeric: true }) * dir;
      });

    items.forEach(function (p) {
      var links = h("div", { class: "qlinks" });
      Object.keys(p.links || {}).forEach(function (k) {
        var url = p.links[k];
        links.appendChild(url
          ? h("a", { class: "qlink", href: url, target: "_blank", rel: "noopener", text: LINK_LABELS[k] || k })
          : h("span", { class: "qlink qlink--off", title: "Link not added yet", text: LINK_LABELS[k] || k }));
      });
      tbody.appendChild(h("tr", null, [
        h("td", null, [h("div", { class: "prop-name", text: p.name }), h("div", { class: "prop-addr", text: p.address || "" })]),
        h("td", { "data-label": "Submarket", text: p.submarket }),
        h("td", { class: "num", "data-label": "Available SF", text: fmtSF(p.availableSF) }),
        h("td", { "data-label": "Clear height", text: p.clearHeight || "—" }),
        h("td", null, [statusPill(p.status)]),
        h("td", { "data-label": "Broker", text: p.broker || "" }),
        h("td", null, [links])
      ]));
    });
    if (!items.length) {
      tbody.appendChild(h("tr", null, [h("td", { colspan: "7" }, [empty()])]));
    }

    var sf = items.reduce(function (s, p) { return s + (p.status === "Leased" ? 0 : Number(p.availableSF) || 0); }, 0);
    var counts = {};
    items.forEach(function (p) { counts[p.status] = (counts[p.status] || 0) + 1; });
    var sum = $("portfolio-summary");
    sum.innerHTML = "";
    sum.appendChild(h("span", null, [h("strong", { text: String(items.length) }), " properties"]));
    sum.appendChild(h("span", null, [h("strong", { text: fmtSF(sf) }), " SF available"]));
    Object.keys(counts).sort().forEach(function (k) {
      sum.appendChild(h("span", null, [h("strong", { text: String(counts[k]) }), " " + k]));
    });

    document.querySelectorAll("#portfolio-table th").forEach(function (th) {
      th.setAttribute("aria-sort", th.dataset.key === key ? (dir === 1 ? "ascending" : "descending") : "none");
    });
  }

  function setupPortfolioSort() {
    var keys = ["name", "submarket", "availableSF", "clearHeight", "status", "broker", null];
    document.querySelectorAll("#portfolio-table th").forEach(function (th, i) {
      if (!keys[i]) { th.style.cursor = "default"; return; }
      th.dataset.key = keys[i];
      th.tabIndex = 0;
      function sort() {
        if (state.sortKey === keys[i]) state.sortDir *= -1;
        else { state.sortKey = keys[i]; state.sortDir = keys[i] === "availableSF" ? -1 : 1; }
        renderPortfolio();
      }
      th.addEventListener("click", sort);
      th.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sort(); } });
    });
  }

  // ---------- team ----------
  function renderTeam() {
    var box = $("team-list");
    box.innerHTML = "";
    var groups = uniq((D.team || []).map(function (m) { return m.group; }));
    groups.forEach(function (g) {
      var panel = h("div", { class: "panel" }, [
        h("h3", { class: "panel__title" }, [h("span", { class: "square", "aria-hidden": "true" }), g])
      ]);
      (D.team || []).filter(function (m) { return m.group === g; }).forEach(function (m) {
        var initials = m.name.split(/\s+/).map(function (w) { return w[0]; }).join("").slice(0, 2).toUpperCase();
        var contact = [];
        if (m.email) contact.push(h("a", { href: "mailto:" + m.email, text: m.email }));
        if (m.phone) contact.push((contact.length ? " · " : ""), h("a", { href: "tel:" + m.phone.replace(/[^0-9+]/g, ""), text: m.phone }));
        panel.appendChild(h("div", { class: "member" }, [
          h("div", { class: "avatar", "aria-hidden": "true", text: initials }),
          h("div", null, [
            h("div", { class: "member__name", text: m.name }),
            h("div", { class: "member__role", text: m.role }),
            contact.length ? h("div", { class: "member__contact" }, contact) : null
          ])
        ]));
      });
      box.appendChild(panel);
    });
  }

  // ---------- wiring ----------
  function renderFiltered() {
    renderQueue();
    renderPresentations();
    renderBest();
    renderResources();
    renderPortfolio();
  }

  function bindSelect(id, key, values, allLabel) {
    var sel = $(id);
    fillSelect(sel, values, allLabel);
    sel.addEventListener("change", function () { state[key] = sel.value; renderFiltered(); });
  }

  function setupNavHighlight() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".sectionnav a"));
    if (!("IntersectionObserver" in window)) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll("main .section").forEach(function (s) { obs.observe(s); });
  }

  function init() {
    if (D.meta && D.meta.sampleData) $("sample-banner").hidden = false;
    var req = $("request-link");
    if (D.meta && D.meta.requestLink) req.href = D.meta.requestLink; else req.classList.add("is-hidden");

    bindSelect("queue-type", "queueType", uniq((D.queue || []).map(function (t) { return t.type; })), "All");
    bindSelect("queue-owner", "queueOwner", uniq((D.queue || []).map(function (t) { return t.owner; })), "Everyone");
    bindSelect("pres-type", "presType", uniq((D.presentations || []).map(function (p) { return p.type; })), "All");
    bindSelect("port-submarket", "submarket", uniq((D.portfolio || []).map(function (p) { return p.submarket; })), "All");
    bindSelect("port-status", "status", uniq((D.portfolio || []).map(function (p) { return p.status; })), "All");

    var search = $("global-search");
    var timer;
    search.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(function () { state.q = search.value.trim().toLowerCase(); renderFiltered(); }, 120);
    });

    setupPortfolioSort();
    renderOverview();
    renderFiltered();
    renderTeam();
    setupNavHighlight();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
