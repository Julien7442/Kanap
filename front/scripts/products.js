var str = window.location.href;
var url = new URL(str);
const idProduct = new URL(window.location.href).searchParams.get('id');
console.log(idProduct);

let article = '';

const colorPicked = document.querySelector('#colors');
const quantityPicked = document.querySelector('#quantity');

getArticle();

// Getting articles from API
function getArticle() {
  fetch('http://localhost:3000/api/products/' + idProduct)
    .then((res) => {
      return res.json();
    })

    // Moving API data to DOM
    .then(async function (resultatAPI) {
      article = await resultatAPI;
      console.table(article);
      if (article) {
        getPost(article);
      }
    })
    .catch((error) => {
      console.log('Erreur de la requête API');
    });
}

function getPost(article) {
  // Getting article image
  let productImg = document.createElement('img');
  document.querySelector('.item__img').appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;

  // Article title
  let productName = document.getElementById('title');
  productName.innerHTML = article.name;

  // Article price
  let productPrice = document.getElementById('price');
  productPrice.innerHTML = article.price;

  // Article description
  let productDescription = document.getElementById('description');
  productDescription.innerHTML = article.description;

  // Loop to take colors
  for (let colors of article.colors) {
    console.table(colors);
    let productColors = document.createElement('option');
    document.querySelector('#colors').appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }
  addToCart(article);
}

function addToCart(article) {
  const btn_envoyerPanier = document.querySelector('#addToCart');
  // Basket button with condition (article quantity must be between 1 and 100)
  btn_envoyerPanier.addEventListener('click', (event) => {
    if (
      quantityPicked.value > 0 &&
      quantityPicked.value <= 100 &&
      quantityPicked.value != 0
    ) {
      // Taking the color
      let colorChoice = colorPicked.value;

      // Taking the quantity
      let choixQuantite = quantityPicked.value;

      let optionsProduit = {
        productColor: colorChoice,
        quantiteProduit: Number(choixQuantite),
        nomProduit: article.name,
        prixProduit: article.price,
        idProduit: idProduct,
        descriptionProduit: article.description,
        imgProduit: article.imageUrl,
        altImgProduit: article.altTxt,
      };
      // Local storage initialisation
      let produitLocalStorage = JSON.parse(localStorage.getItem('produit'));

      // Pop up to confirm choice and redirect to cart.html
      const popupConfirmation = () => {
        if (
          window.confirm(`Votre commande de ${choixQuantite} ${article.name} ${colorChoice} est ajoutée au panier
`)
        ) {
        }
      };
      // Local storage importation
      // If basket already have 1 product
      if (produitLocalStorage) {
        const resultFind = produitLocalStorage.find(
          (el) => el.idProduit === idProduct && el.productColor === colorChoice
        );
        // If the product ordered is already in basket
        if (resultFind) {
          let newQuantite =
            parseInt(optionsProduit.quantiteProduit) +
            parseInt(resultFind.quantiteProduit);
          resultFind.quantiteProduit = newQuantite;
          localStorage.setItem('produit', JSON.stringify(produitLocalStorage));
          console.table(produitLocalStorage);
          popupConfirmation();
          // If the product is not in the basket
        } else {
          produitLocalStorage.push(optionsProduit);
          localStorage.setItem('produit', JSON.stringify(produitLocalStorage));
          console.table(produitLocalStorage);
          popupConfirmation();
        }
        // If the basket is empty
      } else {
        produitLocalStorage = [];
        produitLocalStorage.push(optionsProduit);
        localStorage.setItem('produit', JSON.stringify(produitLocalStorage));
        console.table(produitLocalStorage);
        popupConfirmation();
      }
    }
  });
}
