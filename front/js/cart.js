getKanaps();
getCart();
const sendOrder = document.querySelector("#order");
sendOrder.addEventListener("click", order);

//  On récupére un " item "
function getCart() {
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}
function getKanaps() {
  return fetch(`http://localhost:3000/api/products`)
    .then(function (response) {
      return response.json();
    })
    .then(function (kanaps) {
      displayCart(kanaps);
    })
    .catch(function (error) {
      alert(error);
    });
}

function displayCart(kanaps) {
  let cart = getCart();
  document.querySelector(`#cart__items`).innerHTML = ``;
  if (cart) {
    // Initialisation d'un tableau dans lequel je retrouve les prix totaux des produits. (quantité * prix)
    let prices = [0];
    // pour chaque produit du cart
    for (let i = 0; i < cart.length; i++) {
      let product = cart[i];
      let kanap = kanaps.filter((kanap) => kanap._id == product.id)[0];

      document.querySelector(
        `#cart__items`
      ).innerHTML += ` <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
               <div class="cart__item__img">
               <img src="${kanap.imageUrl}" alt="Photographie d'un canapé">
               </div>
               <div class="cart__item__content">
               <div class="cart__item__content__description">
               <h2>${kanap.name}</h2>
               <p>${product.color}</p>
               <p>${kanap.price}</p>
               </div>
               <div class="cart__item__content__settings">
               <div class="cart__item__content__settings__quantity">
               <p>Qté : </p>
               <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
               </div>
                                                                                    <div class="cart__item__content__settings__delete">
                                                                                    <p class="deleteItem">Supprimer</p>
                                                                                    </div>
                                                                                </div>
                                                                                </div>
                                                                            </article>`;

      let price = product.quantity * kanap.price;
      prices.push(price);
    }
    // Methode reduce() pour calculer le total des valeurs dans le tableau [prices]
    let total = (accumulator, current) => accumulator + current;
    let totalPrices = prices.reduce(total);
    document.querySelector("#totalPrice").textContent = totalPrices;
  }
  let deleteItem = document.querySelectorAll(".deleteItem");
  for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].addEventListener("click", () => removeFromCart(i));
  }

  // Afficher le total d'article dans le panier
  let totalQuantity = getNumberProduct();
  document.querySelector("#totalQuantity").textContent = totalQuantity;

  changeQuantity();
}
//  REtirer du cart
async function removeFromCart(product) {
  let cart = getCart();
  cart.splice(product, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  getKanaps();
}
//  Fonction qui enclenche l'addition du total des produits dans le panier
function getNumberProduct() {
  let cart = getCart();
  let number = 0;
  for (let product of cart) {
    number += product.quantity;
  }
  return number;
}

// Ne marche pas ! (fonctionne que sur le premier)
function changeQuantity() {
  let cart = getCart();
  let quantity = document.querySelectorAll(".itemQuantity");
  for (let i = 0; i < quantity.length; i++) {
    quantity[i].addEventListener("change", (e) => {
      cart[i].quantity = parseInt(e.target.value);
      localStorage.setItem("cart", JSON.stringify(cart));
      if (cart[i].quantity <= 0) {
        removeFromCart();
        getKanaps();
      }
      getKanaps();
    });
  }
}

// ************************  FORMULAIRE  *************************

// ajoutez un eventlistener pour le formulaire.
//  si il est bien rempli faire appel à l'api

// chaine de caractére (spéciaux ou non) obligatoire un @ >> Domain (hotmail/gmail)  .  3caractére (com/fr)  reggex
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
firstName.addEventListener("change", function () {
  validFirstName(this);
});
lastName.addEventListener("change", function () {
  validLastName(this);
});
address.addEventListener("change", function () {
  validAddress(this);
});
city.addEventListener("change", function () {
  validCity(this);
});
email.addEventListener("change", function () {
  validEmail(this);
});
let valueFirstName, valueLastName, valueAddress, valueCity, valueEmail;

// Fonction qui verifie le prénom du formulaire
const validFirstName = function (inputFirstName) {
  let regexFirstName = new RegExp("^[a-zA-Z]+(([,.éèâ -][a-zA-Z ])?[a-zA-Z])$");
  let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");

  if (regexFirstName.test(inputFirstName.value) == true) {
    firstNameErrorMsg.innerHTML = "";
    return true;
  } else {
    firstNameErrorMsg.innerHTML = "Prénom invalide";
    return false;
  }
};
//  Fonction qui verifie le Nom du formulaire
const validLastName = function (inputLastName) {
  let regexLastName = new RegExp("^[a-zA-Z]+(([,.éèâ -][a-zA-Z ])?[a-zA-Z])$");
  let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");

  if (regexLastName.test(inputLastName.value) == true) {
    lastNameErrorMsg.innerHTML = "";
    return true;
  } else {
    lastNameErrorMsg.innerHTML = "Nom invalide";
    return false;
  }
};
// Fonction qui vérifie l'addresse
const validAddress = function (inputAddress) {
  let regexAddress = new RegExp("^[0-9]{1,3} [a-z A-Z éèê]{3,25}$");
  let addressErrorMsg = document.querySelector("#addressErrorMsg");

  if (regexAddress.test(inputAddress.value) == true) {
    addressErrorMsg.innerHTML = "";
    return true;
  } else {
    addressErrorMsg.innerHTML =
      "commencer par des chiffres,ensuite par des lettres, pas de caractére spéciaux";
    return false;
  }
};
// Fonction du formulaire qui vérifie pour la Ville
const validCity = function (inputCity) {
  let regexCity = new RegExp("^[a-z A-Z éèê-]{3,25}$");
  let cityErrorMsg = document.querySelector("#cityErrorMsg");

  if (regexCity.test(inputCity.value) == true) {
    cityErrorMsg.innerHTML = "";
    return true;
  } else {
    cityErrorMsg.innerHTML = "la ville doit contenir entre 3 à 25 caractéres";
    return false;
  }
};
// Fonction qui verifie l'email du formulaire
const validEmail = function (inputEmail) {
  let regexEmail = new RegExp("^[a-z0-9.-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$");
  let emailErrorMsg = document.querySelector("#emailErrorMsg");

  if (regexEmail.test(inputEmail.value) == true) {
    emailErrorMsg.innerHTML = "";
    return true;
  } else {
    emailErrorMsg.innerHTML = "Email incorrect ex: hoopsi@gmail.com";
    return false;
  }
};
function order(e) {
  e.preventDefault();
  if (
    validFirstName(firstName) == false ||
    validLastName(lastName) == false ||
    validAddress(address) == false ||
    validCity(city) == false ||
    validEmail(email) == false
  ) {
    return false;
  }
  let products = getCart();
  let productsList = [];
  for (product of products) {
    productsList.push(product.id);
  }

  const push = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: address.value,
    },
    products: productsList,
  };
  console.log(push);

  const request = fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(push),
  })
    .then((response) => response.json())
    .then((data) => {
      document.location.href =
        "./confirmation.html?orderId=" + data.orderId + "";
    });
  localStorage.clear();
}
