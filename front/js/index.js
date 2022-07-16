// fonction qui recup tous les kanaps
function getkanaps() {
    return fetch (`http://localhost:3000/api/products`)
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
