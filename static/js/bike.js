
function information(){
    var info = document.getElementById("time").value ;
      if (info == 12){
     var resp = "12 hrs"
      document.getElementById("inform").innerHTML =  " 12 Hrs ";
      document.getElementById("dur").value = resp ;
    }
    else if (info == 24){
      document.getElementById("inform").innerHTML =  " 1 day ";
    }
    else if (info == 48){
      document.getElementById("inform").innerHTML =  " 2 days ";
    }
    else if (info == 72){
      document.getElementById("inform").innerHTML =  " 3 days ";
    }
    else if (info == 96){
      document.getElementById("inform").innerHTML =  " 4 days ";
    }
    else if (info == 120){
      document.getElementById("inform").innerHTML =  " 5 days ";
    }
    else if (info == 144){
      document.getElementById("inform").innerHTML =  " 6 days ";
    }
    else if (info == 168){
      document.getElementById("inform").innerHTML =  " 1 week ";
    }
    else if (info == 336){
      document.getElementById("inform").innerHTML =  " 2 weeks ";
    }
    else if (info == 504){
      document.getElementById("inform").innerHTML =  " 3 weeks ";
    }
    else if (info == 720){
      document.getElementById("inform").innerHTML =  " 1 month ";
    }

  }
  
  function calculatePrice() {
    var time = document.getElementById("time").value;
    var rate = document.getElementById("rate").value;
    var price = Math.floor (time * rate );
    if (price == 0) {
      document.getElementById("result").innerHTML =  "RENT ";
    }
    else {
    document.getElementById("result").value = price ;
    document.getElementById("value").innerHTML = "RENT " + price + " /-"
  }
  }
 
function validateForm() {
    var bike= document.getElementById("bike").value;
    var rate = document.getElementById("rate").value;
  
    if (!bike || !rate ) {
      alert("Please enter all the required fields");
      return false;}
    else if (rate == 0) {
          alert("Please select the time");
      return false;
          
      }
  
    else {  
    return true;
  }
  }
  
  function confirmSubmit() {
    var amt = document.getElementById("result").value;
    document.getElementById("result").value = amt ;
    if (confirm("Are you sure you want to purchase "+ amt +"/- rupees ?")) {
      // Your code to submit the form goes here
      console.log("Form submitted");
      return true;
    } else {
      console.log("Form not submitted");
      return false;
    }
  }

  function submitForms() {
    var form = document.getElementById("myForm");
    form.action = "";
    form.submit();

    form.action = "";
    form.submit();
  }
  