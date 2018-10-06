'use strict';

(function () {
  var SLIDER_BTN_WIDTH = 10;
  var SLIDER_WIDTH = 245;

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

  leftSlider.addEventListener('mousedown', onLeftSliderMouseDown);
  rightSlider.addEventListener('mousedown', onRightSliderMouseDown);

})();

