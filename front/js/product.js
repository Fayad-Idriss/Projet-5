let urlParams= new URLSearchParams(document.location.search); //Paramètres du produit
// console.table(window.location) 
let productId = urlParams.get("id");
let panier = JSON.parse( localStorage.getItem("panier") )|| []
 


// Appel à API pour récuperer les données 
    fetch(`http://localhost:3000/api/products/${productId}`)
    .then(response => response.json())

    .then ((product) => {
        // console.table(product)
        loadProduct(product);

    })
 

.catch((error) => {
    alert("Erreur de la requête API");
}); 

//Variable globales des éléments du DOM
let imgProduct = document.querySelector(".item__img");
let titleProduct = document.getElementById("title");
let descriptionProduct = document.getElementById("description");

let colorProduct = document.getElementById("colors");
let price = document.getElementById("price");
let quantityProduct = document.getElementById("quantity")
let product = "";

//Chargement des éléments dans le DOM avec la méthode Templating lateral
function loadProduct (product){
    imgProduct.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
    titleProduct.textContent = `${product.name}`
    price.textContent = `${Number(product.price)}`
    descriptionProduct.textContent = `${product.description}`
    const colorArray = product.colors
        for (let color of colorArray){
            colorProduct.innerHTML += `<option value="${color}">${color}</option>`  
        }
};
  
        


clickBtn();

//Fonction de gestion de l'ajout au panier au click du bouton 
function clickBtn(){


    let local = JSON.parse(localStorage.getItem("panier"))
    let btnAddToCart = document.getElementById("addToCart");
    //Ecoute du bouton "Ajouter au panier"
    btnAddToCart.addEventListener("click", (e) =>{
        e.preventDefault()
        if(colorProduct.value === "" || quantity.value == null || quantity.value <= 0 ){
            alert("Choississez une couleur et une quantité !");

        }else if (quantity.value > 0 && quantity.value <= 100 ){
            
            // object à envoyer dans le LocalStorage
            const optionProducts ={
                id: productId,
                color: colorProduct.value,
                quantity: quantity.value,
            }

             addPanier(optionProducts)
            
            
        } 
        
       
 
    })
}





//                                                                        PARTIE LOCALSTORAGE


function savePanier(panier){   //Fonction de sauvegarde dans le localeStorage
    localStorage.setItem("panier", JSON.stringify(panier));
    alert("Le produit a bien était ajouter")
} 

 
   
function addPanier(product){       //fonction d'ajout au panier

    let foundProduct = panier.find(p => p.id == product.id && p.color == product.color)  // Le find permet de rechercher des éléments par rapport a une condition  
    if(foundProduct != undefined){
        let newQuantity = Number(parseInt(foundProduct.quantity) + parseInt(product.quantity))
        foundProduct.quantity = newQuantity
        if(newQuantity >= 100){
            alert("Vous ne pouvez pas prendre plus de 100 articles")
        }else{
            savePanier(panier)
        }
    
    }else{
        
        panier.push(product);
        savePanier(panier)
    }
     
    //savePanier(panier)
}

function removePanier(product){
         // Le filter va nous permettre de pouvoir supprimer un éléments
    panier = panier.filter(p => p.id != product.id); 
    savePanier(panier)
}

function changePanier(product, quantity){    // changer la quantiter
    
    let foundProduct = panier.find( p => p.id == product.id && p.color == product.color );
    if (foundProduct != undefined){
        foundProduct.quantity += quantity;
        if(foundProduct.quantity <= 0){    // Cette condition nous permet de ne pas avoir de chiffre négatif dans la commande
            removePanier(foundProduct);
        }else{
            savePanier(panier)
}
        }
    }
    

    function TotalNumber(){
        
        let number = 0;
        for ( let product of panier){
            Number += product.quantity
        }
        return number;
    }

    function getTotaleprice(){
        
        let total = 0;
        for (let product of panier){
            number += product.quantity * product.price
        }
        return total
    }   
   