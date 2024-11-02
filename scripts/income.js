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

const renderIncomeData = ()=>{
    userDataObject.income.forEach((incomeData)=>{
        incomeDiv.innerHTML+=`
              <div class="income-card" key=${incomeData.id}>
                <div class="information">
                  <h2>$${incomeData.amount}</h2>
                  <p>${incomeData.note}</p>
                </div>
                <div class="actions-container">
                  <div class="actions" key="edit-${incomeData.id}">
                    <img src="/assets/edit-icon.svg" alt="edit-icon">
                  </div>
                    <div class="actions" key="delete-${incomeData.id}">
                      <img src="/assets/delete-icon.svg" alt="delete-icon">
                    </div>
                </div>
              </div>
        `
    })
}
renderIncomeData()