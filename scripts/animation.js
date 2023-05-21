var hiddenDivs = document.getElementsByClassName('hidden-div');
Array.from(hiddenDivs).forEach(function (div) {
    div.addEventListener('mouseover', function () {
        setTimeout(function () {
            div.classList.remove('delay-200');
            console.log(1);
        }, 500);
    });
    div.addEventListener('mouseleave', function () {
        div.classList.remove('delay-500');
        console.log(2);
    });
});
//# sourceMappingURL=animation.js.map