'use strict';

(function () {
  var PRODUCT_NAMES = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
  var CARD_IMAGES = ['gum-cedar', 'gum-chile', 'gum-eggplant', 'gum-mustard', 'gum-portwine', 'gum-wasabi', 'ice-cucumber', 'ice-cucumber', 'ice-garlic', 'ice-italian', 'ice-mushroom', 'ice-pig', 'marmalade-beer', 'marmalade-caviar', 'marmalade-corn', 'marmalade-new-year', 'marmalade-sour', 'marshmallow-bacon', 'marshmallow-beer', 'marshmallow-shrimp', 'marshmallow-spicy', 'marshmallow-wine', 'soda-bacon', 'soda-celery', 'soda-cob', 'soda-garlic', 'soda-peanut-grapes', 'soda-russian'];
  var INGREDIENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба', 'идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия, ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
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

  window.data = {
    PRODUCT_NAMES: PRODUCT_NAMES,
    CARD_IMAGES: CARD_IMAGES,
    INGREDIENTS: INGREDIENTS,
    SRC: SRC,
    AMOUNT: AMOUNT,
    PRICE: PRICE,
    WEIGHT: WEIGHT,
    RATING: RATING,
    ENERGY: ENERGY
  };
})();
