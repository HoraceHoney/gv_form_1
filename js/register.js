function validateForm() {
  // Get the value of the input field with id="email"
  var email = document.getElementById("email").value;
  // Get the value of the input field with id="password"
  var password = document.getElementById("psw").value;
  // Regular expression to check if the email is in the correct format
  var psw-repeat = document.getElementById("psw-repeat").value;
  var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  // Check if the email is empty
  if (email == "") {
    alert("Email field must be filled out");
    return false;
  }
  // Check if the email is in the correct format
  if (!email.match(emailRegex)) {
    alert("Please enter a valid email address");
    return false;
  }
  // Check if the password is empty
  if (password == "") {
    alert("Password field must be filled out");
    return false;
  }
  if(psw==psw-repeat){
    return true;
    }
    else{
    alert("password must be same!");
    return false;
    }
  return true;
}
