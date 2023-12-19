import '../pages/index.css'

import { buyer, initialProducts, settings, numberMask } from "../utils/constants.js";

import Product from "../components/Product.js";
import ProductIsMissing from "../components/ProductIsMissing.js";
import Section from "../components/Section.js";
import DeliveryDate from "../components/DeliveryDate.js";
import PopupPayment from "../components/PopupPayment.js";
import PopupDelivery from "../components/PopupDelivery.js";
import Tooltip from "../components/Tooltip.js";
import FormValidator from '../components/FormValidator';

const tooltipSidebar = new Tooltip('.tooltip__refund-sidebar', '.sidebar-delivery__text--span');
const tooltipDelivery = new Tooltip('.tooltip__refund', '.delivery__refund--span');


const initialProductsList = initialProducts.filter((element) => {
  const summ = element.warehouses.reduce(function (currentSum, i) {
    return currentSum + Number(i.quantity)
  }, 0);
return summ != 0;
});

const initialProductsIsEmpty = initialProducts.filter((element) => {
  const summ = element.warehouses.reduce(function (currentSum, i) {
    return currentSum + Number(i.quantity)
  }, 0);
return summ === 0;
});

tooltipSidebar.setEventListenersOpen();
tooltipSidebar.setEventListenersClose();
tooltipDelivery.setEventListenersOpen();
tooltipDelivery.setEventListenersClose();

function getTimeDeliveri() {
  let arr = [];
  initialProductsList.forEach((elem) => {
    elem.warehouses.forEach((elem) => {
      return arr.push(elem.deliveryTime);
    })
  });
  return arr;
};

function sort(arr) {
  return arr.sort(function (a, b) {
    return a - b;
  });
};

const arrDate = new Set(sort(getTimeDeliveri()));

const createProduct = (data) => {
  const product = new Product({
    data: data,
    user: buyer,
    templateSelector: '#product-template',
  });
  const productElement = product.generateProduct();
  return productElement;
};

const productList = new Section({
  items: initialProductsList,
  renderer: (product) => {
    productList.addItem(createProduct(product), document.querySelector('.product-list'));
  },
});



const createProductIsEmpty = (data) => {
  const product = new ProductIsMissing({
    data: data,
    quantity: initialProductsIsEmpty.length,
    templateSelector: '#product-is-missing-template',
  });
  const productElement = product.generateProductIsMissing();
  return productElement;
};

const productIsEmptyList = new Section({
  items: initialProductsIsEmpty,
  renderer: (product) => {
    productIsEmptyList.addItem(createProductIsEmpty(product), document.querySelector('.product-list--sold-out'));
  },
});



const createDate = (data) => {
  const dateDelivery = new DeliveryDate({
    data: data,
    arr: initialProductsList,
    templateSelector: '#date-list',
  });
  const dateElement = dateDelivery.generateDateEl();
  return dateElement;
};

const createDateList = new Section({
  items: arrDate,
  renderer: (dateElement) => {
    createDateList.addItem(createDate(dateElement), document.querySelector('.delivery__data-list'));
  },
});

productIsEmptyList.renderItems();
productList.renderItems();
createDateList.renderItems();

