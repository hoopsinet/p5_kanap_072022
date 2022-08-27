getOrderId();
//  on va chercher dans l'url l'orderId et on l'affiche de la page html attendu
function getOrderId() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("orderId");
  document.querySelector("#orderId").textContent = orderId;
}
