export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._escapeClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup--opened');
    document.addEventListener('keydown', this._escapeClose);
  }

  close() {
    this._popup.classList.remove('popup--opened');
    document.removeEventListener('keydown', this._escapeClose);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup--opened')) {
        this.close()
      }
      if (event.target.classList.contains('popup__close')) {
        this.close()
      }
    });
  }
}
