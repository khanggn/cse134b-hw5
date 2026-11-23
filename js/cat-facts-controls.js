const catFacts = document.querySelector("cat-facts");
const compactToggle = document.querySelector("#compact-toggle");
const MODE_KEY = "hw5-cat-facts-mode";
const DEFAULT_MODE = "expanded";
function getSavedMode() {
  try {
    const saved = localStorage.getItem(MODE_KEY);
    if (saved === "compact" || saved === "expanded") {
      return saved;
    }
  } catch (error) {
  }
  return DEFAULT_MODE;
}
function saveMode(mode) {
  try {
    localStorage.setItem(MODE_KEY, mode);
  } catch (error) {
  }
}
function applyMode(mode) {
  catFacts.toggleAttribute("compact", mode === "compact");
  compactToggle.setAttribute("aria-pressed", String(mode === "compact"));
}
compactToggle.addEventListener("click", () => {
  const nextMode = catFacts.hasAttribute("compact") ? "expanded" : "compact";
  applyMode(nextMode);
  saveMode(nextMode);
});
applyMode(getSavedMode());
compactToggle.hidden = false;