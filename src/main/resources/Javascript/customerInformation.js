document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Forhindrer standardindsendelse af formularen

        // Hent værdier fra formularfelterne
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const city = document.getElementById('city').value;
        const licensePlate = document.getElementById('licensePlate').value;

        const customerData = {
            name,
            email,
            phoneNumber,
            city,
            licensePlate,
        };

        try {
            // Send data til backend
            const response = await fetch('http://localhost:8080/api/Customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customerData),
            });

            if (!response.ok) {
                throw new Error('Der opstod en fejl under booking. Prøv igen.');
            }

            // Hent responsen fra backend
            const data = await response.json();

            // Gem customerId (hvis det er inkluderet i responsen)
            const customerId = data.customerId;
            if (customerId) {
                console.log(`Kunde-ID modtaget: ${customerId}`);
                localStorage.setItem('customerId', customerId); // Gem i localStorage
            }

            // Vis succes-besked og omdiriger til forsiden
            alert('Din booking er oprettet! Tak for din tid.' + " " + customerId + " " + customerData.name );
            window.location.href = 'home.html'; // Omdiriger til forsiden

        } catch (error) {
            console.error(error);
            alert('Noget gik galt. Prøv venligst igen senere.');
        }
    });
});
