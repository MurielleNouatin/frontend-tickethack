fetch("https://backend-tickethack-herq.vercel.app/bookings")
  .then((res) => res.json())
  .then((data) => {
    const container = document.querySelector("#bookings");
    const emptyBookingMessage = document.querySelector("#emptyBookingMessage");
    const bookingContent = document.querySelector("#bookingContent");

    container.innerHTML = "";

    if (!data.result || data.bookings.length === 0) {
      emptyBookingMessage.style.display = "block";
      bookingContent.style.display = "none";
      return;
    }

    emptyBookingMessage.style.display = "none";
    bookingContent.style.display = "block";

    data.bookings.forEach((trip) => {
      container.innerHTML += `
        <div class="myBooking">
          <p>${trip.departure} > ${trip.arrival}</p>
          <p>Departure : ${moment(trip.date).format("HH:mm")}</p>
          <p>Price : ${trip.price}€</p>
          <p>Departure in ${
            (() => {
              const diff = Math.abs(new Date(trip.date) - new Date());
              
              const hours = Math.floor(diff / (1000 * 60 * 60));
              const minutes = Math.floor(diff / (1000 * 60));
              
              if (hours >= 1) {
                return `${hours}hours`;
              }
              
              return `${minutes}minutes`;
            })()
          }</p>
          <hr/>
        </div>
      `;
    });
  });
