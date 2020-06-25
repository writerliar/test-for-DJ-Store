'use strict';

var getActionUrl = function() {
    var form = document.querySelector('.form');

    if (form === null) {
        return;
    }

    return form.action;
};

var getMethodForm = function() {
    var form = document.querySelector('.form');

    return form === null ? null : form.method;
};

var Status = {
    OK: 200,
};

var TIMEOUT = 10000;

var createRequest = function(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function() {
        if (xhr.status === Status.OK) {
            onSuccess(xhr.response);
        } else {
            onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
    });

    xhr.addEventListener('error', function() {
        onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function() {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
};

var send = function(data, onSuccess, onError) {
    var request = createRequest(onSuccess, onError);

    request.open(getMethodForm(), getActionUrl());
    request.send(data);
};
