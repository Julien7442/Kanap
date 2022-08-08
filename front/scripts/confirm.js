/**
 * récupère l'id de commande dans le localStorage.getItem('orderId');
 * @return id de commande
 */

let url = new URL(window.location.href);
let search_params = new URLSearchParams(url.search);
if (search_params.has('orderId')) {
  idProduit = search_params.get('orderId');
}
console.log('idProduit: ', idProduit);

let orderId = document.getElementById('orderId');
orderId.innerHTML = idProduit;
