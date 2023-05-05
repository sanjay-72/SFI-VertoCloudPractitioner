const swiftUpElements = document.querySelectorAll('.swift-up-text');
let finalDelay = 0;
swiftUpElements.forEach(elem => {
    console.log(elem.textContent);
    const words = elem.textContent.split(' ');
    elem.innerHTML = '';

    words.forEach((el, index) => {
        words[index] = `<span><i>${words[index]}</i></span>`;
    });

    elem.innerHTML = words.join(' ');

    const children = document.querySelectorAll('span > i');
    children.forEach((node, index) => {
        node.style.animationDelay = `${index * .1}s`;
        finalDelay += index * .1;
    });
});
setTimeout(function () {
    window.location.href = "/market";
}, finalDelay*1000 + 1500);
