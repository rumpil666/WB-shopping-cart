import product1 from '../images/Img1.png';
import product2 from '../images/img2.png';
import product3 from '../images/img3.png';

const initialProducts = [
  {
    name: 'Футболка UZcotton мужская',
    link: `${product1}`,
    color: 'белый',
    size: '56',
    warehouses: [
      {
        warehouse: "Коледино WB",
        quantity: '100',
        deliveryTime: 6
      },
    ],
    company: 'OOO Вайлдберриз',
    ogrn: 'ОГРН: 5167746237148',
    address: '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
    price: '1573',
    discount: '50',
    quantity: '10',
    maxQuantity: '',
    quantityWarehouse: '',
    deliveryTime: '',
    id: '1'
  },
  {
    name: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
    link: `${product2}`,
    color: 'прозрачный',
    size: '',
    warehouses: [
      {
        warehouse: "Коледино WB",
        quantity: '40',
        deliveryTime: 4
      },
      {
        warehouse: "Москвино",
        quantity: '10',
        deliveryTime: 2
      },
    ],
    company: 'OOO Мегапрофстиль',
    ogrn: 'ОГРН: 5167746237148',
    address: '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
    price: '22000',
    discount: '50',
    quantity: '15',
    maxQuantity: '',
    quantityWarehouse: '',
    deliveryTime: '',
    id: '2'
  },
  {
    name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
    link: `${product3}`,
    color: '',
    size: '',
    warehouses: [
      {
        warehouse: 'Коледино WB',
        quantity: '20',
        deliveryTime: 2
      },
    ],
    company: 'OOO Вайлдберриз',
    ogrn: 'ОГРН: 5167747123131',
    address: '129337, Москва, улица Кукушкина Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
    price: '722',
    discount: '50',
    quantity: '2',
    maxQuantity: '',
    quantityWarehouse: '',
    deliveryTime: '',
    id: '3'
  },
  {
    name: 'Футболка UZcotton мужская',
    link: `${product1}`,
    color: 'белый',
    size: '56',
    warehouses: [
      {
        warehouse: "Коледино WB",
        quantity: '0',
      },
      {
        warehouse: "Москвино",
        quantity: '0'
      },
    ],
    company: 'OOO Вайлдберриз',
    ogrn: 'ОГРН: 5167746237148',
    address: '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
    price: '67',
    discount: '50',
    quantity: '20',
    maxQuantity: '',
    quantityWarehouse: '',
    deliveryTime: '',
    id: '4'
  },
  {
    name: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
    link: `${product2}`,
    color: 'прозрачный',
    size: '',
    warehouses: [
      {
        warehouse: "Коледино WB",
        quantity: '0'
      },
      {
        warehouse: "Москвино",
        quantity: '0'
      },
    ],
    company: 'OOO Мегапрофстиль',
    ogrn: 'ОГРН: 5167746237148',
    address: '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
    price: '412',
    discount: '50',
    quantity: '60',
    maxQuantity: '',
    quantityWarehouse: '',
    deliveryTime: '',
    id: '5'
  },
  {
    name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
    link: `${product3}`,
    color: '',
    size: '',
    warehouses: [
      {
        warehouse: "Коледино WB",
        quantity: '0'
      },
      {
        warehouse: "Москвино",
        quantity: '0'
      },
    ],
    company: 'OOO Вайлдберриз',
    ogrn: 'ОГРН: 5167747123131',
    address: '129337, Москва, улица Кукушкина Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
    price: '234',
    discount: '50',
    quantity: '10',
    maxQuantity: '',
    quantityWarehouse: '',
    deliveryTime: '',
    id: '6'
  },
  {
    name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
    link: `${product3}`,
    color: '',
    size: '',
    warehouses: [
      {
        warehouse: "Коледино WB",
        quantity: '0'
      },
      {
        warehouse: "Москвино",
        quantity: '0'
      },
    ],
    company: 'OOO Вайлдберриз',
    ogrn: 'ОГРН: 5167747123131',
    address: '129337, Москва, улица Кукушкина Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
    price: '2345',
    discount: '50',
    quantity: '28',
    maxQuantity: '',
    quantityWarehouse: '',
    deliveryTime: '',
    id: '7'
  }
];


const buyer = {
  personalDiscount: '10'
};

const settings = {
  popupForm: '.recipient__form',
  inputErrorClass: 'recipient__error',
  inputErrorActive: 'recipient__input-error_active',
  formInput: '.recipient__input',
  formSubmit: '.button__sidebar-confirmation',
};

function numberMask() {
  [].forEach.call( document.querySelectorAll('.tel'), function(input) {
    let key;
    function mask(event) {
      event.key && (key = event.key);
      let pos = this.selectionStart;
      if (pos < 1) event.preventDefault();
      let matrix = "+_ ___ ___ __ __",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function(a) {
              return i < val.length ? val.charAt(i++) : a
          });
      i = new_value.indexOf("_");
      if (i != -1) {
          i < 1 && (i = 2);
          new_value = new_value.slice(0, i)
      }
      let reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function(a) {
              return "\\d{1," + a.length + "}"
          }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 2 || key > 47 && key < 58) {
        this.value = new_value;
      }
      if (event.type == "blur" && this.value.length < 2) {
        this.value = "";
      }
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("key", mask, false);

  });
};

export { buyer, initialProducts, settings, numberMask };
