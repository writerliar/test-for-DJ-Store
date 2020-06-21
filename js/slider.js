const slider = document.querySelector(`.slider`);

const sliderRightList = slider.querySelector(`.slider__list`);

const sliderToggleLeft = slider.querySelector(`.slider__toggle--left`);
const sliderToggleRight = slider.querySelector(`.slider__toggle--right`);

const RIGHT_SLIDE_ACTIVE_CLASS = `slider__list-item--active`;
const SLIDE_CONTENT_ACTIVE_CLASS = `slider__content--active`;

const SlidesContentId = {
    slide1: `slideContent1`,
    slide2: `slideContent2`,
    slide3: `slideContent3`,
};

const SlidesBackground = {
    slide1: `url("img/slider-background.jpg")`,
    slide2: `url("img/demo-right-desktop.jpg")`,
    slide3: `url("img/demo-left-desktop.jpg")`,
};

const clearActiveClass = (items, activeClass) => {
    items.forEach((item) => {
        if (item.classList.contains(activeClass)) {
            item.classList.remove(activeClass);
        }
    });
};

const setActiveClassForContent = (id) => {
    const neededItem = document.getElementById(id);

    neededItem.classList.add(SLIDE_CONTENT_ACTIVE_CLASS);
};

const setActiveBackground = (background) => {
    slider.style.backgroundImage = background;
};

const setActiveSlide = () => {
    const sliderActiveItem = slider.querySelector(`.slider__list-item--active`);
    const sliderContentItems = slider.querySelectorAll(`.slider__content`);

    clearActiveClass(sliderContentItems, SLIDE_CONTENT_ACTIVE_CLASS);

    setActiveClassForContent(SlidesContentId[sliderActiveItem.id]);
    setActiveBackground(SlidesBackground[sliderActiveItem.id]);
};

const moveSlideRight = (evt) => {
    evt.preventDefault();

    const firstChild = sliderRightList.children[0];
    const sliderRightItems = slider.querySelectorAll(`.slider__list-item`);

    clearActiveClass(sliderRightItems, RIGHT_SLIDE_ACTIVE_CLASS);

    const cloneItem = firstChild.cloneNode(true);

    sliderRightList.appendChild(cloneItem);
    remove(firstChild);

    sliderRightList.children[0].classList.add(RIGHT_SLIDE_ACTIVE_CLASS);

    setActiveSlide();
};

const moveSlideLeft = (evt) => {
    evt.preventDefault();

    const slidesAmount = sliderRightList.children.length - 1;

    const lastChild = sliderRightList.children[slidesAmount];
    const sliderRightItems = slider.querySelectorAll(`.slider__list-item`);

    clearActiveClass(sliderRightItems, RIGHT_SLIDE_ACTIVE_CLASS);

    const cloneItem = lastChild.cloneNode(true);

    sliderRightList.prepend(cloneItem);
    remove(lastChild);

    sliderRightList.children[0].classList.add(RIGHT_SLIDE_ACTIVE_CLASS);

    setActiveSlide();
};

sliderToggleRight.addEventListener(`click`, moveSlideRight);
sliderToggleLeft.addEventListener(`click`, moveSlideLeft);
