const catFacts = document.querySelector("cat-facts");
const compactToggle = document.querySelector("#compact-toggle");

function updateToggleButton() {
  const isCompact = catFacts.hasAttribute("compact");
  compactToggle.setAttribute("aria-pressed", String(isCompact));
}

compactToggle.addEventListener("click", () => {
  catFacts.toggleAttribute("compact");
  updateToggleButton();
});

updateToggleButton();

compactToggle.hidden = false;