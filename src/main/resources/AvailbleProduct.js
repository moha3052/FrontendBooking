const api = "http://localhost:8080/api/product/all/2";
let cartCount = 0; // Variabel til at holde styr på antal varer i kurven

// Henter produkter fra API'et
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

// Viser produkter på siden
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
                    <button class="btn btn-primary add-to-cart" data-service-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        productList.appendChild(productCard);
    });

    // Tilføjer event listeners til "Add to Cart" knapperne
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service-id');
            addToCart(serviceId);
        });
    });
}

// Funktion til at håndtere tilføjelse til kurv
function addToCart(serviceId) {
    cartCount++; // Øger antallet af varer i kurven
    updateCartCount(); // Opdaterer visningen af antallet i kurven
    console.log(`Service with ID ${serviceId} has been added to the cart. Total items in cart: ${cartCount}`);
}

// Funktion til at opdatere kurv tælleren
function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    cartCountElement.textContent = cartCount; // Opdaterer teksten med antallet af varer
}

// Når DOM'en er indlæst, henter vi produkter
document.addEventListener('DOMContentLoaded', async function() {
    await fetchProducts();
});
