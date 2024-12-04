const api = "http://localhost:8080/api/product";

async function fetchProducts() {
    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        displayProducts(products); // Kalder displayProducts her
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Rydder eksisterende indhold

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = "col-md-4"; // Bootstrap kolonne
        productCard.innerHTML = `
            <div class="card">
                <img src="${product.imageURL}" alt="${product.name}" class="card-img-top" />
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                </div>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

document.addEventListener('DOMContentLoaded', async function() {
    await fetchProducts();
});
