const toggle = document.querySelector(".theme-toggle");

function getStoredTheme() {
  try {
    return localStorage.getItem("theme");
  } catch (error) {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    //storage unavailable: toggle still works for this page
  }
}

const sunIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
const moonIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  toggle.innerHTML = theme === "dark" ? sunIcon : moonIcon;
  toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  toggle.title = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
}

function switchTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  saveTheme(next);
}

//restore saved theme, or fall back to dark
const saved = getStoredTheme();
applyTheme(saved === "light" || saved === "dark" ? saved : "dark");

//rshow toggle now that js is available
toggle.hidden = false;

toggle.addEventListener("click", function () {
  if (document.startViewTransition) {
    document.startViewTransition(switchTheme);
  } else {
    switchTheme();
  }
});
