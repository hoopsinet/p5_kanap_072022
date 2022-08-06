getKanaps();
getCart();    
changeQuantity();
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
  
        if(cart) {
        // pour chaque produit du cart
            for (let i=0 ; i < cart.length ; i++) {
                let product = cart[i];  
                let kanap = kanaps.filter((kanap) => kanap._id == product.id)[0]
                
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
        
    
            let deleteItem = document.querySelectorAll('.deleteItem');
            for(let i = 0 ; i < deleteItem.length ; i++) {
                deleteItem[i].addEventListener('click' , () => removeFromCart(i));
            }
}


//  REtirer du cart
async function removeFromCart(product) {
    let cart = getCart();
    cart.splice(product , 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    document.location.reload();  
}
async function changeQuantity(product, quantity) {
    //je récupère le contenu du localStorage (le panier =cart)
    let cart = getCart();

    // (i = index j'initialise à 0 et le travail se fait temps qu'il y a des produits dans le panier)
    for(let i = 0 ; i < cart.length ; i++) {
        // un produit e, particulier dans le panier, i étant sa place dans le panier = son index
        let product = cart[i];
        // la quantité du produit dans le panier (ou localStorage)
        let quantity = product.quantity;
        // récupère le "bouton" selon son index qui permet à l'utilisateur de changer la quantité
        let quantityChange = document.querySelectorAll('.itemQuantity')[i];
        //la valeur qui a pu (ou non) être changée
        let userQuantityChange = quantityChange.value;
        // retrouver dans le panier(localStorage) l'id correspondant au produit dont la quantité est modifiable
        let foundProduct = cart.find(p => p.id == product.id);

        if(foundProduct) {
            quantity = userQuantityChange;
            if(userQuantityChange <= 0) {
                removeFromCart(foundProduct);
            }
                localStorage.setItem('cart', JSON.stringify(cart));
                document.location.reload();  
        }
    }
}

// Calculer le total de produit dans le cart
    function getNumberProduct() {
    let cart = getCart()
    let number = 0;
    for (let product of cart) {
        number += product.quantity;
    }
    return number;
    }
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
    // Changer la quantité du cart


//  REtirer du cart
// function removeFromCart(product){
//     let cart = getCart();
//     cart = cart.filter(p => p.id != product.id);
//     localStorage.setItem('cart'), JSON.stringify(cart)
//     displayCart(kanap)
// }


// ajoutez un eventlistener pour le formulaire.
//  si il est bien rempli faire appel à l'api
