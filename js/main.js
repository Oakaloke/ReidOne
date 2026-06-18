/* =========================================================
   ReidOne — shared vanilla JS
   - Mobile hamburger menu
   - Active nav highlighting
   - Footer year
   - Friendly (no-backend) form handling
   ========================================================= */
(function () {
  "use strict";

  /* ---- Mobile menu toggle ---- */
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close the menu after tapping a link (mobile)
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a") && menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Active nav highlighting (no-JS fallback: nothing breaks) ---- */
  var path = window.location.pathname.split("/").pop() || "index.html";
  // Acts chapter pages (study/acts-N.html) highlight the original "Bible Study" → study.html link.
  var isActsChapter = /^acts-\d+\.html$/.test(path);
  // Other study pages (book chapters, overviews, landings, hub) highlight "Bible Study" → bible.html.
  var isStudyPage = /-\d+\.html$/.test(path) || /-overview\.html$/.test(path) || path === "bible.html";
  document.querySelectorAll(".nav__menu a").forEach(function (link) {
    var href = (link.getAttribute("href") || "").split("/").pop();
    if (href === path ||
        (isActsChapter && href === "study.html") ||
        (isStudyPage && href === "bible.html")) {
      link.setAttribute("aria-current", "page");
    }
  });

  /* ---- Footer year ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- Demo form handling (front-end only placeholder) ---- */
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      if (status) {
        status.hidden = false;
        status.textContent =
          form.getAttribute("data-success") ||
          "Thank you! This is a demo form — connect it to your provider to receive submissions.";
      }
      form.reset();
    });
  });

  /* ---- Real form handling via Formspree (AJAX; stays on the page) ----
     Opt-in: only forms marked [data-formspree] are handled here, so every
     other (demo) form on the site is untouched. Submits to the form's
     action endpoint and shows the friendly in-page success state. */
  document.querySelectorAll("form[data-formspree]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      var btn = form.querySelector("[type=submit]");
      var endpoint = form.getAttribute("action") || "";
      function show(msg, ok) {
        if (!status) return;
        status.hidden = false;
        status.textContent = msg;
        status.classList.toggle("form-status--error", !ok);
      }
      if (endpoint.indexOf("YOUR_FORM_ID") !== -1) {
        show("This form isn't connected yet. (Add your Formspree form ID to start receiving messages.)", false);
        return;
      }
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var label = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      }).then(function (res) {
        if (res.ok) {
          show(form.getAttribute("data-success") ||
               "Thank you for reaching out! We'll be in touch soon.", true);
          form.reset();
        } else {
          return res.json().then(function (d) {
            var msg = (d && d.errors && d.errors.length)
              ? d.errors.map(function (x) { return x.message; }).join(", ")
              : "Sorry — something went wrong sending your message. Please try again.";
            show(msg, false);
          }).catch(function () {
            show("Sorry — something went wrong sending your message. Please try again.", false);
          });
        }
      }).catch(function () {
        show("Network error — please check your connection and try again.", false);
      }).then(function () {
        if (btn) { btn.disabled = false; btn.textContent = label; }
      });
    });
  });

  /* =========================================================
     Bible Study — Acts: progress tracking + collapsibles
     ---------------------------------------------------------
     PERSISTENCE NOTE:
     By default, "completed chapter" progress is held IN MEMORY only, so it
     RESETS on every page refresh or navigation (e.g. going from a chapter
     back to study.html will show 0 again). That keeps the demo simple and
     stores nothing on any server — fine for GitHub Pages.

     To make progress STICK across refreshes and pages, flip the flag below
     to `true`. It will then save completion in the visitor's own browser via
     localStorage (nothing leaves their device). One-line change, no backend:
     ========================================================= */
  var USE_LOCAL_STORAGE = false;            // ← set to true to persist progress
  // Per-book pages set data-study-key / data-study-total on <body>; Acts pages omit
  // them, so these defaults keep the original Acts behavior exactly unchanged.
  var STUDY_KEY = document.body.getAttribute("data-study-key") || "reidone-acts-progress";
  var TOTAL_CHAPTERS = parseInt(document.body.getAttribute("data-study-total"), 10) || 28;
  var memoryStore = {};                     // in-memory fallback (resets on refresh)

  function loadProgress() {
    if (USE_LOCAL_STORAGE) {
      try { return JSON.parse(localStorage.getItem(STUDY_KEY)) || {}; }
      catch (e) { return {}; }
    }
    return memoryStore;
  }
  function saveProgress(data) {
    if (USE_LOCAL_STORAGE) {
      try { localStorage.setItem(STUDY_KEY, JSON.stringify(data)); } catch (e) {}
    } else {
      memoryStore = data;
    }
  }
  function completedCount(data) {
    return Object.keys(data).filter(function (k) { return data[k]; }).length;
  }

  /* ---- Chapter page: "mark complete" toggle ---- */
  var completeBtn = document.querySelector("[data-complete-toggle]");
  if (completeBtn) {
    var ch = completeBtn.getAttribute("data-chapter");
    var setBtn = function (done) {
      completeBtn.classList.toggle("is-complete", done);
      completeBtn.setAttribute("aria-pressed", done ? "true" : "false");
      var label = completeBtn.querySelector("[data-complete-label]");
      if (label) label.textContent = done ? "Chapter complete" : "Mark chapter complete";
    };
    setBtn(!!loadProgress()[ch]);
    completeBtn.addEventListener("click", function () {
      var data = loadProgress();
      data[ch] = !data[ch];
      saveProgress(data);
      setBtn(!!data[ch]);
    });
  }

  /* ---- study.html: progress bar + per-card completion ---- */
  var progressEl = document.querySelector("[data-progress]");
  if (progressEl) {
    var fill = progressEl.querySelector("[data-progress-fill]");
    var countEl = progressEl.querySelector("[data-progress-count]");
    var resetBtn = progressEl.querySelector("[data-progress-reset]");
    var cards = document.querySelectorAll("[data-chapter-card]");

    var render = function () {
      var data = loadProgress();
      var done = completedCount(data);
      if (fill) fill.style.width = (done / TOTAL_CHAPTERS * 100) + "%";
      if (countEl) countEl.textContent = done + " of " + TOTAL_CHAPTERS + " chapters complete";
      cards.forEach(function (card) {
        card.classList.toggle("is-complete", !!data[card.getAttribute("data-chapter-card")]);
      });
    };
    render();
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        saveProgress({});
        render();
      });
    }
  }

  /* ---- Collapsible sections (Discussion Questions, etc.) ---- */
  document.querySelectorAll("[data-collapse-toggle]").forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      if (panel) panel.hidden = open;
    });
  });

  /* ---- Translation tabs (WEB | KJV | ASV) ----
     All three texts are embedded in the HTML; clicking a tab just toggles
     visibility, so it works on static hosting with no runtime fetching. */
  document.querySelectorAll(".scripture-tabs").forEach(function (tabs) {
    var scope = tabs.parentNode; // the .collapse-panel holding the three texts
    var tabBtns = tabs.querySelectorAll("[data-trans-tab]");
    tabBtns.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var trans = tab.getAttribute("data-trans-tab");
        tabBtns.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle("is-active", on);
          t.setAttribute("aria-selected", on ? "true" : "false");
          t.setAttribute("tabindex", on ? "0" : "-1");
        });
        scope.querySelectorAll("[data-trans-panel]").forEach(function (p) {
          p.hidden = p.getAttribute("data-trans-panel") !== trans;
        });
      });
    });
  });
})();
