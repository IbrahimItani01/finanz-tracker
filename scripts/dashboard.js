const userNameDisplay = document.getElementById("username-display");
const budgetDisplay = document.getElementById("budget-display");
let userDataObject = JSON.parse(localStorage.getItem("userData"));

userNameDisplay.innerText = userDataObject.username;
budgetDisplay.innerText = userDataObject.budget;