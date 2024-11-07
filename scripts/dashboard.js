const remainingBudget = document.getElementById("remaining-budget-display");
const totalExpensesDisplay = document.getElementById("expenses-total-display");
const totalIncomeDisplay = document.getElementById("income-total-display");
const budgetWarning = document.getElementById("warning");
const resetButton = document.getElementById("reset-button");
const userNameDisplay = document.getElementById("username-display");
const budgetDisplay = document.getElementById("budget-display");

let userDataObject = JSON.parse(localStorage.getItem("userData"));
axios
  .post(
    "http://localhost/finanz-tracker-enhanced/apis/displayUser.php",
    {
      id: localStorage.getItem("currentUser"),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  .then((response) => {
    userNameDisplay.innerText = response.data.name;
    budgetDisplay.innerText = response.data.budget;

  })
  .catch((err) => console.log(err));

  axios
  .post(
    "http://localhost/finanz-tracker-enhanced/apis/totalValues.php",
    {
      id: localStorage.getItem("currentUser"),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  .then((response) => {
    console.log(response.data)
    totalExpensesDisplay.innerText = response.data.total_expenses
    totalIncomeDisplay.innerText = response.data.total_income
    remainingBudget.innerText =
      parseInt(budgetDisplay.innerText) -
      parseInt(totalExpensesDisplay.innerText);
  })
  .catch((err) => console.log(err));

