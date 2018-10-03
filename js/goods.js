'use strict';

var SRC = 'img/cards/';
var SLIDER_BTN_WIDTH = 10;
var SLIDER_WIDTH = 245;

var AMOUNT = {
  min: 0,
  max: 20
};

var PRICE = {
  min: 100,
  max: 1500
};

var WEIGHT = {
  min: 30,
  max: 300
};

var RATING = {
  value: {
    min: 1,
    max: 5
  },
  number: {
    min: 10,
    max: 900
  }
};

var ENERGY = {
  min: 70,
  max: 500
};

var PRODUCT_NAMES = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var CARD_IMGS = ['gum-cedar', 'gum-chile', 'gum-eggplant', 'gum-mustard', 'gum-portwine', 'gum-wasabi', 'ice-cucumber', 'ice-cucumber', 'ice-garlic', 'ice-italian', 'ice-mushroom', 'ice-pig', 'marmalade-beer', 'marmalade-caviar', 'marmalade-corn', 'marmalade-new-year', 'marmalade-sour', 'marshmallow-bacon', 'marshmallow-beer', 'marshmallow-shrimp', 'marshmallow-spicy', 'marshmallow-wine', 'soda-bacon', 'soda-celery', 'soda-cob', 'soda-garlic', 'soda-peanut-grapes', 'soda-russian'];
var INGREDIENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба', 'идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия, ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];

// Перменные для случайно перемешанных массивов
var randomProductNames = [];
var randomCardImgs = [];

// Массив классов соответствующих value рейтинга
var starsRatingClass = ['stars__rating--one', 'stars__rating--two', 'stars__rating--three', 'stars__rating--four', 'stars__rating--five'];

// массив объектов карточек товаров
var goodsCards = [];

// массив товаров в корзине
var cart = [];

// шаблон карточки товара
var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.catalog__card');

// Корзина. Элемент в который будут попадать карточки товаров
var cardsInCartNode = document.querySelector('.goods__cards');

// Функция создания случайного числа в диапозоне (min <= max)
function getRandomInt(object) {
  return Math.floor(Math.random() * (object.max - object.min + 1)) + object.min;
}

// Функция случайного набора значений в массиве
var getRandomArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var swap = array[j];
    array[j] = array[i];
    array[i] = swap;
  }
  return array;
};

// Функция возвращающая true or false
function getRandomBoolean() {
  return Math.random() >= 0.5;
}

// Функция получения индекса случайного элемента массива
function getIngredients(items) {
  var result = items.filter(function filter() {
    return getRandomBoolean();
  });
  return result.join(', ');
}

randomProductNames = getRandomArray(PRODUCT_NAMES);
randomCardImgs = getRandomArray(CARD_IMGS);

// Объект для карточки товара
var createObjectCard = function (goodsName, pictureUrl, index) {
  return {
    name: goodsName,
    picture: SRC + pictureUrl + '.jpg',
    amount: getRandomInt(AMOUNT),
    price: getRandomInt(PRICE),
    weight: getRandomInt(WEIGHT),
    rating: {
      value: getRandomInt(RATING.value),
      number: getRandomInt(RATING.number)
    },
    nutritionFacts: {
      sugar: getRandomBoolean(),
      energy: getRandomInt(ENERGY),
      contents: getIngredients(INGREDIENTS),
    },
    cardIndex: index,
  };
};// .end Объект для карточки товара

// функция создания массива карточек товаров
var createGoodsCards = function (item) {
  for (var i = 0; i < item.length; i++) {
    var goodsCard = createObjectCard(randomProductNames[i], randomCardImgs[i], i);
    goodsCards.push(goodsCard);
  }
  return goodsCards;
};

// Функция создания DOM-элемента карточки товара
var createCatalogCard = function (goodsCard) {
  var cardElement = cardTemplate.cloneNode(true);
  var goodsAmount = goodsCard.amount;
  if (goodsAmount === 0) {
    cardElement.classList.remove('card--in-stock');
    cardElement.classList.add('card--soon');
  } else if (goodsAmount > 0 && goodsAmount <= 5) {
    cardElement.classList.remove('card--in-stock');
    cardElement.classList.add('card--little');
  }
  cardElement.querySelector('.card__title').textContent = goodsCard.name;
  cardElement.querySelector('.card__img').src = goodsCard.picture;
  cardElement.querySelector('.card__img').alt = goodsCard.name;
  var price = cardElement.querySelector('.card__price');
  price.childNodes[0].textContent = goodsCard.price + ' ';
  price.childNodes[2].textContent = '/ ' + goodsCard.weight + 'Г';
  var ratingObject = goodsCard.rating;
  cardElement.querySelector('.stars__rating').classList.remove('stars__rating--five');
  cardElement.querySelector('.stars__rating').classList.add(starsRatingClass[ratingObject.value - 1]);
  cardElement.querySelector('.star__count').textContent = ratingObject.number;
  var nutritionFactsObject = goodsCard.nutritionFacts;
  var containSugar = nutritionFactsObject.sugar ? 'Содержит сахар ' : 'Без сахара ';
  cardElement.querySelector('.card__characteristic').textContent = containSugar + nutritionFactsObject.energy + ' ккал';
  cardElement.querySelector('.card__composition-list').textContent = nutritionFactsObject.contents;
  cardElement.dataset.cardIndex = goodsCard.cardIndex;
  goodsCard.elem = cardElement;
  return cardElement;
};

