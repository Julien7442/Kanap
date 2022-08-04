//Initialisation du local storage
let produitLocalStorage = JSON.parse(localStorage.getItem('produit'));
console.table(produitLocalStorage); // affichage tableau produits
const positionEmptyCart = document.querySelector('#cart__items');

function getCart() {
  if (produitLocalStorage === null || produitLocalStorage == 0) {
    const emptyCart = `<p>Votre panier est vide</p>`;
    positionEmptyCart.innerHTML = emptyCart;
  } else {
    for (let produit in produitLocalStorage) {
      // Insertion de l'élément "article"
      let productArticle = document.createElement('article');
      document.querySelector('#cart__items').appendChild(productArticle);
      productArticle.className = 'cart__item';
      productArticle.setAttribute(
        'data-id',
        produitLocalStorage[produit].idProduit
      );

      // Insertion de l'élément "div"
      let productDivImg = document.createElement('div');
      productArticle.appendChild(productDivImg);
      productDivImg.className = 'cart__item__img';

      // Insertion de l'image
      let productImg = document.createElement('img');
      productDivImg.appendChild(productImg);
      productImg.src = produitLocalStorage[produit].imgProduit;
      productImg.alt = produitLocalStorage[produit].altImgProduit;

      // Insertion de l'élément "div"
      let productItemContent = document.createElement('div');
      productArticle.appendChild(productItemContent);
      productItemContent.className = 'cart__item__content';

      // Insertion de l'élément "div"
      let productItemContentTitlePrice = document.createElement('div');
      productItemContent.appendChild(productItemContentTitlePrice);
      productItemContentTitlePrice.className =
        'cart__item__content__titlePrice';

      // Insertion du titre h3
      let productTitle = document.createElement('h2');
      productItemContentTitlePrice.appendChild(productTitle);
      productTitle.innerHTML = produitLocalStorage[produit].nomProduit;

      // Insertion de la couleur
      let ProduitCouleur = document.createElement('p');
      productTitle.appendChild(ProduitCouleur);
      ProduitCouleur.innerHTML = produitLocalStorage[produit].productColor;
      ProduitCouleur.style.fontSize = '20px';

      // Insertion du prix
      let productPrice = document.createElement('p');
      productItemContentTitlePrice.appendChild(productPrice);
      productPrice.innerHTML = produitLocalStorage[produit].prixProduit + ' €';

      // Insertion de l'élément "div"
      let productItemContentSettings = document.createElement('div');
      productItemContent.appendChild(productItemContentSettings);
      productItemContentSettings.className = 'cart__item__content__settings';

      // Insertion de l'élément "div"
      let productItemContentSettingsQuantity = document.createElement('div');
      productItemContentSettings.appendChild(
        productItemContentSettingsQuantity
      );
      productItemContentSettingsQuantity.className =
        'cart__item__content__settings__quantity';

      // Insertion de "Qté : "
      let productQte = document.createElement('p');
      productItemContentSettingsQuantity.appendChild(productQte);
      productQte.innerHTML = 'Qté : ';

      // Insertion de la quantité
      let productQuantity = document.createElement('input');
      productItemContentSettingsQuantity.appendChild(productQuantity);
      productQuantity.value = produitLocalStorage[produit].quantiteProduit;
      productQuantity.className = 'itemQuantity';
      productQuantity.setAttribute('type', 'number');
      productQuantity.setAttribute('min', '1');
      productQuantity.setAttribute('max', '100');
      productQuantity.setAttribute('name', 'itemQuantity');

      // Insertion de l'élément "div"
      let productItemContentSettingsDelete = document.createElement('div');
      productItemContentSettings.appendChild(productItemContentSettingsDelete);
      productItemContentSettingsDelete.className =
        'cart__item__content__settings__delete';

      // Insertion de "p" supprimer
      let productSupprimer = document.createElement('p');
      productItemContentSettingsDelete.appendChild(productSupprimer);
      productSupprimer.className = 'deleteItem';
      productSupprimer.innerHTML = 'Supprimer';
    }
  }
}
getCart();

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

// VALIDATION DE COMMANDE \\

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

/**
 * écoute les évènements sur les inputs et les compares au regex
 * @returns boolean
 */
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

  // si tous les champ son valide apres verification des regex renvoie true sinon renvoie false
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
 *  crée un tableau et y ajoute les id des produit present dans localStorage
 */
async function ajoute() {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    //crée un tableau avec les id des produit present dans localStorage
    let id = [];
    console.log(produitLocalStorage);
    if (produitLocalStorage !== null) {
      if (produitLocalStorage.length >= 1) {
        for (let i = 0; i < produitLocalStorage.length; i++) {
          id.push(produitLocalStorage[i]._id);
        }
      } else {
        alert('le panier est vide !');
      }
    }

    console.log(id);
    // crée un tableau contact et y ajoute le tableau des produit
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
    // envoie de l'objet contact et du tableau des id de chaque produit present lors de la commande
    if (produitLocalStorage !== null) {
      if (produitLocalStorage.length >= 1) {
        fetch('http://localhost:3000/api/products/order', options)
          .then((response) => response.json())

          .then((res) => {
            console.log(res.orderId);

            if (verify()) {
              localStorage.setItem('orderId', res.orderId);
              document.location.href = 'confirmation.html?id=' + res.orderId;
              console.log(verify());
            } else {
              firstNameErrorMsg.innerHTML = 'merci de renseigner ce champ !';
              lastNameErrorMsg.innerHTML = 'merci de renseigner ce champ !';
              addressErrorMsg.innerHTML = 'merci de renseigner ce champ !';
              cityErrorMsg.innerHTML = 'merci de renseigner ce champ !';
              emailErrorMsg.innerHTML = 'merci de renseigner ce champ !';
            }
          })

          .catch((error) => {
            console.log('error :' + error);
          });
      }
    }
  });
}
ajoute();
