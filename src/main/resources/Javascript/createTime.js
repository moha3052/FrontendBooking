// const api = "http://localhost:8080/api/v1";
// document.addEventListener("DOMContentLoaded", () => {
//     const orderForm = document.getElementById("orderForm");
//     const errorMessages = document.getElementById("errorMessages");
//
//     orderForm.addEventListener("submit", async (event) => {
//         event.preventDefault(); // Forhindrer standard formularindsendelse
//
//         // Hent værdierne fra formularen
//         const orderDate = document.getElementById("orderDate").value.trim();
//         const orderTime = document.getElementById("orderTime").value.trim();
//         const category = document.getElementById("category").value;
//
//         // Valider inputfelter (men gør category valgfri)
//         if (!orderDate || !orderTime) {
//             errorMessages.textContent = "Dato og tid skal udfyldes!";
//             errorMessages.style.display = "block";
//             return;
//         }
//
//         // Opret bookingobjektet
//         const bookingData = {
//             date: orderDate, // 'YYYY-MM-DD' format
//             time: orderTime, // 'HH:mm' format
//             isBooked: false // Standard false (kan ændres baseret på logik)
//         };
//
//         // Tilføj workshopLocation kun hvis en kategori er valgt
//         if (category) {
//             bookingData.workshopLocation = category;
//         }
//
//         try {
//             const response = await fetch(`${api}`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(bookingData),
//             });
//
//             if (!response.ok) {
//                 throw new Error("Netværksfejl ved oprettelse af booking");
//             }
//
//             const result = await response.json();
//             alert("Booking oprettet succesfuldt!");
//             orderForm.reset(); // Nulstil formularen
//             errorMessages.style.display = "none"; // Skjul fejlbeskeder
//         } catch (error) {
//             console.error("Fetch-fejl:", error);
//             errorMessages.textContent = `Noget gik galt: ${error.message}`;
//             errorMessages.style.display = "block";
//         }
//     });
// });
