// return command id

let url = new URL(window.location.href);
let search_params = new URLSearchParams(url.search);
if (search_params.has("orderId")) {
  const orderId = search_params.get("orderId");
  console.log("orderId: ", orderId);

  document.getElementById("orderId").innerHTML = orderId;
}
