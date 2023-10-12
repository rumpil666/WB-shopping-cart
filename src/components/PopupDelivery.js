import Popup from "./Popup.js";

export default class PopupDelivery extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._popupFormOffice = document.querySelector('.form__delivery--office');
      this._popupFormMyAdress = document.querySelector('.form__delivery--my-address');
      this._container = document.querySelector('.container--evaluation');
      this._deleteBtn = document.querySelectorAll('.button__delete--address');
    }

    _deleteProduct(e) {
      e.target.remove();
      e.target = null;
    };

    setEventListeners() {
      super.setEventListeners()

      this._deleteBtn.forEach(button => button.addEventListener('click', (e) => {
        e.target.parentElement.remove();
      })
      )

      this._popupFormOffice.addEventListener('submit', (evt) => {
        evt.preventDefault()
        const title = document.querySelector('input[name="office"]:checked').value;
        const inputId = document.querySelector('input[name="office"]:checked').id;
        const evaluation = document.querySelector(`label[for="${inputId}"] > div > div > div > Span`).textContent;
        const method = 'Пункт выдачи';
        const methodSidebar = 'в пункт выдачи'
        this._container.classList.remove('delivery__container--hidden');
        this._handleFormSubmit(title, method, methodSidebar, evaluation);
      })

      this._popupFormMyAdress.addEventListener('submit', (evt) => {
        evt.preventDefault()
        const title = document.querySelector('input[name="address"]:checked').value;
        const methodSidebar = 'курьером';
        const method = 'Доставка курьером';
        this._container.classList.add('delivery__container--hidden');
        this._handleFormSubmit(title, method, methodSidebar);
      })
    }
  }
