'use strict';

var GOODS_AMOUNT = 26;
var ORDER_AMOUNT = 3;
var AMOUNT_NUMBER = 5;
var SRC = 'img/cards/';

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

var PRODUCT_NAME = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var CARD_IMG = ['gum-cedar', 'gum-chile', 'gum-eggplant', 'gum-mustard', 'gum-portwine', 'gum-wasabi', 'ice-cucumber', 'ice-cucumber', 'ice-garlic', 'ice-italian', 'ice-mushroom', 'ice-pig', 'marmalade-beer', 'marmalade-caviar', 'marmalade-corn', 'marmalade-new-year', 'marmalade-sour', 'marshmallow-bacon', 'marshmallow-beer', 'marshmallow-shrimp', 'marshmallow-spicy', 'marshmallow-wine', 'soda-bacon', 'soda-celery', 'soda-cob', 'soda-garlic', 'soda-peanut-grapes', 'soda-russian'];
var INGREDIENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба', 'идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия, ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];

// Функция создания случайного числа в диапозоне (min <= max)
function getRandomInt(object) {
  return Math.floor(Math.random() * (object.max - object.min + 1)) + object.min;
}

// Функция случайного значения массива
var getRandomNumber = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Функция возвращающая true or false
function getRandomBoolean() {
  return Math.random() >= 0.5;
}

// Функция получения индекса случайного элемента массива
function getIngredients(targetArray) {
  var result = targetArray.filter(function filter() {
    return getRandomBoolean();
  });
  return result.join(', ');
}

var cardsData = PRODUCT_NAME.slice(0, GOODS_AMOUNT).map(function () {
  return {
    name: getRandomNumber(PRODUCT_NAME),
    picture: SRC + getRandomNumber(CARD_IMG) + '.jpg',
    amount: getRandomInt(AMOUNT),
    price: getRandomInt(PRICE),
    weight: getRandomInt(WEIGHT),
    rating: {value: getRandomInt(RATING.value), number: getRandomInt(RATING.number)},
    nutritionFacts: {sugar: getRandomBoolean(), energy: getRandomInt(ENERGY), contents: getIngredients(INGREDIENTS)},
  };
});

document.querySelector('.catalog__cards').classList.remove('catalog__cards--load');
document.querySelector('.catalog__cards .catalog__load').classList.add('visually-hidden');

var cardClass = function (amount) {
  if (amount > AMOUNT_NUMBER) {
    return 'card--in-stock';
  } else if (amount >= 1 && amount <= AMOUNT_NUMBER) {
    return 'card--little';
  } else if (amount === 0) {
    return 'card--soon';
  }
  return '';
};

var cardRating = function (val) {
  switch (val) {
    case 5: {
      return 'stars__rating--five';
    }
    case 4: {
      return 'stars__rating--four';
    }
    case 3: {
      return 'stars__rating--three';
    }
    case 2: {
      return 'stars__rating--two';
    }
    case 1: {
      return 'stars__rating--one';
    }
    default: {
      return '';
    }
  }
};

var cardSugarContent = function (sugar) {
  return sugar ? 'Содержит сахар.' : 'Без сахара.';
};

var getElementCopy = function (template, element) {
  return document.importNode(document.querySelector(template).content.querySelector(element), true);
};
var cardsListTemplate = document.createDocumentFragment();

var fillCard = function (cardData, i) {

  var card = getElementCopy('#card', '.catalog__card');

  card.classList.remove('card--in-stock');
  card.classList.add(cardClass(cardData.amount));
  card.id = 'card_' + ++i;

  card.querySelector('.card__title').textContent = cardData.name;

  var picture = card.querySelector('.card__img');
  picture.src = cardData.picture;
  picture.alt = cardData.name;

  var price = card.querySelector('.card__price');
  price.childNodes[0].textContent = cardData.price + ' ';
  price.childNodes[2].textContent = '/ ' + cardData.weight + 'Г';

  var rating = card.querySelector('.stars__rating');
  rating.classList.remove('stars__rating--five');
  rating.classList.add(cardRating(cardData.rating.value));
  rating.textContent = 'Рейтинг: ' + cardData.rating.value + ' звёзд';

  card.querySelector('.star__count').textContent = '(' + cardData.rating.number + ')';

  card.querySelector('.card__characteristic').textContent = cardSugarContent(cardData.nutritionFacts.sugar) + cardData.nutritionFacts.energy + ' Ккал';

  card.querySelector('.card__composition-list').textContent = cardData.nutritionFacts.contents;

  cardsListTemplate.appendChild(card);
};

cardsData.forEach(fillCard);
document.querySelector('.catalog__cards').appendChild(cardsListTemplate);

var randomCartItems = function (items) {
  var result = [];
  for (var i = 0; i < ORDER_AMOUNT; i++) {
    result.push(items[Math.floor(Math.random() * items.length)]);
  }
  return result;
};

var cardsOrderTemplate = document.createDocumentFragment();

var fillOrderCard = function (cardData) {

  var cardOrder = getElementCopy('#card-order', '.card-order');

  cardOrder.querySelector('.card-order__title').textContent = cardData.name;

  var picture = cardOrder.querySelector('.card-order__img');
  picture.src = cardData.picture;
  picture.alt = cardData.name;

  var price = cardOrder.querySelector('.card-order__price');
  price.textContent = cardData.price + ' ₽';

  cardsOrderTemplate.appendChild(cardOrder);
};

randomCartItems(cardsData).forEach(fillOrderCard);

var cardsInCartNode = document.querySelector('.goods__cards');

cardsInCartNode.appendChild(cardsOrderTemplate);
cardsInCartNode.classList.remove('goods__cards--empty');

var emptyCart = document.querySelector('.goods__card-empty');
emptyCart.classList.add('visually-hidden');
