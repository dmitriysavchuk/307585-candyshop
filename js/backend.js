'use strict';
(function () {
  var URL_LOAD = 'https://js.dump.academy/candyshop/data';
  var URL_SAVE = 'https://js.dump.academy/candyshop';
  var OK_STATUS = 200;
  var TIMEOUT = 10000;
  window.backend = {
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === OK_STATUS) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.open('POST', URL_SAVE);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === OK_STATUS) {
          var itemsWithIndex = xhr.response.map(function (item, index) {
            item.cardIndex = index;
            return item;
          });
          onLoad(itemsWithIndex);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = TIMEOUT;
      xhr.open('GET', URL_LOAD);
      xhr.send();
    }
  };
})();
