getKanaps();
getCart();
changeQuantity();
getNumberProduct();

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
    let prices = [];
    // pour chaque produit du cart
    let quantity = 0;
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
            document.querySelector("#totalPrice").textContent += totalPrices
  }
  let deleteItem = document.querySelectorAll(".deleteItem");
  for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].addEventListener("click", () => removeFromCart(i));

let itemQuantity = document.querySelectorAll(".itemQuantity");
            for(let i = 0 ; i < itemQuantity.length ; i++) {
                itemQuantity[i].addEventListener('change' , () => changeQuantity(i));
            }
}
}
//  REtirer du cart
async function removeFromCart(product) {
  let cart = getCart();
  cart.splice(product, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  getKanaps();
}
// Afficher le total d'article dans le panier
let totalQuantity = getNumberProduct();
document.querySelector("#totalQuantity").textContent += totalQuantity;
//  Fonction qui enclenche l'addition du total des produits dans le panier
 function getNumberProduct() {
  let cart = getCart()
  let number = 0;
  for (let product of cart) {
      number += product.quantity;
  }
  return number;
  }

// Ne marche pas ! (fonctionne que sur le premier)
function changeQuantity() {
  let cart = getCart();
  let quantity = document.querySelectorAll(".itemQuantity")
      for(let i = 0 ; i < quantity.length ; i++) {
          quantity = parseInt(quantity[i].value);
          cart[i].quantity = quantity;
          localStorage.setItem('cart', JSON.stringify(cart)); 
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

let valueFirstName, valueLastName, valueAddress, valueCity, valueEmail;
//************  Configuration pour l'input PRENOM ************
firstName.addEventListener("input" , function (e) {
// ********** e.target = à FirstName.value *********
  valueFirstName;
  if (e.target.value.length == 0) {
    console.log("rien");
    firstNameErrorMsg.innerHTML = "";
    valueFirstName = null;
    console.log(valueFirstName);
  }   else if (e.target.value.length < 3 || e.target.value.length > 25){
    firstNameErrorMsg.innerHTML = "le prénom doit contenir entre 3 à 25 caractéres";
      valueFirstName = null
      console.log("pas assez ou trop de lettres");
}
     if (e.target.value.match(/^[a-z A-Z éèê-]{3,25}$/)) {
    firstNameErrorMsg.innerHTML = "";
    valueFirstName = e.target.value;
    console.log("ça marche");
    console.log(valueFirstName);
  }
  if (
    // Different  " ! "
    !e.target.value.match(/^[a-z A-Z éèê-]{3,25}$/) && 
    e.target.value.length > 3 && 
    e.target.value.length < 25
    ) {
      firstNameErrorMsg.innerHTML = "le prénom ne doit pas contenir de caractère spécial ou de chiffre"
      valueFirstName = null;
      console.log("Ne correspond pas à nos attentes");
    }

});

lastName.addEventListener("input" , function (e) {
  // ********** e.target = à LastName.value *********
    valueLastName;
    if (e.target.value.length == 0) {
      console.log("rien");
      errorLastName.innerHTML = "";
      valueLastName = null;
      console.log(valueLastName);
    }   else if (e.target.value.length < 3 || e.target.value.length > 25){
      lastNameErrorMsg.innerHTML = "le nom doit contenir entre 3 à 25 caractéres";
        valueLastName = null
        console.log("pas assez ou trop de lettres");
  }
       if (e.target.value.match(/^[a-z A-Z éèê-]{3,25}$/)) {
      lastNameErrorMsg.innerHTML = "";
      valueLastName = e.target.value;
      console.log("ça marche");
      console.log(valueLastName);
    }
    if (
      // Different  " ! "
      !e.target.value.match(/^[a-z A-Z éèê-]{3,25}$/) && 
      e.target.value.length > 3 && 
      e.target.value.length < 25
      ) {
        lastNameErrorMsg.innerHTML = "le nom ne doit pas contenir de caractère spéciaux ou de chiffre"
        valueLastName = null;
        console.log("Ne correspond pas à nos attentes");
      }
  
  });
  
  address.addEventListener("input" , function (e) {
    // ********** e.target = à address value *********
      valueAddress;
      if (e.target.value.length == 0) {
        console.log("rien");
        errorAddress.innerHTML = "";
        valueAddress = null;
        console.log(valueAddress);
      }   else if (e.target.value.length < 3 || e.target.value.length > 35){
        addressErrorMsg.innerHTML = "l'adresse doit contenir entre 3 à 35 caractéres";
          valueAddress = null
          console.log("pas assez ou trop de lettres");
    }
         if (e.target.value.match(/^[0-9]{1,3} [a-z A-Z éèê]{3,25}$/)) {
        addressErrorMsg.innerHTML = "";
        valueAddress = e.target.value;
        console.log("ça marche");
        console.log(valueAddress);
      }
      if (
        // Different  " ! "
        !e.target.value.match(/^[0-9]{1,3} [a-z A-Z éèê]{3,25}$/) && 
        e.target.value.length > 3 && 
        e.target.value.length < 35
        ) {
          addressErrorMsg.innerHTML = "l'adresse commence par des chiffres ensuite par des lettres, pas de caractére spéciaux"
          valueAddress = null;
          console.log("Ne correspond pas à nos attentes");
        }
    
    });
    city.addEventListener("input" , function (e) {
      // ********** e.target = à city.value *********
        valueCity;
        if (e.target.value.length == 0) {
          console.log("rien");
          cityErrorMsg.innerHTML = "";
          valueCity = null;
          console.log(valueCity);
        }   else if (e.target.value.length < 3 || e.target.value.length > 25){
          cityErrorMsg.innerHTML = "la ville doit contenir entre 3 à 25 caractéres";
            valueCity = null
            console.log("pas assez ou trop de lettres");
      }
           if (e.target.value.match(/^[\s] [a-z A-Z éèê-]{3,25}$/)) {
          cityErrorMsg.innerHTML = "";
          valueCity = e.target.value;
          console.log("ça marche");
          console.log(valueCity);
        }
        if (
          // Different  " ! "
          !e.target.value.match(/^[\s] [a-z A-Z éèê-]{3,25}$/) && 
          e.target.value.length > 3 && 
          e.target.value.length < 25
          ) {
            cityErrorMsg.innerHTML = "le nom ne doit pas contenir de caractère spéciaux ou de chiffre"
            valueCity = null;
            console.log("Ne correspond pas à nos attentes");
          }
      
      });

      email.addEventListener("input" , (e) => {
        if (e.target.value.length == 0) {
          emailErrorMsg.innerHTML = ""
          valueEmail = null;
          console.log(valueEmail);
        }
        // ecriture avec @ avec . [Fr.com.etc...]
        else if (e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
          emailErrorMsg.innerHTML = ""
          valueEmail = e.target.value;
          console.log(valueEmail);
        }
        // 1 seule conditions pour toutes les erreurs
        if (!e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&  e.target.value.length == 0) {
          emailErrorMsg.innerHTML = "Email incorrect ex: hoopsi@gmail.com"
          valueEmail = null;
        }
      });


/// const button = document.querySelector("#order");
// button.addEventListener('click', () => validation());

// firstName.addEventListener("input", function (e)) {

// }
// // A valider la commande donc envoyer à l'api les données
// // function validation() {
  
// // }
