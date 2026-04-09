const STORAGE_KEY = "straeva-pwa-v1";
const THEME_MEDIA = window.matchMedia("(prefers-color-scheme: dark)");

const routes = [
  { id: "home", label: "Hjem", icon: "HJ" },
  { id: "movement", label: "Bevegelse", icon: "BV" },
  { id: "wins", label: "Seire", icon: "SR" },
  { id: "care", label: "Omsorg", icon: "OM" },
  { id: "settings", label: "Mer", icon: "ME" }
];

const energyOptions = [
  { value: 1, icon: "1", title: "Tung" },
  { value: 2, icon: "2", title: "Sår" },
  { value: 3, icon: "3", title: "Rolig" },
  { value: 4, icon: "4", title: "Klar" },
  { value: 5, icon: "5", title: "Varm" }
];

const moodOptions = [
  { value: 1, label: "Tung" },
  { value: 2, label: "Skjør" },
  { value: 3, label: "Stille" },
  { value: 4, label: "Lysere" },
  { value: 5, label: "Lett" }
];

const activityTypes = ["Rolig gåtur", "Puste-strekk", "Hjemmebevegelse", "Dans i stua", "Sakte jogg", "Hvile med rytme"];

const winPresets = [
  { label: "Tok på meg skoene", category: "oppmøte" },
  { label: "Gikk til postkassen", category: "bevegelse" },
  { label: "Tøyde ut i sengen", category: "myk start" },
  { label: "Drakk et glass vann", category: "omsorg" },
  { label: "Luftet rommet", category: "hverdag" },
  { label: "Tok en pause uten skyld", category: "ro" }
];

const careCategories = [
  {
    id: "self",
    title: "For deg selv",
    hint: "Det som roer kroppen og myker opp dagen.",
    presets: ["Spiste noe som nærer", "La meg ned i fem minutter", "Ba om hjelp", "Sa nei til noe jeg ikke orket"]
  },
  {
    id: "others",
    title: "For andre",
    hint: "Smått og varmt uten at det må bli stort.",
    presets: ["Sendte en melding", "Tok en telefon", "Lyttet uten å fikse", "Ba noen bli med ut"]
  },
  {
    id: "home",
    title: "For hverdagen",
    hint: "Lite nok til at det faktisk kan skje i dag.",
    presets: ["Ryddet ett hjørne", "Vannet noe levende", "Vasket en kopp", "Skiftet sengetøy"]
  }
];

const affirmations = [
  "Du trenger ikke vinne dagen for at dagen skal telle.",
  "Å møte opp er også bevegelse.",
  "Hvile er ikke et avvik. Det er en del av rytmen.",
  "Kroppen din fortjener vennlighet, ikke press.",
  "Smått kan være dypt når det skjer ofte."
];

const state = loadState();
const ui = { deferredPrompt: null, modal: null, toast: null };

const topbarEl = document.querySelector("#topbar");
const appEl = document.querySelector("#app");
const navEl = document.querySelector("#bottom-nav");
const modalRootEl = document.querySelector("#modal-root");
const importInputEl = document.querySelector("#import-input");

let timerId = null;

document.addEventListener("click", handleClick);
document.addEventListener("submit", handleSubmit);
window.addEventListener("hashchange", syncRouteFromHash);
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  ui.deferredPrompt = event;
  render();
});
window.addEventListener("appinstalled", () => {
  ui.deferredPrompt = null;
  showToast("Stræva er installert på enheten din.");
  render();
});
window.addEventListener("online", () => showToast("Du er tilkoblet igjen."));
window.addEventListener("offline", () => showToast("Appen er fortsatt tilgjengelig offline."));
THEME_MEDIA.addEventListener("change", () => render());
importInputEl.addEventListener("change", handleImportFile);

syncRouteFromHash();
registerServiceWorker();
render();

