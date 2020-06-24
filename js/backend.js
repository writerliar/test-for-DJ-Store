const getActionUrl = () => {
    const form = document.querySelector(`.form`);

    if (form === null) {
        return;
    }

    return form.action;
};

const getMethodForm = () => {
    const form = document.querySelector(`.form`);

    return form === null ? null : form.method;
};

const Status = {
    OK: 200,
};

const TIMEOUT = 10000;

const createRequest = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseText = `json`;

    xhr.addEventListener('load', function () {
        if (xhr.status === Status.OK) {
            onSuccess(xhr.response);
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

    return xhr;
};

const send = function (data, onSuccess, onError) {
    const request = createRequest(onSuccess, onError);

    request.open(getMethodForm(), getActionUrl());
    request.send(data);
};
