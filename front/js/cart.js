document.querySelector('#addToCart').addEventListener('click', addToCart); 
getCart();
displayCart();
document.querySelector('.deleteItem').addEventListerner('click', removeFromCart);
getNumberProduct();
getTotalPrice();


function addToCart () {
//    on oblige la personne à remplir la couleur et la quantité
    if (!document.querySelector(`#colors`).value || !document.querySelector(`#quantity`).value) {
    return alert(`aucun champ renseigné`) 
    }
    // on rappelle notre constant kanapId de cart.js
    const urlParams = new URLSearchParams(window.location.search);
    const kanapId = urlParams.get('id');
    let item = {
        id: kanapId,
        color: document.querySelector('#colors').value,
        quantity: parseInt(document.querySelector('#quantity').value),
        img: document.querySelector('.item__img').lastChild.src,
        name : document.querySelector('#title').textContent,
        price : parseInt(document.querySelector('#price').textContent)

    }
    console.log(item.price)

    let cart = localStorage.getItem('cart')
    if (!cart) {
        cart = []
    } else {
        cart = JSON.parse(cart);   
    }
    console.log(cart);
    // Rechercher la position d'un element existant du cart
    let index = cart.findIndex(elt => elt.color === item.color && elt.id === item.id)
    if (index !== -1) {
        cart[index].quantity += item.quantity
    }else {
        cart.push(item);
    } 
    localStorage.setItem('cart', JSON.stringify(cart));
    return alert ('Votre produit a bien été ajouté au cart !');
}


//  On récupére un " item "
function getCart() {
     let cart = localStorage.getItem("cart")
     if(cart == null){
        return [];
   }else{
    return JSON.parse(cart);
    }
 }

 function displayCart(product){
    let cart = getCart();

    if(!cart) {
        // pour chaque produit du cart
        for (let i=0 ; i < cart.lenght ; i++) {

            let product = cart[i];
            document.querySelector(`#cart__items`).innerHTML += ` <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
            <div class="cart__item__img">
              <img src="../images/${product.img}" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${product.color}</p>
                <p>${product.price}</p>
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


//  REtirer du cart
function removeFromCart(product){
    let cart = getCart();
    cart = cart.filter(p => p.id != product.id);
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
// Calculer le prix total du cart
    function getTotalPrice() {
    let cart = getCart();
    let number = 0;
    for (let product of cart) {
        number += product.quantity * product.price;
    }
    return number;
    }
    // Changer la quantité du cart
function changeQuantity(product,quantity) {
    let cart = getCart();
    let foundProduct = cart.find(p => p.id == product.id);
    if(foundProduct != undefined) {
        foundProduct.quantity += quantity;
        if(foundProduct.quantity <= 0) {
            removeFromCart(foundProduct);
        }else{
            saveCart(cart)
        }
    }
}

// //---------------------------
//     // fonction qui permet d'afficher les kanaps du cart
//     function displayCart(product){
//         let cart = getCart();

//         if(!cart) {
//             // pour chaque produit du cart
//             for (let i=0 ; i < cart.lenght ; i++) {

//                 let product = cart[i];

//                 // on sélectionne la section #cart__item et on va créer les élements voulu dedans
//                 const cartItem = document.querySelector("#cart__items");
        
//                 // on crée un <article>
//                 let article = document.createElement("article");
//                 article.classList.add('cart__item');
//                 article.setAttribute('data-id', 'product.id');
//                 article.setAttribute('data-color', 'product.color');

//                 // on crée la div qui va contenir <img>
//                 let articleImg = document.createElement("div");
//                 articleImg.classList.add('cart__item__img');
                
//                 // on crée <img src=...> 
//                 let img = document.createElement("img");
//                 img.src = product.img;
//                 img.setAttribute('alt', 'Photographie d\'un canapé' )
                
//                 //on imbrique les éléments
//                 cartItem.appendChild(article);
//                 article.appendChild(articleImg);
//                 article.appendChild()

//                 articleImg.appendChild(img);                
//             }
//         }
//     } 
// //---------






