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
