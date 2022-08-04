let url = new URL(window.location.href);
let search_params = new URLSearchParams(url.search);
if (search_params.has('orderId')) {
  _id = search_params.get('orderId');
}
