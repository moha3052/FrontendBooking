const api = "http://localhost:8080/api/orderlines"; // API Endpoint

// Henter produkter fra API
async function fetchProducts() {
    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        displayProducts(products);
        console.log(products);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Viser produkter på siden
function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {
        if (!product.id || !product.name || !product.imageURL || !product.category) {
            console.error("Ugyldigt produkt fundet:", product);
            return;
        }

        const productCard = document.createElement('div');
        productCard.className = "col-md-4";
        productCard.innerHTML = `
            <div class="card product-card">
                <img src="${product.imageURL}" alt="${product.name}" class="product-image" />
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description || "Ingen beskrivelse"}</p>
                    <p><strong>Kategori:</strong> ${product.category}</p>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">Tilføj til kurv</button>
                </div>
            </div>
        `;

        productList.appendChild(productCard);
    });

    // Tilføjer event listeners til "Tilføj til kurv" knapper
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            const product = products.find(p => p.id == productId);
            addToCart(product);
        });
    });
}

// Tilføjer produkt til kurv
function addToCart(product) {
    if (!product || !product.id || !product.name) {
        console.error("Produktdata er ugyldig:", product);
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Tjek for eksisterende produkt
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Opdaterer kurvtælleren
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
}

// Viser kurvens indhold
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p class='empty-cart'>Din kurv er tom.</p>";
        return;
    }

    cart.forEach(product => {
        if (!product.id || !product.name || !product.imageURL) {
            console.error("Ugyldigt produkt fundet:", product);
            return;
        }

        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <div class="row align-items-center">
                <div class="col-md-4">
                    <img src="${product.imageURL}" alt="${product.name}" class="product-image">
                </div>
                <div class="col-md-6">
                    <h5 class="card-title">${product.name}</h5>
                    <p>${product.description || "Ingen beskrivelse tilgængelig"}</p>
                    <p><strong>Kategori:</strong> ${product.category}</p>
                    <p><strong>Antal:</strong> ${product.quantity}</p>
                </div>
                <div class="col-md-2 text-end">
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${product.id})">Fjern</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(productCard);
    });
}

// Fjerner produkt fra kurv
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// Initialiser kurv
document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    displayCartItems();
    updateCartCount();
});
