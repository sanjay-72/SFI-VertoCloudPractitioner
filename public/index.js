document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === 'visible') {
        document.title = "🍒Fruitful🍊";
    } else {
        document.title = "Increase your yield with Technology.";
    }
});

VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 20,
    speed: 400
});

//0 is unclicked and 1 is clicked
let btnState = 0;
homeBtn = document.getElementById("homeBtn");
iotBtn = document.getElementById("agriIOTBtn");
marketBtn = document.getElementById("marketBtn");
aboutBtn = document.getElementById("aboutBtn");
loginBtn = document.getElementById("loginBtn");
document.getElementById("toggle-button").addEventListener("click", () => {
    homeBtn.classList.toggle("hide");
    iotBtn.classList.toggle("hide");
    marketBtn.classList.toggle("hide");
    aboutBtn.classList.toggle("hide");
    loginBtn.classList.toggle("hide");
    if (btnState == 1) {
        document.getElementById("toggle-button").blur();
        btnState = 0;
    }
    else
        btnState = 1;
});