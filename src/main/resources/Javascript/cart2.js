document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://localhost:8080/api/orderlines'; // Din backend API URL

    const orderTableBody = document.getElementById('orderTableBody');
    const addProductForm = document.getElementById('addProductForm');

    let orderId = 1; // Unik ID til hver ordrelinje

    // Hent alle orderlines og vis dem
    async function fetchOrderlines() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Error fetching orderlines');
            }
            const orderlines = await response.json();
            orderTableBody.innerHTML = ''; // Ryd tabellen

            orderlines.forEach((orderline, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${orderline.product.name}</td>
                    <td id="quantity-${orderline.orderLineId}">${orderline.quantity}</td>
                    <td>
                        <button class="delete-btn" onclick="deleteOrderline(${orderline.orderLineId})">Slet</button>
                    </td>
                `;
                orderTableBody.appendChild(row);
            });
        } catch (error) {
            console.error(error);
            alert('Failed to fetch orderlines');
        }
    }

    // Tilføj en ny ordrelinje
    addProductForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Undgå side-genindlæsning

        const serviceName = document.getElementById('serviceName').value.trim();
        const quantity = document.getElementById('quantity').value.trim();

        if (serviceName && quantity > 0) {
            // Opret ny række
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${orderId++}</td>
                <td>${serviceName}</td>
                <td>${quantity}</td>
                <td>
                    <button class="delete-btn">Slet</button>
                </td>
            `;

            // Tilføj rækken til tabellen
            orderTableBody.appendChild(row);

            // Ryd formularfelter
            addProductForm.reset();

            // Tilføj slet-funktionalitet
            row.querySelector('.delete-btn').addEventListener('click', function () {
                row.remove(); // Fjern rækken fra tabellen
            });
        } else {
            alert('Udfyld alle felter korrekt.');
        }
    });

    // Slet en orderline
    async function deleteOrderline(orderLineId) {
        if (confirm("Are you sure you want to delete this order?")) {
            try {
                const response = await fetch(`${apiUrl}/${orderLineId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Error deleting orderline');
                }

                fetchOrderlines(); // Opdater tabellen
            } catch (error) {
                console.error(error);
                alert('Failed to delete orderline');
            }
        }
    }

    // Hent ordrelinjer ved sideindlæsning
    fetchOrderlines();
});
