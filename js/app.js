/* =============================================================================
   THE FRAME — application logic
   A tiny hash-router renders six views from the data in data/techniques.js.
   No framework, no build step. Open index.html and it works.
   ============================================================================= */
(function () {
  "use strict";

  const { CATEGORIES, DIFFICULTIES, EFFECTS, TECHNIQUES, COMBINATIONS } = window.VT;

  /* --------------------------- small helpers ----------------------------- */
  const $  = (sel, root = document) => root.querySelector(sel);
  const view = $("#view");

  const byId = (list, id) => list.find((x) => x.id === id);
  const cat  = (id) => byId(CATEGORIES, id) || { label: id };
  const diff = (id) => byId(DIFFICULTIES, id) || { label: id };
  const effect = (id) => byId(EFFECTS, id) || { label: id };
  const tech = (id) => byId(TECHNIQUES, id);

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const catVar = (id) => `--cat-${id}`;

  /* ------------------------------- state --------------------------------- */
  const PLAN_KEY = "vt-plan";
  let plan = loadPlan();

  function loadPlan() {
    try { return JSON.parse(localStorage.getItem(PLAN_KEY)) || []; }
    catch (e) { return []; }
  }
  function savePlan() {
    try { localStorage.setItem(PLAN_KEY, JSON.stringify(plan)); } catch (e) {}
    updatePlanCount();
  }
  function inPlan(id) { return plan.includes(id); }
  function togglePlan(id) {
    if (inPlan(id)) plan = plan.filter((x) => x !== id);
    else plan.push(id);
    savePlan();
  }

  function updatePlanCount() {
    const el = $("#navPlanCount");
    if (!el) return;
    el.textContent = plan.length;
    el.hidden = plan.length === 0;
  }

  /* explorer filter state (kept in memory, not the URL — keeps things simple) */
  const filters = { q: "", category: "all", difficulty: "all", effect: "all" };

  /* ------------------------- shared components --------------------------- */

  function categoryTag(id) {
    return `<span class="tag tag--cat" style="--cat-color:var(${catVar(id)})">${esc(cat(id).label)}</span>`;
  }
  function difficultyTag(id) {
    return `<span class="tag tag--diff diff-${id}"><span class="dot"></span>${esc(diff(id).label)}</span>`;
  }

  function techniqueMedia(t) {
    // Prefer the optimised photo (assets/examples/<id>.jpg); fall back to the
    // generated SVG panel for techniques whose photo isn't done yet.
    const path = `assets/examples/${t.id}.jpg`;
    const fallback = `assets/examples/${t.id}.svg`;
    return `
      <div class="tcard__media">
        <span class="cat-stripe" style="background:var(${catVar(t.category)})"></span>
        <div class="tcard__placeholder" style="--cat-color:color-mix(in srgb, var(${catVar(t.category)}) 14%, var(--paper-2))">
          <span class="ph-icon">▦</span>
          <span class="ph-text">Example slot</span>
        </div>
        <img src="${path}" alt="Example of ${esc(t.name)}" loading="lazy"
             onload="this.style.opacity=1"
             onerror="if(!this.dataset.fallback){this.dataset.fallback='1';this.src='${fallback}'}else{this.remove()}"
             style="opacity:0;transition:opacity .3s;position:absolute;inset:0" />
      </div>`;
  }

  function techniqueCard(t) {
    const related = (t.related || [])
      .map((rid) => tech(rid) ? `<a href="#/explorer" data-related="${esc(rid)}">${esc(tech(rid).name)}</a>` : "")
      .join("");

    return `
      <article class="tcard" id="t-${t.id}">
        ${techniqueMedia(t)}
        <div class="tcard__body">
          <div class="tcard__tags">
            ${categoryTag(t.category)}
            ${difficultyTag(t.difficulty)}
          </div>
          <h3 class="tcard__name">${esc(t.name)}</h3>
          <p class="tcard__blurb">${esc(t.blurb)}</p>

          <div class="tcard__rows">
            <div class="trow"><span class="trow__k">Creates</span><p class="trow__v">${esc(t.creates)}</p></div>
            <div class="trow"><span class="trow__k">In a video</span><p class="trow__v">${esc(t.useInMV)}</p></div>
            <div class="trow"><span class="trow__k">Example</span><p class="trow__v">${esc(t.example)}</p></div>
          </div>

          <details class="tcard__more">
            <summary>More: pitfalls &amp; related</summary>
            <div class="more-body">
              <div class="trow"><span class="trow__k">Avoid</span><p class="trow__v">${esc(t.mistakes)}</p></div>
              ${related ? `<div class="trow"><span class="trow__k">Related</span><div class="related-links">${related}</div></div>` : ""}
            </div>
          </details>

          <div class="tcard__foot">
            <button class="btn btn--sm ${inPlan(t.id) ? "btn--inplan" : "btn--accent"}" data-plan-toggle="${esc(t.id)}">
              ${inPlan(t.id) ? "✓ In my plan" : "+ Add to plan"}
            </button>
          </div>
        </div>
      </article>`;
  }

  function cardGrid(list) {
    if (!list.length) {
      return `<div class="empty"><h3>Nothing matches yet</h3><p>Try clearing a filter or searching a different word.</p></div>`;
    }
    return `<div class="card-grid">${list.map(techniqueCard).join("")}</div>`;
  }

  /* ------------------------------- HOME ---------------------------------- */
  function renderHome() {
    view.innerHTML = `
      <section class="hero hero--center">
        <div class="hero__inner">
          <p class="hero__kicker">A Visual Techniques Guide</p>
          <h1>Every shot is a <em>choice.</em></h1>
          <p class="hero__lead">
            Great music videos aren't built from random cool shots. They're built from
            deliberate visual decisions — each one chosen to make the audience feel something.
            Start with the effect you want, and find the technique that gets you there.
          </p>
          <div class="hero__cta">
            <a class="btn btn--accent" href="#/finder" data-link>Start with an effect →</a>
            <a class="btn btn--ghost" href="#/explorer" data-link>Browse all techniques</a>
          </div>
        </div>
      </section>

      <section class="wrap">
        <div class="section-head">
          <p class="eyebrow">How to use this guide</p>
          <h1>From intended effect to real technique</h1>
        </div>
        <div class="steps">
          <div class="step">
            <div class="step__num">1</div>
            <h3>Decide the effect</h3>
            <p>What should the audience feel — tension, isolation, power, nostalgia? Pick the mood or impact you're aiming for.</p>
          </div>
          <div class="step">
            <div class="step__num">2</div>
            <h3>Find the techniques</h3>
            <p>The guide suggests camera, editing, lighting, colour and staging choices that are known to create that effect.</p>
          </div>
          <div class="step">
            <div class="step__num">3</div>
            <h3>Plan your shoot</h3>
            <p>Add 3–5 techniques to your plan, then copy or export a summary to take into your production.</p>
          </div>
        </div>
      </section>

      <section class="manifesto">
        <div class="manifesto__inner">
          <p>“A close-up shows the girl staring into a cracked mirror. Blue low-key lighting makes it feel cold. The cracked mirror symbolises her <em>fragmented identity.</em>”</p>
        </div>
      </section>

      <section class="wrap">
        <div class="section-head">
          <p class="eyebrow">Where to go next</p>
          <h1>Four ways in</h1>
          <p>Whether you know the feeling you want or just want to browse, there's an entry point for you.</p>
        </div>
        <div class="effect-grid">
          ${homeLink("Effect Finder", "Pick a mood — get matched techniques", "#/finder")}
          ${homeLink("Technique Explorer", "Search and filter the full database", "#/explorer")}
          ${homeLink("Visual Recipes", "Ready-made combinations that work together", "#/combinations")}
          ${homeLink("My Plan", "Build and export your own shot list", "#/planner")}
        </div>
      </section>
    `;
  }
  function homeLink(label, hint, href) {
    return `
      <a class="effect-card" href="${href}" data-link>
        <span class="effect-card__tag">Section</span>
        <span class="effect-card__label">${esc(label)}</span>
        <p class="effect-card__hint">${esc(hint)}</p>
        <span class="effect-card__arrow">→</span>
      </a>`;
  }

  /* --------------------------- EFFECT FINDER ----------------------------- */
  function renderFinder() {
    view.innerHTML = `
      <section class="wrap">
        <div class="section-head">
          <p class="eyebrow">Effect Finder</p>
          <h1>What do you want the audience to feel?</h1>
          <p>Choose the effect, mood or impact you're going for. The guide will suggest visual techniques that help create it.</p>
        </div>
        <div class="effect-grid">
          ${EFFECTS.map((e) => `
            <a class="effect-card" href="#/finder/${e.id}" data-link>
              <span class="effect-card__tag">${esc(e.tagline)}</span>
              <span class="effect-card__label">${esc(e.label)}</span>
              <p class="effect-card__hint">${esc(e.hint)}</p>
              <span class="effect-card__arrow">→</span>
            </a>`).join("")}
        </div>
      </section>`;
  }

  function renderFinderResult(effectId) {
    const e = effect(effectId);
    if (!byId(EFFECTS, effectId)) { location.hash = "#/finder"; return; }

    // Match: techniques tagged with this effect. Rank by how primary the effect is
    // (earlier in the technique's effects array = stronger), then easier first.
    const order = { easy: 0, moderate: 1, advanced: 2 };
    const matches = TECHNIQUES
      .filter((t) => (t.effects || []).includes(effectId))
      .sort((a, b) =>
        a.effects.indexOf(effectId) - b.effects.indexOf(effectId) ||
        order[a.difficulty] - order[b.difficulty]);

    // Recipes that target this effect via their techniques
    const recipes = COMBINATIONS.filter((c) =>
      c.techniques.some((tid) => (tech(tid)?.effects || []).includes(effectId)));

    view.innerHTML = `
      <section class="wrap">
        <a class="back-link" href="#/finder" data-link>← All effects</a>
        <div class="finder-result-head">
          <div>
            <p class="eyebrow">${esc(e.tagline)}</p>
            <h1>${esc(e.label)}</h1>
          </div>
          <p class="lead">${esc(e.hint)}</p>
        </div>
        <p class="result-count"><strong>${matches.length}</strong> technique${matches.length === 1 ? "" : "s"} can help you ${esc(e.label.toLowerCase())}.</p>
        ${cardGrid(matches)}

        ${recipes.length ? `
          <div class="section-head" style="margin-top:3.5rem">
            <p class="eyebrow">Or use a ready-made recipe</p>
            <h2 style="font-size:var(--fs-h2)">Combinations that lean this way</h2>
          </div>
          <div class="combo-grid">${recipes.map(comboCard).join("")}</div>
        ` : ""}
      </section>`;
  }

  /* ------------------------- TECHNIQUE EXPLORER -------------------------- */
  function renderExplorer() {
    view.innerHTML = `
      <section class="wrap">
        <div class="section-head">
          <p class="eyebrow">Technique Explorer</p>
          <h1>The full toolkit</h1>
          <p>Search by name, or filter by production category, difficulty, or the effect you want to create.</p>
        </div>

        <div class="toolbar">
          <label class="search">
            <span class="search__icon" aria-hidden="true">⌕</span>
            <input id="searchInput" type="search" placeholder="Search techniques, e.g. 'silhouette'…"
                   value="${esc(filters.q)}" aria-label="Search techniques" />
          </label>
        </div>

        <div class="filter-group" style="margin-bottom:1rem">
          <span class="filter-group__label">Category</span>
          <div class="chips" id="catChips">
            ${chip("category", "all", "All", null)}
            ${CATEGORIES.map((c) => chip("category", c.id, c.label, `var(${catVar(c.id)})`)).join("")}
          </div>
        </div>

        <div class="filter-group" style="margin-bottom:1rem">
          <span class="filter-group__label">Difficulty</span>
          <div class="chips" id="diffChips">
            ${chip("difficulty", "all", "All", null)}
            ${DIFFICULTIES.map((d) => chip("difficulty", d.id, d.label, null)).join("")}
          </div>
        </div>

        <div class="filter-group" style="margin-bottom:1.8rem">
          <span class="filter-group__label">Effect</span>
          <div class="chips" id="effChips">
            ${chip("effect", "all", "All effects", null)}
            ${EFFECTS.map((e) => chip("effect", e.id, e.label, null)).join("")}
          </div>
        </div>

        <p class="result-count" id="resultCount"></p>
        <div id="explorerResults"></div>
      </section>`;

    refreshExplorer();
  }

  function chip(group, value, label, dot) {
    const active = filters[group] === value ? " is-active" : "";
    const d = dot ? `<span class="chip__dot" style="--dot:${dot}"></span>` : "";
    return `<button class="chip${active}" data-filter="${group}" data-value="${esc(value)}">${d}${esc(label)}</button>`;
  }

  function explorerMatches() {
    const q = filters.q.trim().toLowerCase();
    return TECHNIQUES.filter((t) => {
      if (filters.category !== "all" && t.category !== filters.category) return false;
      if (filters.difficulty !== "all" && t.difficulty !== filters.difficulty) return false;
      if (filters.effect !== "all" && !(t.effects || []).includes(filters.effect)) return false;
      if (q) {
        const hay = (t.name + " " + t.blurb + " " + t.creates + " " + t.useInMV).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  function refreshExplorer() {
    const list = explorerMatches();
    const countEl = $("#resultCount");
    if (countEl) countEl.innerHTML = `Showing <strong>${list.length}</strong> of ${TECHNIQUES.length} techniques`;
    const res = $("#explorerResults");
    if (res) res.innerHTML = cardGrid(list);
  }

  /* --------------------------- COMBINATIONS ------------------------------ */
  function comboCard(c) {
    const pills = c.techniques.map((tid) => {
      const t = tech(tid);
      if (!t) return "";
      return `<span class="combo__pill"><span class="chip__dot" style="--dot:var(${catVar(t.category)})"></span>${esc(t.name)}</span>`;
    }).join('<span class="combo__plus">+</span>');

    return `
      <article class="combo">
        <h3 class="combo__name">${esc(c.name)}</h3>
        <p class="combo__summary">${esc(c.summary)}</p>
        <div class="combo__stack">${pills}</div>
        <p class="combo__note">${esc(c.note)}</p>
        <div class="combo__foot">
          <button class="btn btn--sm btn--accent" data-add-combo="${esc(c.id)}">+ Add this recipe to my plan</button>
        </div>
      </article>`;
  }

  function renderCombinations() {
    view.innerHTML = `
      <section class="wrap">
        <div class="section-head">
          <p class="eyebrow">Visual Recipes</p>
          <h1>Combinations that work together</h1>
          <p>Single techniques are powerful — but they're stronger in combination. These are tested pairings that reinforce one clear effect. Use them as starting points, then make them your own.</p>
        </div>
        <div class="combo-grid">${COMBINATIONS.map(comboCard).join("")}</div>
      </section>`;
  }

  /* ------------------------------ GALLERY -------------------------------- */
  function renderGallery() {
    view.innerHTML = `
      <section class="wrap">
        <div class="section-head">
          <p class="eyebrow">Examples Gallery</p>
          <h1>See it in action</h1>
          <p>Each technique is demonstrated with a cinematic still designed to make the visual idea clear without labels or diagrams.</p>
        </div>

        <div class="gallery-note">
          <h3>Image naming</h3>
          <p>The site loads <code>assets/examples/&lt;id&gt;.jpg</code> for each technique. During the image-set
          upgrade, any technique without an optimised cinematic JPEG falls back to its original SVG panel.</p>
        </div>

        <div class="gallery-grid">
          ${TECHNIQUES.map((t) => `
            <figure class="gframe">
              <div class="tcard__placeholder" style="position:relative;height:100%;--cat-color:color-mix(in srgb, var(${catVar(t.category)}) 14%, var(--paper-2))">
                <span class="ph-icon">▦</span>
                <span class="ph-text">${esc(t.id)}.jpg</span>
              </div>
              <img src="assets/examples/${t.id}.jpg" alt="Example of ${esc(t.name)}" loading="lazy"
                   onerror="if(!this.dataset.fallback){this.dataset.fallback='1';this.src='assets/examples/${t.id}.svg'}else{this.remove()}"
                   style="position:absolute;inset:0" />
              <figcaption>${esc(t.name)}</figcaption>
            </figure>`).join("")}
        </div>
      </section>`;
  }

  /* ------------------------------ PLANNER -------------------------------- */
  function renderPlanner() {
    view.innerHTML = `
      <section class="wrap">
        <div class="section-head">
          <p class="eyebrow">Student Planning Tool</p>
          <h1>Build your shot list</h1>
          <p>Pick 3–5 techniques for your production. Your choices are saved on this device, and you can copy or download a summary to take into your shoot.</p>
        </div>

        <div class="planner-layout">
          <div>
            <div class="filter-group" style="margin-bottom:1rem">
              <span class="filter-group__label">Filter the list</span>
              <div class="chips" id="planCatChips">
                ${chip("category", "all", "All", null)}
                ${CATEGORIES.map((c) => chip("category", c.id, c.label, `var(${catVar(c.id)})`)).join("")}
              </div>
            </div>
            <div class="plan-pick" id="planPick"></div>
          </div>

          <aside class="plan-side">
            <h2>My production plan</h2>
            <p class="plan-side__count"><strong id="planNum">0</strong> techniques selected</p>
            <ul class="plan-list" id="planList"></ul>
            <p class="plan-hint" id="planHint">Aim for 3–5 techniques that reinforce one clear effect.</p>
            <div class="plan-side__actions">
              <button class="btn btn--accent" id="copyPlan">Copy summary</button>
              <button class="btn btn--ghost" id="downloadPlan">Download .txt</button>
              <button class="btn btn--ghost" id="clearPlan">Clear all</button>
            </div>
            <textarea class="plan-summary" id="planSummary" readonly aria-label="Plan summary"></textarea>
          </aside>
        </div>
      </section>`;

    filters.category = "all";
    refreshPlanPick();
    refreshPlanSide();
  }

  function refreshPlanPick() {
    const host = $("#planPick");
    if (!host) return;
    const list = TECHNIQUES.filter((t) => filters.category === "all" || t.category === filters.category);
    host.innerHTML = list.map((t) => `
      <button class="pick-row ${inPlan(t.id) ? "is-picked" : ""}" data-plan-toggle="${esc(t.id)}">
        <span class="pick-row__check">${inPlan(t.id) ? "✓" : ""}</span>
        <span class="pick-row__cat" style="background:var(${catVar(t.category)})"></span>
        <span class="pick-row__main">
          <span class="pick-row__name">${esc(t.name)}</span>
          <span class="pick-row__meta">${esc(cat(t.category).label)} · ${esc(diff(t.difficulty).label)}</span>
        </span>
      </button>`).join("");
  }

  function refreshPlanSide() {
    const numEl = $("#planNum");
    const listEl = $("#planList");
    const hintEl = $("#planHint");
    if (!listEl) return;
    if (numEl) numEl.textContent = plan.length;

    if (!plan.length) {
      listEl.innerHTML = `<li class="plan-empty" style="border:0;background:none">No techniques yet — pick some from the list.</li>`;
    } else {
      listEl.innerHTML = plan.map((id) => {
        const t = tech(id);
        if (!t) return "";
        return `<li style="--cat-color:var(${catVar(t.category)})">
            <span>${esc(t.name)}</span>
            <button data-plan-toggle="${esc(id)}" aria-label="Remove ${esc(t.name)}">×</button>
          </li>`;
      }).join("");
    }

    if (hintEl) {
      if (plan.length === 0) hintEl.textContent = "Aim for 3–5 techniques that reinforce one clear effect.";
      else if (plan.length < 3) hintEl.textContent = `Add ${3 - plan.length} more to reach a strong combination.`;
      else if (plan.length <= 5) hintEl.textContent = "Nice — that's a focused, workable combination.";
      else hintEl.textContent = "That's a lot of techniques. Consider trimming to the 3–5 that matter most.";
    }

    const ta = $("#planSummary");
    if (ta) ta.value = buildSummary();
  }

  function buildSummary() {
    if (!plan.length) return "Your plan is empty. Add 3–5 techniques to generate a summary.";
    const lines = [];
    lines.push("MY MUSIC VIDEO — VISUAL TECHNIQUE PLAN");
    lines.push("=======================================");
    lines.push("");
    plan.forEach((id, i) => {
      const t = tech(id);
      if (!t) return;
      lines.push(`${i + 1}. ${t.name}  [${cat(t.category).label} · ${diff(t.difficulty).label}]`);
      lines.push(`   What it is : ${t.blurb}`);
      lines.push(`   Effect     : ${t.creates}`);
      lines.push(`   My use     : ${t.useInMV}`);
      lines.push(`   Example    : ${t.example}`);
      lines.push(`   Watch out  : ${t.mistakes}`);
      lines.push("");
    });
    lines.push("Generated by THE FRAME — a visual techniques guide.");
    return lines.join("\n");
  }

  /* ------------------------------- toast --------------------------------- */
  let toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    requestAnimationFrame(() => toastEl.classList.add("is-show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-show"), 1900);
  }

  /* ------------------------------- router -------------------------------- */
  const routes = {
    home: renderHome,
    finder: renderFinder,
    explorer: renderExplorer,
    combinations: renderCombinations,
    gallery: renderGallery,
    planner: renderPlanner,
  };

  function currentRoute() {
    const raw = location.hash.replace(/^#\/?/, "");
    const [name, param] = raw.split("/");
    return { name: name || "home", param };
  }

  function render() {
    const { name, param } = currentRoute();
    if (name === "finder" && param) renderFinderResult(param);
    else (routes[name] || renderHome)();

    // highlight nav
    document.querySelectorAll(".nav a[data-route]").forEach((a) => {
      a.classList.toggle("is-active", a.getAttribute("data-route") === name);
    });
    // close mobile nav, reset scroll, move focus for a11y
    $("#primaryNav").classList.remove("is-open");
    $("#navToggle").setAttribute("aria-expanded", "false");
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    view.focus({ preventScroll: true });
    updatePlanCount();
  }

  /* --------------------------- event wiring ------------------------------ */

  // Global click delegation
  document.addEventListener("click", (ev) => {
    const t = ev.target;

    // chips
    const chipBtn = t.closest("[data-filter]");
    if (chipBtn) {
      const g = chipBtn.getAttribute("data-filter");
      filters[g] = chipBtn.getAttribute("data-value");
      // update active state within the same chip group
      chipBtn.parentElement.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
      chipBtn.classList.add("is-active");
      if (currentRoute().name === "planner") refreshPlanPick();
      else refreshExplorer();
      return;
    }

    // add/remove technique to plan
    const planBtn = t.closest("[data-plan-toggle]");
    if (planBtn) {
      const id = planBtn.getAttribute("data-plan-toggle");
      const wasIn = inPlan(id);
      togglePlan(id);
      toast(wasIn ? "Removed from plan" : "Added to plan");
      // refresh whichever views are showing
      const route = currentRoute().name;
      if (route === "planner") { refreshPlanPick(); refreshPlanSide(); }
      else {
        // update the specific button + any matching ones without full re-render
        document.querySelectorAll(`[data-plan-toggle="${CSS.escape(id)}"]`).forEach((b) => {
          if (b.classList.contains("btn")) {
            const now = inPlan(id);
            b.classList.toggle("btn--inplan", now);
            b.classList.toggle("btn--accent", !now);
            b.textContent = now ? "✓ In my plan" : "+ Add to plan";
          }
        });
      }
      return;
    }

    // add a whole recipe to the plan
    const comboBtn = t.closest("[data-add-combo]");
    if (comboBtn) {
      const c = byId(COMBINATIONS, comboBtn.getAttribute("data-add-combo"));
      if (c) {
        c.techniques.forEach((id) => { if (!inPlan(id) && tech(id)) plan.push(id); });
        savePlan();
        toast(`Added “${c.name}” recipe to plan`);
      }
      return;
    }

    // related-technique link → jump to explorer, filtered to that technique
    const relLink = t.closest("[data-related]");
    if (relLink) {
      ev.preventDefault();
      const rid = relLink.getAttribute("data-related");
      const rt = tech(rid);
      filters.q = rt ? rt.name : "";
      filters.category = "all"; filters.difficulty = "all"; filters.effect = "all";
      if (currentRoute().name === "explorer") { renderExplorer(); }
      else location.hash = "#/explorer";
      return;
    }

    // planner action buttons
    if (t.closest("#copyPlan")) {
      const text = buildSummary();
      navigator.clipboard?.writeText(text).then(
        () => toast("Summary copied to clipboard"),
        () => { $("#planSummary").select(); toast("Press Ctrl/Cmd + C to copy"); }
      );
      return;
    }
    if (t.closest("#downloadPlan")) {
      downloadText("my-video-plan.txt", buildSummary());
      toast("Downloaded my-video-plan.txt");
      return;
    }
    if (t.closest("#clearPlan")) {
      if (plan.length && confirm("Clear all techniques from your plan?")) {
        plan = []; savePlan(); refreshPlanPick(); refreshPlanSide(); toast("Plan cleared");
      }
      return;
    }
  });

  // search input (delegated on input event)
  document.addEventListener("input", (ev) => {
    if (ev.target.id === "searchInput") {
      filters.q = ev.target.value;
      refreshExplorer();
    }
  });

  // mobile nav toggle
  document.addEventListener("click", (ev) => {
    if (ev.target.closest("#navToggle")) {
      const nav = $("#primaryNav");
      const open = nav.classList.toggle("is-open");
      $("#navToggle").setAttribute("aria-expanded", String(open));
    }
  });

  // keyboard navigation between sections (1–6) when not typing
  const ROUTE_KEYS = ["home", "finder", "explorer", "combinations", "gallery", "planner"];
  document.addEventListener("keydown", (ev) => {
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) return;
    const n = parseInt(ev.key, 10);
    if (n >= 1 && n <= ROUTE_KEYS.length) location.hash = "#/" + ROUTE_KEYS[n - 1];
  });

  function downloadText(filename, text) {
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  window.addEventListener("hashchange", render);
  window.addEventListener("DOMContentLoaded", () => { updatePlanCount(); render(); });
  // In case DOMContentLoaded already fired
  if (document.readyState !== "loading") { updatePlanCount(); render(); }
})();
