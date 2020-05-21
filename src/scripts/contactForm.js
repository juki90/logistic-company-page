const nameInput = document.getElementById("name-input");
const companyInput = document.getElementById("company-input");
const phoneInput = document.getElementById("phone-input");
const emailInput = document.getElementById("email-input");
const textarea = document.getElementById("message-textarea");
const theForm = document.querySelector(".the-form");

const init = () => {
  nameInput.value = "";
  companyInput.value = "";
  phoneInput.value = "";
  emailInput.value = "";
  textarea.value = "";
  nameInput.classList.remove("good");
  companyInput.classList.remove("good");
  phoneInput.classList.remove("good");
  emailInput.classList.remove("good");
  nameInput.classList.remove("wrong");
  companyInput.classList.remove("wrong");
  phoneInput.classList.remove("wrong");
  emailInput.classList.remove("wrong");
};

const handleInputBlur = (e, label, regex) => {
  if (!e.target.value) {
    e.target.classList.remove("good");
    return;
  }
  const inputContainer = document.querySelector(`label[for="${label}"]`);
  if (regex.test(e.target.value)) {
    if (e.target.classList.contains("wrong")) {
      e.target.classList.remove("wrong");
    }
    if (!e.target.classList.contains("good")) {
      e.target.classList.add("good");
    }

    inputContainer.removeChild(inputContainer.querySelector("span"));

    return;
  }
  let wrongInfo = document.createElement("span");
  wrongInfo.innerText = "Fill up this field correctly";

  if (e.target.classList.contains("good")) {
    e.target.classList.remove("good");
  }
  if (!e.target.classList.contains("wrong")) {
    e.target.classList.add("wrong");
    inputContainer.append(wrongInfo);
  }
};

const handleInputChange = (e, label, regex) => {
  if (!e.target.value) {
    e.target.classList.remove("good");
    return;
  }
  const inputContainer = document.querySelector(`label[for="${label}"]`);
  if (regex.test(e.target.value)) {
    if (e.target.classList.contains("wrong")) {
      e.target.classList.remove("wrong");
    }
    if (!e.target.classList.contains("good")) {
      e.target.classList.add("good");
    }
    inputContainer.removeChild(inputContainer.querySelector("span"));
    return;
  }
  if (e.target.classList.contains("good")) {
    let wrongInfo = document.createElement("span");
    wrongInfo.innerText = "Fill up this field correctly";

    if (e.target.classList.contains("good")) {
      e.target.classList.remove("good");
    }
    if (!e.target.classList.contains("wrong")) {
      e.target.classList.add("wrong");
      inputContainer.append(wrongInfo);
    }
  }
};

const handleSubmit = (e) => {
  console.log("SUBMIT");
  e.preventDefault();
  const submitMessageContainer = document.querySelector(".submit-message"),
    msg = document.createElement("span");
  if (document.querySelector(".submit-message span")) {
    submitMessageContainer.removeChild(document.querySelector("span"));
  }
  if (
    nameInput.classList.contains("wrong") ||
    !nameInput.value ||
    phoneInput.classList.contains("wrong") ||
    !phoneInput.value ||
    emailInput.classList.contains("wrong") ||
    !emailInput.value
  ) {
    msg.classList.add("wrong");
    msg.innerText = "Make sure all required fields are filled up correctly";
    submitMessageContainer.appendChild(msg);
    return;
  }
  msg.classList.add("good");
  msg.innerText = "Your message has been sent";
  submitMessageContainer.appendChild(msg);
  init();
};

nameInput.addEventListener("blur", (e) =>
  handleInputBlur(e, "name-input", /[a-zA-Z]+\s+[a-zA-Z]/)
);
nameInput.addEventListener("input", (e) =>
  handleInputChange(e, "name-input", /[a-zA-Z]+\s+[a-zA-Z]/)
);

companyInput.addEventListener("blur", (e) =>
  handleInputBlur(e, "company-input", /[a-zA-Z]+/)
);
companyInput.addEventListener("input", (e) =>
  handleInputChange(e, "company-input", /[a-zA-Z]+/)
);

phoneInput.addEventListener("blur", (e) =>
  handleInputBlur(e, "phone-input", /[\d\s\+\(\)^a-z^A-Z]{7,}/)
);
phoneInput.addEventListener("input", (e) =>
  handleInputChange(e, "phone-input", /[\d\s\+\(\)^a-z^A-Z]{7,}/)
);

emailInput.addEventListener("blur", (e) =>
  handleInputBlur(e, "email-input", /^[^@]+@[^@]+\.[^@]+$/)
);
emailInput.addEventListener("input", (e) =>
  handleInputChange(e, "email-input", /^[^@]+@[^@]+\.[^@]+$/)
);

theForm.addEventListener("submit", handleSubmit);

window.addEventListener("load", init);
