//custom web component <cat-facts>
const SAMPLE_FACTS = [
  "Cats can jump up to six times their length.",
  "Cats have whiskers on the backs of their front legs, as well.",
  "Some cats can swim.",
];

class CatFacts extends HTMLElement {
  static get observedAttributes() {
    return ["compact"];
  }
  constructor() {
    super();
    this.currentIndex = 0;
    this.handleNextClick = this.handleNextClick.bind(this);
  }
  connectedCallback() {
    if (!this.factText) {
      this.render();
    }
    this.nextButton.addEventListener("click", this.handleNextClick);
    this.showFact();
    this.updateCompact();
  }
  disconnectedCallback() {
    this.nextButton.removeEventListener("click", this.handleNextClick);
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
    this.nextButton = document.createElement("button");
    this.nextButton.type = "button";
    this.nextButton.textContent = "Tell me something about cats";
    this.status = document.createElement("p");
    this.status.className = "cat-facts-status";
    this.status.setAttribute("role", "status");
    fragment.appendChild(heading);
    fragment.appendChild(this.factText);
    fragment.appendChild(this.details);
    fragment.appendChild(this.nextButton);
    fragment.appendChild(this.status);
    this.appendChild(fragment);
  }
  handleNextClick() {
    this.currentIndex = (this.currentIndex + 1) % SAMPLE_FACTS.length;
    this.showFact();
  }
  showFact() {
    const fact = SAMPLE_FACTS[this.currentIndex];

    this.factText.textContent = fact;
    this.details.textContent = `${fact.length} characters · Source: sample data`;
    this.status.textContent = `Fact ${this.currentIndex + 1} of ${SAMPLE_FACTS.length}`;
  }
  updateCompact() {
    if (!this.details) {
      return;
    }
    this.details.hidden = this.hasAttribute("compact");
  }
}
customElements.define("cat-facts", CatFacts);