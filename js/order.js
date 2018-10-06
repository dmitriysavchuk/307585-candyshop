'use strict';

(function () {
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
  var checkCardNumber = function (cardNumber) {
    var cardNumberDigits = cardNumber.split('');
    var sum = cardNumberDigits.reduce(function (tmpSum, char, index) {
      var digit = parseInt(char, 10);
      if (index % 2 === 0) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      return tmpSum + digit;
    }, 0);
    return sum % 10 === 0;
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
    } else if (!checkCardNumber(cardNumberInput.value)) {
      cardNumberInput.style.borderColor = 'red';
      cardNumberInput.setCustomValidity('Неверный номер карты');
      cardErrorMessage.classList.remove('visually-hidden');
    } else {
      cardNumberInput.style.borderColor = 'green';
      cardNumberInput.setCustomValidity('');
      cardSuccessMessage.textContent = 'Одобрен';
      cardErrorMessage.classList.add('visually-hidden');
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
})();
