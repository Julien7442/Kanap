import getArticle from "./products.js";
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

/**
 * affiche les informations des produits présent dans le panier
 * @return ajoute les élément un par un dans le DOM
 */
async function addCard() {
  console.log(produitLocalStorage);
  // si il y a des produit présent dans local storage
  if (produitLocalStorage !== null) {
    // Tri afin d'afficher de façon regroupé les meme canapé ayant des différentes couleurs.
    produitLocalStorage = produitLocalStorage.sort((produit1, produit2) => {
      if (produit1.idProduit > produit2.idProduit) {
        return 1;
      } else if (produit1.idProduit < produit2.idProduit) {
        return -1;
      }
      return 0;
    });
    let section = document.querySelector("#cart__items");
    // récupère la balise l'id totalQuantity
    let quantityTotalHTML = document.getElementById("totalQuantity");
    let quantityTotal = 0;
    // récupère la balise totalPrice
    let prixTotalHTML = document.getElementById("totalPrice");
    let prixTotal = 0;

    // récupère les produit et ses information un par un dans une variable nommée key
    for (let produit of produitLocalStorage) {
      // récupère l'id du produit dans local Storage
      let id = produit.idProduit;

      // récupère les information du produit en passent l'id du produit en paramètre
      await getArticle(id).then(function (produitApi) {
        // créer un balise article
        let Article = document.createElement("article");
        // récupère le prix du produit retourner par l'api
        let Price = produitApi.price;
        // ajoute l'élément Article comme enfants de l'élément section
        section.appendChild(Article);
        // ajout de la classe "cart__item"
        Article.classList.add("cart__item");
        // ajout de l'attribut "data-id"
        Article.setAttribute("data-id", `${produit.idProduit}`);
        // ajout de l'attribut data-color
        Article.setAttribute("data-color", `${produit.productColor}`);
        // ajout des éléments sous format html
        Article.innerHTML = `
          <div class="cart__item__img">
            <img src="${produit.imgProduit}" alt="${produit.altImgProduit}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${produit.nomProduit}</h2>
              <p>${produit.productColor}</p>
              <p>${Price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.quantiteProduit}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p id="deleteItem" class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        `;

        // Calcul du prix total et la quantité total
        const prixTotalUnCanape = produit.quantiteProduit * Price;
        quantityTotal += produit.quantiteProduit;
        quantityTotalHTML.innerText = quantityTotal;
        prixTotal += prixTotalUnCanape;
        prixTotalHTML.innerText = prixTotal;

        // ajout des event listeners après l'insertion des produits
        // Event listener pour le bouton de suppression
        Article.querySelector(".deleteItem").addEventListener(
          "click",
          (event) => {
            event.preventDefault();
            deleteProduct(produit.idProduit, produit.productColor);
          }
        );

        // Event listener pour le champ de modification de la quantité
        Article.querySelector(".itemQuantity").addEventListener(
          "change",
          (event) => {
            updateProductQuantity(
              produit.idProduit,
              produit.productColor,
              event.target.value
            );
          }
        );
      });
    }
  } else {
    let titre_Alert = document.getElementById("cart__items");
    titre_Alert.innerHTML = "<h1>Le panier est vide ! </h1>";
    return;
  }
}
addCard();

// Delete product
function deleteProduct(idDelete, colorDelete) {
  console.log(colorDelete);
  console.log(idDelete);
  // Select product id and color to delete
  produitLocalStorage = produitLocalStorage.filter(
    (el) => el.idProduit !== idDelete || el.productColor !== colorDelete
  );

  localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

  // Alert product has been deleted
  alert("Ce produit a bien été supprimé du panier");
  location.reload();
}

// Update product quantity
function updateProductQuantity(productId, productColor, quantity) {
  // First find the product in the local storage
  const product = produitLocalStorage.find(
    (el) => el.idProduit == productId && el.productColor == productColor
  );
  // Update it's quantity
  product.quantiteProduit = parseInt(quantity);
  localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

  location.reload();
}

