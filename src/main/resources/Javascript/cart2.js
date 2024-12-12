// // API URL til produkter
// const apiUrl = "http://localhost:8080/api/product";
//
// // Hent kurven fra localStorage
// let cart = JSON.parse(localStorage.getItem("cart")) || [];
//
// // Tilføj service til kurv
// function addToCart(serviceId) {
//     // Find produktet ved serviceId
//     fetch(apiUrl)
//         .then(response => response.json())
//         .then(products => {
//             const product = products.find(p => p.productId == serviceId);
//             if (product) {
//                 const existingProduct = cart.find(item => item.product.productId === serviceId);
//                 if (existingProduct) {
//                     existingProduct.quantity++; // Øg mængden, hvis produktet allerede er i kurven
//                 } else {
//                     cart.push({ product, quantity: 1 }); // Tilføj nyt produkt med mængde 1
//                 }
//
//                 // Gem kurven i localStorage
//                 localStorage.setItem("cart", JSON.stringify(cart));
//
//                 // Opdater kurven på siden
//                 displayCart();
//             }
//         })
//         .catch(error => console.error("Fejl ved tilføjelse af produkt til kurv:", error));
// }
//
// // Vis kurvens indhold
// function displayCart() {
//     const cartBody = document.getElementById("cart-body");
//     cartBody.innerHTML = ''; // Ryd tabelrækkerne
//
//     cart.forEach(item => {
//         const row = document.createElement("tr");
//
//         row.innerHTML = `
//             <td>
//                 <img src="${item.product.imageURL}" alt="${item.product.name}" width="50" />
//                 ${item.product.name}
//             </td>
//             <td>
//                 <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.product.productId}">
//             </td>
//             <td>${item.product.price * item.quantity} DKK</td>
//             <td>
//                 <button class="remove-from-cart" data-id="${item.product.productId}">Fjern</button>
//             </td>
//         `;
//
//         cartBody.appendChild(row);
//     });
//
//     // Opdater knapperne og mængden
//     const removeButtons = document.querySelectorAll('.remove-from-cart');
//     removeButtons.forEach(button => {
//         button.addEventListener('click', removeFromCart);
//     });
//
//     const quantityInputs = document.querySelectorAll('.quantity-input');
//     quantityInputs.forEach(input => {
//         input.addEventListener('input', updateQuantity);
//     });
// }
//
// // Fjern service fra kurv
// function removeFromCart(event) {
//     const productId = event.target.getAttribute("data-id");
//     cart = cart.filter(item => item.product.productId != productId);
//
//     // Gem den opdaterede kurv i localStorage
//     localStorage.setItem("cart", JSON.stringify(cart));
//
//     // Opdater kurven på siden
//     displayCart();
// }
//
// // Opdater mængde af service
// function updateQuantity(event) {
//     const productId = event.target.getAttribute("data-id");
//     const newQuantity = parseInt(event.target.value);
//
//     if (newQuantity < 1) {
//         event.target.value = 1;
//         return;
//     }
//
//     const productInCart = cart.find(item => item.product.productId == productId);
//     if (productInCart) {
//         productInCart.quantity = newQuantity;
//
//         // Gem den opdaterede kurv i localStorage
//         localStorage.setItem("cart", JSON.stringify(cart));
//
//         // Opdater kurven på siden
//         displayCart();
//     }
// }
//
// // Gå videre til bestilling
// document.getElementById("go-to-order").addEventListener("click", function() {
//     // Send kurv til bestilling
//     localStorage.setItem("order", JSON.stringify(cart));
//     window.location.href = "order.html"; // Gå til bestillingsside
// });
//
// // Når DOM'en er klar, vis kurven
// document.addEventListener("DOMContentLoaded", function() {
//     displayCart();
// });
