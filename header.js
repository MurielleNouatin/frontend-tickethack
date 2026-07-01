document.querySelector('#mainHeader').innerHTML = `
  <div class="header">
    <button id="homeBtn">TicketHack</button>

    <div class="topButtons">
      <button id="cartBtn">Cart</button>
      <button id="bookingBtn">Booking</button>
    </div>
  </div>
`;

document.querySelector('#homeBtn').addEventListener('click', () => {
  window.location.href = 'index.html';
});

document.querySelector('#cartBtn').addEventListener('click', () => {
  window.location.href = 'cart.html';
});

document.querySelector('#bookingBtn').addEventListener('click', () => {
  window.location.href = 'booking.html';
});