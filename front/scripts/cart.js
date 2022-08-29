import getArticle from './products.js';
let produitLocalStorage = JSON.parse(localStorage.getItem('produit'));
/**
 * affiche les informations des produits présent dans le panier
 * @return ajoute les élément un par un dans le DOM
 */
async function addCard() {
  console.log(produitLocalStorage);
  // si il y a des produit présent dans local storage
  if (produitLocalStorage !== null) {
    // récupère les produit et ses information un par un dans une variable nommée key
    for (let key in produitLocalStorage) {
      // récupère l'id du produit dans local Storage
      let id = produitLocalStorage[Number(key)].idProduit;
      console.log(id);
      console.log(await getArticle(id));

      // récupère les information du produit en passent l'id du produit en paramètre
      await getArticle(id).then(function (article) {
        // créer un balise article
        console.log(article);
        let Article = document.createElement('article');
        // récupère la couleur du produit renseignée dans le local storage
        let colors = produitLocalStorage[key].colors;
        // récupère la quantité du produit renseignée dans le local storage
        let quantity = String(produitLocalStorage[key].quantity);
        // récupère l'image du produit retourner par l'api
        let Img = article.imgProduit;
        // récupère le texte descriptif de l'image du produit retourner par l'api
        let Altimg = article.altImgProduit;
        // récupère le nom du produit retourner par l'api
        let Name = article.name;
        // récupère le prix du produit retourner par l'api
        let Price = article.price;
        // ajoute l'élément Article comme enfants de l'élément section
        section.appendChild(Article);
        // ajout de la classe "cart__item"
        Article.classList.add('cart__item');
        // ajout de l'attribut "data-id"
        Article.setAttribute('data-id', `${id}`);
        // ajout de l'attribut data-color
        Article.setAttribute('data-color', `${colors}`);
        // ajout des éléments sous format html
        Article.innerHTML = `<div class="cart__item__img">
                          <img src="${Img}" alt="${Altimg}">
                      </div>
                      <div class="cart__item__content__description">
                                  <h2>${Name}</h2>
                                  <p>${colors}</p>
                                  <p>${Price} €</p>
                              </div>
                          <div class="cart__item__content__settings">
                              <div class="cart__item__content__settings__quantity">
                                  <p>Qté : </p>
                                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                              </div>
                              <div class="cart__item__content__settings__delete">
                                  <p id="deleteItem" class="deleteItem">Supprimer</p>
                              </div>
                          </div>
                  </div> `;

        total(Price, quantity);
      });
      // appelle des function suivante après l'insertion des produits
      deleteProduct();
      modifieQtt();
      ValidationOfOrder();
    }
  } else {
    let titre_Alert = document.getElementById('cart__items');
    titre_Alert.innerHTML = '<h1>Le panier est vide ! </h1>';
    return;
  }
}
addCard();

/*
function getTotals() {
  // Total quantity
  var elemsQtt = document.getElementsByClassName('itemQuantity');
  var myLength = elemsQtt.length,
    totalQtt = 0;

  for (var i = 0; i < myLength; ++i) {
    totalQtt += elemsQtt[i].valueAsNumber;
  }

  let productTotalQuantity = document.getElementById('totalQuantity');
  productTotalQuantity.innerHTML = totalQtt;
  console.log(totalQtt);

  // Total price
  totalPrice = 0;

  for (var i = 0; i < myLength; ++i) {
    totalPrice +=
      elemsQtt[i].valueAsNumber * produitLocalStorage[i].prixProduit;
  }

  let productTotalPrice = document.getElementById('totalPrice');
  productTotalPrice.innerHTML = totalPrice;
  console.log(totalPrice);
}
getTotals();

// Modify product quantity
function modifyQtt() {
  let qttModif = document.querySelectorAll('.itemQuantity');

  for (let k = 0; k < qttModif.length; k++) {
    qttModif[k].addEventListener('change', (event) => {
      event.preventDefault();

      // Select product to modify quantity
      let quantityModif = produitLocalStorage[k].quantiteProduit;
      let qttModifValue = qttModif[k].valueAsNumber;

      const resultFind = produitLocalStorage.find(
        (el) => el.qttModifValue !== quantityModif
      );

      resultFind.quantiteProduit = qttModifValue;
      produitLocalStorage[k].quantiteProduit = resultFind.quantiteProduit;

      localStorage.setItem('produit', JSON.stringify(produitLocalStorage));

      // refresh
      location.reload();
    });
  }
}
modifyQtt();
*/
// Delete product
function deleteProduct() {
  let btn_supprimer = document.querySelectorAll('.deleteItem');

  for (let j = 0; j < btn_supprimer.length; j++) {
    btn_supprimer[j].addEventListener('click', (event) => {
      event.preventDefault();

      // Select product id and color to delete
      let idDelete = produitLocalStorage[j].idProduit;
      let colorDelete = produitLocalStorage[j].couleurProduit;

      produitLocalStorage = produitLocalStorage.filter(
        (el) => el.idProduit !== idDelete || el.couleurProduit !== colorDelete
      );

      localStorage.setItem('produit', JSON.stringify(produitLocalStorage));

      // Alert product has been deleted
      alert('Ce produit a bien été supprimé du panier');
      location.reload();
    });
  }
}
deleteProduct();

