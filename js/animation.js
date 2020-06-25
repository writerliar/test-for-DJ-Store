'use strict';

function fadeOut(element, ms, hideFunction) {
    var opacity = 1;

    var timer = setInterval(function() {
        if (opacity <= 0.1) {
            clearInterval(timer);
            hideFunction(element);
            opacity = 1;
        }

        element.style.opacity = opacity;
        opacity -= 0.1;
    }, ms/10);
}
