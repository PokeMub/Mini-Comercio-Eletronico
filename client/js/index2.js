// Add SDK credentials
// REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel
const mercadopago = new MercadoPago('APP_USR-6cfda4f6-4837-43b3-bed5-85d422e47e21', {
  locale: 'pt-BR' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
});


// Handle call to backend and generate preference.
document.getElementById("checkout-btn2").addEventListener("click", function() {

  $('#checkout-btn2').attr("disabled", true);
  
  const orderData = {
    quantity: document.getElementById("quantity2").value,
    description: document.getElementById("product-description2").innerHTML,
    price: document.getElementById("unit-price2").innerHTML
  };
    
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
        $('#checkout-btn2').attr("disabled", false);
    });
});

// Create preference when click on checkout button
function createCheckoutButton(preferenceId) {
  // Initialize the checkout
  mercadopago.checkout({
    preference: {
      id: preferenceId
    },
    render: {
      container: '#button-checkout2', // Class name where the payment button will be displayed
      label: 'Comprar', // Change the payment button text (optional)
    }
  });
}

// Handle price update
function updatePrice() {
  let quantity = document.getElementById("quantity2").value;
  let unitPrice = document.getElementById("unit-price2").innerHTML;
  let amount = parseInt(unitPrice) * parseInt(quantity);


  document.getElementById("cart-total2").innerHTML = "R$ " + amount;
  document.getElementById("summary-price2").innerHTML = "R$ " + unitPrice;
  document.getElementById("summary-quantity2").innerHTML = quantity;
  document.getElementById("summary-total2").innerHTML = "R$ " + amount;
}

document.getElementById("quantity2").addEventListener("change", updatePrice);
updatePrice();  

// Go back
document.getElementById("go-back").addEventListener("click", function() {
  $(".container_payment").fadeOut(500);
  setTimeout(() => {
      $(".shopping-cart").show(500).fadeIn();
  }, 500);
  $('#checkout-btn2').attr("disabled", false);  
});