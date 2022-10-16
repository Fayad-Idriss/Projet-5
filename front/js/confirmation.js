 
 
 const queryString = window.location.search
 const urlParams = new URLSearchParams(queryString)
 const orderId = urlParams.get("orderId")



 const orderIdConfirmation = document.getElementById("orderId")
 orderIdConfirmation.innerHTML = orderId  