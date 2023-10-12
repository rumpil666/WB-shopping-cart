export default class DeliveryDate {
  constructor({ data, arr, templateSelector }) {
    this._data = data;
    this._arr = arr;
    this._templateSelector = templateSelector;
  }

  _getTemplateDateList() {
    this._dateEl = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.delivery__date')
      .cloneNode(true);

    return this._dateEl;
  }

  _getTemplatePhoto() {
    this._photo = document
      .querySelector('#date-photo')
      .content
      .querySelector('.delivery__photo')
      .cloneNode(true);

    return this._photo;
  }

  generatePhoto(arr) {
    this._el = this._getTemplatePhoto();

    this._image = this._el.querySelector('.delivery__img');
    this._number = this._el.querySelector('.delivery__number');

    this._image.src = arr.link;
    this._image.alt = arr.name;
    this._number.textContent = arr.quantityWarehouse;
    this._el.classList.add(`delivery__photo_${arr.id}`);
    this._number.classList.add(`photo-span_${arr.id}`);
    this._number.title = arr.maxQuantite;

    this._toggleHiddenSpan();

    return this._el;
  }

  _toggleHiddenSpan() {
    if (this._number.textContent == 1) {
      this._number.classList.add('delivery__number--hidden')
    }
  }

  _addItem(element, container) {
    container.append(element);
  }

  _renderItems(arr, container) {
    arr.forEach(item => {
      this._addItem(this.generatePhoto(item), container);
    });
  }

  generateDateEl() {
    this._element = this._getTemplateDateList();

    this._date = this._element.querySelector('.delivery__dates');
    this._container = this._element.querySelector('.delivery__photos');
    this._container.classList.add(`delivery__photos_${this._data}`);
    this._date.textContent = this._getDateDelivery(this._data);

    this._photoArr = this._setDateElements(this._arr, this._data);
    this._renderItems(this._photoArr, this._container);
    this._toggleVisible(this._element);

    return this._element;
  }

_getMonth(num) {
  if (num === 0) return 'января';
  if (num === 1) return 'февраля';
  if (num === 2) return 'марта';
  if (num === 3) return 'апреля';
  if (num === 4) return 'мая';
  if (num === 5) return 'июня';
  if (num === 6) return 'июля';
  if (num === 7) return 'августа';
  if (num === 8) return 'сентября';
  if (num === 9) return 'октября';
  if (num === 10) return 'ноября';
  if (num === 11) return 'декабря';
};


  _getDateDelivery(days) {
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    let date = new Date(year, month, day);
    date.setDate(date.getDate() + days);

    const dayDelivery = date.getDate();
    const monthDelivery = date.getMonth();
    return `${dayDelivery} ${this._getMonth(monthDelivery)}`;
  }

  _setDateElements(arr, days) {
    let array = [];
      arr.forEach((elem) => {
        elem.warehouses.forEach((item) => {
          if (elem.quantity != 0) {
            if (item.quantity != 0) {
              elem.maxQuantite = item.quantity;
              if (item.deliveryTime === days) {
                if (Number(item.quantity) >= Number(elem.quantity)) {
                  elem.quantityWarehouse = elem.quantity;
                  elem.quantity = 0;
                } else if (Number(item.quantity) < Number(elem.quantity)) {
                  elem.quantityWarehouse = item.quantity;
                  elem.quantity = elem.quantity - item.quantity;
                }
                return array.push(elem);
              }
            }
          }
        })
      })
    return array;
  };

  _toggleVisible(container) {
    if(container.querySelector('.delivery__img') === null) {
      container.classList.add('delivery__container--hidden');
    }
  }
}
