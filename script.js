// Recherche de trajet avec depart, arrivée et date en appuyant sur search
document.querySelector('#search').addEventListener('click', () => {
  const departure = document.querySelector('#departure').value.trim();
  const arrival = document.querySelector('#arrival').value.trim();
  const date = document.querySelector('#date').value;

  fetch('https://backend-tickethack-herq.vercel.app/trips/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      departure,
      arrival,
      date,
    }),
  })
    .then(response => response.json())
    .then(data => {
      document.querySelector('#tripsContainer').innerHTML = '';

      if (data.result) {
        for (const trip of data.trips) {
          document.querySelector('#tripsContainer').innerHTML += `
            <div class="trip">
              <p>${trip.departure} → ${trip.arrival}</p>
              <p>${moment(trip.date).format('HH:mm')}</p> 
              <p>${trip.price} €</p>
              <button class="book" data-id="${trip._id}">
                Book
              </button>
            </div>
          `;
        }
// Bouton book et redirection vers page cart
        document.querySelectorAll('.book').forEach(button => {
          button.addEventListener('click', () => {
            fetch('https://backend-tickethack-herq.vercel.app/carts', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                tripId: button.dataset.id,
              }),
            })
              .then(response => response.json())
              .then(data => {
                if (data.result) {
                  window.location.href = 'cart.html';
                }
              });
          });
        });
      } else {
        document.querySelector('#tripsContainer').innerHTML = `
          <img src="images/notfound.png" alt="loupe" class="pictoLoupe">
          <p class="notFound">${data.error}</p>
        `;
      }
    });
});

// Boutons pour aller sur les pages Cart et Booking
document.querySelector('#cartBtn').addEventListener('click', () => {
  window.location.href = 'cart.html';
});

document.querySelector('#bookingBtn').addEventListener('click', () => {
  window.location.href = 'booking.html';
});
