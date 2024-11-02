const budgetDisplay = document.getElementById("budget-display");
const remainingBudget = document.getElementById("remaining-budget-display");
const totalExpensesDisplay = document.getElementById("expenses-total-display");
const totalIncomeDisplay = document.getElementById("income-total-display");

const displayDashboard = ()=>{
  let total=0
  userDataObject.income.forEach((incomeData)=>{
    total += parseInt(incomeData.amount);
  })
  totalIncomeDisplay.innerText = total
  if (userDataObject.expenses.length === 0) {
    remainingBudget.innerText = userDataObject.budget;
    totalExpensesDisplay.innerText = 0
  }
  if (userDataObject.income.length === 0) {
      totalIncomeDisplay.innerText = 0
    }
  
  budgetDisplay.innerText = userDataObject.budget;
}
displayDashboard()
