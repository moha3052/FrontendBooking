// Funktion til at hente produkter baseret på kategori
function fetchProductsByCategory(category) {
    const api = "http://localhost:8080/api/product/Category";
    const url = category ? `${api}?category=${category}` : api; // Tilføj kategori til URL

    fetch(url)
        .then(response => response.json())
        .then(products => {
            displayProducts(products, category); // Send også kategorien til display-funktionen
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

// Funktion til at vise produkter
function displayProducts(products, category) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Rydder eksisterende indhold

    // Opdater kategorioverskriften
    const categoryTitle = document.getElementById("category-title");
    categoryTitle.textContent = category.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()); // Formaterer kategorinavnet

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = "col-md-4"; // Bootstrap kolonne
        productCard.innerHTML = `
            <div class="card">
                <img src="${product.imageURL}" class="card-img-top" alt="${product.name}" />
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><strong>Kategori:</strong> ${product.category}</p>
                    <button class="btn btn-primary add-to-cart" data-service-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// Lyt til klik på dropdown-menuen
const categoryLinks = document.querySelectorAll('.dropdown-item');
categoryLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Forhindre standard link handling
        const category = link.getAttribute('data-category'); // Hent kategori fra data-attribut
        fetchProductsByCategory(category); // Hent produkter baseret på kategori
    });
});
