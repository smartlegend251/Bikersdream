var cityList = document.getElementById("cityList");
var cityInput = document.getElementById("cityInput");

cityList.addEventListener("change", function() {
  if (cityList.value === "other") {
    cityInput.style.display = "inline-block";
  } else {
    cityInput.style.display = "none";
  }
});

// var cityList = document.getElementById("cityList");
// var cityInput = document.getElementById("cityInput");

// cityList.addEventListener("change", function() {
//   if (cityList.value === "other") {
//     cityInput.style.display = "inline-block";
//   } else {
//     cityInput.style.display = "none";
//   }
// });


document.querySelector('input[name="paymentMethod"]').addEventListener("change", function() {
  var creditCardInfo = document.getElementById("creditCardInfo");
  if (this.value === "creditCard") {
    creditCardInfo.style.display = "block";
  } else if (this.value === "cash") {
    creditCardInfo.style.display = "none";
  }
});



document.querySelector("#myform").addEventListener("submit", function(event) {
    event.preventDefault();
   
      
        this.action = "/insertpayment";
        
      
        this.action = "/updatebooking";
        
    
      
    this.submit();
  });