// Клонируем карточки заполняем данными
var createAllCards = function (items) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < items.length; i++) {
    fragment.appendChild(createCatalogCard(items[i]));
  }
  return fragment;
};

var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');

var catalogLoad = document.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');

createGoodsCards(PRODUCT_NAMES);
catalogCards.appendChild(createAllCards(goodsCards));


// находим шаблон для товаров в корзине
var inCartTemplate = document.querySelector('#card-order')
    .content
    .querySelector('.goods_card');

// Блок корзина в хедере страницы
var headerCart = document.querySelector('.main-header__basket');
var headerCartText;
var headerCartEmpty = 'В корзине ничего нет';


// Кнопка добавления товара в корзину
var btnFavorite = document.querySelectorAll('.card__btn-favorite');

var addFavProd = function (e) {
  e.preventDefault();
  var currentBtn = e.target;
  currentBtn.classList.toggle('card__btn-favorite--selected');
};

for (var j = 0; j < btnFavorite.length; j++) {
  btnFavorite[j].addEventListener('click', addFavProd);
}// .end Кнопка добавления товара в корзину

// Кнопки "Добавить в корзину"
var btnAddToCart = document.querySelectorAll('.card__btn');

// функция удаления из корзины
var deleteCardFromCart = function (e) {
  e.preventDefault();
  var currentBtn = e.target;
  var cardToDelete = currentBtn.closest('.card-order');
  var deleteCardIndex = parseInt(cardToDelete.dataset.cardIndex, 10);
  cardsInCartNode.removeChild(cardToDelete);
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].cardIndex === deleteCardIndex) {
      var amountToDelete = cart[i].amount;
      cart.splice(i, 1);
      break;
    }
  }
  for (var k = 0; k < goodsCards.length; k++) {
    if (goodsCards[k].cardIndex === deleteCardIndex) {
      goodsCards[k].amount = amountToDelete;
      if (goodsCards[k].amount > 0 && goodsCards[k].amount <= 5) {
        goodsCards[k].elem.classList.remove('card--in-stock', 'card--soon');
        goodsCards[k].elem.classList.add('card--little');
      } else {
        goodsCards[k].elem.classList.remove('card--in-stock', 'card--little', 'card--soon');
        goodsCards[k].elem.classList.add('card--in-stock');
      }
      break;
    }
  }
  headerCartText = 'В корзине ' + cart.length + ' товаров';
  headerCart.textContent = headerCartText;
  if (cart.length === 0) {
    document.querySelector('.goods__cards').classList.add('goods__cards--empty');
    document.querySelector('.goods__card-empty').classList.remove('visually-hidden');
    headerCart.textContent = headerCartEmpty;
  }
};

// Находим все кнопки "Удалить товар" и навешиваем события
var createDeleteEvent = function () {
  var btnDeleteFromCart = document.querySelectorAll('.card-order__close');
  for (var i = 0; i < btnDeleteFromCart.length; i++) {
    btnDeleteFromCart[i].addEventListener('click', deleteCardFromCart);
  }
};

// проверка наличия товара в корзине
var checkIsInStock = function (e) {
  e.preventDefault();
  var currentBtn = e.target;
  var currentCard = currentBtn.closest('.catalog__card');
  var currentCardIndex = parseInt(currentCard.dataset.cardIndex, 10);
  if (goodsCards[currentCardIndex].amount !== 0) {
    addNewProductInCart(currentCardIndex, checkIsInCart(currentCardIndex));
  }
};

var checkIsInCart = function (currentIndex) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].cardIndex === currentIndex) {
      return true;
    }
  }
  return false;
};