// Confirm order \\

// Variable
let firstName = document.getElementById("firstName");
let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
let lastName = document.getElementById("lastName");
let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
let address = document.getElementById("address");
let addressErrorMsg = document.getElementById("addressErrorMsg");
let city = document.getElementById("city");
let cityErrorMsg = document.getElementById("cityErrorMsg");
let email = document.getElementById("email");
let emailErrorMsg = document.getElementById("emailErrorMsg");
let btn = document.getElementById("order");
let input = document.querySelectorAll("input");

// RegExp
let Regex = new RegExp("^[a-zA-Z ,.'-]+$");
let addressRegex = new RegExp(
  "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
);
let emailRegex = new RegExp(
  "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
);

// testing event compare with regex
function verify() {
  // FIRST NAME
  function validfirstName() {
    if (firstName.value.length <= 0) {
      firstNameErrorMsg.innerHTML = "";
    } else if (Regex.test(firstName.value)) {
      firstNameErrorMsg.innerHTML = "";
      return true;
    } else {
      firstNameErrorMsg.innerHTML = "merci de vérifier ce champ !";
      return false;
    }
  }
  firstName.addEventListener("change", () => {
    console.log(firstName.value);
    validfirstName();
  });

  //LAST NAME
  function validlastName() {
    if (lastName.value.length <= 0) {
      lastNameErrorMsg.innerHTML = "";
    } else if (Regex.test(lastName.value)) {
      lastNameErrorMsg.innerHTML = "";
      return true;
    } else {
      lastNameErrorMsg.innerHTML = "merci de vérifier ce champ !";
      return false;
    }
  }
  lastName.addEventListener("change", () => {
    console.log(lastName.value);
    validlastName();
  });

  // ADDRESS
  function validaddress() {
    if (address.value.length <= 0) {
      addressErrorMsg.innerHTML = "";
    } else if (addressRegex.test(address.value)) {
      addressErrorMsg.innerHTML = "";
      return true;
    } else {
      addressErrorMsg.innerHTML = "merci de vérifier ce champ !";
      return false;
    }
  }
  address.addEventListener("change", () => {
    console.log(address.value);
    validaddress();
  });

  // CITY
  function validcity() {
    if (city.value.length <= 0) {
      cityErrorMsg.innerHTML = "";
    } else if (Regex.test(city.value)) {
      cityErrorMsg.innerHTML = "";
      return true;
    } else {
      cityErrorMsg.innerHTML = "merci de vérifier ce champ !";
      return false;
    }
  }
  city.addEventListener("change", () => {
    console.log(city.value);
    validcity();
  });

  // EMAIL
  function validemail() {
    if (email.value.length <= 0) {
      emailErrorMsg.innerHTML = "";
    } else if (emailRegex.test(email.value)) {
      emailErrorMsg.innerHTML = "";
      return true;
    } else {
      emailErrorMsg.innerHTML = "merci de vérifier ce champ !";
      return false;
    }
  }
  email.addEventListener("change", () => {
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
  btn.addEventListener("click", (e) => {
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
        alert("le panier est vide !");
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
      method: "POST",
      body: JSON.stringify(tab),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    };

    // send contact objet and table of id from every products when ordering
    console.log(verify);
    if (verify()) {
      if (produitLocalStorage !== null) {
        console.log(produitLocalStorage);
        if (produitLocalStorage.length >= 1) {
          fetch("http://localhost:3000/api/products/order", options)
            .then((response) => response.json())

            .then((res) => {
              console.log(res.orderId);
              localStorage.clear("obj");
              // user is sent on confirmation page
              document.location.href =
                "confirmation.html?orderId=" + res.orderId;
            })

            .catch((error) => {
              console.log("error :" + error);
            });
        }
      } else {
        alert("Merci d'ajouter au moins un produit a votre panier !");
      }
    } else {
      alert("Merci de vérifier vos champs !");
    }
  });
}
ajoute();
