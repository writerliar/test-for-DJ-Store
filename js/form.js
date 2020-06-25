"use strict";

var main = document.querySelector('.main');
var callbackButton = document.querySelector('#callback');

var RenderPosition = {
    BEFOREEND: 'beforeend',
    AFTEREND: 'afterend',
};

var render = function(container, template, place) {
    container.insertAdjacentHTML(place, template);
};

var remove = function(element) {
    if (!element) {
        return;
    }

    var parent = element.parentElement;

    parent.removeChild(element);
};

var createFormSuccessContentTemplate = function() {
    return '<div class="form__content form__content--success">' +
            '<h2 class="form__title visually-hidden">Успех!</h2>' +
            '<p class="form__success-text">Ваша заявка успешно отправлена.<br>Ожидайте звонка в ближайшее время!</p>' +
            '<button class="form__button form__button--success button button--blue" type="button">Ок</button>' +
        '</div>';
};

var createFormTemplate = function() {
    return '<form action="" class="form" method="post">' +
        '<button class="form__close close">' +
            '<span class="visually-hidden">Закрыть форму</span>' +
        '</button>' +
        '<div class="form__content form__content--normal">' +
            '<h2 class="form__title">Готовы обсудить проект?</h2>' +
            '<p class="form__text">Заполните форму ниже и мы свяжемся с вами.</p>' +
            '<p class="form__input-wrapper">' +
                '<label for="name" class="visually-hidden">Введите ваше имя</label>' +
                '<input type="text" class="form__input form__input--required" id="name" placeholder="Имя*" required>' +
            '</p>' +
            '<p class="form__input-wrapper">' +
                '<label for="phone" class="visually-hidden">Введите ваш номер телефона</label>' +
                '<input type="tel" class="form__input form__input--required" id="phone" placeholder="Телефон*" required>' +
            '</p>' +
            '<div class="form__checkbox-wrapper">' +
                '<input type="checkbox" class="visually-hidden form__checkbox" id="personalCheckbox" checked>' +
                '<label class="form__checkbox-label" for="personalCheckbox">' +
                    '<p class="personal">Я согласен с условиями обработки <a href="#" class="personal__link" target="_blank">персональных данных</a></p>' +
                '</label>' +
            '</div>' +
            '<button class="form__button form__button--submit button button--blue" type="submit">Отправить</button>' +
        '</div>' +
    '</form>';
};

var showForm = function() {
    var form = document.querySelector('.form');

    if (form !== null) {
        return;
    }

    render(main, createFormTemplate(), RenderPosition.AFTEREND);
    setFormCloseButtonClick();
    setSubmitButtonClick();
    setPhoneMask();
    document.addEventListener('keydown', onEscapePress);
    document.addEventListener('click', onNoFormClick);
};

var removeForm = function() {
    var form = document.querySelector('.form');

    if (form === null) {
        return;
    }

    fadeOut(form, 500, remove);
    document.removeEventListener('keydown', onEscapePress);
    document.removeEventListener('click', onNoFormClick);
};

var onEscapePress = function(evt) {
    var isEscapeKey = evt.key === 'Escape' || evt.key === 'Esc';

    if (isEscapeKey) {
        removeForm();
        document.removeEventListener('keydown', onEscapePress);
    }
};

var onNoFormClick = function(evt) {
    var form = document.querySelector('.form');

    if (evt.target === callbackButton || evt.target === form || form.contains(evt.target)) {
        return;
    }

    removeForm();
};

var onFormCloseButtonClick = function(evt) {
    evt.preventDefault();

    removeForm();
};

var setFormSuccessButtonClick = function() {
    var form = document.querySelector('.form');
    var formSuccessContent = form.querySelector('.form__content--success');
    var formSuccessButton = formSuccessContent.querySelector('.form__button--success');

    formSuccessButton.addEventListener('click', onFormCloseButtonClick);
};

var setFormCloseButtonClick = function() {
    var form = document.querySelector('.form');
    var formCloseButton = form.querySelector('.form__close');

    formCloseButton.addEventListener('click', onFormCloseButtonClick);
};

var replaceNormalOnSuccess = function() {
    var form = document.querySelector('.form');
    var formContent = form.querySelector('.form__content--normal');

    remove(formContent);
    render(form, createFormSuccessContentTemplate(), RenderPosition.BEFOREEND);

    setFormSuccessButtonClick();
};

var setSubmitButtonClick = function() {
    var form = document.querySelector('.form');

    form.addEventListener('submit', function(evt) {
        evt.preventDefault();

        var data = new FormData(form);

        send(data, replaceNormalOnSuccess, function() {
            throw new Error('Can`t send this form');
        });
    });
};

var setPhoneMask = function() {
    var phoneInput = document.querySelector('#phone');

    new IMask(phoneInput, {
        mask: '+{7}(000)000-00-00',
    });
};

callbackButton.addEventListener('click', function(evt) {
    evt.preventDefault();

    showForm();
});
