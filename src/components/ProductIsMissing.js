export default class ProductIsMissing {
  constructor({ data, templateSelector, quantity }) {
    this._name = data.name;
    this._link = data.link;
    this._quantity = quantity;
    this._color = data.color;
    this._size = data.size;

    this._templateSelector = templateSelector;
  }


  _getTemplate() {
    this._product = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.item')
      .cloneNode(true);

    return this._product;
  }

  generateProductIsMissing() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector('.item__img');

    this._likeButton = this._element.querySelector('.button__like');
    this._deleteButton = this._element.querySelector('.button__delete');
    this._accordionTitle = document.querySelector('.accordion__title')
    this._image.src = this._link;
    this._image.alt = this._name;


    this._element.querySelector('.item__title').textContent = this._name;
    this._element.querySelector('.item__color').textContent = this._isEmptyColor();
    this._element.querySelector('.item__size').textContent = this._isEmptySize();
    this._element.querySelector('.item__span-size').textContent = this._size;
    this._accordionTitle.textContent = this._productTitle(this._quantity);

    this._setEventListeners();

    return this._element;
  }

  _deleteProduct() {
    this._element.remove();
    this._element = null;
  };

  _likeProduct() {
    this._likeButton.classList.toggle('button__like--active');
  };

  _isEmptyColor() {
    if (this._color == false) {
      return '';
    }
    return `Цвет: ${this._color}`;
  };

  _isEmptySize() {
    if (this._size == false) {
      return '';
    }
    return `Размер: ${this._size}`;
  };

  _productTitle(number) {
    if (number > 10 && [11, 12, 13, 14].includes(number%100)) return `Отсутствуют · ${number} товаров`;
    let last_num = number%10;
    if (last_num == 1) return `Отсутствует · ${number} товар`;
    if ([2,3,4].includes(last_num)) return `Отсутствуют · ${number} товара`;
    if ([5,6,7,8,9, 0].includes(last_num)) return `Отсутствуют · ${number} товаров`;
  };



  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._deleteProduct();
    });

    this._likeButton.addEventListener('click', () => {
      this._likeProduct();
    });
  };
}
