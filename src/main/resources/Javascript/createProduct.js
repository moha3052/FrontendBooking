import { FetchesFunc } from "./fetchingFunction.js";

// Tilknyt event listener til formen
document.getElementById("productForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Forhindrer siden i at genindlæse

    // Hent værdier fra inputfelterne
    const name = document.getElementById("name").value.trim();
    const description = document.getElementById("description").value.trim();
    const category = document.getElementById("category").value;

    const imageURL = document.getElementById('imageURL').value;


    // Valider data
    if (!name || !description || !category) {
        displayError("Alle felter skal udfyldes!");
        return;
    }

    // Opret produktdata som JSON
    const productData = { name, description, category, imageURL };

    try {
        const token = FetchesFunc.getTokenFromStorage();
        if (token) {
            console.log("Token found:", token);
        } else {
            console.log("No token found in storage.");
        }

        const response = await FetchesFunc.fetchBy(
            "http://localhost:8080", // Base URL
            "/product",             // Endpoint
            FetchesFunc.methods.POST, // HTTP method
            {Authorization: ``},                   // No additional headers
            productData          // Data to send

        );

        if (response && response.success !== false) {
            alert("Product successfully created!");
            document.getElementById("productForm").reset();
            hideError();
        } else {
            displayError("Could not create the product. Please try again.");
        }
    } catch (error) {
        displayError(`Something went wrong: ${error.message}`);
    }
});

// Funktion til at vise fejlbeskeder
function displayError(message) {
    const errorDiv = document.getElementById("errorMessages");
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
}

// Funktion til at skjule fejlbeskeder
function hideError() {
    const errorDiv = document.getElementById("errorMessages");
    errorDiv.style.display = "none";
}
