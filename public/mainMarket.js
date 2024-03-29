document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === 'visible') {
        document.title = "🍒Fruitful🍊";
    } else {
        document.title = "Quality Products at cheap costs.";
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

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    })
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

function updatePrice(priceID, quantID, cost) {
    let a = parseInt(cost, 10);
    let b = parseInt(document.getElementById(quantID).value, 10);
    // console.log(a * b)
    document.getElementById(priceID).innerText = `₹${a * b}/-`;
}