function loadState() {
  const base = {
    version: 1,
    route: "home",
    profile: { name: "venn", supportSquad: ["Ida", "Marius", "Siri"] },
    settings: { theme: "light", hideMetricsByDefault: true },
    dayLog: {},
    movement: { activeSession: null, sessions: [] },
    wins: [],
    care: [],
    celebrations: []
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw);
    return {
      ...base,
      ...parsed,
      profile: { ...base.profile, ...(parsed.profile || {}) },
      settings: { ...base.settings, ...(parsed.settings || {}) },
      movement: {
        activeSession: parsed.movement?.activeSession || null,
        sessions: Array.isArray(parsed.movement?.sessions) ? parsed.movement.sessions : []
      },
      wins: Array.isArray(parsed.wins) ? parsed.wins : [],
      care: Array.isArray(parsed.care) ? parsed.care : [],
      celebrations: Array.isArray(parsed.celebrations) ? parsed.celebrations : [],
      dayLog: parsed.dayLog || {}
    };
  } catch {
    return base;
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function handleClick(event) {
  const trigger = event.target.closest("[data-action]");
  if (!trigger) return;
  const action = trigger.dataset.action;

  if (action === "route") return setRoute(trigger.dataset.route);
  if (action === "set-energy") return updateTodayLog({ energy: Number(trigger.dataset.value) });
  if (action === "toggle-theme") {
    state.settings.theme = state.settings.theme === "dark" ? "light" : "dark";
    persist();
    return render();
  }
  if (action === "toggle-hide-metrics") {
    state.settings.hideMetricsByDefault = !state.settings.hideMetricsByDefault;
    persist();
    return render();
  }
  if (action === "grant-grace") {
    const entry = state.dayLog[todayKey()] || {};
    entry.grace = !entry.grace;
    state.dayLog[todayKey()] = entry;
    persist();
    showToast(entry.grace ? "Nådedag registrert. Hvile teller." : "Nådedagen ble fjernet.");
    return render();
  }
  if (action === "prefill-win") return addWin(trigger.dataset.label, trigger.dataset.category || "omsorg");
  if (action === "prefill-care") return addCare(trigger.dataset.title, trigger.dataset.category, "");
  if (action === "save-custom-win") return saveCustomWin(trigger.closest("form"));
  if (action === "save-custom-care") return saveCustomCare(trigger.closest("form"));
  if (action === "start-install") return promptInstall();
  if (action === "export-data") return exportData();
  if (action === "import-data") return importInputEl.click();
  if (action === "reset-data") return resetData();
  if (action === "open-finish-session") {
    ui.modal = "finish-session";
    return render();
  }
  if (action === "close-modal" || action === "dismiss-celebration") {
    ui.modal = null;
    return render();
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;

  if (form.id === "movement-start-form") {
    const data = new FormData(form);
    const type = String(data.get("type") || "").trim();
    if (!type) return showToast("Velg en form for bevegelse for å starte.");

    state.movement.activeSession = {
      id: uid("session"),
      type,
      intention: String(data.get("intention") || "").trim(),
      startedAt: Date.now(),
      moodBefore: Number(data.get("moodBefore") || 3),
      hideMetrics: data.get("hideMetrics") === "on"
    };
    persist();
    showToast("Bevegelsen er i gang. Du kan ta det helt i ditt tempo.");
    return render();
  }

  if (form.id === "movement-stop-form") {
    const active = state.movement.activeSession;
    if (!active) return;
    const data = new FormData(form);
    const elapsed = Math.max(1, Math.round((Date.now() - active.startedAt) / 60000));
    state.movement.sessions.unshift({
      id: active.id,
      type: active.type,
      intention: active.intention,
      moodBefore: active.moodBefore,
      moodAfter: Number(data.get("moodAfter") || 3),
      effort: Number(data.get("effort") || 3),
      notes: String(data.get("notes") || "").trim(),
      hideMetrics: active.hideMetrics,
      startedAt: active.startedAt,
      endedAt: Date.now(),
      minutes: Math.max(1, Number(data.get("minutes") || elapsed))
    });
    state.movement.activeSession = null;
    addWin("Jeg møtte opp for meg selv", "bevegelse", false);
    createCelebration({
      title: "Du ga kroppen din et rom i dag",
      body: state.movement.sessions[0].hideMetrics
        ? "Du valgte ro fremfor press. Det er en seier."
        : `Du var i bevegelse i ${state.movement.sessions[0].minutes} rolige minutter.`
    });
    updateTodayLog({ grace: false });
    ui.modal = "celebration";
    persist();
    return render();
  }

  if (form.id === "custom-win-form") return saveCustomWin(form);
  if (form.id === "custom-care-form") return saveCustomCare(form);

  if (form.id === "support-squad-form") {
    const name = String(new FormData(form).get("name") || "").trim();
    if (!name) return;
    state.profile.supportSquad.unshift(name);
    state.profile.supportSquad = Array.from(new Set(state.profile.supportSquad)).slice(0, 8);
    form.reset();
    persist();
    showToast(`${name} ble lagt til i støttegruppen.`);
    return render();
  }

  if (form.id === "share-celebration-form") {
    const selected = new FormData(form).getAll("squad");
    if (state.celebrations[0]) {
      state.celebrations[0].sharedWith = selected;
      state.celebrations[0].sharedAt = new Date().toISOString();
    }
    persist();
    ui.modal = null;
    showToast(selected.length ? `Delt lokalt med ${selected.join(", ")}.` : "Lukket uten deling.");
    return render();
  }
}

function saveCustomWin(form) {
  if (!form) return;
  const data = new FormData(form);
  const label = String(data.get("label") || "").trim();
  if (!label) return;
  addWin(label, String(data.get("category") || "omsorg"));
  form.reset();
}

function saveCustomCare(form) {
  if (!form) return;
  const data = new FormData(form);
  const title = String(data.get("title") || "").trim();
  if (!title) return;
  addCare(title, String(data.get("category") || "self"), String(data.get("note") || "").trim());
  form.reset();
}

function addWin(label, category, celebrate = true) {
  state.wins.unshift({ id: uid("win"), label, category, createdAt: new Date().toISOString() });
  updateTodayLog({ grace: false });
  if (celebrate) {
    createCelebration({
      title: "En liten seier ble registrert",
      body: `"${label}" ble lagt til blant de varme øyeblikkene dine.`
    });
    ui.modal = "celebration";
  }
  persist();
  render();
}

function addCare(title, category, note) {
  state.care.unshift({ id: uid("care"), title, category, note, createdAt: new Date().toISOString() });
  updateTodayLog({ grace: false });
  createCelebration({
    title: "Omsorg teller også som fremdrift",
    body: `${title} ble lagret som en varm handling i hverdagen din.`
  });
  ui.modal = "celebration";
  persist();
  render();
}

function createCelebration({ title, body }) {
  state.celebrations.unshift({ id: uid("celebration"), title, body, createdAt: new Date().toISOString(), sharedWith: [] });
}

function setRoute(route) {
  state.route = route;
  if (window.location.hash !== `#${route}`) window.location.hash = route;
  persist();
  render();
}

function syncRouteFromHash() {
  const route = window.location.hash.replace("#", "");
  state.route = routes.some((item) => item.id === route) ? route : state.route || "home";
  persist();
}

function updateTodayLog(partial) {
  state.dayLog[todayKey()] = { ...(state.dayLog[todayKey()] || {}), ...partial };
  persist();
}

function promptInstall() {
  if (!ui.deferredPrompt) return showToast("Installering er ikke tilgjengelig ennå i denne nettleseren.");
  ui.deferredPrompt.prompt();
  ui.deferredPrompt.userChoice.finally(() => {
    ui.deferredPrompt = null;
    render();
  });
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `straeva-backup-${todayKey()}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("Lokal backup lastet ned.");
}

function handleImportFile(event) {
  const [file] = event.target.files || [];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      localStorage.setItem(STORAGE_KEY, String(reader.result || "{}"));
      window.location.reload();
    } catch {
      showToast("Kunne ikke lese backup-filen.");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

function resetData() {
  if (!window.confirm("Slette all lokal data i Stræva?")) return;
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => registration.update())
    .catch(() => {});
}

function showToast(text) {
  ui.toast = text;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    ui.toast = null;
    render();
  }, 2600);
  render();
}

function render() {
  document.body.classList.toggle("theme-dark", resolvedTheme() === "dark");
  topbarEl.innerHTML = renderTopbar();
  appEl.innerHTML = renderRoute();
  navEl.innerHTML = routes.map(renderNavButton).join("");
  modalRootEl.innerHTML = `${renderModal()}${renderToast()}`;

  window.clearInterval(timerId);
  if (state.movement.activeSession) timerId = window.setInterval(updateLiveTimer, 1000);
}

function renderTopbar() {
  return `
    <div class="brand-lockup">
      <div class="brand-mark" aria-hidden="true"></div>
      <div class="title-block">
        <span class="eyebrow">${greetingText()}, ${escapeHtml(state.profile.name)}</span>
        <span class="app-title">Stræva</span>
      </div>
    </div>
    <button class="icon-button" type="button" data-action="route" data-route="settings" aria-label="Åpne innstillinger">
      <span>i</span>
    </button>
  `;
}

function renderNavButton(route) {
  const active = state.route === route.id ? "active" : "";
  return `
    <button class="nav-button ${active}" type="button" data-action="route" data-route="${route.id}" aria-current="${state.route === route.id ? "page" : "false"}">
      <span class="nav-icon">${route.icon}</span>
      <span class="nav-label">${route.label}</span>
    </button>
  `;
}

function renderRoute() {
  if (state.route === "movement") return renderMovement();
  if (state.route === "wins") return renderWins();
  if (state.route === "care") return renderCare();
  if (state.route === "settings") return renderSettings();
  return renderHome();
}

function renderHome() {
  const today = todayEntry();
  const continuity = continuityDays();
  const graceRemaining = Math.max(0, 3 - monthGraceCount());
  const careThisWeek = careThisWeekCount();
  const winsToday = winsTodayCount();
  const minutes = sessionsThisWeek().reduce((sum, session) => sum + session.minutes, 0);

  return `
    <section class="screen">
      <section class="hero home-hero">
        <span class="hero-kicker">Hjem</span>
        <h1>Hvordan er energien din i dag?</h1>
        <p>${affirmationForToday()}</p>
        <div class="hero-actions hero-actions--stacked">
          <button class="primary-button primary-button--large" type="button" data-action="route" data-route="movement">Registrer litt bevegelse</button>
          <div class="soft-quote">Dagens lille oppmuntring: Du er god nok akkurat som du er.</div>
        </div>
      </section>
      ${ui.deferredPrompt ? `<div class="install-banner"><div><strong>Installer Stræva</strong><div class="help-text">Appen kan brukes offline og lagrer fortsatt alt lokalt.</div></div><button class="secondary-button" type="button" data-action="start-install">Installer</button></div>` : ""}
      <section class="card form-stack card--airy">
        <div class="section-heading">
          <div>
            <h2 class="section-title">Hvordan er energien din i dag?</h2>
            <div class="help-text">Velg den formen som ligner mest på kroppen din akkurat nå.</div>
          </div>
          <span class="status-pill">I dag: ${energyTitle(today.energy || 3)}</span>
        </div>
        <div class="energy-grid">
          ${energyOptions.map((option) => `<button type="button" class="choice-card ${option.value === (today.energy || 3) ? "active" : ""}" data-action="set-energy" data-value="${option.value}"><span>${option.icon}</span><strong>${option.title}</strong></button>`).join("")}
        </div>
      </section>
      <section class="split-feature">
        <article class="feature-card feature-card--sage">
          <div class="feature-kicker">Myk kontinuitet</div>
          <div class="feature-value">${continuity} dager</div>
          <div class="help-text">Dager med bevegelse, omsorg eller nådedag på rad.</div>
        </article>
        <article class="feature-card feature-card--oat">
          <div class="feature-kicker">Nådedager igjen</div>
          <div class="feature-value">${graceRemaining}</div>
          <div class="help-text">Tilgjengelig denne måneden uten at rytmen brytes.</div>
          <button class="ghost-button" type="button" data-action="grant-grace">${today.grace ? "Fjern nådedag" : "Ta en nådedag"}</button>
        </article>
      </section>
      <section class="bento-row">
        <article class="mini-panel">
          <div class="feature-kicker">Seire i dag</div>
          <div class="mini-value">${winsToday}</div>
          <div class="help-text">Mikrohandlinger som allerede teller.</div>
        </article>
        <article class="mini-panel">
          <div class="feature-kicker">Omsorg denne uken</div>
          <div class="mini-value">${careThisWeek}</div>
          <div class="help-text">${state.settings.hideMetricsByDefault ? "Varm handling etter varm handling." : `${minutes} rolige minutter i tillegg.`}</div>
        </article>
      </section>
      <section class="card form-stack card--airy">
        <div class="section-heading">
          <div>
            <h2 class="section-title">Neste myke steg</h2>
            <div class="help-text">Velg det som kjennes minst tungt å gjøre.</div>
          </div>
        </div>
        <div class="chip-row chip-row--soft">
          ${["Fem rolige minutter", "Et glass vann", "Luft i ansiktet", "En melding til noen"].map((label) => `<button class="chip" type="button" data-action="prefill-win" data-label="${label}" data-category="omsorg">${label}</button>`).join("")}
        </div>
      </section>
      <section class="card form-stack card--airy">
        <div class="section-heading">
          <div>
            <h2 class="section-title">Siste øyeblikk</h2>
            <div class="help-text">Ikke en prestasjonslogg. Bare spor av at du var her.</div>
          </div>
        </div>
        <div class="timeline">
          ${latestMomentsList().length ? latestMomentsList().map((item) => `<div class="timeline-item"><div class="timeline-dot"></div><div><strong>${escapeHtml(item.title)}</strong><div class="list-meta">${escapeHtml(item.meta)}</div></div></div>`).join("") : `<div class="help-text">Når du registrerer noe, dukker de varme sporene opp her.</div>`}
        </div>
      </section>
    </section>
  `;
}

function renderMovement() {
  const active = state.movement.activeSession;
  const recent = state.movement.sessions.slice(0, 4);

  if (active) {
    const elapsed = formatDurationMinutes(Math.max(1, Math.floor((Date.now() - active.startedAt) / 60000)));
    return `
      <section class="screen">
        <section class="hero hero--quiet">
          <span class="hero-kicker">Bevegelse</span>
          <h1>Pust rolig. Du gjør det bra.</h1>
          <p>${active.intention ? escapeHtml(active.intention) : "Denne økten trenger ikke bevise noe for noen."}</p>
        </section>
        <section class="card pulse-panel pulse-panel--tall">
          <div class="quiet-chip">${active.hideMetrics ? "Tall skjult" : "Stille sporing"}</div>
          <div class="pulse-orb">
            <div class="form-stack" style="align-items:center;">
              <div class="pulse-value" id="live-timer">${active.hideMetrics ? "Rolig" : elapsed}</div>
              <div class="pulse-caption">${active.hideMetrics ? "Tallene er gjemt så oppmerksomheten kan være hos kroppen." : "Tid i bevegelse akkurat nå"}</div>
            </div>
          </div>
        </section>
        <section class="inline-actions">
          <button class="primary-button primary-button--large" type="button" data-action="open-finish-session">Jeg er ferdig for nå</button>
          <button class="ghost-button" type="button" data-action="route" data-route="home">Gå tilbake til hjem</button>
        </section>
      </section>
    `;
  }

  return `
    <section class="screen">
      <section class="hero hero--quiet">
        <span class="hero-kicker">Bevegelse</span>
        <h1>Velg en bevegelse som kroppen din kan si ja til.</h1>
        <p>Ingen nedtelling. Ingen jag. Bare et lite rom for pust, varme og rytme.</p>
      </section>
      <form id="movement-start-form" class="card form-stack card--airy">
        <div class="section-heading">
          <div>
            <h2 class="section-title">Hva slags bevegelse passer i dag?</h2>
            <div class="help-text">Smått er bra. Mykt er bra. Ferdig er bra.</div>
          </div>
        </div>
        <div class="chip-row chip-row--soft">
          ${activityTypes.map((type, index) => `<label class="chip ${index === 0 ? "active" : ""}"><input class="visually-hidden" type="radio" name="type" value="${type}" ${index === 0 ? "checked" : ""} />${type}</label>`).join("")}
        </div>
        <label class="stack">
          <span><strong>Intensjon</strong></span>
          <textarea class="textarea" name="intention" placeholder="For eksempel: Bare komme meg litt i gang, eller løse opp i skuldrene."></textarea>
        </label>
        <div class="form-stack">
          <strong>Hvordan kjennes du nå?</strong>
          <div class="mood-grid">
            ${moodOptions.map((option) => `<label class="mood-choice ${option.value === 3 ? "active" : ""}"><input class="visually-hidden" type="radio" name="moodBefore" value="${option.value}" ${option.value === 3 ? "checked" : ""} /><strong>${option.label}</strong></label>`).join("")}
          </div>
        </div>
        <label class="switch-row">
          <div>
            <strong>Skjul tall mens du er i bevegelse</strong>
            <div class="help-text">Fokus på pust, ikke prestasjon.</div>
          </div>
          <span class="switch ${state.settings.hideMetricsByDefault ? "active" : ""}" aria-hidden="true"></span>
          <input class="visually-hidden" type="checkbox" name="hideMetrics" ${state.settings.hideMetricsByDefault ? "checked" : ""} />
        </label>
        <button class="primary-button primary-button--large" type="submit">Start en stille stund</button>
      </form>
      <section class="panel">
        <div class="section-heading">
          <div>
            <h2 class="section-title">Nylige stunder</h2>
            <div class="help-text">Lagret lokalt på enheten din.</div>
          </div>
        </div>
        <div class="session-list">
          ${recent.length ? recent.map((session) => `<article class="session-card"><h3>${escapeHtml(session.type)}</h3><div class="list-meta">${formatDate(session.endedAt)} · ${session.hideMetrics ? "Skjulte tall" : `${session.minutes} minutter`}</div><div>${escapeHtml(session.notes || session.intention || "Du møtte opp, og det ble registrert.")}</div></article>`).join("") : `<div class="help-text">Når du lagrer en stund, dukker den opp her.</div>`}
        </div>
      </section>
    </section>
  `;
}

function renderWins() {
  const recent = state.wins.slice(0, 10);
  const todayWins = state.wins.filter((win) => isToday(win.createdAt)).length;
  return `
    <section class="screen">
      <section class="hero hero--wins">
        <span class="hero-kicker">Mine seire</span>
        <h1>Dine små, store øyeblikk.</h1>
        <p>${todayWins} små seire er allerede her i dag. Alt som fikk deg litt nærmere deg selv, får lov å bli stående.</p>
      </section>
      <section class="card form-stack card--airy">
        <div class="section-heading">
          <div>
            <h2 class="section-title">Trykk for å loggføre noe lite</h2>
            <div class="help-text">Ingen forklaring kreves.</div>
          </div>
        </div>
        <div class="chip-row chip-row--soft">
          ${winPresets.map((win) => `<button class="chip" type="button" data-action="prefill-win" data-label="${win.label}" data-category="${win.category}">${win.label}</button>`).join("")}
        </div>
      </section>
      <form id="custom-win-form" class="card form-stack card--airy">
        <h2 class="section-title">Din egen lille seier</h2>
        <input class="field" name="label" placeholder="Skriv det med dine egne ord" />
        <select class="select" name="category">
          <option value="omsorg">Omsorg</option>
          <option value="bevegelse">Bevegelse</option>
          <option value="hverdag">Hverdag</option>
          <option value="ro">Ro</option>
        </select>
        <button class="primary-button" type="button" data-action="save-custom-win">Lagre seieren</button>
      </form>
      <section class="panel panel--journal">
        <div class="section-heading">
          <div>
            <h2 class="section-title">Samling av gode spor</h2>
            <div class="help-text">Mer som en journal enn en resultattavle.</div>
          </div>
        </div>
        <div class="history-list">
          ${recent.length ? recent.map((win) => `<article class="history-card"><h3>${escapeHtml(win.label)}</h3><div class="list-meta">${formatDate(win.createdAt)} · ${escapeHtml(win.category)}</div></article>`).join("") : `<div class="help-text">Det er helt tomt her nå. Tomt er også lov.</div>`}
        </div>
      </section>
    </section>
  `;
}

function renderCare() {
  const recent = state.care.slice(0, 6);
  return `
    <section class="screen">
      <section class="hero hero--care">
        <span class="hero-kicker">Omsorg & hverdag</span>
        <h1>Ditt bidrag til verden kan være stille og likevel viktig.</h1>
        <p>Handlinger for deg selv, andre og hjemmet ditt får ligge side om side uten rangering.</p>
      </section>
      <section class="care-grid">
        ${careCategories.map((category) => `<article class="care-card"><div class="care-badge">${category.title[0]}</div><h3>${category.title}</h3><div class="help-text">${category.hint}</div><div class="stack">${category.presets.map((preset) => `<button class="chip" type="button" data-action="prefill-care" data-title="${preset}" data-category="${category.id}">${preset}</button>`).join("")}</div></article>`).join("")}
      </section>
      <form id="custom-care-form" class="card form-stack card--airy">
        <h2 class="section-title">Logg en omsorgshandling</h2>
        <input class="field" name="title" placeholder="For eksempel: tok en telefon, satte på kaffe, la meg ned litt" />
        <select class="select" name="category">
          <option value="self">For deg selv</option>
          <option value="others">For andre</option>
          <option value="home">For hverdagen</option>
        </select>
        <textarea class="textarea" name="note" placeholder="Eventuelt en liten refleksjon, hvis du vil."></textarea>
        <button class="primary-button" type="button" data-action="save-custom-care">Lagre omsorg</button>
      </form>
      <section class="panel panel--journal">
        <div class="section-heading">
          <div>
            <h2 class="section-title">Nylige varme handlinger</h2>
            <div class="help-text">Omsorg teller på lik linje med bevegelse.</div>
          </div>
        </div>
        <div class="history-list">
          ${recent.length ? recent.map((entry) => `<article class="care-card"><h3>${escapeHtml(entry.title)}</h3><div class="list-meta">${formatDate(entry.createdAt)} · ${categoryTitle(entry.category)}</div><div>${escapeHtml(entry.note || "Registrert uten ekstra forklaring.")}</div></article>`).join("") : `<div class="help-text">Når du logger omsorg, legger appen det her som en stille bekreftelse.</div>`}
        </div>
      </section>
    </section>
  `;
}

function renderSettings() {
  return `
    <section class="screen">
      <section class="hero hero--settings">
        <span class="hero-kicker">Innstillinger</span>
        <h1>Alt er lokalt. Alt kan tas med videre.</h1>
        <p>Ingen konto. Ingen feed. Bare et lite rom som husker for deg, på enheten din.</p>
      </section>
      <section class="settings-list">
        <article class="setting-card">
          <h3>Visning</h3>
          <div class="switch-row">
            <div><strong>Rolig kveldstema</strong><div class="help-text">Nå: ${resolvedTheme() === "dark" ? "Kveld" : "Lys"}</div></div>
            <button class="switch ${resolvedTheme() === "dark" ? "active" : ""}" type="button" data-action="toggle-theme" aria-label="Bytt tema"></button>
          </div>
          <div class="switch-row">
            <div><strong>Skjul tall som standard</strong><div class="help-text">Starter nye stunder uten fokus på minutter.</div></div>
            <button class="switch ${state.settings.hideMetricsByDefault ? "active" : ""}" type="button" data-action="toggle-hide-metrics" aria-label="Bytt standard for tall"></button>
          </div>
        </article>
        <article class="setting-card">
          <h3>Støttegruppe</h3>
          <form id="support-squad-form" class="form-stack">
            <input class="field" name="name" placeholder="Legg til et navn" />
            <button class="secondary-button" type="submit">Legg til</button>
          </form>
          <ul class="support-list">
            ${state.profile.supportSquad.map((name) => `<li class="support-person"><div style="display:flex;align-items:center;gap:12px;"><div class="mini-avatar">${escapeHtml(name.slice(0,1).toUpperCase())}</div><div><strong>${escapeHtml(name)}</strong><div class="help-text">Kan motta lokal deling av milepæler.</div></div></div></li>`).join("")}
          </ul>
        </article>
        <article class="setting-card">
          <h3>Data</h3>
          <div class="inline-actions">
            <button class="ghost-button" type="button" data-action="export-data">Eksporter</button>
            <button class="ghost-button" type="button" data-action="import-data">Importer</button>
            <button class="secondary-button" type="button" data-action="reset-data">Nullstill</button>
          </div>
          <div class="help-text">Lokal lagring: ${state.movement.sessions.length} stunder, ${state.wins.length} seire, ${state.care.length} omsorgshandlinger.</div>
        </article>
      </section>
    </section>
  `;
}

function renderModal() {
  if (ui.modal === "finish-session" && state.movement.activeSession) {
    const elapsed = Math.max(1, Math.floor((Date.now() - state.movement.activeSession.startedAt) / 60000));
    return `
      <div class="modal-backdrop">
        <div class="sheet">
          <div class="sheet-handle"></div>
          <h2 class="sheet-title">Hvordan landet denne stunden?</h2>
          <p class="help-text">Du kan justere varigheten om du vil. Resten er bare for deg.</p>
          <form id="movement-stop-form" class="form-stack">
            <label class="stack"><span><strong>Minutter i bevegelse</strong></span><input class="field" type="number" min="1" name="minutes" value="${elapsed}" /></label>
            <div class="form-stack">
              <strong>Hvordan kjennes du nå?</strong>
              <div class="mood-grid">${moodOptions.map((option) => `<label class="mood-choice ${option.value === 4 ? "active" : ""}"><input class="visually-hidden" type="radio" name="moodAfter" value="${option.value}" ${option.value === 4 ? "checked" : ""} /><strong>${option.label}</strong></label>`).join("")}</div>
            </div>
            <div class="form-stack">
              <strong>Hvor mye innsats kjentes det som?</strong>
              <div class="toggle-grid">${["Myk", "Jevn", "Litt sterkere"].map((label, index) => `<label class="toggle-choice ${index === 1 ? "active" : ""}"><input class="visually-hidden" type="radio" name="effort" value="${index + 2}" ${index === 1 ? "checked" : ""} /><strong>${label}</strong></label>`).join("")}</div>
            </div>
            <textarea class="textarea" name="notes" placeholder="Hvis du vil kan du skrive noen ord om hvordan det kjentes."></textarea>
            <div class="modal-actions">
              <button class="primary-button" type="submit">Lagre denne stunden</button>
              <button class="ghost-button" type="button" data-action="close-modal">Tilbake</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  if (ui.modal === "celebration" && state.celebrations[0]) {
    const celebration = state.celebrations[0];
    return `
      <div class="modal-backdrop">
        <div class="celebration-modal">
          <div class="sheet-handle"></div>
          <div class="celebration-visual"><div class="bloom"></div></div>
          <div class="stack">
            <div class="hero-kicker hero-kicker--center">Feiring</div>
            <h2 class="celebration-title">${escapeHtml(celebration.title)}</h2>
            <p class="subtle">${escapeHtml(celebration.body)}</p>
          </div>
          <form id="share-celebration-form" class="stack">
            <strong>Vil du dele dette lokalt med støttegruppen din?</strong>
            <div class="chip-row">${state.profile.supportSquad.map((name) => `<label class="chip"><input class="visually-hidden" type="checkbox" name="squad" value="${name}" />${escapeHtml(name)}</label>`).join("")}</div>
            <div class="modal-actions">
              <button class="primary-button" type="submit">Lagre deling</button>
              <button class="ghost-button" type="button" data-action="dismiss-celebration">Bare behold det her</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  return "";
}

function renderToast() {
  if (!ui.toast) return "";
  return `<div style="position:fixed;left:50%;bottom:104px;transform:translateX(-50%);z-index:120;"><div class="status-pill">${escapeHtml(ui.toast)}</div></div>`;
}

function updateLiveTimer() {
  const active = state.movement.activeSession;
  const el = document.querySelector("#live-timer");
  if (!active || !el || active.hideMetrics) return;
  el.textContent = formatDurationMinutes(Math.max(1, Math.floor((Date.now() - active.startedAt) / 60000)));
}

function todayKey() {
  return dateKey(new Date());
}

function todayEntry() {
  return state.dayLog[todayKey()] || {};
}

function monthGraceCount() {
  const prefix = todayKey().slice(0, 7);
  return Object.entries(state.dayLog).filter(([day, entry]) => day.startsWith(prefix) && entry.grace).length;
}

function continuityDays() {
  let count = 0;
  const cursor = new Date();
  for (;;) {
    const key = dateKey(cursor);
    if (!dayHasContinuity(key)) break;
    count += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}

function dayHasContinuity(key) {
  return Boolean(
    state.dayLog[key]?.grace ||
    state.movement.sessions.some((session) => dayKeyFromValue(session.endedAt) === key) ||
    state.wins.some((win) => dayKeyFromValue(win.createdAt) === key) ||
    state.care.some((entry) => dayKeyFromValue(entry.createdAt) === key)
  );
}

function winsTodayCount() {
  return state.wins.filter((win) => isToday(win.createdAt)).length;
}

function careThisWeekCount() {
  return state.care.filter((entry) => daysAgo(entry.createdAt) < 7).length;
}

function sessionsThisWeek() {
  return state.movement.sessions.filter((session) => daysAgo(session.endedAt) < 7);
}

function latestMomentsList() {
  return [
    ...state.movement.sessions.slice(0, 2).map((session) => ({
      title: session.type,
      meta: `${formatDate(session.endedAt)} · ${session.hideMetrics ? "Skjulte tall" : `${session.minutes} minutter`}`,
      order: new Date(session.endedAt).getTime()
    })),
    ...state.wins.slice(0, 2).map((win) => ({
      title: win.label,
      meta: `${formatDate(win.createdAt)} · liten seier`,
      order: new Date(win.createdAt).getTime()
    })),
    ...state.care.slice(0, 2).map((entry) => ({
      title: entry.title,
      meta: `${formatDate(entry.createdAt)} · ${categoryTitle(entry.category)}`,
      order: new Date(entry.createdAt).getTime()
    }))
  ].sort((a, b) => b.order - a.order).slice(0, 5);
}

function greetingText() {
  const hour = new Date().getHours();
  if (hour < 11) return "God morgen";
  if (hour < 17) return "God ettermiddag";
  return "God kveld";
}

function affirmationForToday() {
  return affirmations[new Date().getDate() % affirmations.length];
}

function energyTitle(value) {
  return energyOptions.find((item) => item.value === Number(value))?.title || "Rolig";
}

function resolvedTheme() {
  return state.settings.theme === "system" ? (THEME_MEDIA.matches ? "dark" : "light") : state.settings.theme;
}

function formatDate(value) {
  return new Intl.DateTimeFormat("nb-NO", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function formatDurationMinutes(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} t ${rest} min` : `${hours} t`;
}

function daysAgo(value) {
  return Math.floor((Date.now() - new Date(value).getTime()) / 86400000);
}

function isToday(value) {
  return dayKeyFromValue(value) === todayKey();
}

function dayKeyFromValue(value) {
  return dateKey(new Date(value));
}

function dateKey(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function categoryTitle(id) {
  return careCategories.find((category) => category.id === id)?.title || "Omsorg";
}

function uid(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
