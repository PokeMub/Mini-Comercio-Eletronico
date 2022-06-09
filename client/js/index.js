// Add SDK credentials
const db = firebase.firestore();
const compra = db.collection('compra');

var userid = getCookie("useruid");
var numero;





// REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel
const mercadopago = new MercadoPago('APP_USR-6cfda4f6-4837-43b3-bed5-85d422e47e21', {
  locale: 'pt-BR' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
});


// Handle call to backend and generate preference.
document.getElementById("checkout-btn").addEventListener("click", function() {


  if (userid != null) {
  
    $('#checkout-btn').attr("disabled", true);
  
    const orderData = {
      quantity: document.getElementById("quantity").value,
      description: document.getElementById("product-description").innerHTML,
      price: document.getElementById("unit-price").innerHTML
    };
  
    
  
    console.log('1');
  
  let min = Math.ceil(0);
  let max = Math.floor(100000);
  numero = Math.floor(Math.random() * (max - min)) + min;
  
   console.log('2');
   console.log(numero);
  
    compra.doc(userid).set({
  
      iddecompra: numero,
      id: userid,
      quantidade: document.getElementById("quantity").value,
      description: document.getElementById("product-description").innerHTML,
      price: document.getElementById("unit-price").innerHTML,
  
  })
  
  console.log('3');
  
    fetch("/create_preference", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then(function(response) {
          return response.json();
      })
      .then(function(preference) {
          createCheckoutButton(preference.id);
          
          $(".shopping-cart").fadeOut(500);
          setTimeout(() => {
              $(".container_payment").show(500).fadeIn();
          }, 500);
      })
      .catch(function() {
          alert("Unexpected error");
          $('#checkout-btn').attr("disabled", false);
      });
  
    
  }else{
   
    alert('Voce deve Está Logado');
  
  }


 
});

// Create preference when click on checkout button
function createCheckoutButton(preferenceId) {
  // Initialize the checkout
  mercadopago.checkout({
    preference: {
      id: preferenceId
    },
    render: {
      container: '#button-checkout', // Class name where the payment button will be displayed
      label: 'Comprar', // Change the payment button text (optional)
    }
  });
}

// Handle price update
function updatePrice() {
  let quantity = document.getElementById("quantity").value;
  let unitPrice = document.getElementById("unit-price").innerHTML;
  let amount = parseInt(unitPrice) * parseInt(quantity);


  document.getElementById("cart-total").innerHTML = "R$ " + amount;
  document.getElementById("summary-price").innerHTML = "R$ " + unitPrice;
  document.getElementById("summary-quantity").innerHTML = quantity;
  document.getElementById("summary-total").innerHTML = "R$ " + amount;
}

document.getElementById("quantity").addEventListener("change", updatePrice);
updatePrice();  

// Go back
document.getElementById("go-back").addEventListener("click", function() {
  $(".container_payment").fadeOut(500);
  setTimeout(() => {
      $(".shopping-cart").show(500).fadeIn();
  }, 500);
  $('#checkout-btn').attr("disabled", false);  
});