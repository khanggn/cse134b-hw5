//custom web component <cat-facts>
//part 2: now loads facts live from the Cat Facts API 
const CAT_FACT_URL = "https://catfact.ninja/fact";
class CatFacts extends HTMLElement {
  static get observedAttributes() {
    return ["compact"];
  }
  constructor() {
    super();
    this.factCount = 0;
    this.handleFactClick = this.handleFactClick.bind(this);
  }
  connectedCallback() {
    if (!this.factText) {
      this.render();
    }
    this.factButton.addEventListener("click", this.handleFactClick);
    this.updateCompact();
    if (this.factCount === 0) {
      this.loadFact();
    }
  }
  disconnectedCallback() {
    this.factButton.removeEventListener("click", this.handleFactClick);
  }
  attributeChangedCallback(name) {
    if (name === "compact") {
      this.updateCompact();
    }
  }
  render() {
    const fragment = document.createDocumentFragment();
    const heading = document.createElement("h3");
    heading.textContent = "Cat Facts";
    this.factText = document.createElement("p");
    this.factText.className = "cat-facts-text";
    this.details = document.createElement("p");
    this.details.className = "cat-facts-details";
    this.factButton = document.createElement("button");
    this.factButton.type = "button";
    this.factButton.textContent = "Tell me something about cats";
    this.status = document.createElement("p");
    this.status.className = "cat-facts-status";
    this.status.setAttribute("role", "status");
    fragment.appendChild(heading);
    fragment.appendChild(this.factText);
    fragment.appendChild(this.details);
    fragment.appendChild(this.factButton);
    fragment.appendChild(this.status);
    this.appendChild(fragment);
  }
  handleFactClick() {
    if (this.isLoading) {
      return;
    }
    this.loadFact();
  }
  async loadFact() {
    this.isLoading = true;
    this.factButton.setAttribute("aria-disabled", "true");
    this.setStatus("Loading a cat fact…", "loading");
    try {
      const response = await fetch(CAT_FACT_URL);
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      const data = await response.json();
      if (typeof data?.fact !== "string" || data.fact.trim() === "") {
        throw new Error("Expected a fact string in the response.");
      }
      const length = typeof data.length === "number" ? data.length : data.fact.length;
      this.factCount += 1;
      this.factText.textContent = data.fact;
      this.details.textContent = `${length} characters · Source: catfact.ninja`;
      this.factButton.textContent = "Tell me something about cats";
      this.setStatus(`Fact ${this.factCount} loaded.`, "success");
    } catch (error) {
      console.error("Couldn't load a cat fact.", error);
      if (this.factCount === 0) {
        this.factText.textContent = "No cat fact yet.";
        this.details.textContent = "";
      }
      this.factButton.textContent = "Try again";
      this.setStatus("Couldn't load a cat fact. Check your connection and try again.", "error");
    } finally {
      this.isLoading = false;
      this.factButton.removeAttribute("aria-disabled");
    }
  }
  setStatus(message, state) {
    this.status.textContent = message;
    this.status.dataset.state = state;
  }
  updateCompact() {
    if (!this.details) {
      return;
    }
    this.details.hidden = this.hasAttribute("compact");
  }
}
customElements.define("cat-facts", CatFacts);