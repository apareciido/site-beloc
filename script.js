//navbar

const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      if (navLinks.classList.contains('active')) {
        menuToggle.textContent = '✖'; // Change to X when menu is open
      } else {
        menuToggle.textContent = '☰'; // Change back to ☰ when menu is closed
      }
    });

//navbar fim

//catálogo

function filterProducts(category) {
  const products = document.querySelectorAll('.product');
  const showAllButton = document.getElementById('showAllButton');

  if (category === 'all') {
    products.forEach(product => product.style.display = 'block');
    showAllButton.style.display = 'none';
  } else {
    products.forEach(product => {
      product.style.display = product.getAttribute('data-category') === category ? 'block' : 'none';
    });
    showAllButton.style.display = 'inline-block';
  }
}

//catálogo fim

//orçamento
/*
function filterProducts(category) {
  const products = document.querySelectorAll('.product');
  const showAllButton = document.getElementById('showAllButton');

  if (category === 'all') {
    products.forEach(product => product.style.display = 'block');
    showAllButton.style.display = 'none';
  } else {
    products.forEach(product => {
      product.style.display = product.getAttribute('data-category') === category ? 'block' : 'none';
    });
    showAllButton.style.display = 'inline-block';
  }
}*/

function requestQuote(productName) {
  const formContainer = document.getElementById('formContainer');
  const productInput = document.getElementById('product');
  formContainer.style.display = 'block';
  productInput.value = productName;
  window.scrollTo({ top: formContainer.offsetTop, behavior: 'smooth' });
}

//orçamento fim
class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

  validateForm() {
    let isValid = true;
    const fields = this.form.querySelectorAll("[name][required]");

    // Percorre todos os campos obrigatórios
    fields.forEach((field) => {
      // Verifica se o campo está vazio
      if (!field.value.trim()) {
        isValid = false;
        // Adiciona uma classe de erro para destaque visual
        field.classList.add("error");
        // Exibe uma mensagem de erro personalizada
        if (!field.nextElementSibling || !field.nextElementSibling.classList.contains("field-error")) {
          const errorMessage = document.createElement("div");
          errorMessage.classList.add("field-error");
          errorMessage.style.color = "red";
          errorMessage.style.fontSize = "0.875rem";
          errorMessage.innerText = `O campo "${field.getAttribute("name")}" é obrigatório.`;
          field.parentNode.insertBefore(errorMessage, field.nextSibling);
        }
      } else {
        // Remove a classe de erro e mensagem caso esteja preenchido
        field.classList.remove("error");
        if (field.nextElementSibling && field.nextElementSibling.classList.contains("field-error")) {
          field.nextElementSibling.remove();
        }
      }
    });

    return isValid;
  }

  displaySuccess() {
    const successMessage = document.createElement("div");
    successMessage.innerHTML = this.settings.success;
    successMessage.style.marginTop = "1rem";
    successMessage.id = "success-message";

    this.form.appendChild(successMessage);
    this.form.reset();

    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  }

  displayError() {
    const errorMessage = document.createElement("div");
    errorMessage.innerHTML = this.settings.error;
    errorMessage.style.marginTop = "1rem";
    errorMessage.id = "error-message";

    this.form.appendChild(errorMessage);

    setTimeout(() => {
      errorMessage.remove();
    }, 3000);
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.innerText = "Enviando...";
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);

      // Validação dos campos obrigatórios
      if (!this.validateForm()) {
        throw new Error("Campos obrigatórios não preenchidos.");
      }

      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });
      this.displaySuccess();
    } catch (error) {
      this.displayError();
      console.error(error.message);
    } finally {
      event.target.disabled = false;
      event.target.innerText = "Enviar";
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<p id='feito'>Mensagem enviada com sucesso!</p>",
  error: "<p class='error'>Não foi possível enviar sua mensagem. Tente novamente.</p>",
});
formSubmit.init();