// добавление нового товара в корзину
var addNewProductInCart = function (currentIndex, isInCart) {
  if (isInCart) {
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].cardIndex === currentIndex) {
        cart[i].orderedAmount += 1;
        cart[i].elem.querySelector('.card-order__count').value = cart[i].orderedAmount;
        break;
      }
    }
  } else {
    var productInCart = Object.assign({orderedAmount: 1}, goodsCards[currentIndex]);
    var inCartElement = inCartTemplate.cloneNode(true);
    inCartElement.querySelector('.card-order__title').textContent = productInCart.name;
    inCartElement.querySelector('.card-order__img').src = productInCart.picture;
    inCartElement.querySelector('.card-order__img').alt = productInCart.name;
    inCartElement.querySelector('.card-order__price').textContent = productInCart.price + ' ₽';
    inCartElement.querySelector('.card-order__count').value = productInCart.orderedAmount;
    inCartElement.dataset.cardIndex = productInCart.cardIndex;
    productInCart.elem = inCartElement;
    cardsInCartNode.appendChild(inCartElement);
    cart.push(productInCart);
    createDeleteEvent();
    // Удаляем у блока goods__cards класс goods__cards--empty и скрываем блок goods__card-empty
    document.querySelector('.goods__cards').classList.remove('goods__cards--empty');
    document.querySelector('.goods__card-empty').classList.add('visually-hidden');
  }
  goodsCards[currentIndex].amount -= 1;
  var currentAmount = goodsCards[currentIndex].amount;
  if (currentAmount === 0) {
    goodsCards[currentIndex].elem.classList.remove('card--little');
    goodsCards[currentIndex].elem.classList.add('card--soon');
  } else if (currentAmount > 0 && currentAmount <= 5) {
    goodsCards[currentIndex].elem.classList.remove('card--in-stock');
    goodsCards[currentIndex].elem.classList.add('card--little');
  }
  headerCartText = 'В корзине ' + cart.length + ' товаров';
  headerCart.textContent = headerCartText;
  return cart;
};

// обработчик события на кнопку "добавить в корзину"
for (var i = 0; i < btnAddToCart.length; i++) {
  btnAddToCart[i].addEventListener('click', checkIsInStock);
}

// переменные для переключение вкладок на доставку
var deliverToggleBtn = document.querySelectorAll('.deliver .toggle-btn__input');
var deliverStore = document.querySelector('.deliver__store');
var deliverCourier = document.querySelector('.deliver__courier');

// обработчик события на способ доставки
deliverToggleBtn.forEach(function (item) {
  item.addEventListener('change', function () {
    deliverStore.classList.toggle('visually-hidden');
    deliverCourier.classList.toggle('visually-hidden');
  });
});

// переменные для переключение вкладок на оплату
var payToggleBtn = document.querySelectorAll('.payment .toggle-btn__input');
var payCard = document.querySelector('.payment__card-wrap');
var payCash = document.querySelector('.payment__cash-wrap');

// обработчик события на способ оплаты
payToggleBtn.forEach(function (item) {
  item.addEventListener('change', function () {
    payCard.classList.toggle('visually-hidden', item.value === 'cash');
    payCash.classList.toggle('visually-hidden', item.value === 'card');
  });
});


// Фильтр по цене (слайдер)
var trackBarPrice = document.querySelector('.range__filter');
var leftSlider = trackBarPrice.querySelector('.range__btn--left');
var rightSlider = trackBarPrice.querySelector('.range__btn--right');
var sliderPriceMin = document.querySelector('.range__price--min');
var sliderPriceMax = document.querySelector('.range__price--max');

sliderPriceMin.textContent = 0;
sliderPriceMax.textContent = 100;
sliderPriceMin.textContent = Math.floor((leftSlider.offsetLeft - SLIDER_BTN_WIDTH / 2) / SLIDER_WIDTH * 100);
sliderPriceMax.textContent = Math.floor((rightSlider.offsetLeft - SLIDER_BTN_WIDTH / 2) / SLIDER_WIDTH * 100);

var sliderFillLine = document.querySelector('.range__fill-line');

