function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Rydder eksisterende indhold

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = "col-md-4"; // Bootstrap kolonne
        productCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <img src="${product.imageURL}" alt="${product.name}" />
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-title">${product.category}</p>
                    <button class="btn btn-primary add-to-cart" data-service-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        productList.appendChild(productCard);
    });
}
