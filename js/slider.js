"use strict";

var slider = document.querySelector('.slider');

var sliderRightList = slider.querySelector('.slider__list');

var sliderToggleLeft = slider.querySelector('.slider__toggle--left');
var sliderToggleRight = slider.querySelector('.slider__toggle--right');

var DESKTOP_WIDTH = 1140;

var RIGHT_SLIDE_ACTIVE_CLASS = 'slider__list-item--active';
var SLIDE_CONTENT_ACTIVE_CLASS = 'slider__content--active';

var SlidesContentId = {
    slide1: 'slideContent1',
    slide2: 'slideContent2',
    slide3: 'slideContent3',
};

var SlidesBackground = {
    slide1: 'url("img/slider-background.jpg")',
    slide2: 'url("img/demo-right-desktop.jpg")',
    slide3: 'url("img/demo-left-desktop.jpg")',
};

var clearActiveClass = function(items, activeClass) {
    for (var k = 0; k < items.length; k ++) {
        if (items[k].classList.contains(activeClass)) {
            items[k].classList.remove(activeClass);
        }
    }
};

var setActiveClassForContent = function(id) {
    var neededItem = document.getElementById(id);

    neededItem.classList.add(SLIDE_CONTENT_ACTIVE_CLASS);
};

var setActiveBackground = function(background) {
    slider.style.backgroundImage = background;
};

var setActiveSlide = function() {
    var sliderActiveItem = slider.querySelector('.slider__list-item--active');
    var sliderContentItems = slider.querySelectorAll('.slider__content');

    clearActiveClass(sliderContentItems, SLIDE_CONTENT_ACTIVE_CLASS);

    setActiveClassForContent(SlidesContentId[sliderActiveItem.id]);
    setActiveBackground(SlidesBackground[sliderActiveItem.id]);
};

var initSwipeSliderForMobile = function() {
    var CONTENT_SLIDE_SLICE = 'Content';
    var SWIPE_SLIDER_CLASS = 'swipe';
    var SWIPE_WRAP_CLASS = 'swipe-wrap';

    var sliderForMobile = document.querySelector('.slider__left');
    var sliderForMobileContent = document.querySelector('.slider__left-wrapper');

    var sliderContents = document.querySelectorAll('.slider__content');

    for (var i = 0; i < sliderContents.length; i++) {
        sliderContents[i].style.display = 'block';
    }

    sliderForMobile.classList.add(SWIPE_SLIDER_CLASS);
    sliderForMobileContent.classList.add(SWIPE_WRAP_CLASS);

    window.mySwipe = new Swipe(sliderForMobile, {
        startSlide: 0,
        draggable: false,
        autoRestart: false,
        continuous: true,
        disableScroll: true,
        stopPropagation: true,
        callback: function(index, element) {
            var idByActiveSlide = element.id;
            var pureIdByActiveSlide = idByActiveSlide.replace(CONTENT_SLIDE_SLICE, '');

            setActiveBackground(SlidesBackground[pureIdByActiveSlide]);
        },
    });
};

var moveSlideRight = function(evt) {
    evt.preventDefault();

    var firstChild = sliderRightList.children[0];
    var sliderRightItems = slider.querySelectorAll('.slider__list-item');

    clearActiveClass(sliderRightItems, RIGHT_SLIDE_ACTIVE_CLASS);

    var cloneItem = firstChild.cloneNode(true);

    sliderRightList.appendChild(cloneItem);
    remove(firstChild);

    sliderRightList.children[0].classList.add(RIGHT_SLIDE_ACTIVE_CLASS);

    setActiveSlide();
};

var moveSlideLeft = function(evt) {
    evt.preventDefault();

    var slidesAmount = sliderRightList.children.length - 1;

    var lastChild = sliderRightList.children[slidesAmount];
    var sliderRightItems = slider.querySelectorAll('.slider__list-item');

    clearActiveClass(sliderRightItems, RIGHT_SLIDE_ACTIVE_CLASS);

    var cloneItem = lastChild.cloneNode(true);

    sliderRightList.prepend(cloneItem);
    remove(lastChild);

    sliderRightList.children[0].classList.add(RIGHT_SLIDE_ACTIVE_CLASS);

    setActiveSlide();
};

if (window.innerWidth < DESKTOP_WIDTH) {
    initSwipeSliderForMobile();
}

sliderToggleRight.addEventListener('click', moveSlideRight);
sliderToggleLeft.addEventListener('click', moveSlideLeft);
