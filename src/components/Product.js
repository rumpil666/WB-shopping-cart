export default class Product {
  constructor({ data, user, templateSelector }) {
    this._name = data.name;
    this._link = data.link;

    this.test1 = data;

    this._color = data.color;
    this._size = data.size;
    this._warehouses = data.warehouses;
    this._company = data.company;
    this._ogrn = data.ogrn;
    this._address = data.address;
    this._id = data.id;
    this._discount = data.discount;
    this._price = data.price;
    this._quantity = data.quantity;

    this._userDiscount = user.personalDiscount;

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

  generateProduct() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector('.item__img');

    this._inputCheckbox = this._element.querySelector('input');
    this._label = this._element.querySelector('label');

    this._allCheckbox = document.querySelector('.checkbox__all');
    this._totalTitle = document.querySelector('.basket-list__total');

    this._priceHover = this._element.querySelector('.basket-list__price_subtitle');
    this._tooltipDiscount = this._element.querySelector('.tooltip__discount');

    this._likeButton = this._element.querySelector('.button__like');
    this._deleteButton = this._element.querySelector('.button__delete');
    this._minusButton = this._element.querySelector('.basket-list__minus');
    this._plusButton = this._element.querySelector('.basket-list__plus');

    this._infoHover = this._element.querySelector('.item__icon-info');
    this._tooltipInfo = this._element.querySelector('.tooltip__info');

    this._inputNumber = this._element.querySelector('.basket-list__input');
    this._priceProduct = this._element.querySelector('.basket-list__price_title');

    this._amountDiscountWhole = this._element.querySelector('.amount__discount-whole');
    this._amountDiscount = this._element.querySelector('.amount__discount');
    this._amountPersonalDiscount = this._element.querySelector('.amount__personal-discount');
    this._remainingQuantity = this._element.querySelector('.basket-list__span');
    this._sidebarTotal = document.querySelector('.sidebar-total__subtitle--price');
    this._quantityProductSidebar = document.querySelector('.quantity__product');
    this._priceNoDiscountSidebar = document.querySelector('.price-no-discount');
    this._discountSidebar = document.querySelector('.discount');
    this._spanBasket = document.querySelector('.header__icon--span');
    this._spanBasketTabbar = document.querySelector('.tabbar__span');
    this._buttonOrder = document.querySelector('.button__sidebar-confirmation')
    this._checkboxBuy = document.querySelector('.checkbox--buy');
    this._paymentTextHide = document.querySelector('.sidebar-payment__text');

    this._image.src = this._link;
    this._image.alt = this._name;

    this._inputCheckbox.checked = true;

    this._plusButton.id = this._id;
    this._minusButton.id = this._id;
    this._inputCheckbox.id = this._id;
    this._deleteButton.id = this._id;
    this._label.setAttribute('for', this._id);

    this._inputNumber.value = this._quantity;

    this._element.querySelector('.item__title').textContent = this._name;
    this._element.querySelector('.item__color').textContent = this._isEmptyColor();
    this._element.querySelector('.item__size').textContent = this._isEmptySize();
    this._element.querySelector('.item__span-size').textContent = this._size;
    this._element.querySelector('.item__warehouse').textContent = this._warehouses[0].warehouse;
    this._element.querySelector('.item__company').textContent = this._company;
    this._element.querySelector('.item__company-info').textContent = this._company;
    this._element.querySelector('.item__ogrn').textContent = this._ogrn;
    this._element.querySelector('.item__address').textContent = this._address;
    this._inputCheckbox.value = this._countPrice();


    this._inputNumber.classList.add(`basket-list__input_${this._id}`);
    this._priceProduct.textContent = this._modifyNumber(String(this._countPrice()));
    this._element.querySelector('.tooltip__discount-user').textContent = `Скидка покупателя ${this._userDiscount}%`;
    this._element.querySelector('.tooltip__discount-product').textContent = `Скидка ${this._discount}%`;
    this._amountDiscountWhole.textContent = `${this._modifyNumber(String(this._countWholeDiscount()))} сом`;
    this._amountDiscount.textContent = `-${this._modifyNumber(String(this._countAmountDiscount()))} сом`;
    this._amountPersonalDiscount.textContent = `-${this._modifyNumber(String(this._countAmountPersonalDiscount()))} сом`;

    this._remainingQuantity.textContent = `Осталось ${this._countRemainingQuantity()} шт.`;

    this._toogleDisabledCountBtn();
    this._toogleRemainingQuantityDisable();
    this._setEventListeners();
    this._toogleFont();
    this._checkChecked();

    return this._element;
  }

  _modifyNumber(num) {
    return Number(num).toLocaleString();
  };

  _countAmountDiscount() {
    return Math.trunc(this._price / 100 * this._discount) * this._inputNumber.value;
  };

  _countAmountPersonalDiscount() {
    return Math.trunc(this._price / 100 * this._userDiscount) * this._inputNumber.value;
  };

  _countWholeDiscount() {
    return Math.trunc(this._countAmountDiscount() + this._countAmountPersonalDiscount());
  };

  _countPrice() {
    return `${Math.trunc(this._price * this._inputNumber.value - this._countWholeDiscount())}`;
  };

  _countNumberofProduct() {
    return this._warehouses.reduce(function (currentSum, i) {
      return currentSum + Number(i.quantity)
    }, 0);
  };

  _countRemainingQuantity() {
    return this._countNumberofProduct() - this._quantity;
  };

  _toogleRemainingQuantityDisable() {
    if (this._countRemainingQuantity() >= 5) {
      this._remainingQuantity.classList.add('basket-list__span--disable')
    } else {
      this._remainingQuantity.classList.remove('basket-list__span--disable')
    }
  }

  _toogleDisabledCountBtn() {
    if (this._quantity == 1) {
      this._minusButton.setAttribute('disabled', true);
    } else if (this._quantity == this._countNumberofProduct()) {
      this._plusButton.setAttribute('disabled', true);
    } else {
      this._minusButton.removeAttribute('disabled');
      this._plusButton.removeAttribute('disabled');
    }
  };

  _toogleFont() {
    if (this._countPrice().length > 5) {
      this._priceProduct.classList.add('basket-list__price_title--font-size');
    } else {
      this._priceProduct.classList.remove('basket-list__price_title--font-size');
    }
  };

  _toogleAllCheckbox() {
    const checkboxes = document.getElementsByClassName('checkbox--item');
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = this._allCheckbox.checked;
    }
  };

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


  _plusProduct() {
    this._quantity++;
    return this._inputNumber.value = this._quantity;
  };

  _minusProduct() {
    this._quantity--;
    return this._inputNumber.value = this._quantity;
  };

  _countValueCheckedCheckBoxes(valueSelector) {
    const checkboxes = document.getElementsByClassName('checkbox--item');
    const value = document.getElementsByClassName(valueSelector);
    let summCheckboxes = '';
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        if (value[i].textContent === '') {
        summCheckboxes = Number(summCheckboxes) + Number(value[i].value.replace(/[^+\d]/g, ''));
        } else {
          summCheckboxes = Number(summCheckboxes) + Number(value[i].textContent.replace(/[^+\d]/g, ''));
        }
      } else {
      summCheckboxes = Number(summCheckboxes);
    }
    }
    return summCheckboxes;
  };

  _countPriceNoDiscountSidebar() {
    const summ = this._countValueCheckedCheckBoxes('basket-list__price_title') + this._countValueCheckedCheckBoxes('basket-list__price_subtitle');
    return summ;
  };

  _productTitle(number) {
    if (number > 10 && [11, 12, 13, 14].includes(number%100)) return `${number} товаров`;
    let last_num = number%10;
    if (last_num == 1) return `${number} товар`;
    if ([2,3,4].includes(last_num)) return `${number} товара`;
    if ([5,6,7,8,9, 0].includes(last_num)) return `${number} товаров`;
  };

  _checkChecked() {
    const checkboxes = document.getElementsByClassName('checkbox--item');
    let checkCheckboxes = true;
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked === false) {
        checkCheckboxes = false;
      }
    }
    return this._allCheckbox.checked = checkCheckboxes;
  };

  _toggleCheckboxBuy() {
    if(this._checkboxBuy.checked === true) {
      this._paymentTextHide.classList.add('sidebar-payment__text--hide');
      this._buttonOrder.textContent = `Оплатить ${this._sidebarTotal.textContent} сом`;
    } else {
      this._buttonOrder.textContent = 'Заказать';
      this._paymentTextHide.classList.remove('sidebar-payment__text--hide');
    }
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._deleteProduct();
      this._sidebarTotal.textContent = `${this._modifyNumber(String(this._countValueCheckedCheckBoxes('basket-list__price_title')))}`;
      this._discountSidebar.textContent = `−${this._modifyNumber(String(this._countValueCheckedCheckBoxes('basket-list__price_subtitle')))} сом`;
      this._priceNoDiscountSidebar.textContent = `${this._modifyNumber(String(this._countPriceNoDiscountSidebar()))} сом`;
      this._quantityProductSidebar.textContent = `${this._productTitle(this._countValueCheckedCheckBoxes('basket-list__input'))}`;
      this._spanBasket.textContent = this._countValueCheckedCheckBoxes('basket-list__input');
      this._spanBasketTabbar.textContent = this._countValueCheckedCheckBoxes('basket-list__input');
      this._totalTitle.textContent = `${this._productTitle(this._countValueCheckedCheckBoxes('basket-list__input'))} · ${this._modifyNumber(String(this._countValueCheckedCheckBoxes('basket-list__price_title')))} сом`;
      this._toggleCheckboxBuy();
    });

    this._likeButton.addEventListener('click', () => {
      this._likeProduct();
    });

    this._inputCheckbox.addEventListener('click', () => {
      this._sidebarTotal.textContent = `${this._modifyNumber(String(this._countValueCheckedCheckBoxes('basket-list__price_title')))}`;
      this._discountSidebar.textContent = `−${this._modifyNumber(String(this._countValueCheckedCheckBoxes('basket-list__price_subtitle')))} сом`;
      this._priceNoDiscountSidebar.textContent = `${this._modifyNumber(String(this._countPriceNoDiscountSidebar()))} сом`;
      this._quantityProductSidebar.textContent = `${this._productTitle(this._countValueCheckedCheckBoxes('basket-list__input'))}`;
      this._spanBasket.textContent = this._countValueCheckedCheckBoxes('basket-list__input');
      this._spanBasketTabbar.textContent = this._countValueCheckedCheckBoxes('basket-list__input');
      this._checkChecked();
      this._toggleCheckboxBuy();
    });

    this._checkboxBuy.addEventListener('click', () => {
      this._toggleCheckboxBuy();
    });

    this._allCheckbox.addEventListener('click', () => {
      this._toogleAllCheckbox();
      this._sidebarTotal.textContent = `${this._modifyNumber(String(this._countValueCheckedCheckBoxes('basket-list__price_title')))}`;
      this._discountSidebar.textContent = `−${this._modifyNumber(String(this._countValueCheckedCheckBoxes('basket-list__price_subtitle')))} сом`;
      this._priceNoDiscountSidebar.textContent = `${this._modifyNumber(String(this._countPriceNoDiscountSidebar()))} сом`;
      this._quantityProductSidebar.textContent = `${this._productTitle(this._countValueCheckedCheckBoxes('basket-list__input'))}`;
      this._spanBasket.textContent = this._countValueCheckedCheckBoxes('basket-list__input');
      this._spanBasketTabbar.textContent = this._countValueCheckedCheckBoxes('basket-list__input');
      this._toggleCheckboxBuy();
    });

    this._plusButton.addEventListener('click', () => {
      this._plusProduct();
      this._priceProduct.textContent = this._modifyNumber(String(this._countPrice()));
      this._amountDiscountWhole.textContent = `${this._modifyNumber(String(this._countWholeDiscount()))} сом`;
      this._amountDiscount.textContent = `-${this._modifyNumber(String(this._countAmountDiscount()))} сом`;
      this._amountPersonalDiscount.textContent = `-${this._modifyNumber(String(this._countAmountPersonalDiscount()))} сом`;
      this._remainingQuantity.textContent = `Осталось ${this._countRemainingQuantity()} шт.`;
      this._toogleRemainingQuantityDisable();
      this._toogleDisabledCountBtn();
      this._toogleFont();
      this._sidebarTotal.textContent = `${this._modifyNumber(String(this._countValueCheckedCheckBoxes('basket-list__price_title')))}`;
      this._discountSidebar.textContent = `−${this._modifyNumber(String(this._countValueCheckedCheckBoxes('basket-list__price_subtitle')))} сом`;
      this._priceNoDiscountSidebar.textContent = `${this._modifyNumber(String(this._countPriceNoDiscountSidebar()))} сом`;
      this._quantityProductSidebar.textContent = `${this._productTitle(this._countValueCheckedCheckBoxes('basket-list__input'))}`;
      this._spanBasket.textContent = this._countValueCheckedCheckBoxes('basket-list__input');
      this._spanBasketTabbar.textContent = this._countValueCheckedCheckBoxes('basket-list__input');
      this._inputCheckbox.value = this._countPrice();
      this._totalTitle.textContent = `${this._productTitle(this._countValueCheckedCheckBoxes('basket-list__input'))} · ${this._modifyNumber(String(this._countValueCheckedCheckBoxes('basket-list__price_title')))} сом`;
      this._toggleCheckboxBuy();
    });

    this._minusButton.addEventListener('click', () => {
      this._minusProduct();
      this._priceProduct.textContent = this._modifyNumber(String(this._countPrice()));
      this._amountDiscountWhole.textContent = `${this._modifyNumber(String(this._countWholeDiscount()))} сом`;
      this._amountDiscount.textContent = `-${this._modifyNumber(String(this._countAmountDiscount()))} сом`;
      this._amountPersonalDiscount.textContent = `-${this._modifyNumber(String(this._countAmountPersonalDiscount()))} сом`;
      this._remainingQuantity.textContent = `Осталось ${this._countRemainingQuantity()} шт.`;
      this._toogleRemainingQuantityDisable();
      this._toogleDisabledCountBtn();
      this._toogleFont();
      this._sidebarTotal.textContent = `${this._modifyNumber(String(this._countValueCheckedCheckBoxes('basket-list__price_title')))}`;
      this._discountSidebar.textContent = `−${this._modifyNumber(String(this._countValueCheckedCheckBoxes('basket-list__price_subtitle')))} сом`;
      this._priceNoDiscountSidebar.textContent = `${this._modifyNumber(String(this._countPriceNoDiscountSidebar()))} сом`;
      this._quantityProductSidebar.textContent = `${this._productTitle(this._countValueCheckedCheckBoxes('basket-list__input'))}`;
      this._spanBasket.textContent = this._countValueCheckedCheckBoxes('basket-list__input');
      this._spanBasketTabbar.textContent = this._countValueCheckedCheckBoxes('basket-list__input');
      this._inputCheckbox.value = this._countPrice();
      this._totalTitle.textContent = `${this._productTitle(this._countValueCheckedCheckBoxes('basket-list__input'))} · ${this._modifyNumber(String(this._countValueCheckedCheckBoxes('basket-list__price_title')))} сом`;
      this._toggleCheckboxBuy();
    });

    this._priceHover.addEventListener('mouseover', () => {
      this._tooltipDiscount.classList.add('tooltip_opened');
    });

    this._priceHover.addEventListener('mouseout', () => {
      this._tooltipDiscount.classList.remove('tooltip_opened');
    });

    this._infoHover.addEventListener('mouseover', () => {
      this._tooltipInfo.classList.add('tooltip_opened');
    });

    this._infoHover.addEventListener('mouseout', () => {
      this._tooltipInfo.classList.remove('tooltip_opened');
    });
  };


}

