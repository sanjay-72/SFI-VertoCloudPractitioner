// Changes title based on visibility state of the user
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === 'visible') {
        document.title = "🍒Fruitful🍊";
    } else {
        document.title = "Quality Products at cheap costs.";
    }
});

// Adds sticky navbar feature
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

// For animations purpose
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    })
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

// It makes the checkbox checked if the user clicks on anywhere of the div
$('.markerDiv').on('click', function () {
    var checkbox = $(this).children('input[type="checkbox"]');
    checkbox.prop('checked', !checkbox.prop('checked'));
});

// For restricting user to check atleast one checkbox before clicking delete
$(document).ready(function () {
    $('#checkBtn').click(function () {
        checked = $("input[type=checkbox]:checked").length;
        if (!checked) {
            alert("You must select atleast one product to remove from market.");
            return false;
        }
    });
});