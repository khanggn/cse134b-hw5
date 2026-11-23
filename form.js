const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const commentsInput = document.querySelector("#comments");
const errorArea = document.querySelector("#error-area");
const infoArea = document.querySelector("#info-area");
const charCountEl = document.querySelector("#char-count");
const charWarningEl = document.querySelector("#char-warning");
const formErrorsField = document.querySelector("#form-errors-field");
const submitBtn = form.querySelector('button[type="submit"]');

const form_errors = [];
const touched = new Set();
const edited = new Set();
let submitAttempted = false;
const allFields = [nameInput, emailInput, commentsInput];
const maxLength = commentsInput.maxLength;
const WARNING_THRESHOLD = 50;

infoArea.hidden = false;
commentsInput.setAttribute("aria-describedby", "char-count");

// character count

function updateCharCount() {
  const remaining = maxLength - commentsInput.value.length;
  charCountEl.textContent =
    remaining + " characters remaining (" + maxLength + " maximum)";

  if (remaining === 0) {
    charWarningEl.textContent = "You have reached the character limit.";
    charWarningEl.hidden = false;
    infoArea.classList.add("form-messages--warning");
  } else if (remaining <= WARNING_THRESHOLD) {
    charWarningEl.textContent = "You are approaching the character limit.";
    charWarningEl.hidden = false;
    infoArea.classList.add("form-messages--warning");
  } else {
    charWarningEl.hidden = true;
    infoArea.classList.remove("form-messages--warning");
  }
}

commentsInput.addEventListener("input", updateCharCount);
updateCharCount();

// validation

function getLabelText(field) {
  if (field.labels && field.labels.length > 0) {
    return field.labels[0].textContent.replace(/\s*\*\s*$/, "").trim();
  }
  return field.name;
}

function getErrorMessage(field) {
  field.setCustomValidity("");
  const validity = field.validity;
  const label = getLabelText(field);

  if (validity.valueMissing) {
    if (field === nameInput) {
      return label + ": Please provide your full name.";
    }
    if (field === emailInput) {
      return label + ": We need your email so we can get back to you.";
    }
    return label + ": Don't forget to leave a message before submitting.";
  }
  if (validity.typeMismatch) {
    return label + ": That doesn't look right. Try something like johndoe@example.com.";
  }
  if (validity.tooShort) {
    return label + ": Your message is too short. Please write at least " + field.minLength + " characters.";
  }
  return "";
}

function validateField(field) {
  const message = getErrorMessage(field);
  if (message) {
    field.setCustomValidity(message);
  }
  return message;
}

// error display

let lastErrorText = "";

function renderErrorArea(errors) {
  const text = errors.map(function (err) {
    return err.message;
  }).join(" ");
  if (text === lastErrorText) {
    return;
  }
  lastErrorText = text;
  errorArea.textContent = "";
  if (errors.length === 0) {
    return;
  }

  const box = document.createElement("div");
  box.className = "form-messages form-messages--error";

  const heading = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "Errors";
  heading.appendChild(strong);

  box.appendChild(heading);

  errors.forEach(function (err) {
    const item = document.createElement("p");
    item.id = err.id;

    const splitAt = err.message.indexOf(": ");
    const label = document.createElement("strong");
    label.textContent = err.message.slice(0, splitAt + 1);

    item.appendChild(label);
    item.appendChild(document.createTextNode(err.message.slice(splitAt + 1)));
    box.appendChild(item);
  });

  errorArea.appendChild(box);
}

function updateErrorDisplay() {
  const errors = [];

  allFields.forEach(function (field) {
    if (!touched.has(field.name) && !submitAttempted) return;
    const message = validateField(field);
    if (message) {
      errors.push({ id: "error-" + field.name, message: message });
    }
  });

  renderErrorArea(errors);

  allFields.forEach(function (field) {
    const errorEl = document.getElementById("error-" + field.name);
    const ids = [];
    if (errorEl) ids.push(errorEl.id);
    if (field === commentsInput) ids.push("char-count");
    if (ids.length > 0) {
      field.setAttribute("aria-describedby", ids.join(" "));
    } else {
      field.removeAttribute("aria-describedby");
    }
  });
}

// event listeners

allFields.forEach(function (field) {
  field.addEventListener("input", function () {
    edited.add(field.name);
    if (touched.has(field.name) || submitAttempted) {
      updateErrorDisplay();
    }
  });

  field.addEventListener("blur", function () {
    if (edited.has(field.name)) {
      touched.add(field.name);
      updateErrorDisplay();
    }
  });
});

// submission handling

submitBtn.addEventListener("click", function () {
  allFields.forEach(validateField);
});

let pendingErrors = null;

form.addEventListener(
  "invalid",
  function (event) {
    const field = event.target;
    touched.add(field.name);
    const message = validateField(field);

    if (pendingErrors === null) {
      pendingErrors = [];
      setTimeout(function () {
        pendingErrors.forEach(function (err) {
          form_errors.push(err);
        });
        pendingErrors = null;
        submitAttempted = true;
        updateErrorDisplay();
      }, 0);
    }

    if (message) {
      pendingErrors.push({ field: field.name, message: message });
    }
  },
  true
);

form.addEventListener("submit", function () {
  formErrorsField.value = JSON.stringify(form_errors);
});
