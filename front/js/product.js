// ID qui est dans l'url |
// fonction qui recup tous les kanaps
function getkanaps() {
  const urlParams = new URLSearchParams(window.location.search);
  const kanapId = urlParams.get("id");
  return fetch(`http://localhost:3000/api/products/${kanapId}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (kanap) {
      displaykanap(kanap);
    })
    .catch(function (error) {
      alert(error);
    });
}
// fonction qui permet d'afficher les kanaps
function displaykanap(kanap) {
  const image = document.querySelector(".item__img");
  const title = document.querySelector("#title");
  const price = document.querySelector("#price");
  const description = document.querySelector("#description");
  const colors = document.querySelector("#colors");

  let img = document.createElement("img");
  img.src = kanap.imageUrl;

  image.appendChild(img);
  title.textContent = kanap.name;
  price.textContent = kanap.price;
  description.textContent = kanap.description;

  kanap.colors.forEach((color) => {
    let option = document.createElement("option");
    option.value = color;
    option.textContent += color;
    colors.appendChild(option);
  });
}
function addToCart() {
  //    on oblige la personne à remplir la couleur et la quantité
  if (
    !document.querySelector(`#colors`).value ||
    !document.querySelector(`#quantity`).value ||
    document.querySelector(`#quantity`).value == 0
  ) {
    return alert(`un champ n'a pas été renseigné`);
  }
  // on rappelle notre constant kanapId de cart.js
  const urlParams = new URLSearchParams(window.location.search);
  const kanapId = urlParams.get("id");
  let item = {
    id: kanapId,
    color: document.querySelector("#colors").value,
    quantity: parseInt(document.querySelector("#quantity").value),
  };

  let cart = localStorage.getItem("cart");
  if (!cart) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }
  console.log(cart);
  // Rechercher la position d'un element existant du cart
  let index = cart.findIndex(
    (elt) => elt.color === item.color && elt.id === item.id
  );
  if (index !== -1) {
    cart[index].quantity += item.quantity;
  } else {
    cart.push(item);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  return alert("Votre produit a bien été ajouté au cart !");
}
getkanaps();
document.querySelector("#addToCart").addEventListener("click", addToCart);
// displaykanap();
