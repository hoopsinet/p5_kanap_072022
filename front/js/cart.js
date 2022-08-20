getKanaps();
getCart();
const sendOrder = document.querySelector("#order");
sendOrder.addEventListener('click', order); 



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
      
      document.querySelector(`#cart__items`).innerHTML += ` <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
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
            document.querySelector("#totalPrice").textContent = totalPrices
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
        quantity[i].addEventListener('change', (e) => {
          cart[i].quantity = parseInt(e.target.value);
          localStorage.setItem('cart', JSON.stringify(cart));
          if (cart[i].quantity <= 0) {
            removeFromCart();
            getKanaps()
          }
          getKanaps();
        }) 
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
      if (e.target.value.match(/^[a-z A-Z éèê-]{3,25}$/)) {
          firstNameErrorMsg.innerHTML = "";
          valueFirstName = e.target.value;
          console.log("ça marche");
          console.log(valueFirstName);
      } else {
          firstNameErrorMsg.innerHTML = "le prénom ne doit pas contenir de caractère spécial ou de chiffre";
          valueFirstName = null
          console.log("pas assez ou trop de lettres");
      }
  });

lastName.addEventListener("input" , function (e) {
  // ********** e.target = à LastName.value *********
  valueLastName;
  if (e.target.value.match(/^[a-z A-Z éèê-]{3,25}$/)) {
      lastNameErrorMsg.innerHTML = "";
      valueLastName = e.target.value;
      console.log("ça marche");
      console.log(valueLastName);
  } else {
      lastNameErrorMsg.innerHTML = "le prénom ne doit pas contenir de caractère spécial ou de chiffre";
      valueLastName = null
      console.log("pas assez ou trop de lettres");
  }
});

  address.addEventListener("input" , function (e) {
    // ********** e.target = à address value *********
      valueAddress;
      if (e.target.value.match(/^[0-9]{1,3} [a-z A-Z éèê]{3,25}$/)) {
          addressErrorMsg.innerHTML = "";
          valueAddress = e.target.value;
          console.log("ça marche");
          console.log(valueAddress);
      } else {
          addressErrorMsg.innerHTML = "l'adresse commence par des chiffres ensuite par des lettres, pas de caractére spéciaux";
          valueAddress = null
          console.log("pas assez ou trop de lettres");
      }
  });

    city.addEventListener("input" , function (e) {
      // ********** e.target = à city.value *********
        valueCity;
        if (e.target.value.match(/^[a-z A-Z éèê-]{3,25}$/)) {
          cityErrorMsg.innerHTML = "";
          valueCity = e.target.value;
          console.log("ça marche");
          console.log(valueCity);
      } else {
          cityErrorMsg.innerHTML = "la ville doit contenir entre 3 à 25 caractéres";
          valueCity = null
          console.log("pas assez ou trop de lettres");
      }
  });
         
      email.addEventListener("input" , (e) => {
        if (e.target.value.length == 0) {
          emailErrorMsg.innerHTML = ""
          valueEmail = null;
          console.log(valueEmail);
        }
        // ecriture avec @ avec . [Fr.com.etc...]
        else if (e.target.value.match(/^[a-z0-9.-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/)) {
          emailErrorMsg.innerHTML = ""
          valueEmail = e.target.value;
          console.log(valueEmail);
        }
        // 1 seule conditions pour toutes les erreurs
        else if (!e.target.value.match(/^[a-z0-9.-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/) && !e.target.value.length == 0) {
          emailErrorMsg.innerHTML = "Email incorrect ex: hoopsi@gmail.com"
          valueEmail = null;
        }
      });



 function order(e) {
 e.preventDefault();

if (!firstName.value || !lastName.value || !address.value || !city.value || !email.value) {
  return
}
let products = getCart();
let productsList = []
for (product of products) {
  productsList.push(product.id)
}

const push = {
  contact : {
    firstName : firstName.value,
    lastName : lastName.value, 
    address : address.value,
    city : city.value,
    email : address.value,
    },
  products : productsList
};
console.log(push)

const request = fetch ( 'http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json',
        },  
        body: JSON.stringify(push),
    })
    .then((response) => response.json()) 
      .then((data) => {
        document.location.href = './confirmation.html?orderId=' + data.orderId + '';
      })
    }
 