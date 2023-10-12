export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.formInput));
    this._buttonElement = document.querySelector(this._settings.formSubmit);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.inputErrorClass);
    errorElement.classList.add(this._settings.inputErrorActive);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.inputErrorActive);
    errorElement.textContent = '';
  };

  _checkInputValidityEmptyFieldError(inputElement) {
    console.log(window.screen.width);
    if (window.screen.width <= 550 && inputElement.value === '' && inputElement.id === 'firstname-input') {
      inputElement.focus();
      this._showInputError(inputElement, "Укажите имя");
    }
    if (window.screen.width <= 550 && inputElement.value === '' && inputElement.id === 'lastname-input') {
      inputElement.focus();
      this._showInputError(inputElement, "Введите фамилию");
    }
    if (window.screen.width <= 550 && inputElement.value === '' && inputElement.id === 'email-input') {
      inputElement.focus();
      this._showInputError(inputElement, "Укажите электронную почту");
    }
    if (window.screen.width <= 550 && inputElement.value === '' && inputElement.id === 'phone-input') {
      inputElement.focus();
      this._showInputError(inputElement, "Укажите номер телефона");
    }
    if (window.screen.width <= 550 && inputElement.value === '' && inputElement.id === 'inn-input') {
      inputElement.focus();
      this._showInputError(inputElement, "Укажите ИНН");
    }
    if (inputElement.value === '' && inputElement.id === 'firstname-input') {
      this._showInputError(inputElement, "Укажите имя");
    }
    if (inputElement.value === '' && inputElement.id === 'lastname-input') {
      this._showInputError(inputElement, "Введите фамилию");
    }
    if (inputElement.value === '' && inputElement.id === 'email-input') {
      this._showInputError(inputElement, "Укажите электронную почту");
    }
    if (inputElement.value === '' && inputElement.id === 'phone-input') {
      this._showInputError(inputElement, "Укажите номер телефона");
    }
    if (inputElement.value === '' && inputElement.id === 'inn-input') {
      this._showInputError(inputElement, "Укажите ИНН");
    }
  };

  _checkInputValidityError(inputElement) {
    if (inputElement.id === 'firstname-input' && inputElement.validationMessage.length === 35) {
      this._showInputError(inputElement, "Имя содержит запрещенные символы");
    }
    if (inputElement.validationMessage.length === 35 && inputElement.id === 'lastname-input') {
      this._showInputError(inputElement, "Фамилия содержит запрещенные символы");
    }
    if (inputElement.validationMessage.length === 35 && inputElement.id === 'email-input') {
      this._showInputError(inputElement, "Проверьте адрес электронной почты");
    }
    if (inputElement.validationMessage.length === 35 && inputElement.id === 'phone-input') {
      this._showInputError(inputElement, "Формат: +9 999 999 99 99");
    }
    if ((inputElement.validationMessage === `Минимальное количество символов: 14. Длина текста сейчас: ${inputElement.value.length}.` || inputElement.validationMessage.length === 35) && inputElement.id === 'inn-input') {
      this._showInputError(inputElement, "Проверьте ИНН");
    }
  };

  _checkInputValidityValid(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    }
  };


  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }


  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
    this._buttonElement.addEventListener('click', () => {
      this._checkInputValidityEmptyFieldError(inputElement);
    });
      inputElement.addEventListener('change', () => {
        this._checkInputValidityError(inputElement);
      });
      inputElement.addEventListener('input', () => {
        this._checkInputValidityValid(inputElement);
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
  };
}
