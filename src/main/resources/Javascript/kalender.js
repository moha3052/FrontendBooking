const api = "http://localhost:8080/api/v1";
const bookingForm = document.getElementById("booking-form");
const bookingDate = document.getElementById("booking-date");
const bookingTime = document.getElementById("booking-time");
const confirmation = document.getElementById("confirmation");

// Åbningstider
const openHours = {
    "tirsdag": { start: 15, end: 21 },
    "onsdag": { start: 15, end: 21 },
    "torsdag": { start: 15, end: 21 },
    "lørdag": { start: 10, end: 19 },
};

// Generer tidspunkter baseret på åbningstider
function generateTimes(start, end) {
    const times = [];
    for (let hour = start; hour < end; hour++) {
        times.push(`${hour}:00`, `${hour}:30`);
    }
    return times;
}

// Tjek om dagen er lukket
function isClosed(dayOfWeek) {
    return !openHours.hasOwnProperty(dayOfWeek.toLowerCase());
}

// Håndter datoændringer
bookingDate.addEventListener("change", () => {
    const selectedDate = new Date(bookingDate.value);
    const dayOfWeek = selectedDate.toLocaleDateString("da-DK", { weekday: "long" }).toLowerCase();

    // Ryd valg af tidspunkter
    bookingTime.innerHTML = "<option value=''>Vælg tid...</option>";

    if (isClosed(dayOfWeek)) {
        bookingTime.innerHTML = "<option>Lukket denne dag</option>";
        return;
    }

    // Generer og vis ledige tidspunkter
    const times = generateTimes(openHours[dayOfWeek].start, openHours[dayOfWeek].end);
    times.forEach(time => {
        const option = document.createElement("option");
        option.value = time;
        option.textContent = time;
        bookingTime.appendChild(option);
    });
});

// Håndter booking
bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const date = bookingDate.value;
    const time = bookingTime.value;

    if (!date || !time || time === "Lukket denne dag") {
        alert("Vælg venligst en gyldig dato og tid.");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/v1", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                date: date,
                startTime: time,
            }),
        });

        if (response.status === 201) {
            // Redirect til customerinformation.html
            window.location.href = "customerinformation.html";
        } else {
            alert("Tidspunktet er allerede booket. Prøv en anden tid.");
        }
    } catch (error) {
        console.error("Fejl under booking:", error);
        alert("Der opstod en fejl. Prøv igen senere.");
    }
});
