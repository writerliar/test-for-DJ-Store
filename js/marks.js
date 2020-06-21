const demo = document.querySelector(`.demo`);
const demoButtonActive = demo.querySelector(`.demo__button--active`);
const demoDetails = demo.querySelector(`.demo__detail`);
const demoCloseButton = demoDetails.querySelector(`.demo__close`);

const DEMO_SHOW_CLASS = `demo__detail--show`;

const FADE_IN_CLASS = `fade-in`;

const showDemoDetails = () => {
    demoDetails.classList.add(FADE_IN_CLASS);
    demoDetails.classList.add(DEMO_SHOW_CLASS);

    document.addEventListener(`click`, onNoDetailsClick);
};

const hideDemoDetails = () => {
    if (demoDetails.classList.contains(DEMO_SHOW_CLASS)) {
        demoDetails.classList.remove(DEMO_SHOW_CLASS);
    }

    document.removeEventListener(`click`, onNoDetailsClick);
};

const onDemoCloseButtonClick = () => {
    fadeOut(demoDetails, 500, hideDemoDetails);
};

demoButtonActive.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    showDemoDetails();
});

demoCloseButton.addEventListener(`click`, onDemoCloseButtonClick);

const onNoDetailsClick = (evt) => {
    if (evt.target === demoButtonActive || evt.target === demoDetails || demoDetails.contains(evt.target)) {
        return;
    }

    onDemoCloseButtonClick();
};
