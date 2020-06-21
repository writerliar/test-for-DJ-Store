const fadeOut = (element, ms, hideFunction) => {
    let opacity = 1;

    const timer = setInterval(() => {
        if (opacity <= 0.1) {
            clearInterval(timer);
            hideFunction(element);
            opacity = 1;
        }

        element.style.opacity = opacity;
        opacity -= 0.1;
    }, ms/10);
};
