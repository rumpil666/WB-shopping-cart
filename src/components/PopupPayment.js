import Popup from "./Popup.js";

export default class PopupPayment extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._popupForm = this._popup.querySelector('.popup__form');
      this._checked = null;
    }

    open() {
      super.open();
      this._checked = document.querySelector('input[name="card"]:checked');
    }

    closeSubmit() {
      super.close();
    }

    close() {
      this._checked.checked = true;
      super.close();
    }

    setEventListeners() {
      super.setEventListeners()
      this._popupForm.addEventListener('submit', (evt) => {
        evt.preventDefault()
        const numb = document.querySelector('input[name="card"]:checked').value;
        const numbId = document.querySelector('input[name="card"]:checked').id;
        const img = document.querySelector(`label[for="${numbId}"] > div > img`).src;
        const date = document.querySelector(`label[for="${numbId}"] > div > p`).textContent;
        this._handleFormSubmit(numb, img, date)
      })
    }
}
