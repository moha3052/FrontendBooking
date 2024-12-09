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
        // Send POST-forespørgsel via FetchesFunc
        const response = await FetchesFunc.post(
            "http://localhost:8080/api", // Basis-URL
            "/product",                // Endpoint
            productData                 // Data der skal sendes
        );

        if (response) {
            alert("Produkt oprettet succesfuldt!");
            document.getElementById("productForm").reset(); // Nulstil formular
            hideError(); // Skjul fejlbeskeder
        } else {
            displayError("Produktet kunne ikke oprettes. Prøv igen.");
        }
    } catch (error) {
        displayError(`Noget gik galt: ${error.message}`);
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
