const apiUrl = "http://localhost:8080/api/v1";
const calendarBody = document.getElementById("calendar-body");
const selectedMonthElement = document.getElementById("selected-month");
const timeSlotsElement = document.getElementById("time-slots");

// Udfyld år og måned dropdowns
function populateYearAndMonth() {
    const yearSelect = document.getElementById("year-select");
    const monthSelect = document.getElementById("month-select");

    // Tilføj år
    for (let year = 2023; year <= 2030; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    // Tilføj måneder
    for (let month = 0; month < 12; month++) {
        const option = document.createElement("option");
        option.value = month;
        option.textContent = new Date(0, month).toLocaleString('da-DK', { month: 'long' });
        monthSelect.appendChild(option);
    }
}

// Funktion til at generere kalender for den valgte måned og år
function generateCalendar(year, month) {
    calendarBody.innerHTML = ""; // Ryd kalenderen
    selectedMonthElement.textContent = `${new Date(year, month).toLocaleString('da-DK', { month: 'long' })} ${year}`;

    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = firstDay.getDay();

    let row = document.createElement("tr");
    for (let i = 0; i < startDay; i++) {
        row.appendChild(document.createElement("td"));
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement("td");
        cell.textContent = day;
        cell.className = "calendar-day p-3";
        cell.style.cursor = "pointer";

        // Tilføj klik-event til at hente tidspunkter for den valgte dato
        cell.addEventListener("click", () => {
            const selectedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; // Formatér datoen som YYYY-MM-DD
            fetchAvailableTimes(selectedDate);
        });

        row.appendChild(cell);

        if ((startDay + day) % 7 === 0) {
            calendarBody.appendChild(row);
            row = document.createElement("tr");
        }
    }

    if (row.children.length > 0) {
        calendarBody.appendChild(row);
    }
}

// Funktion til at indlæse tidspunkter fra API
async function fetchAvailableTimes(date) {
    try {
        const response = await fetch(`${apiUrl}/available-times?date=${date}`); // API med dato som parameter
        if (!response.ok) throw new Error("Fejl ved hentning af data");

        const timeSlots = await response.json(); // Antager, at API'et returnerer en liste af tidspunkter
        displayTimeSlots(timeSlots, date);
    } catch (error) {
        console.error("Fejl ved hentning af tidspunkter:", error.message);
    }
}

// Funktion til at vise tidspunkter
function displayTimeSlots(timeSlots, date) {
    const title = document.getElementById("available-times-title");

    // Opdater titlen med den valgte dato
    title.innerText = `Ledige tider for ${date}`;

    // Ryd tidligere tidspunkter
    timeSlotsElement.innerHTML = "";

    // Del tidspunkterne op i Morgen og Eftermiddag
    const morningSlots = timeSlots.filter(slot => parseInt(slot.split(":")[0]) < 12);
    const afternoonSlots = timeSlots.filter(slot => parseInt(slot.split(":")[0]) >= 12);

    if (morningSlots.length > 0) {
        timeSlotsElement.innerHTML += `
                <h5>Morgen</h5>
                <div class="d-flex flex-wrap gap-2">
                    ${morningSlots.map(slot => `<button class="btn btn-outline-danger">${slot}</button>`).join("")}
                </div>
            `;
    }

    if (afternoonSlots.length > 0) {
        timeSlotsElement.innerHTML += `
                <h5>Eftermiddag</h5>
                <div class="d-flex flex-wrap gap-2">
                    ${afternoonSlots.map(slot => `<button class="btn btn-outline-danger">${slot}</button>`).join("")}
                </div>
            `;
    }
}

// Event listener til generering af kalender
document.getElementById("generate-calendar").addEventListener("click", () => {
    const year = parseInt(document.getElementById("year-select").value);
    const month = parseInt(document.getElementById("month-select").value);
    generateCalendar(year, month);
});

// Udfyld år og måned ved indlæsning af siden
document.addEventListener("DOMContentLoaded", populateYearAndMonth);
