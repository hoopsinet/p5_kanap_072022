// ID qui est dans l'url | 
// fonction qui recup tous les kanaps
function getkanaps() {
    const urlParams = new URLSearchParams(window.location.search);
    const kanapId = urlParams.get('id');
    return fetch (`http://localhost:3000/api/products/${kanapId}`)
   
    .then (function (response) {
        return response.json()
    })
    .then (function (kanap) {
        displaykanap(kanap)
    })
    .catch (function (error) {
        alert (error)
    })
}
// fonction qui permet d'afficher les kanaps
    function displaykanap(kanap){
        const image = document.querySelector(".item__img");
        const title = document.querySelector("#title");
        const price = document.querySelector("#price");
        const description = document.querySelector("#description");
        const colors = document.querySelector("#colors");
       
        let img = document.createElement("img");
        img.src = kanap.imageUrl
        
        image.appendChild(img);
        title.textContent = kanap.name
        price.textContent = kanap.price
        description.textContent = kanap.description
        

        kanap.colors.forEach(color=> {
            let option = document.createElement("option");
            option.value = color;
            option.textContent += color
            colors.appendChild(option);
          });


    }     
getkanaps();
// displaykanap();
