'use strict';

(function () {

  window.init = function () {
    // // Массив товаров в корзине
    var cart = window.data.goods;

    console.log(cart);

    var goodsCards = window.data.goods;

    // Корзина. Элемент в который будут попадать карточки товаров
    var cardsInCartNode = document.querySelector('.goods__cards');

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


    // Кнопка Состав товара
    var cardBtnComposition = document.querySelectorAll('.card__btn-composition');
    cardBtnComposition.forEach(function (item) {
      item.addEventListener('click', function () {
        item.parentElement.nextElementSibling.classList.toggle('card__composition--hidden');
      });
    });
  };

})();
