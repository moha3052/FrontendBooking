import { FetchesFunc } from "./fetchingFunction.js";

// Funktion til at vise login-dialogen
function showLogin() {
    const loginDialog = document.getElementById('loginDialog');
    if (loginDialog) {
        loginDialog.showModal();
    } else {
        console.error('loginDialog blev ikke fundet');
    }
}
window.showLogin = showLogin;

// Funktion til at lukke login-dialogen
function closeLogin() {
    const loginDialog = document.getElementById('loginDialog');
    if (loginDialog) {
        loginDialog.close();
    } else {
        console.error('loginDialog blev ikke fundet');
    }
}
window.closeLogin = closeLogin;


document.addEventListener('DOMContentLoaded', () => {
    const loginDialog = document.getElementById('loginDialog');
    if (!loginDialog) {
        console.error('Elementet loginDialog mangler');
        return;
    }

    // Event: Logger, når dialogen lukkes
    loginDialog.addEventListener('close', () => {
        console.log('Dialogen blev lukket');
    });

    // Event: Håndterer indsendelse af formularen
    const form = loginDialog.querySelector('form');
    if (!form) {
        console.error('Formularen blev ikke fundet i loginDialog');
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Henter inputværdier
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            console.error('E-mail og adgangskode er påkrævet');
            return;
        }

        try {
            // Udfør login ved hjælp af FetchesFunc
            const response = await FetchesFunc.fetchBy(
                "http://localhost:8080", // Base URL
                "/api/v1/authCred/login", // Endpoint
                FetchesFunc.methods.POST, // HTTP-metode
                null, // Ingen ekstra headers
                { email: email, password: password }, // Login-data (matcher LoginDto)
                null, // Ingen token nødvendig til login
                true // Angiver, at dette er en login-anmodning
            );

            if (response) {
                console.log('Login lykkedes:', response);

                // Gem token i localStorage

                alert("Login lykkedes!");

                // Luk login-dialogen
                closeLogin();
            } else {
                console.error('Login mislykkedes:', response);
                alert('Ugyldig e-mail eller adgangskode.'+JSON.stringify(response));
            }
        } catch (error) {
            console.error('Fejl under login:', error);
            alert('Der opstod en fejl under login. Prøv venligst igen.');
        }
    });
});
