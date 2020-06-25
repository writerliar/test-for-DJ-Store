'use strict';

var demo = document.querySelector('.demo');
var demoButtonActive = demo.querySelector('.demo__button--active');
var demoDetails = demo.querySelector('.demo__detail');
var demoCloseButton = demoDetails.querySelector('.demo__close');

var DEMO_SHOW_CLASS = 'demo__detail--show';

var FADE_IN_CLASS = 'fade-in';

function onNoDetailsClick(evt) {
    if (evt.target === demoButtonActive || evt.target === demoDetails || demoDetails.contains(evt.target)) {
        return;
    }

    onDemoCloseButtonClick();
}

function showDemoDetails() {
    demoDetails.classList.add(FADE_IN_CLASS);
    demoDetails.classList.add(DEMO_SHOW_CLASS);

    document.addEventListener('click', onNoDetailsClick);
}

function hideDemoDetails() {
    if (demoDetails.classList.contains(DEMO_SHOW_CLASS)) {
        demoDetails.classList.remove(DEMO_SHOW_CLASS);
    }

    document.removeEventListener('click', onNoDetailsClick);
}

function onDemoCloseButtonClick() {
    fadeOut(demoDetails, 500, hideDemoDetails);
}

demoButtonActive.addEventListener('click', function(evt) {
    evt.preventDefault();

    showDemoDetails();
});

demoCloseButton.addEventListener('click', onDemoCloseButtonClick);
