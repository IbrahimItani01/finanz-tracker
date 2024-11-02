const submitButton = document.getElementById("submit-button");
const userNameContainer = document.getElementById("username-container");

submitButton?.addEventListener("click", () => {
    const userNameInput = document.getElementById("username");
    const budgetInput = document.getElementById("budget");
    let budgetNumber = parseInt(budgetInput.value)
    if (userNameInput.value === "" && isNaN(budgetNumber)) {
    userNameContainer.innerHTML += `
        <p>Note! You must enter a username and budget</p>
        `;
    setTimeout(() => {
      window.location.reload();
    }, 700);
  } 
  else if (userNameInput.value === ""  && !isNaN(budgetNumber)) {
    userNameContainer.innerHTML += `
        <p>Note! You must enter a username</p>
        `;
    setTimeout(() => {
      window.location.reload();
    }, 700);
  }
  else if (isNaN(budgetNumber)  && userNameInput.value !== " ") {

    userNameContainer.innerHTML += `
        <p>Note! You must enter a budget</p>
        `;
    setTimeout(() => {
      window.location.reload();
    }, 700);
  }
    else {
    localStorage.setItem("userName", userNameInput.value);
    localStorage.setItem("budget", budgetInput.value);
    window.location.href = "http://127.0.0.1:5500/pages/dashboard.html";
  }
});
