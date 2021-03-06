'use strict';

(function () {
  // Перменные для случайно перемешанных массивов
  var randomProductNames = [];
  var randomCardImages = [];

  // Массив классов соответствующих value рейтинга
  var starsRatingClass = ['stars__rating--one', 'stars__rating--two', 'stars__rating--three', 'stars__rating--four', 'stars__rating--five'];

  // Массив объектов карточек товаров
  var goodsCards = [];

  // Массив товаров в корзине
  var cart = [];

  // Шаблон карточки товара
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

  randomProductNames = getRandomArray(window.data.PRODUCT_NAMES);
  randomCardImages = getRandomArray(window.data.CARD_IMAGES);

  // Объект для карточки товара
  var createObjectCard = function (goodsName, pictureUrl, index) {
    return {
      name: goodsName,
      picture: window.data.SRC + pictureUrl + '.jpg',
      amount: getRandomInt(window.data.AMOUNT),
      price: getRandomInt(window.data.PRICE),
      weight: getRandomInt(window.data.WEIGHT),
      rating: {
        value: getRandomInt(window.data.RATING.value),
        number: getRandomInt(window.data.RATING.number)
      },
      nutritionFacts: {
        sugar: getRandomBoolean(),
        energy: getRandomInt(window.data.ENERGY),
        contents: getIngredients(window.data.INGREDIENTS),
      },
      cardIndex: index,
    };
  };// .end Объект для карточки товара

  // функция создания массива карточек товаров
  var createGoodsCards = function (item) {
    for (var i = 0; i < item.length; i++) {
      var goodsCard = createObjectCard(randomProductNames[i], randomCardImages[i], i);
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

  // Клонируем карточки, заполняем данными
  var createAllCards = function (items) {
    var fragment = document.createDocumentFragment();
    items.forEach(function (array) {
      fragment.appendChild(createCatalogCard(array));
    });
    return fragment;
  };

  var catalogCards = document.querySelector('.catalog__cards');
  catalogCards.classList.remove('catalog__cards--load');

  var catalogLoad = document.querySelector('.catalog__load');
  catalogLoad.classList.add('visually-hidden');

  createGoodsCards(window.data.PRODUCT_NAMES);
  catalogCards.appendChild(createAllCards(goodsCards));


  // Находим шаблон для товаров в корзине
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

  // Функция удаления из корзины
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

  // Проверка наличия товара в корзине
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

  // Добавление нового товара в корзину
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

  // Обработчик события на кнопку "добавить в корзину"
  for (var i = 0; i < btnAddToCart.length; i++) {
    btnAddToCart[i].addEventListener('click', checkIsInStock);
  }

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

  // Кнопка Состав товара
  var cardBtnComposition = document.querySelectorAll('.card__btn-composition');
  cardBtnComposition.forEach(function (item) {
    item.addEventListener('click', function () {
      item.parentElement.nextElementSibling.classList.toggle('card__composition--hidden');
    });
  });
})();
