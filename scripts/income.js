console.log(userDataObject);

const incomeDiv = document.getElementById("income-div");
const incomeForm = document.getElementById("income-form");
const incomeAmount = document.getElementById("income-amount");
const incomeNote = document.getElementById("income-note");
const addIncome = (amount, note) => {
  const incomeData = {
    id: Date.now().toString(),
    amount: amount,
    note: note,
    date: new Date().toISOString(),
  };
  userDataObject.income.push(incomeData);
  saveToLocalStorage();
  console.log(userDataObject);
};
incomeForm.addEventListener("submit", () => {
    const amount = incomeAmount.value
    const note = incomeNote.value
    addIncome(amount,note)
});
