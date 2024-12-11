const api = "http://localhost:8080/api/product";
let cartCount = 0; // Variabel til at holde styr på antal varer i kurven


//locala storage til genere dymiask

// Funktion til at slette produkt
async function deleteProduct(id) {
    const confirmDelete = confirm("Er du sikker på, at du vil slette dette produkt?");
    if (!confirmDelete) return;

    try {
        const response = await fetch(`http://localhost:8080/api/product/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            alert("Produktet blev slettet.");
            document.getElementById(`row-${id}`).remove(); // Fjern fra tabellen
        } else {
            alert("Kunne ikke slette produktet. Prøv igen.");
        }
    } catch (error) {
        console.error("Fejl ved sletning af produkt:", error);
        alert("Der opstod en fejl.");
    }
}
