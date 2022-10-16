function insertionProduct(){ 

fetch('http://localhost:3000/api/products')
    .then(res => res.json())

    .then(products =>{


        let cards ="";
 
        for(let product of products){
             
            cards += ` <a href= " ./Product.html?id=${product._id}">
            <article>
                <img src="${product.imageUrl}" alt="${product.altTxt}">
                <h3 class="productName"> ${product.name} </h3>
                <p class="productDescription"> ${product.description} </p>
            </article>
            </a>`; 
        }

document.querySelector("#items").innerHTML=cards;
    })

    .catch((error) => {
        alert("le produit n'est pas disponible")
    })

    .catch((error) =>{
        alert("Le serveur ne repond pas")
    })

     }
    insertionProduct();
    

