

let kanapArray = []; //Contiendra les données récu de l'API 
let cartItems = document.getElementById("cart__items");
//let totalArticles = 0;
 let total = 0;

 let itemsInLocalStorage = JSON.parse(localStorage.getItem("panier")) || [] // la variable detien sois le localStorage sois un tableau vide
 
if (itemsInLocalStorage.length == 0 || itemsInLocalStorage.length < 0) {   // Le message en cas de tableau vide
  document.getElementById("cart__items").innerHTML = "Ne contien pas d'article"
}  





fetch("http://localhost:3000/api/products")
  .then(response => response.json())
  .then(productData => {
    kanapArray = productData;
  
    itemsInLocalStorage.forEach((dataStorage) => { // methode forEach + la méthode find pour faire correspondre les produits grâce leur id

      const allItems = kanapArray.find((data) => data._id == dataStorage.id);
      cartItems.innerHTML += ` <article class="cart__item" data-id="${dataStorage.id}" data-color="${dataStorage.color}">
            <div class="cart__item__img">
              <img src="${allItems.imageUrl}" alt="${allItems.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${allItems.name}</h2>
                <p> ${dataStorage.color}</p>
                <p>${allItems.price}</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${dataStorage.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>  
        
          `

         
 
        function totalPrices() {
           total = 0 
          const totalPrice = document.getElementById("totalPrice")
            itemsInLocalStorage.forEach((item) => {
              const totalUnitPrice = allItems.price * dataStorage.quantity
                total += totalUnitPrice 
          })
          totalPrice.textContent = total
        }

          totalPrices()

        
        
        function totalQuantity(){

          let produitLocal = JSON.parse(localStorage.getItem("panier"))
          let quantityTotal = []
            if (itemsInLocalStorage){
              itemsInLocalStorage.forEach((dataStorage) => {
                quantityTotal.push(dataStorage.quantity)

             
            })
            const totalQuantity = document.getElementById("totalQuantity")
            totalQuantity.textContent = `${eval(quantityTotal.join("+"))}`
           }
          }

           totalQuantity()

       

        function changeQuantity( ){ 
  
         let element = document.querySelectorAll(".itemQuantity")
         element.forEach(function (btn, i){
 
          btn.addEventListener("change", (e)    => { 
          itemsInLocalStorage[i].quantity = btn.value     // verifier le nombre dans item.     itemInlocalestorage l'objet

           localStorage.setItem("panier", JSON.stringify(itemsInLocalStorage))   //enregistrement de itemLocaleStorage dans le localeStorage
              location.href = "cart.html"
          }) 
        }) 
      }

       changeQuantity() 

        function deletePage(){  // Fonction de suppression 
          let deleteItem = document.querySelectorAll(".deleteItem"); 
          deleteItem.forEach(function (btn, i) {
            btn.addEventListener("click", () => {
  
              supprimer(i)
              savePanier(itemsInLocalStorage)
              document.location.href = "cart.html"
             
            }) 
          })
        }

        deletePage()


        function supprimer(i) {
          itemsInLocalStorage.splice(i, 1)
          }

        })


        function reload() {  // function de reload de page 
          document.location.reload
        }


        function savePanier(panier){    // la fonction de sauvegarde du localeStorage avant le reload de page  
          localStorage.setItem("panier", JSON.stringify(panier));
        }


 

  })


 
 


 ///////////////////////////////////////////// Formulaire de contact ////////////////////////////////////////////////////
 


 const prenom = document.getElementById("firstName")
 const nom = document.getElementById("lastName")
 const adress = document.getElementById("address")
 const email = document.getElementById("email")
 const ville = document.getElementById("city")

 
let valuePrenom, valueNom, valueEmail, valueAdresse, valueVille

 

function formulairePrenom(){

prenom.addEventListener("input", function (e) {
  valuePrenom;
  if(e.target.value.length == 0 ){    // Ici on va écouter la valeur du nombre de lettre 
    console.log("rien")
    firstNameErrorMsg.innerHTML = ""  //Erreur message et une string vide car il y'a pas d'erreur
    valuePrenom = null
    console.log(valuePrenom)
     
 
  } else if (e.target.value.length < 3 || e.target.value.length > 25 ){
    firstNameErrorMsg.innerHTML = "Prenom doit contenir entre 3 et 25 caractéres"
    valuePrenom = null
    console.log("Prénom trop court ou trop long")
  } 


  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)){  // Voici le regex qui nous permet de vérifier une seconde condition 
    firstNameErrorMsg.innerHTML = ""
    valuePrenom = e.target.value
    console.log("succes")
    console.log(valuePrenom)

  } 


})

 }
 
formulairePrenom()

