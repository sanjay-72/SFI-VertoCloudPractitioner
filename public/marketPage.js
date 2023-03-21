async function fetchData() {
    response = await fetch("MarketProducts.json")
    const data = await response.json();
    return data;
}

function showProducts(products) {
    let productsContainer = document.getElementById("productsContainer");
    let productsHTML = "";
    products.forEach(product => {
        productsHTML += `
            <div class="myProductBox">
            <img src="images/Products/${product.ProductName}.jpg"
                alt="${product.ProductName} Image">
            <h2>${product.ProductName}</h2>
            <h4><span style="font-size:1.4rem; color:blue;">(₹${product.cost}/Kg)<span></h4>
            <p class="breakAll narrow">${product.Description}</p>
            <a target = "__blank" href="contactSeller/${product.Mobile}/${product.ProductId}"><button class="btn btn-outline-success">Contact Seller</button></a>
        </div>
            `
    });
    productsContainer.innerHTML = productsHTML;
}

fetchData().then(data => {
    showProducts(data);
});