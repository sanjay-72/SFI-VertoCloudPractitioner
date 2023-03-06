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
            <img src="https://images.unsplash.com/photo-1584673961397-be26e009333f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z3JlZW4lMjBmaWVsZHxlbnwwfHwwfHw%3D&w=1000&q=80"
                alt="...">
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