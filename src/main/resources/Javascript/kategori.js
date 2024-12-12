const api = "http://localhost:8080/api/product/Category"; // URL til API'et
const orderlinesApi = "http://localhost:8080/api/orderlines"; // URL til ordrelinjer API'et
let cartCount = 0;

// Henter kategori fra URL'en
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param); // Forventer ?category=noget
}

// Opdaterer sideindholdet baseret på kategori
async function updateCategoryPage() {
    const category = getQueryParam('category');
    const productList = document.getElementById("product-list");
    const categoryTitle = document.getElementById("category-title");

    if (!category) {
        categoryTitle.textContent = "Ingen kategori valgt";
        productList.innerHTML = `<p class="text-center">Vælg venligst en kategori.</p>`;
        return;
    }

    document.title = `CustomMyRide - ${category}`;
    categoryTitle.textContent = `Kategori: ${category.replace(/_/g, ' ')}`;

    try {
        const response = await fetch(`${api}?category=${category}`);
        if (!response.ok) {
            throw new Error("Fejl ved hentning af produkter");
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error(error);
        productList.innerHTML = `<p class="text-danger">Kunne ikke hente produkter for denne kategori.</p>`;
    }
}

// Viser produkterne i en liste
function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    if (products.length === 0) {
        productList.innerHTML = "<p class='text-center'>Ingen produkter fundet i denne kategori.</p>";
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = "col-md-4";
        productCard.innerHTML = `
            <div class="card">
                <img src="${product.imageURL}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><strong>Kategori:</strong> ${product.category}</p>
                    <button class="btn btn-primary add-to-cart" data-id="${product.productId}">Tilføj til kurv</button>
                </div>
            </div>
        `;
        productList.appendChild(productCard);
    });

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            addToCart(productId);
        });
    });
}

// Tilføjer et produkt til kurven og gemmer i MySQL
async function addToCart(productId) {
    // Hent eksisterende kurv fra localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Tjek om produktet allerede er i kurven
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart)); // Gem opdateret kurv i localStorage
        cartCount++;
        document.getElementById("cart-count").textContent = cartCount;

        console.log(`Produkt med ID ${productId} tilføjet til kurv.`);

        // Send produkt til backend for at gemme i MySQL
        const orderlineData = { productId: productId }; // Tilpas denne struktur som nødvendigt
        try {
            const response = await fetch(orderlinesApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderlineData),
            });

            if (!response.ok) {
                throw new Error('Fejl ved gemning af ordrelinje i databasen');
            }

            console.log(`Ordrelinje gemt i databasen for produkt ID ${productId}.`);
        } catch (error) {
            console.error(error);
            alert('Der opstod en fejl under gemning af produktet.');
        }
    } else {
        console.log(`Produkt med ID ${productId} er allerede i kurven.`);
    }
}

// Initialiser siden
document.addEventListener('DOMContentLoaded', () => {
    updateCategoryPage();

    // Indlæs antal produkter i kurven fra localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount = cart.length;
    document.getElementById("cart-count").textContent = cartCount;
});
