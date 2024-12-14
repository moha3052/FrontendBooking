function showLogin() {
    const loginDialog = document.getElementById('loginDialog');
    if (loginDialog) {
        loginDialog.showModal();
    } else {
        console.error('loginDialog not found');
    }
}

function closeLogin() {
    const loginDialog = document.getElementById('loginDialog');
    loginDialog.close();
}

document.addEventListener('DOMContentLoaded', () => {
    const loginDialog = document.getElementById('loginDialog');
    loginDialog.addEventListener('close', () => {
        console.log('Dialog lukket');
    });

    loginDialog.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log(`E-mail: ${email}, Password: ${password}`);
        closeLogin();
    });
});