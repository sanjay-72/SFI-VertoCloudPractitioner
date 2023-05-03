document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === 'visible') {
        document.title = "🍒Fruitful🍊";
    } else {
        document.title = "Increase your yield with Technology.";
    }
});

const navbar = document.querySelector('#NavBar');
let top1 = navbar.offsetTop;
function stickynavbar() {
    if (window.scrollY >= top1) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
}
window.addEventListener('scroll', stickynavbar);

VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 20,
    speed: 400
});

