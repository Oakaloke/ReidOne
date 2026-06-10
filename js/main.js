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
  // Chapter pages (study/acts-N.html) should highlight the "Bible Study" link.
  var isChapter = /^acts-\d+\.html$/.test(path);
  document.querySelectorAll(".nav__menu a").forEach(function (link) {
    var href = (link.getAttribute("href") || "").split("/").pop();
    if (href === path || (isChapter && href === "study.html")) {
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
  var STUDY_KEY = "reidone-acts-progress";
  var TOTAL_CHAPTERS = 28;
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
})();
