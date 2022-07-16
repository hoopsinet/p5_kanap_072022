// ID qui est dans l'url | 
// fonction qui recup tous les kanaps
function getkanaps() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    return fetch (`http://localhost:3000/api/products/${id}`)
    .then (function (response) {
        return response.json()
    })
    .then (function (kanaps) {
        displaykanaps(kanaps)
    })
    .catch (function (error) {
        alert (error)
    })
}
// fonction qui permet d'afficher les kanaps
function displaykanaps(kanaps){
    for (let kanap of kanaps) {
        document.querySelector(`#items`).innerHTML += ` <a href="./product.html?id=${kanap._id}">
    <article>
    <img src="${kanap.imageUrl}" alt="${kanap.name}">
    <h3 class="productName">${kanap.name}</h3>
    <p class="productDescription">${kanap.description} </p> </article>
    </a>` 
    }     
}
getkanaps()


