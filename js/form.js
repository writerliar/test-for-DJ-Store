const main = document.querySelector(`.main`);
const callbackButton = document.querySelector(`#callback`);

const RenderPosition = {
    BEFOREEND: `beforeend`,
    AFTEREND: `afterend`,
};

const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
};

const remove = (element) => {
    if (!element) {
        return;
    }

    element.remove();
};

const createFormSuccessContentTemplate = () => {
    return `<div class="form__content form__content--success">
            <h2 class="form__title visually-hidden">Успех!</h2>
            <p class="form__success-text">Ваша заявка успешно отправлена.<br> Ожидайте звонка в ближайшее время!</p>
            <button class="form__button form__button--success button button--blue" type="button">Ок</button>
        </div>`;
};

const createFormTemplate = () => {
    return `<form action="" class="form" method="post">
        <button class="form__close close">
            <span class="visually-hidden">Закрыть форму</span>
        </button>
        <div class="form__content form__content--normal">
            <h2 class="form__title">Готовы обсудить проект?</h2>
            <p class="form__text">Заполните форму ниже и мы свяжемся с вами.</p>
            <p class="form__input-wrapper">
                <label for="name" class="visually-hidden">Введите ваше имя</label>
                <input type="text" class="form__input form__input--required" id="name" placeholder="Имя*" required>
            </p>
            <p class="form__input-wrapper">
                <label for="phone" class="visually-hidden">Введите ваш номер телефона</label>
                <input type="tel" class="form__input form__input--required" id="phone" placeholder="Телефон*" required>
            </p>
            <div class="form__checkbox-wrapper">
                <input type="checkbox" class="visually-hidden form__checkbox" id="personalCheckbox" checked>
                <label class="form__checkbox-label" for="personalCheckbox">
                    <p class="personal">Я согласен с условиями обработки <a href="#" class="personal__link" target="_blank">персональных данных</a></p>
                </label>
            </div>
            <button class="form__button form__button--submit button button--blue" type="submit">Отправить</button>
        </div>
    </form>`;
};

const showForm = () => {
    const form = document.querySelector(`.form`);

    if (form !== null) {
        return;
    }

    render(main, createFormTemplate(), RenderPosition.AFTEREND);
    setFormCloseButtonClick();
    setSubmitButtonClick();
    setPhoneMask();
    document.addEventListener(`keydown`, onEscapePress);
    document.addEventListener(`click`, onNoFormClick);
};

const removeForm = () => {
    const form = document.querySelector(`.form`);

    if (form === null) {
        return;
    }

    fadeOut(form, 500, remove);
    document.removeEventListener(`keydown`, onEscapePress);
    document.removeEventListener(`click`, onNoFormClick);
};

const onEscapePress = (evt) => {
    const isEscapeKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscapeKey) {
        removeForm();
        document.removeEventListener(`keydown`, onEscapePress);
    }
};

const onNoFormClick = (evt) => {
    const form = document.querySelector(`.form`);

    if (evt.target === callbackButton || evt.target === form || form.contains(evt.target)) {
        return;
    }

    removeForm();
};

const onFormCloseButtonClick = (evt) => {
    evt.preventDefault();

    removeForm();
};

const setFormSuccessButtonClick = () => {
    const form = document.querySelector(`.form`);
    const formSuccessContent = form.querySelector(`.form__content--success`);
    const formSuccessButton = formSuccessContent.querySelector(`.form__button--success`);

    formSuccessButton.addEventListener(`click`, onFormCloseButtonClick);
};

const setFormCloseButtonClick = () => {
    const form = document.querySelector(`.form`);
    const formCloseButton = form.querySelector(`.form__close`);

    formCloseButton.addEventListener(`click`, onFormCloseButtonClick);
};

const replaceNormalOnSuccess = () => {
    const form = document.querySelector(`.form`);
    const formContent = form.querySelector(`.form__content--normal`);

    remove(formContent);
    render(form, createFormSuccessContentTemplate(), RenderPosition.BEFOREEND);

    setFormSuccessButtonClick();
};

const setSubmitButtonClick = () => {
    const form = document.querySelector(`.form`);

    form.addEventListener(`submit`, (evt) => {
        evt.preventDefault();

        const data = new FormData(form);

        send(data, replaceNormalOnSuccess, () => {
            throw new Error(`Can't send this form`);
        });
    });
};

const setPhoneMask = () => {
    const phoneInput = document.querySelector(`#phone`);

    new IMask(phoneInput, {
        mask: '+{7}(000)000-00-00',
    });
};

callbackButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    showForm();
});
