const mainNavWrapper = document.querySelector(`.menu-wrapper`);
const navToggle = document.querySelector(`.navigation__button`);

mainNavWrapper.classList.remove(`menu-wrapper--nojs`);

navToggle.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    if (mainNavWrapper.classList.contains(`menu-wrapper--closed`)) {
        mainNavWrapper.classList.remove(`menu-wrapper--closed`);
        mainNavWrapper.classList.add(`menu-wrapper--opened`);
    } else {
        mainNavWrapper.classList.add(`menu-wrapper--closed`);
        mainNavWrapper.classList.remove(`menu-wrapper--opened`);
    }
});