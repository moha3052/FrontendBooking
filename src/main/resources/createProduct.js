const api = "http://localhost:8080/api/product"; // API endpoint til at oprette produkt

document.getElementById("createProductForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Forhindrer formularen i at sende på den normale måde

    const formData = new FormData(); // Opretter FormData objektet

    // Henter værdierne fra inputfelterne og tilføjer dem til FormData
    formData.append("name", document.getElementById("name").value);
    formData.append("description", document.getElementById("description").value);

    const imageFile = document.getElementById("imageFile").files[0];

    // Tjek om der er valgt en fil og om filtypen er et billede
    if (imageFile && !imageFile.type.startsWith('image/')) {
        alert('Filtypen er ikke et billede. Vælg venligst et billede.');
        return; // Stop form submission hvis filen ikke er et billede
    }

    formData.append("imageFile", imageFile);

    try {
        const response = await fetch(api, {
            method: "POST",
            body: formData // Sender FormData som body
        });

        if (!response.ok) {
            throw new Error('Netværksfejl, kunne ikke oprette produkt');
        }

        const createdProduct = await response.json(); // Henter svaret fra serveren
        console.log('Produkt oprettet:', createdProduct);

        // Her kan du håndtere det, der sker efter et produkt er oprettet (f.eks. vise en besked eller opdatere UI)
        alert('Produkt oprettet successfully!');
        // Eventuelt opdatere UI med det oprettede produkt
    } catch (error) {
        console.error('Fejl ved oprettelse af produkt:', error);
        alert('Fejl ved oprettelse af produkt. Prøv igen senere.');
    }
});
