const expenseDiv = document.getElementById("entry-div");
const editHint = document.getElementById("edit-hint");
const sortCriteriaDropdown = document.getElementById("sortCriteria");

let editMode = false;
let editKey = null;

const renderExpenseData = () => {
  expenseDiv.innerHTML = "";

  userDataObject.expenses.forEach((expenseData) => {
    expenseDiv.innerHTML += `
      <div class="entry-card" key=${expenseData.id}>
        <div class="information">
          <h2 class="amount">$${expenseData.amount}</h2>
          <p class="note">${expenseData.note}</p>
        </div>
        <div class="actions-container">
          <div class="actions edit" key="edit-${expenseData.id}">
            <img src="/assets/edit-icon.svg" alt="edit-icon">
          </div>
          <div class="actions delete" key="delete-${expenseData.id}">
            <img src="/assets/delete-icon.svg" alt="delete-icon">
          </div>
        </div>
      </div>
    `;
  });

  attachEventListeners();
};

const attachEventListeners = () => {
  const deleteButtons = document.querySelectorAll(".delete");
  const editButtons = document.querySelectorAll(".edit");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const expenseCard = this.closest(".entry-card");
      const keyToDelete = expenseCard.getAttribute("key");
      expenseCard.remove();
      userDataObject.expenses = userDataObject.expenses.filter(
        (expense) => expense.id !== keyToDelete
      );
      saveToLocalStorage();
    });
  });

  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const expenseCard = this.closest(".entry-card");
      const keyToEdit = expenseCard.getAttribute("key");
      const expense = userDataObject.expenses.find((item) => item.id === keyToEdit);
      editKey = expense.id;
      expenseAmount.value = expense.amount;
      expenseNote.value = expense.note;
      editMode = true;
      editHint.classList.toggle("hidden");
    });
  });
};

const expenseForm = document.getElementById("expense-form");
const expenseAmount = document.getElementById("expense-amount");
const expenseNote = document.getElementById("expense-note");

const addExpense = (amount, note) => {
  const expenseData = {
    id: Date.now().toString(),
    amount: amount,
    note: note,
    date: new Date().toISOString(),
  };
  userDataObject.expenses.push(expenseData);
  saveToLocalStorage();
  renderExpenseData();  
};

expenseForm.addEventListener("submit", (e) => {
  const amount = expenseAmount.value;
  const note = expenseNote.value;

  if (editMode === false) {
    addExpense(amount, note);
  } else {
    userDataObject.expenses = userDataObject.expenses.map((expense) => {
      if (expense.id === editKey) {
        return {
         ...expense,amount:amount,note:note
        };
      }
      return expense;
    });

    editMode = false;
    editKey = null;
    editHint.classList.toggle("hidden");
    renderExpenseData();  
  }
  saveToLocalStorage();
});

const applySort = () => {
  const criteria = sortCriteriaDropdown.value;

  userDataObject.expenses.sort((a, b) => {
    if (criteria === "amount") {
      return parseFloat(a.amount) - parseFloat(b.amount);
    } else if (criteria === "note") {
      return a.note.localeCompare(b.note);
    } else if (criteria === "date") {
      return new Date(b.date) - new Date(a.date);
    }
  });

  renderExpenseData();  
};

sortCriteriaDropdown.addEventListener("change", applySort);

renderExpenseData();  