var onLeftSliderMouseDown = function (evt) {
  evt.preventDefault();
  var startCoords = evt.clientX - SLIDER_BTN_WIDTH / 2;
  var dragged = false;
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;
    var shift = startCoords - moveEvt.clientX;
    startCoords = moveEvt.clientX;
    leftSlider.style.left = (leftSlider.offsetLeft - shift) + 'px';
    var leftSliderPos = parseInt(leftSlider.style.left, 10);
    sliderFillLine.style.left = leftSliderPos + SLIDER_BTN_WIDTH / 2 + 'px';
    if (leftSliderPos < 0) {
      leftSlider.style.left = '0';
    } else if (leftSliderPos > rightSlider.offsetLeft) {
      leftSlider.style.left = rightSlider.offsetLeft + 'px';
    }
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    if (!dragged) {
      leftSlider.style.left = leftSlider.offsetLeft + 'px';
    }
    sliderPriceMin.textContent = Math.floor(parseInt(leftSlider.style.left, 10) / SLIDER_WIDTH * 100);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

leftSlider.addEventListener('mousedown', onLeftSliderMouseDown);

var onRightSliderMouseDown = function (evt) {
  evt.preventDefault();
  var startCoords = evt.clientX - SLIDER_BTN_WIDTH / 2;
  window.startCoordsR = startCoords;
  var dragged = false;
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;
    var shift = startCoords - moveEvt.clientX;
    startCoords = moveEvt.clientX;
    rightSlider.style.left = (rightSlider.offsetLeft - shift) + 'px';
    var rightSliderPos = parseInt(rightSlider.style.left, 10);
    sliderFillLine.style.right = trackBarPrice.offsetWidth - rightSliderPos + 'px';
    if (rightSliderPos > SLIDER_WIDTH) {
      rightSlider.style.left = SLIDER_WIDTH + 'px';
    } else if (rightSliderPos < leftSlider.offsetLeft) {
      rightSlider.style.left = leftSlider.offsetLeft + 'px';
    }
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    if (!dragged) {
      rightSlider.style.left = rightSlider.offsetLeft + 'px';
    }
    sliderPriceMax.textContent = Math.floor(parseInt(rightSlider.style.left, 10) / SLIDER_WIDTH * 100);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

rightSlider.addEventListener('mousedown', onRightSliderMouseDown);


// Проверка банковской карты
var cardSuccessMessage = document.querySelector('.payment__card-status');
var cardErrorMessage = document.querySelector('.payment__error-message');
var emailInput = document.getElementById('contact-data__email');
var cardNumberInput = document.getElementById('payment__card-number');
var cardCvcNumberInput = document.getElementById('payment__card-cvc');
var cardDateInput = document.getElementById('payment__card-date');
var deliverList = document.querySelector('.deliver__store-list');
var imgElem = document.querySelector('.deliver__store-map-img');
var imgRoot = 'img/map/';

// Алгоритм Луна
var moonAlgorithm = function (cardNumber) {
  var isNumberValid = false;
  var cardNumberDigits = cardNumber.split('');
  var sum = 0;
  var arrLength = cardNumberDigits.length;
  for (var item = 0; item < arrLength; item++) {
    var digit = parseInt(cardNumberDigits[arrLength - item - 1], 10);
    if (item % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }
  if (sum % 10 === 0) {
    isNumberValid = true;
  }

  return isNumberValid;
};

// Проверка валидации E-mail
emailInput.addEventListener('change', function () {
  if (emailInput.validity.patternMismatch) {
    emailInput.setCustomValidity('Введите E-mail в формате username@gmail.com');
  } else {
    emailInput.setCustomValidity('');
  }
});

// Проверка банковской карты
cardNumberInput.addEventListener('change', function () {
  if (cardNumberInput.value.length !== 16) {
    cardNumberInput.style.borderColor = 'red';
    cardNumberInput.setCustomValidity('Номер карты должен содержать 16 цифр');
  } else {
    if (!moonAlgorithm(cardNumberInput.value)) {
      cardNumberInput.style.borderColor = 'red';
      cardNumberInput.setCustomValidity('Неверный номер карты');
      cardErrorMessage.classList.remove('visually-hidden');
    } else {
      cardNumberInput.style.borderColor = 'green';
      cardNumberInput.setCustomValidity('');
      cardSuccessMessage.textContent = 'Одобрен';
      cardErrorMessage.classList.add('visually-hidden');
    }
  }
});

// Проверка даты в формате ММ/ГГ
cardDateInput.addEventListener('change', function () {
  var value = cardDateInput.value.replace(/\D/g, '').slice(0, 4);
  if (cardDateInput.validity.patternMismatch) {
    cardDateInput.setCustomValidity('Введите дату в формате ММ/ГГ');
    cardDateInput.style.borderColor = 'red';
  } else if (cardDateInput.value.length === 4) {
    cardDateInput.style.borderColor = 'green';
    cardDateInput.value = value.slice(0, 2) + '/' + value.slice(2);
  }
});

// Проверка введенного CVC
cardCvcNumberInput.addEventListener('change', function () {
  var cvcNumber = +cardCvcNumberInput.value;
  if (cardCvcNumberInput.validity.patternMismatch) {
    cardCvcNumberInput.setCustomValidity('CVC код должен состоять из цифр');
    cardCvcNumberInput.style.borderColor = 'red';
  } else if (cvcNumber < 100 || cvcNumber > 999) {
    cardCvcNumberInput.style.borderColor = 'red';
    cardCvcNumberInput.setCustomValidity('CVC код должен быть от 100 до 999');
  } else {
    cardCvcNumberInput.style.borderColor = 'green';
    cardCvcNumberInput.setCustomValidity('');
  }
});

// Доставка товара по адресу из списка
deliverList.addEventListener('change', function (evt) {
  var currentInput = evt.target;
  var currentImg = currentInput.value;
  imgElem.setAttribute('src', imgRoot + currentImg + '.jpg');
});
