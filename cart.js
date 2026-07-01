let cart = [];

function displayCart() {
  fetch('http://localhost:3000/carts')
    .then(response => response.json())
    .then(data => {
      const cartContainer = document.querySelector('#cartContainer');
      const totalContainer = document.querySelector('#totalContainer');
      const emptyCartMessage = document.querySelector('#emptyCartMessage');
      const cartContent = document.querySelector('#cartContent');

      cartContainer.innerHTML = '';

      if (!data.result || data.cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartContent.style.display = 'none';
        cart = [];
        return;
      }

      emptyCartMessage.style.display = 'none';
      cartContent.style.display = 'block';

      let total = 0;
      cart = data.cart.map(item => item.trip);

      for (const item of data.cart) {
        total += Number(item.trip.price);

        cartContainer.innerHTML += `
          <div class="trip">
            <p>${item.trip.departure} → ${item.trip.arrival}</p>
            <p>${moment(item.trip.date).format('HH:mm')}</p>
            <p>${item.trip.price} €</p>

            <button class="deleteBtn" data-id="${item._id}">✕</button>
          </div>
        `;
      }

      totalContainer.textContent = `Total : ${total} €`;

      document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', () => {
          fetch(`http://localhost:3000/carts/${button.dataset.id}`, {
            method: 'DELETE',
          })
            .then(response => response.json())
            .then(data => {
              if (data.result) {
                displayCart();
              }
            });
        });
      });
    });
}

document.querySelector('#purchase').addEventListener('click', () => {
  fetch('http://localhost:3000/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ trips: cart }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        window.location.href = 'booking.html';
      }
    });
});

displayCart();