// Confirm order \\

// Variable
let firstName = document.getElementById('firstName');
let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
let lastName = document.getElementById('lastName');
let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
let address = document.getElementById('address');
let addressErrorMsg = document.getElementById('addressErrorMsg');
let city = document.getElementById('city');
let cityErrorMsg = document.getElementById('cityErrorMsg');
let email = document.getElementById('email');
let emailErrorMsg = document.getElementById('emailErrorMsg');
let btn = document.getElementById('order');
let input = document.querySelectorAll('input');

// RegExp
let Regex = new RegExp("^[a-zA-Z ,.'-]+$");
let addressRegex = new RegExp(
  '^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+'
);
let emailRegex = new RegExp(
  '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$'
);

// testing event compare with regex
function verify() {
  // FIRST NAME
  function validfirstName() {
    if (firstName.value.length <= 0) {
      firstNameErrorMsg.innerHTML = '';
    } else if (Regex.test(firstName.value)) {
      firstNameErrorMsg.innerHTML = '';
      return true;
    } else {
      firstNameErrorMsg.innerHTML = 'merci de vérifier ce champ !';
      return false;
    }
  }
  firstName.addEventListener('change', () => {
    console.log(firstName.value);
    validfirstName();
  });

  //LAST NAME
  function validlastName() {
    if (lastName.value.length <= 0) {
      lastNameErrorMsg.innerHTML = '';
    } else if (Regex.test(lastName.value)) {
      lastNameErrorMsg.innerHTML = '';
      return true;
    } else {
      lastNameErrorMsg.innerHTML = 'merci de vérifier ce champ !';
      return false;
    }
  }
  lastName.addEventListener('change', () => {
    console.log(lastName.value);
    validlastName();
  });

  // ADDRESS
  function validaddress() {
    if (address.value.length <= 0) {
      addressErrorMsg.innerHTML = '';
    } else if (addressRegex.test(address.value)) {
      addressErrorMsg.innerHTML = '';
      return true;
    } else {
      addressErrorMsg.innerHTML = 'merci de vérifier ce champ !';
      return false;
    }
  }
  address.addEventListener('change', () => {
    console.log(address.value);
    validaddress();
  });

  // CITY
  function validcity() {
    if (city.value.length <= 0) {
      cityErrorMsg.innerHTML = '';
    } else if (Regex.test(city.value)) {
      cityErrorMsg.innerHTML = '';
      return true;
    } else {
      cityErrorMsg.innerHTML = 'merci de vérifier ce champ !';
      return false;
    }
  }
  city.addEventListener('change', () => {
    console.log(city.value);
    validcity();
  });

  // EMAIL
  function validemail() {
    if (email.value.length <= 0) {
      emailErrorMsg.innerHTML = '';
    } else if (emailRegex.test(email.value)) {
      emailErrorMsg.innerHTML = '';
      return true;
    } else {
      emailErrorMsg.innerHTML = 'merci de vérifier ce champ !';
      return false;
    }
  }
  email.addEventListener('change', () => {
    console.log(email.value);
    validemail();
  });

  // if everything is ok with regex then return true otherwise return false
  if (
    validfirstName() &
    validlastName() &
    validaddress() &
    validcity() &
    validemail()
  ) {
    return true;
  } else {
    return false;
  }
}
verify();

/**
 *  create table and add current id in localstorage
 */
function ajoute() {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    // create table
    let id = [];
    console.log(produitLocalStorage);
    if (produitLocalStorage !== null) {
      if (produitLocalStorage.length >= 1) {
        for (let i = 0; i < produitLocalStorage.length; i++) {
          id.push(produitLocalStorage[i].idProduit);
        }
      } else {
        alert('le panier est vide !');
      }
    }

    console.log(id);
    // create contact table and add id table
    const tab = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      },
      products: id,
    };

    const options = {
      method: 'POST',
      body: JSON.stringify(tab),
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
    };

    // send contact objet and table of id from every products when ordering
    console.log(verify);
    if (verify()) {
      if (produitLocalStorage !== null) {
        console.log(produitLocalStorage);
        if (produitLocalStorage.length >= 1) {
          fetch('http://localhost:3000/api/products/order', options)
            .then((response) => response.json())

            .then((res) => {
              console.log(res.orderId);
              localStorage.clear('obj');
              // user is sent on confirmation page
              document.location.href =
                'confirmation.html?orderId=' + res.orderId;
            })

            .catch((error) => {
              console.log('error :' + error);
            });
        }
      }
    }
  });
}
ajoute();
