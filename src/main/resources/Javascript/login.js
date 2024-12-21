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
            const response = await FetchesFunc.login(
                "http://localhost:8080",
                "/api/v1/authCred/login",
                { email, password }
            );

            if (response && response.data && response.data.accessToken) {
                console.log('Login successful:', response);

                FetchesFunc.saveToken(response.data.accessToken); // Save the token

                alert("Login successful!");
                closeLogin();
            } else if (response.status === 403) {
                alert("Access denied: Invalid credentials.");
            } else {
                alert("Login failed: " + response.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
        }

    });
});
