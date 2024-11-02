const budgetDisplay = document.getElementById("budget-display");
const remainingBudget = document.getElementById("remaining-budget-display");
const totalExpensesDisplay = document.getElementById("expenses-total-display");
const totalIncomeDisplay = document.getElementById("income-total-display");
const budgetWarning = document.getElementById("warning")
const displayDashboard = ()=>{
  let total=0
  userDataObject.income.forEach((incomeData)=>{
    total += parseInt(incomeData.amount);
  })
  totalIncomeDisplay.innerText = total
  total=0
  userDataObject.expenses.forEach((expenseData)=>{
    total += parseInt(expenseData.amount);
  })
  totalExpensesDisplay.innerText = total
  if (userDataObject.expenses.length === 0) {
    remainingBudget.innerText = userDataObject.budget;
    totalExpensesDisplay.innerText = 0
  }
  else{
    remainingBudget.innerText = parseInt(userDataObject.budget) - parseInt(totalExpensesDisplay.innerText);
  }
  if (userDataObject.income.length === 0) {
      totalIncomeDisplay.innerText = 0
    }
  
  budgetDisplay.innerText = userDataObject.budget;
  if(parseInt(remainingBudget.innerText)<=0){
    budgetWarning.classList.toggle("hidden")
  }
  
}
displayDashboard()
