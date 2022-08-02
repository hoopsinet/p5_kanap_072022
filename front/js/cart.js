getKanaps();
getCart();
// document.querySelector('.deleteItem').addEventListener('click', removeFromCart);
getNumberProduct();
getTotalPrice();

//  On récupére un " item "
function getCart() {
     let cart = localStorage.getItem("cart");
     if(cart == null) {
        return [];
   } else {
    return JSON.parse(cart)
    }
 }
 function getKanaps() {
    return fetch (`http://localhost:3000/api/products`)
    .then (function (response) {
        return response.json()
    })
    .then (function (kanaps) {
        displayCart(kanaps)
    })
    .catch (function (error) {
        alert (error)
    })
 }

 function displayCart(kanaps){
    let cart = getCart();
    for (let kanap of kanaps) {  
        if(cart) {
        // pour chaque produit du cart
            for (let i=0 ; i < cart.length ; i++) {
                let product = cart[i];  
                let index = cart.find(product => product.id === kanap._id)
                    if(index) {
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
                                                                            </article>`
                    } 
            }
        }
    }

}

// //  REtirer du cart
// function removeFromCart(product){
//     let cart = getCart();
//     cart = cart.filter(p => p.id != product.id);
//     localStorage.setItem('cart'), JSON.stringify(cart)
//     displayCart(kanap)
// }

// // Calculer le total de produit dans le cart
//     function getNumberProduct() {
//     let cart = getCart()
//     let number = 0;
//     for (let product of cart) {
//         number += product.quantity;
//     }
//     return number;
//     }
// // Calculer le prix total du cart
//     function getTotalPrice() {
//     let cart = getCart();
//     let number = 0;
//     for (let product of cart) {
//         number += product.quantity * product.price;
//         localStorage.setItem('cart')
//     }
//     return number;
//     }
//     // Changer la quantité du cart
// function changeQuantity(product,quantity) {
//     let cart = getCart();
//     let foundProduct = cart.find(p => p.id == product.id);
//     if(foundProduct != undefined) {
//         foundProduct.quantity += quantity;
//         if(foundProduct.quantity <= 0) {
//             removeFromCart(foundProduct);
//         }else{
//             saveCart(cart)
//         }
//     }
// }

// ajoutez un eventlistener pour le formulaire.
//  si il est bien rempli faire appel à l'api
