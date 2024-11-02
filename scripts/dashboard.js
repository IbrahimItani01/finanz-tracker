const userNameDisplay = document.getElementById("username-display");
let userDataObject = JSON.parse(localStorage.getItem("userData"));

userNameDisplay.innerText = userDataObject.username;