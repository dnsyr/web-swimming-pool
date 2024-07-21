document.addEventListener('DOMContentLoaded', function () {
  function loadReservations() {
    const reservationTableBody = document.getElementById("reservationTableBody");
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservationTableBody.innerHTML = '';

    if (reservations.length === 0) {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.colSpan = 10; // Adjust this number based on your table columns
      cell.classList.add("text-center", "py-24")
      cell.textContent = 'No data entry';
      row.appendChild(cell);
      reservationTableBody.appendChild(row);
    } else {
      reservations.forEach((reservation, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
                <td class="text-center">${index + 1}</td>
                <td>${reservation.email}</td>
                <td>${reservation.name}</td>
                <td>${reservation.date}</td>
                <td class="text-center">${reservation.ticketAdult}</td>
                <td class="text-center">${reservation.ticketKid}</td>
                <td class="text-center">${reservation.snacks ? 'Yes' : 'No'}</td>
                <td class="text-center">${reservation.swimKit ? 'Yes' : 'No'}</td>
                <td class="text-center">${reservation.voucher}</td>
                <td>${reservation.discount}</td>
            `;

        reservationTableBody.appendChild(row);
      });
    }
  }

  loadReservations();
});