function formulaireNom(){

  nom.addEventListener("input", function (e) {
    valueNom;
    if(e.target.value.length == 0 ){    // Ici on va écouter la valeur du nombre de lettre 
      console.log("rien")
      lastNameErrorMsg.innerHTML = ""
      valuePrenom = null
      console.log(valueNom)
       
   
    } else if (e.target.value.length < 3 || e.target.value.length > 25 ){
      lastNameErrorMsg.innerHTML = "Nom doit contenir entre 3 et 25 caractéres"
      valuePrenom = null
      console.log("Nom trop court ou trop long")
    } 
  
  
    if (e.target.value.match(/^[a-z A-Z]{3,25}$/)){  // Voici le regex qui nous permet de vérifier une seconde condition 
      lastNameErrorMsg.innerHTML = ""
      valueNom = e.target.value
      console.log("succes")
      console.log(valueNom)
  
    } 
   })
  }

  formulaireNom()




  function formulaireAdress(){

    adress.addEventListener("input", function (e) {
      valueAdresse;
      if(e.target.value.length == 0 ){    // Ici on va écouter la valeur du nombre de lettre 
        console.log("rien")
        addressErrorMsg.innerHTML = ""
        valuePrenom = null
        console.log(valueAdresse)
         
     
      } else if (e.target.value.length < 3 || e.target.value.length > 25 ){
        addressErrorMsg.innerHTML = "Nom doit contenir entre 3 et 25 caractéres"
        valueAdresse = null
        console.log("Adresse trop court ou trop long")
      } 
    
    
      if (e.target.value.match(/^[0-9]{1,5} [a-z A-Z]{3,40}$/)){  // Voici le regex qui nous permet de vérifier une seconde condition 
        addressErrorMsg.innerHTML = ""
        valueAdresse = e.target.value
        console.log("succes")
        console.log(valueAdresse)
    
      } 
     })
    }

    formulaireAdress()




    function formulaireVille(){

      ville.addEventListener("input", function (e) {
        valueVille;
        if(e.target.value.length == 0 ){    // Ici on va écouter la valeur du nombre de lettre 
          console.log("rien")
          cityErrorMsg.innerHTML = ""
          valueVille = null
          console.log(valueVille)
           
       
        } else if (e.target.value.length < 3 || e.target.value.length > 25 ){
          cityErrorMsg.innerHTML = "doit contenir entre 3 et 25 caractéres"
          valueVille = null
          console.log("trop court ou trop long")
        } 
      
      
        if (e.target.value.match(/^[a-z A-Z]{3,25}$/)){  // Voici le regex qui nous permet de vérifier une seconde condition 
          cityErrorMsg.innerHTML = ""
          valueVille = e.target.value
          console.log("succes")
          console.log(valueVille)
      
        } 
       })
      }
    
      formulaireVille()




      function formulaireEmail(){

        email.addEventListener("input", function (e) {
          valueEmail;
          if(e.target.value.length == 0 ){    // Ici on va écouter la valeur du nombre de lettre 
            console.log("rien")
            emailErrorMsg.innerHTML = ""  //Erreur message et une string vide car il y'a pas d'erreur
            valueEmail = null
            console.log(valueEmail)
             
         
          } else if (e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
            emailErrorMsg.innerHTML = ""
            valueEmail = e.target.value
            console.log("succes")
            console.log(valueEmail)
          } 
        
        
          if (
            !e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
            !e.target.value.length == 0
          ){
            emailErrorMsg.innerHTML = "Email incorrect ex: bob@hotmail.fr"
            valueEmail = null
          }
        
          } 
        
        
        )}
        
         
        
        formulaireEmail()



        /////////////////  Préparation de l'envois formualaire /////////////////

 

        const formulaireButton = document.getElementById("formulaire")

        formulaireButton.addEventListener("submit", (e) => {
          e.preventDefault()
          console.log("poste stoper")


          if (valuePrenom && valueNom && valueEmail && valueVille && valueAdresse){
            console.log("c'est bon envoie")

            const commandeFinale = JSON.parse(localStorage.getItem("panier"))  // Les elemnents que nous voulons récupérer
            let commandeId = []   // Le tableau vide dans laquelle on poussera les elements de la commande
      


            commandeFinale.forEach((commande) => {          // La boucle qui permet de faire les tours des elements de la commande 
              commandeId.push(commande.id)      // On push les elements de la commande dans le tableau 
            })

            const data = {                // Liste des elements à envoyer à l'API
              contact: {
                firstName : valuePrenom,
                lastName : valueNom,
                address : valueAdresse,
                city : valueVille,
                email : valueEmail,
              },
              products: commandeId,

            }




            ///////////////////// Appel fetch /////////////////////
            fetch("http://localhost:3000/api/products/order", {
              method : "POST",
              headers : {"Content-Type": "application/json"},
              body : JSON.stringify(data),
            }).then((res) => res.json())
              .then((promise) => {
              const orderId = promise.orderId
              
              let responseServeur = promise      // on met la reponse serveur dans cette variable

  
                localStorage.removeItem("panier")
                window.location.href = "confirmation.html" + "?orderId=" + orderId   // Le order id a faire passer de l'autre coté


            })

          } else{
            alert("remplir le formulaire correctement")
          }
        })
 

        let stockagePanier = JSON.parse(localStorage.getItem("commandes"))    //Variable pour stocker la commande
        
   


       



     

     
       
        
        
            

        

    

    




























 