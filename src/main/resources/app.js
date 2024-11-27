// Main JavaScript file to render the home page dynamically
document.addEventListener("DOMContentLoaded", () => {
    // Get the root element
    const root = document.getElementById("root");

    // Create header
    const header = document.createElement("header");
    header.className = "header";
    header.innerHTML = `
        <h1>Welcome to CustomMyRide</h1>
        <nav>
            <ul class="nav-links">
                <li><a href="#" id="home-link">Home</a></li>
                <li><a href="#" id="services-link">Services</a></li>
                <li><a href="#" id="cart-link">Cart</a></li>
                <li><a href="#" id="about-link">About Us</a></li>
            </ul>
        </nav>
    `;

    // Create main content
    const main = document.createElement("main");
    main.className = "main-content";
    main.innerHTML = `
        <section>
            <h2>Your Car, Your Style</h2>
            <p>Welcome to CustomMyRide, where we help you style your car just the way you want it.</p>
            <button id="explore-services">Explore Services</button>
        </section>
    `;

    // Add event listener for button
    main.querySelector("#explore-services").addEventListener("click", () => {
        alert("Redirecting to Services page...");
        // Here you could implement navigation logic
    });

    // Create footer
    const footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML = `
        <p>&copy; 2024 CustomMyRide. All rights reserved.</p>
    `;

    // Append all elements to the root
    root.appendChild(header);
    root.appendChild(main);
    root.appendChild(footer);
});