function countValueCheckedCheckBoxes(valueSelector) {
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

function productTitle(number) {
  if (number > 10 && [11, 12, 13, 14].includes(number%100)) return 'товаров';
  let last_num = number%10;
  if (last_num == 1) return 'товар';
  if ([2,3,4].includes(last_num)) return 'товара';
  if ([5,6,7,8,9, 0].includes(last_num)) return 'товаров';
}

const sidebarTotal = document.querySelector('.sidebar-total__subtitle--price');
const quantityProduct = document.querySelector('.quantity__product');
const totalTitle = document.querySelector('.basket-list__total');
const priceNoDiscount = document.querySelector('.price-no-discount');
const discount = document.querySelector('.discount');
const spanBasket = document.querySelector('.header__icon--span');
const spanBasketTabbar = document.querySelector('.tabbar__span');


const priceTotal = countValueCheckedCheckBoxes('basket-list__price_title');
const discountTotal = countValueCheckedCheckBoxes('basket-list__price_subtitle');
const productTotel = countValueCheckedCheckBoxes('basket-list__input');
const priceNoDiscounted = priceTotal + discountTotal;

sidebarTotal.textContent = `${String(priceTotal).replace(/(?=(?:.{3})*$)/g, ' ')}`;
quantityProduct.textContent = `${productTotel} ${productTitle(productTotel)}`;
totalTitle.textContent = `${quantityProduct.textContent} · ${sidebarTotal.textContent}`
spanBasket.textContent = productTotel;
spanBasketTabbar.textContent = productTotel;
priceNoDiscount.textContent = `${String(priceNoDiscounted).replace(/(?=(?:.{3})*$)/g, ' ')} сом`;
discount.textContent = `${`−${discountTotal.toLocaleString()}`} сом`;


const buttonsPlus = document.querySelectorAll('.basket-list__plus');
const buttonsMinus = document.querySelectorAll('.basket-list__minus');
const buttonCheckbox = document.querySelectorAll('.checkbox--item');
const buttonCheckboxAllChecked = document.querySelector('.checkbox__all');
const buttonDeleteProduct = document.querySelectorAll('.button__delete');
const buttonDeleteProductSoldOut = document.querySelectorAll('.button__delete--sold-out');
const accordionTitle = document.querySelector('.accordion__title')
const dateIntervalDelivery = document.querySelector('.sidebar-delivery__span');

buttonsPlus.forEach(button => button.addEventListener('click', pressPlus));
buttonsMinus.forEach(button => button.addEventListener('click', pressMinus));
buttonCheckbox.forEach(button => button.addEventListener('click', pressCheckbox));
buttonDeleteProduct.forEach(button => button.addEventListener('click', pressDeleteButton));
buttonCheckboxAllChecked.addEventListener('click', pressCheckboxAllChecked);
buttonDeleteProductSoldOut.forEach(button => button.addEventListener('click', pressDeleteButtonSoldOut));

const dateListVisible = document.querySelectorAll('.delivery__flag');

let productSoldOutListLength = initialProductsIsEmpty.length;

function pressDeleteButtonSoldOut() {
  productSoldOutListLength--;
  let str = '';
  if (productSoldOutListLength > 10 && [11, 12, 13, 14].includes(productSoldOutListLength%100)) str = `Отсутствуют · ${number} товаров`;
  let last_num = productSoldOutListLength%10;
  if (last_num == 1) str = `Отсутствует · ${productSoldOutListLength} товар`;
  if ([2,3,4].includes(last_num)) str = `Отсутствуют · ${productSoldOutListLength} товара`;
  if ([5,6,7,8,9, 0].includes(last_num)) str = `Отсутствуют · ${productSoldOutListLength} товаров`;
  accordionTitle.textContent = str;
}

function getTimeInterval() {
  const startInterval = dateListVisible[0].textContent.split(' ')[0];
  const endInterval = dateListVisible[dateListVisible.length - 1].textContent.split(' ')[0] + ' ' + dateListVisible[dateListVisible.length - 1].textContent.split(' ')[1].substr(0, 3);
  return dateIntervalDelivery.textContent = startInterval + '-' + endInterval;
}

function pressPlus(e) {
  const spanNumbPhoto = document.querySelectorAll(`.photo-span_${e.target.id}`);
  const inputNumber = document.querySelector(`.basket-list__input_${e.target.id}`);
  const deliveryImg = document.querySelectorAll(`.delivery__photo_${e.target.id}`);
  if (inputNumber.value == 2) {
    spanNumbPhoto[spanNumbPhoto.length - 1].classList.toggle('delivery__number--hidden')
    spanNumbPhoto[spanNumbPhoto.length - 1].textContent++;
  } else if ( inputNumber.value == (Number(spanNumbPhoto[spanNumbPhoto.length - 1].title) + 1) && Number(spanNumbPhoto[spanNumbPhoto.length - 1].title) != 40) {
    deliveryImg[e.target.id - 1].classList.add('delivery__photo--visible');
    deliveryImg[e.target.id - 1].querySelector('.delivery__number').classList.add(`photo-span_2`);
    toggleVisible();
  } else {
    spanNumbPhoto[spanNumbPhoto.length - 1].classList.remove('delivery__number--hidden')
    spanNumbPhoto[spanNumbPhoto.length - 1].textContent++;
  }
}

function pressMinus(e) {
  const spanNumbPhoto = document.querySelectorAll(`.photo-span_${e.target.id}`);
  const deliveryImg = document.querySelectorAll(`.delivery__photo_${e.target.id}`);
  if (spanNumbPhoto[spanNumbPhoto.length - 1].textContent == 2) {
    spanNumbPhoto[spanNumbPhoto.length - 1].classList.add('delivery__number--hidden')
    spanNumbPhoto[spanNumbPhoto.length - 1].textContent--;
  } else if ( spanNumbPhoto[spanNumbPhoto.length - 1].textContent > 1) {
    spanNumbPhoto[spanNumbPhoto.length - 1].textContent--;
  } else {
    deliveryImg[spanNumbPhoto.length - 1].classList.remove('delivery__photo--visible');
    spanNumbPhoto[spanNumbPhoto.length - 1].classList.remove(`photo-span_${e.target.id}`);
    toggleVisible();
  }
}

function toggleVisible() {
  const deliveryImg = document.querySelectorAll('.delivery__date');
  deliveryImg.forEach((elem) => {
    if(elem.querySelector('.delivery__photo--visible') === null) {
      elem.classList.add('delivery__container--hidden');
      elem.querySelector('.delivery__subtitle').classList.remove('delivery__flag');
    } else {
      elem.querySelector('.delivery__subtitle').classList.add('delivery__flag');
      elem.classList.remove('delivery__container--hidden');
    }
  })
}

function pressCheckbox(e) {
  const deliveryImg = document.querySelectorAll(`.delivery__photo_${e.target.id}`);
  deliveryImg.forEach((elem) => {
    elem.classList.toggle('delivery__photo--visible');
    toggleVisible();
  })
}

function pressCheckboxAllChecked() {
  const deliveryImg = document.querySelectorAll(`.delivery__photo`);
  if (buttonCheckboxAllChecked.checked === true) {
  deliveryImg.forEach((elem) => {
    elem.classList.add('delivery__photo--visible');
    toggleVisible();
  })
  } else {
    deliveryImg.forEach((elem) => {
      elem.classList.remove('delivery__photo--visible');
      toggleVisible();
    })
  }
}

function pressDeleteButton(e) {
  const deliveryImg = document.querySelectorAll(`.delivery__photo_${e.target.id}`);
  deliveryImg.forEach((elem) => {
    elem.remove();
    elem =null;
    toggleVisible();
  })
}

const toogleListSoldOutButton = document.querySelector('.basket-list__accordion_btn--sold-out');
const containerSoldOut = document.querySelector('.product-list--sold-out');

toogleListSoldOutButton.addEventListener('click', () => {
  containerSoldOut.classList.toggle('product-list--hide');
  toogleListSoldOutButton.classList.toggle('basket-list__accordion_btn--open');
});

const toogleProductListButton = document.querySelector('.basket-list__accordion_btn--product');
const containerProduct = document.querySelector('.product-list--product');
const containerCheckbox = document.querySelector('.container--checkbox');
const containerTotal = document.querySelector('.container--total');

toogleProductListButton.addEventListener('click', () => {
  containerProduct.classList.toggle('product-list--hide');
  toogleProductListButton.classList.toggle('basket-list__accordion_btn--open');
  containerCheckbox.classList.toggle('basket-list__checkbox--hide');
  containerTotal.classList.toggle('basket-list__checkbox--hide');
});

const subtitlePayment = document.querySelectorAll('.sidebar-payment__subtitle');
const subtitlePaymentDate = document.querySelector('.sidebar-payment__subtitle--date');
const imgPayment = document.querySelectorAll('.sidebar-payment__img');
const popupPaymentBtnOpen = document.querySelectorAll('.edit-payment-btn');

const popupPayment = new PopupPayment({
  popupSelector: '.popup_payment',
  handleFormSubmit: (numb, img, date) => {
    subtitlePayment.forEach(elem => {
      elem.textContent = numb
    });
    subtitlePaymentDate.textContent = date;
    imgPayment.forEach(elem => {
      elem.src = img
    });
    popupPayment.closeSubmit();
  },
});

popupPaymentBtnOpen.forEach(button => button.addEventListener('click', () => {
    popupPayment.open()
  })
);

popupPayment.setEventListeners();

const btnOffice = document.querySelector('.button--office');
const btnMyAddress = document.querySelector('.button--my-address');
const containerMyAddress = document.querySelector('.container__my-address');
const containerOffice = document.querySelector('.container__office');

btnOffice.addEventListener('click', () => {
  btnOffice.classList.add('button__delivery--active');
  btnOffice.disabled = true;
  btnMyAddress.classList.remove('button__delivery--active');
  btnMyAddress.disabled = false;
  containerMyAddress.classList.add('popup__hide-block');
  containerOffice.classList.remove('popup__hide-block');
});

btnMyAddress.addEventListener('click', () => {
  btnOffice.classList.remove('button__delivery--active');
  btnOffice.disabled = false;
  btnMyAddress.classList.add('button__delivery--active');
  btnMyAddress.disabled = true;
  containerMyAddress.classList.remove('popup__hide-block');
  containerOffice.classList.add('popup__hide-block');
})

const popupDeliverisBtnOpen = document.querySelectorAll('.edit-delivery-btn');
const addressTitle = document.querySelectorAll('.address-delivery');
const deliveryMethodSidebar = document.querySelector('.delivery-method-sidebar');
const deliveryMethod = document.querySelector('.delivery-method');
const deliverEvaluation = document.querySelector('.delivery-evaluation');

const popupDeliveris = new PopupDelivery({
  popupSelector: '.popup__delivery',
  handleFormSubmit: (title, method, methodSidebar, evaluation) => {
    addressTitle.forEach(elem => {
      elem.textContent = title;
    });
    deliveryMethodSidebar.textContent = `Доставка ${methodSidebar}`;
    deliveryMethod.textContent = method;
    deliverEvaluation.textContent = evaluation;
    popupDeliveris.closeSubmit();
  }
});

popupDeliverisBtnOpen.forEach(button => button.addEventListener('click', () => {
  popupDeliveris.open()
  })
);

popupDeliveris.setEventListeners();

const formBuy = document.forms['recipient__form'];
const formBuyValidator = new FormValidator(settings, formBuy);
formBuyValidator.enableValidation();


getTimeInterval();
numberMask();

