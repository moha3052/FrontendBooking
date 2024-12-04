fetch('http://localhost:8080/api/v1/orders', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        startDate: selectedDate,
        localTime: selectedTime
    })
})
    .then(response => response.json())
    .then(data => {
        console.log('Order created:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
