'use strict';

(function () {
  // Массив классов соответствующих value рейтинга
  var starsRatingClass = ['stars__rating--one', 'stars__rating--two', 'stars__rating--three', 'stars__rating--four', 'stars__rating--five'];

  // // Массив объектов карточек товаров
  // var goodsCards = [];
  //
  // // Массив товаров в корзине
  // var cart = [];

  // Шаблон карточки товара
  var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.catalog__card');


  // // Функция создания случайного числа в диапозоне (min <= max)
  // function getRandomInt(object) {
  //   return Math.floor(Math.random() * (object.max - object.min + 1)) + object.min;
  // }

  // // Функция случайного набора значений в массиве
  // var getRandomArray = function (array) {
  //   for (var i = array.length - 1; i > 0; i--) {
  //     var j = Math.floor(Math.random() * (i + 1));
  //     var swap = array[j];
  //     array[j] = array[i];
  //     array[i] = swap;
  //   }
  //   return array;
  // };
  //
  // // Функция возвращающая true or false
  // function getRandomBoolean() {
  //   return Math.random() >= 0.5;
  // }

  // Функция получения индекса случайного элемента массива
  // function getIngredients(items) {
  //   var result = items.filter(function filter() {
  //     return getRandomBoolean();
  //   });
  //   return result.join(', ');
  // }

  // randomProductNames = getRandomArray(window.data.PRODUCT_NAMES);
  // randomCardImages = getRandomArray(window.data.CARD_IMAGES);

  // Объект для карточки товара
  // var createObjectCard = function (goodsName, pictureUrl, index) {
  //   return {
  //     name: goodsName,
  //     picture: window.data.SRC + pictureUrl,
  //     amount: getRandomInt(window.data.AMOUNT),
  //     price: getRandomInt(window.data.PRICE),
  //     weight: getRandomInt(window.data.WEIGHT),
  //     rating: {
  //       value: getRandomInt(window.data.RATING.value),
  //       number: getRandomInt(window.data.RATING.number)
  //     },
  //     nutritionFacts: {
  //       sugar: getRandomBoolean(),
  //       energy: getRandomInt(window.data.ENERGY),
  //       contents: getIngredients(window.data.INGREDIENTS),
  //     },
  //     cardIndex: index,
  //   };
  // };// .end Объект для карточки товара

  // функция создания массива карточек товаров
  // var createGoodsCards = function (item) {
  //   for (var i = 0; i < item.length; i++) {
  //     var goodsCard = createObjectCard(randomProductNames[i], randomCardImages[i], i);
  //     goodsCards.push(goodsCard);
  //   }
  //   return goodsCards;
  // };

  // Функция создания DOM-элемента карточки товара
  window.createCatalogCard = function (goodsCard) {
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
    cardElement.querySelector('.card__img').src = window.data.SRC + goodsCard.picture;
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

  var catalogCards = document.querySelector('.catalog__cards');
  catalogCards.classList.remove('catalog__cards--load');

  var catalogLoad = document.querySelector('.catalog__load');
  catalogLoad.classList.add('visually-hidden');

  // createGoodsCards(window.data.PRODUCT_NAMES);
  // catalogCards.appendChild(createAllCards(goodsCards));


  // Переменные для переключение вкладок на доставку
  var deliverToggleBtn = document.querySelectorAll('.deliver .toggle-btn__input');
  var deliverStore = document.querySelector('.deliver__store');
  var deliverCourier = document.querySelector('.deliver__courier');

  // Обработчик события на способ доставки
  deliverToggleBtn.forEach(function (item) {
    item.addEventListener('change', function () {
      deliverStore.classList.toggle('visually-hidden');
      deliverCourier.classList.toggle('visually-hidden');
    });
  });

  // Переменные для переключение вкладок на оплату
  var payToggleBtn = document.querySelectorAll('.payment .toggle-btn__input');
  var payCard = document.querySelector('.payment__card-wrap');
  var payCash = document.querySelector('.payment__cash-wrap');

  // Обработчик события на способ оплаты
  payToggleBtn.forEach(function (item) {
    item.addEventListener('change', function () {
      payCard.classList.toggle('visually-hidden', item.value === 'cash');
      payCash.classList.toggle('visually-hidden', item.value === 'card');
    });
  });


  // Присваеваем ID карточке товару
  var cardsOnCatalog = document.querySelectorAll('.catalog__card');
  var addDataId = function () {
    for (var i = 0; i < cardsOnCatalog.length; i++) {
      cardsOnCatalog[i].setAttribute('data-id', i + 1);
    }
  };
  addDataId();

  // добавляет карточку товара в DocumentFragment и добавляет на сайт
  function appendFragment(arrOfCandies, appendTo, renderFunc) {
    var fragment = document.createDocumentFragment();


    for (var i = 0; i < arrOfCandies.length; i++) {
      fragment.appendChild(renderFunc(arrOfCandies[i]));
    }

    appendTo.appendChild(fragment);
    catalogLoad.classList.add('visually-hidden');
  }

  // загружает массив объектов с сервера
  window.successHandler = function (objects) {
    window.data.goods = objects;
    appendFragment(window.data.goods, catalogCards, window.createCatalogCard);
    window.init();
  };

  window.backend.load(window.successHandler, window.modal.showError);

})();
