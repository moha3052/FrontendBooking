// Hent kurvdata fra localStorage
function getCart() {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

// Gem kurvdata i localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Tilføj produkt til kurven
function addToCart(product) {
    const cart = getCart();
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1; // Opdater antal
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    saveCart(cart);
    alert("Produktet er blevet tilføjet til din kurv!");
    console.log("Opdateret kurv:", cart);
}

// Vis produkter i kurven
function displayCartItems() {
    const cart = getCart();
    const cartContainer = document.getElementById("cart-items");
    const checkoutContainer = document.getElementById("checkout-container");

    cartContainer.innerHTML = ""; // Ryd kurven

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Din kurv er tom.</p>";
        checkoutContainer.style.display = "none";
        return;
    }

    cart.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("cart-item");

        productElement.innerHTML = `
            <img src="${product.imageURL}" alt="${product.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Antal: 
                    <button onclick="updateQuantity(${product.productId}, -1)">-</button>
                    ${product.quantity}
                    <button onclick="updateQuantity(${product.productId}, 1)">+</button>
                </p>
                <button onclick="removeFromCart(${product.productId})" class="remove-button">Fjern</button>
            </div>
        `;

        cartContainer.appendChild(productElement);
    });

    checkoutContainer.style.display = "block";
}

// Opdater antal af et produkt
function updateQuantity(productId, change) {
    const cart = getCart();
    const product = cart.find(item => item.id === productId);

    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart(cart);
            displayCartItems();
        }
    }
}

// Fjern et produkt fra kurven
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    displayCartItems();
}

// Gennemfør checkout
function checkout() {
    const cart = getCart();

    if (cart.length === 0) {
        alert("Din kurv er tom. Tilføj nogle produkter først!");
        return;
    }

    // Send kurvdata til serveren (eksempel med fetch)
    fetch("/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
    })
        .then(response => {
            if (response.ok) {
                alert("Bestilling gennemført!");
                localStorage.removeItem("cart");
                displayCartItems();
            } else {
                alert("Der opstod en fejl under bestillingen.");
            }
        })
        .catch(error => console.error("Fejl ved checkout:", error));
}

document.addEventListener("DOMContentLoaded", displayCartItems);
