getKanaps();
getCart();
changeQuantity();
getNumberProduct();
getTotalPrice();

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
                itemQuantity[i].addEventListener('click' , () => changeQuantity(i));
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

// Calculer le prix total du cart
    function getTotalPrice() {
    let cart = getCart();
    let total = 0;
    for (let product of cart) {
        total += product.quantity * product.price;
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    return total;
    }
// Changer la quantité du cart


// ajoutez un eventlistener pour le formulaire.
//  si il est bien rempli faire appel à l'api


//chaine de caractére (spéciaux ou non) obligatoire un @ >> Domain (hotmail/gmail)  .  3caractére (com/fr)  reggex