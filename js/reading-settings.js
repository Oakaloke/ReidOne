/* =========================================================
   ReidOne — Reading settings panel (Bible study pages only)
   Builds the floating button + slide-in panel and wires it to
   window.ReidReading (defined by the inline no-flash head script,
   which is the single source of truth for themes + apply()).
   Loaded only on study pages.
   ========================================================= */
(function () {
  "use strict";
  var RS = window.ReidReading;
  if (!RS) return; // not a study page (inline head script absent)

  var settings = RS.get();
  var fab, panel, lastFocus;

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }

  function effective(which) {
    var base = RS.THEMES[settings.theme] || RS.THEMES.light;
    return (settings.custom && settings.custom[which]) || base[which];
  }

  /* ---------- build swatches ---------- */
  function swatchHTML(id) {
    var t = RS.THEMES[id];
    return '<button class="rs-swatch" type="button" role="radio" data-theme="' + id + '"' +
      ' aria-label="' + t.label + ' theme" aria-pressed="false"' +
      ' style="--sw-bg:' + t.bg + ';--sw-text:' + t.text + ';--sw-accent:' + t.accent + '">' +
      '<span class="rs-swatch__dot" aria-hidden="true"></span>' +
      '<span class="rs-swatch__name">' + t.label + '</span>' +
      '<span class="rs-swatch__demo" aria-hidden="true">Aa — In the beginning</span>' +
      '</button>';
  }

  function segHTML(name, opts) {
    var h = '<div class="rs-segmented" role="group" aria-label="' + name + '">';
    opts.forEach(function (o) {
      h += '<button type="button" data-set="' + o.v + '" aria-pressed="false">' + o.l + '</button>';
    });
    return h + '</div>';
  }

  function buildPanel() {
    fab = el("button", {
      "class": "rs-fab", "id": "rs-fab", "type": "button",
      "aria-haspopup": "dialog", "aria-controls": "rs-panel", "aria-expanded": "false",
      "title": "Reading settings", "aria-label": "Reading settings"
    }, "Aa");

    panel = el("div", {
      "class": "rs-panel", "id": "rs-panel", "role": "dialog",
      "aria-modal": "false", "aria-labelledby": "rs-title", "hidden": ""
    });

    var presetSw = RS.PRESETS.map(swatchHTML).join("");
    var skinSw = RS.SKINS.map(swatchHTML).join("");

    panel.innerHTML =
      '<div class="rs-panel__head">' +
        '<h2 id="rs-title">Reading settings</h2>' +
        '<button class="rs-close" type="button" aria-label="Close reading settings">✕</button>' +
      '</div>' +
      '<div class="rs-panel__body">' +
        '<div class="rs-group">' +
          '<p class="rs-group__title">Easy reading</p>' +
          '<div class="rs-swatches" role="radiogroup" aria-label="Easy-reading presets" data-group="preset">' + presetSw + '</div>' +
        '</div>' +
        '<div class="rs-group">' +
          '<p class="rs-group__title">Themes</p>' +
          '<div class="rs-swatches" role="radiogroup" aria-label="Themed skins" data-group="skin">' + skinSw + '</div>' +
        '</div>' +
        '<div class="rs-group">' +
          '<p class="rs-group__title">Customize</p>' +
          '<div class="rs-field"><label class="rs-field__label" for="rs-c-text">Text color</label>' +
            '<div class="rs-color-row"><input type="color" id="rs-c-text" data-custom="text"><output id="rs-o-text"></output></div></div>' +
          '<div class="rs-field"><label class="rs-field__label" for="rs-c-bg">Background color</label>' +
            '<div class="rs-color-row"><input type="color" id="rs-c-bg" data-custom="bg"><output id="rs-o-bg"></output></div></div>' +
          '<div class="rs-field"><label class="rs-field__label" for="rs-c-accent">Accent &amp; heading color</label>' +
            '<div class="rs-color-row"><input type="color" id="rs-c-accent" data-custom="accent"><output id="rs-o-accent"></output></div></div>' +
          '<div class="rs-field"><span class="rs-field__label">Font size</span>' +
            segHTML("Font size", [{v:"s",l:"Small"},{v:"m",l:"Medium"},{v:"l",l:"Large"},{v:"xl",l:"XL"}]) + '</div>' +
          '<div class="rs-field"><span class="rs-field__label">Font family</span>' +
            segHTML("Font family", [{v:"serif",l:"Serif"},{v:"sans",l:"Sans"}]) + '</div>' +
          '<div class="rs-field"><span class="rs-field__label">Line spacing</span>' +
            segHTML("Line spacing", [{v:"normal",l:"Normal"},{v:"relaxed",l:"Relaxed"},{v:"loose",l:"Loose"}]) + '</div>' +
          '<button class="rs-reset" type="button">Reset to default</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(fab);
    document.body.appendChild(panel);
  }

  /* ---------- reflect current settings into the UI ---------- */
  function syncUI() {
    // theme swatches
    panel.querySelectorAll(".rs-swatch").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-theme") === settings.theme ? "true" : "false");
    });
    // color pickers
    [["text", "rs-c-text", "rs-o-text"], ["bg", "rs-c-bg", "rs-o-bg"], ["accent", "rs-c-accent", "rs-o-accent"]]
      .forEach(function (p) {
        var val = effective(p[0]);
        var input = panel.querySelector("#" + p[1]);
        var out = panel.querySelector("#" + p[2]);
        if (input) input.value = (val || "#000000").toLowerCase();
        if (out) out.textContent = (val || "").toUpperCase();
      });
    // segmented groups
    function press(group, val) {
      panel.querySelectorAll('[aria-label="' + group + '"] button').forEach(function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-set") === val ? "true" : "false");
      });
    }
    press("Font size", settings.size);
    press("Font family", settings.font);
    press("Line spacing", settings.leading);
  }

  function applyAndSave() { RS.apply(settings); RS.save(settings); }

  /* ---------- open / close ---------- */
  function openPanel() {
    lastFocus = document.activeElement;
    panel.hidden = false;
    // next frame so the transform transition runs
    requestAnimationFrame(function () { panel.classList.add("is-open"); });
    fab.setAttribute("aria-expanded", "true");
    var close = panel.querySelector(".rs-close");
    if (close) close.focus();
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onOutside, true);
  }
  function closePanel() {
    panel.classList.remove("is-open");
    fab.setAttribute("aria-expanded", "false");
    document.removeEventListener("keydown", onKey);
    document.removeEventListener("mousedown", onOutside, true);
    var done = function () { panel.hidden = true; panel.removeEventListener("transitionend", done); };
    panel.addEventListener("transitionend", done);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function onKey(e) { if (e.key === "Escape") { e.preventDefault(); closePanel(); } }
  function onOutside(e) {
    if (!panel.contains(e.target) && e.target !== fab && !fab.contains(e.target)) closePanel();
  }

  /* ---------- wire events ---------- */
  function wire() {
    fab.addEventListener("click", function () {
      (fab.getAttribute("aria-expanded") === "true") ? closePanel() : openPanel();
    });
    panel.querySelector(".rs-close").addEventListener("click", closePanel);

    panel.querySelectorAll(".rs-swatch").forEach(function (b) {
      b.addEventListener("click", function () {
        settings.theme = b.getAttribute("data-theme");
        settings.custom = {};           // selecting a theme clears custom colors so it shows as designed
        applyAndSave();
        syncUI();
      });
    });

    panel.querySelectorAll('input[type="color"]').forEach(function (input) {
      input.addEventListener("input", function () {
        settings.custom = settings.custom || {};
        settings.custom[input.getAttribute("data-custom")] = input.value;
        applyAndSave();
        var out = input.parentNode.querySelector("output");
        if (out) out.textContent = input.value.toUpperCase();
      });
    });

    function segGroup(label, key) {
      panel.querySelectorAll('[aria-label="' + label + '"] button').forEach(function (b) {
        b.addEventListener("click", function () {
          settings[key] = b.getAttribute("data-set");
          applyAndSave();
          syncUI();
        });
      });
    }
    segGroup("Font size", "size");
    segGroup("Font family", "font");
    segGroup("Line spacing", "leading");

    panel.querySelector(".rs-reset").addEventListener("click", function () {
      try { localStorage.removeItem(RS.KEY); } catch (e) {}
      settings = RS.defaults();
      applyAndSave();
      syncUI();
    });
  }

  function init() {
    buildPanel();
    wire();
    syncUI();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
