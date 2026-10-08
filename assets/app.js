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

  // ---------- resources ----------
  function renderResources() {
    renderLinkGroups($("resources-list"), D.resources || []);
  }

  function renderResearch() {
    var c = $("research-contact");
    c.innerHTML = "";
    var r = D.research || {};
    var person = (D.team || []).filter(function (m) { return m.name === r.contact; })[0];
    if (person) {
      var contact = [];
      if (person.email) contact.push(h("a", { href: "mailto:" + person.email, text: person.email }));
      if (person.phone) contact.push(" · ", h("a", { href: "tel:" + person.phone.replace(/[^0-9+]/g, ""), text: person.phone }));
      c.appendChild(h("div", { class: "panel research-contact__card" }, [
        h("div", { class: "avatar", "aria-hidden": "true", text: person.name.split(/\s+/).map(function (w) { return w[0]; }).join("") }),
        h("div", null, [
          h("div", { class: "research-contact__label", text: "Research questions? Ask" }),
          h("div", { class: "member__name", text: person.name + ", " + person.role }),
          h("div", { class: "member__contact" }, contact)
        ])
      ]));
    }
    var rl = $("report-list");
    rl.innerHTML = "";
    var reports = (r.reports || []).filter(matches);
    reports.forEach(function (rep, i) {
      var isLatest = rep === (r.reports || [])[0];
      rl.appendChild(h("article", { class: "report" + (isLatest ? " report--latest" : "") }, [
        h("div", { class: "report__top" }, [
          h("div", null, [
            h("div", { class: "report__quarter", text: rep.quarter }),
            h("h4", { class: "report__title", text: rep.title })
          ]),
          h("div", { class: "report__tags" }, [
            isLatest ? h("span", { class: "pill pill--available", text: "Latest" }) : null,
            rep.status && rep.status !== "Final" ? h("span", { class: "pill pill--loi", text: rep.status }) : null
          ])
        ]),
        h("dl", { class: "report__stats" }, (rep.stats || []).reduce(function (acc, st) {
          return acc.concat([h("div", null, [h("dd", { text: st.value }), h("dt", { text: st.label })])]);
        }, [])),
        rep.takeaway ? h("p", { class: "report__takeaway", text: rep.takeaway }) : null,
        rep.file ? h("a", { class: "link-btn", href: rep.file, target: "_blank", rel: "noopener", text: "Open report (PDF) ↗" }) : null
      ]));
    });
    if (!reports.length) rl.appendChild(empty((r.reports || []).length ? null : "No reports yet."));

    renderLinkGroups($("research-list"), r.groups || []);
  }

  function renderLinkGroups(box, groups) {
    box.innerHTML = "";
    var shown = 0;
    groups.forEach(function (g) {
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

  // ---------- process ----------
  var LETTERS = "abcdefghijklmnopqrstuvwxyz";

  function whoChip(who) {
    var cls = who === "MKT" ? "mkt" : who === "IND" ? "ind" : "both";
    return h("span", { class: "who who--" + cls, text: who });
  }

  function renderProcess() {
    var box = $("process-list");
    box.innerHTML = "";
    var items = (D.process || []).filter(matches);
    items.forEach(function (proc, i) {
      var ol = h("ol", { class: "steps" });
      (proc.steps || []).forEach(function (st, j) {
        var text = st.link
          ? h("a", { href: st.link, target: "_blank", rel: "noopener", text: st.text + " ↗" })
          : h("span", { text: st.text });
        ol.appendChild(h("li", { class: "step" }, [
          h("span", { class: "step__letter", text: LETTERS[j] || "" }),
          whoChip(st.who),
          h("div", { class: "step__text" }, [text, st.note ? h("span", { class: "step__note", text: st.note }) : null])
        ]));
      });
      var details = h("details", { class: "proc" }, [
        h("summary", null, [
          h("span", { class: "proc__num", text: String((D.process || []).indexOf(proc) + 1) }),
          h("span", { class: "proc__title", text: proc.title }),
          h("span", { class: "proc__count", text: proc.steps.length + " steps" })
        ]),
        ol
      ]);
      if (i === 0 || state.q) details.open = true;
      box.appendChild(details);
    });
    if (!items.length) box.appendChild(empty(D.process && D.process.length ? null : "Process steps coming soon."));

  }

  // ---------- assignment teams (Portfolio tab) ----------
  function renderAssignments() {
    var as = $("assignment-list");
    as.innerHTML = "";
    var teams = (D.assignmentTeams || []).filter(matches);
    $("assignments-block").hidden = !(D.assignmentTeams || []).length;
    teams.forEach(function (t) {
      as.appendChild(h("div", { class: "panel" }, [
        h("h4", { class: "assign__name", text: t.name }),
        h("div", { class: "assign__client", text: t.client || "" }),
        h("dl", { class: "assign__roles" }, (t.roles || []).reduce(function (acc, r) {
          return acc.concat([h("dt", { text: r.role }), h("dd", { text: r.person })]);
        }, []))
      ]));
    });
    if (!teams.length && (D.assignmentTeams || []).length) as.appendChild(empty());
  }

  // ---------- team ----------
  function renderTeam() {
    var photo = D.meta && D.meta.teamPhoto;
    if (photo) {
      $("team-photo-img").src = photo;
      $("team-photo-img").alt = "The Stream Chicago Industrial team";
      $("team-photo").hidden = false;
    }
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
        var avatar = m.photo
          ? h("img", { class: "avatar avatar--photo", src: m.photo, alt: "", loading: "lazy" })
          : h("div", { class: "avatar", "aria-hidden": "true", text: initials });
        panel.appendChild(h("div", { class: "member" }, [
          avatar,
          h("div", null, [
            h("div", { class: "member__name", text: m.name }),
            h("div", { class: "member__role", text: m.role }),
            contact.length ? h("div", { class: "member__contact" }, contact) : null,
            m.focus ? h("div", { class: "member__focus" }, [h("span", { text: "Go-to for " }), m.focus]) : null
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
    renderResearch();
    renderResources();
    renderPortfolio();
    renderAssignments();
    renderProcess();
    updateTabCounts();
  }

  function bindSelect(id, key, values, allLabel) {
    var sel = $(id);
    fillSelect(sel, values, allLabel);
    sel.addEventListener("change", function () { state[key] = sel.value; renderFiltered(); });
  }

  // ---------- tabs ----------
  var TABS = ["queue", "portfolio", "presentations", "research", "resources", "process", "team"];

  function showTab(id, focus) {
    if (TABS.indexOf(id) === -1) id = TABS[0];
    TABS.forEach(function (t) {
      var on = t === id;
      $(t).hidden = !on;
      var tab = $("tab-" + t);
      tab.classList.toggle("is-active", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
      if (on && focus) tab.focus();
    });
    if (location.hash !== "#" + id) {
      try { history.replaceState(null, "", "#" + id); } catch (e) { /* sandboxed viewers */ }
    }
  }

  function setupTabs() {
    TABS.forEach(function (t, i) {
      var tab = $("tab-" + t);
      tab.addEventListener("click", function (e) { e.preventDefault(); showTab(t); window.scrollTo(0, 0); });
      tab.addEventListener("keydown", function (e) {
        var step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!step) return;
        e.preventDefault();
        showTab(TABS[(i + step + TABS.length) % TABS.length], true);
      });
    });
    window.addEventListener("hashchange", function () { showTab(location.hash.slice(1)); });
    showTab(location.hash.slice(1));
    // Opening a #tab link shouldn't scroll the panel under the header.
    window.addEventListener("load", function () { window.scrollTo(0, 0); });
  }

  // While searching, show how many matches each tab has.
  function updateTabCounts() {
    var counts = {
      queue: document.querySelectorAll("#board .task").length,
      presentations: document.querySelectorAll("#presentations-list .card").length,
      research: document.querySelectorAll("#research-list li, #report-list .report").length,
      resources: document.querySelectorAll("#resources-list li").length,
      portfolio: document.querySelectorAll("#portfolio-table .prop-name").length,
      process: document.querySelectorAll("#process-list .proc").length
    };
    Object.keys(counts).forEach(function (t) {
      var tab = $("tab-" + t);
      var badge = tab.querySelector(".tab-count");
      if (!state.q) { if (badge) badge.remove(); return; }
      if (!badge) { badge = h("span", { class: "tab-count" }); tab.appendChild(badge); }
      badge.textContent = counts[t];
      badge.classList.toggle("tab-count--zero", !counts[t]);
    });
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
    renderFiltered();
    renderTeam();
    setupTabs();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
