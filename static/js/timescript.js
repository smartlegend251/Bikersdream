setMinDateTime();
          
function setMinDateTime() {
  var today = new Date().toISOString().split('T')[0];
  var currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  var minDateTime = today + "T" + currentTime;
  document.getElementById("myDateTime").setAttribute("min", minDateTime);
  document.getElementById("myDateTime2").style.display = "none";
}

function setNextDateTime() {
  var from = new Date(document.getElementById("myDateTime").value);
  var to = new Date(from);
  to.setDate(from.getDate() + 1); // Add one day to get the next date

  // Limit the maximum date in myDateTime2 to 31 days from myDateTime
  var maxDate = new Date(from);
  maxDate.setDate(from.getDate() + 31);
  var maxDateTime = maxDate.toISOString().split('T')[0];
  document.getElementById("myDateTime2").setAttribute("max", maxDateTime);

  var nextDate = to.toISOString().split('T')[0];
  var nextTime = to.toISOString().split('T')[1].split('.')[0];
  var nextDateTime = nextDate + "T" + nextTime;
  document.getElementById("myDateTime2").setAttribute("min", nextDateTime);
  document.getElementById("myDateTime2").style.display = "block";
  document.getElementById("myDateTime2").value = ""; // Clear the value of myDateTime2
  resetTotalHours();
}






function calculateTotalHours() {
  var from = new Date(document.getElementById("myDateTime").value);
  var to = new Date(document.getElementById("myDateTime2").value);
  var diffInMilliseconds = to - from;
  var totalHours = diffInMilliseconds / (1000 * 60 * 60);
  var rate = document.getElementById('rate').value;
  
  
  

  // Check if the duration exceeds 31 days (744 hours)
  if (totalHours > 744) {
    alert("The duration cannot exceed 31 days (744 hours). Please select a valid date range.");
    return;
  }
  else
  var totalAmount = totalHours * rate;
  var amt = totalAmount;
  var hour = totalHours;
  document.getElementById("totalAmount").textContent = "RENT  ₹" + totalAmount.toFixed(2) ;
  // document.getElementById("amt").textContent =  amt.toFixed(2) ;
  document.getElementById("amt").value = amt.toFixed(2) ;
  document.getElementById("hour").value = hour.toFixed(2) ;
  
  
  // document.getElementById("totalHours").textContent =  totalHours.toFixed(2) ;
}

function resetTotalHours() {
  document.getElementById("totalHours").textContent = ""; // Reset the value of totalHours
}

document.getElementById("myDateTime").addEventListener("input", function() {
  document.getElementById("myDate2Label").style.display = "block";
  document.getElementById("myDateTime2").style.display = "block";
  document.getElementById("myDateTime2").value = ""; // Clear the value of myDateTime2
  resetTotalHours();
});