/**
 * Payments Client Module (bKash / Nagad / Local Banking)
 *
 * Handles checkout simulation and digital receipt display in Taka (৳).
 *
 * @module PaymentsClient
 */

function startCheckout(appointment) {
  document.getElementById('pay-appointment-id').value = appointment.id;
  document.getElementById('checkout-summary').innerHTML = `
		<p>Doctor: <strong>${appointment.doctorName}</strong></p>
		<p>Date & Time: ${appointment.appointmentDate} (${appointment.appointmentTime})</p>
		<h3 style="color: var(--primary); margin-top: 0.5rem;">Total Fee: ৳${appointment.consultationFee} BDT</h3>
	`;
  navigateTo('checkout');
}

document
  .getElementById('payment-form')
  .addEventListener('submit', async (e) => {
    e.preventDefault();
    const appointmentId = document.getElementById('pay-appointment-id').value;
    const paymentMethod = document.getElementById('pay-method').value;

    const res = await apiRequest('/api/payments/process', 'POST', {
      appointmentId,
      paymentMethod,
    });
    if (res.success) {
      renderReceipt(res.data);
    } else {
      showAlert(res.message, 'danger');
    }
  });

function renderReceipt(data) {
  const { payment, appointment } = data;
  document.getElementById('receipt-details').innerHTML = `
		<table style="margin: 1.5rem 0; text-align: left;">
			<tr><th>Transaction ID</th><td><strong>${payment.id}</strong></td></tr>
			<tr><th>Amount Paid</th><td>৳${payment.amount} BDT</td></tr>
			<tr><th>Payment Channel</th><td>${payment.paymentMethod}</td></tr>
			<tr><th>Doctor Appointed</th><td>${appointment.doctorName}</td></tr>
			<tr><th>Schedule</th><td>${appointment.appointmentDate} (${appointment.appointmentTime})</td></tr>
		</table>
	`;
  navigateTo('receipt');
}
