async function fetchData() {
    response = await fetch("MarketProducts.json")
    const data = await response.json();
    return data;
}

function showProducts(products) {
    let productsContainer = document.getElementById("productsContainer");
    let skillHTML = "";
    products.forEach(product => {
        skillHTML += `
            <div class="myProductBox">
            <img src="images/${product.ProductName}.jpg"
                alt="${product.ProductName} Image">
            <h2>${product.ProductName}</h2>
            <p class="breakAll narrow">${product.Description}</p>
            <a href="#"><button class="btn btn-outline-success">Contact Seller</button></a>
        </div>
            `
    });
    productsContainer.innerHTML = skillHTML;
}

fetchData().then(data => {
    showProducts(data);
});