const incomeDiv = document.getElementById("income-div");
const editHint = document.getElementById("edit-hint");
const sortCriteriaDropdown = document.getElementById("sortCriteria");

let editMode = false;
let editKey = null;

const renderIncomeData = () => {
  // Clear only the income cards, not the sorting container
  incomeDiv.innerHTML = "";

  userDataObject.income.forEach((incomeData) => {
    incomeDiv.innerHTML += `
      <div class="income-card" key=${incomeData.id}>
        <div class="information">
          <h2 class="amount">$${incomeData.amount}</h2>
          <p class="note">${incomeData.note}</p>
        </div>
        <div class="actions-container">
          <div class="actions edit" key="edit-${incomeData.id}">
            <img src="/assets/edit-icon.svg" alt="edit-icon">
          </div>
          <div class="actions delete" key="delete-${incomeData.id}">
            <img src="/assets/delete-icon.svg" alt="delete-icon">
          </div>
        </div>
      </div>
    `;
  });

  // Reattach event listeners after re-rendering
  attachEventListeners();
};

const attachEventListeners = () => {
  const deleteButtons = document.querySelectorAll(".delete");
  const editButtons = document.querySelectorAll(".edit");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const incomeCard = this.closest(".income-card");
      const keyToDelete = incomeCard.getAttribute("key");
      incomeCard.remove();
      userDataObject.income = userDataObject.income.filter(
        (income) => income.id !== keyToDelete
      );
      saveToLocalStorage();
    });
  });

  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const incomeCard = this.closest(".income-card");
      const keyToEdit = incomeCard.getAttribute("key");
      const income = userDataObject.income.find((item) => item.id === keyToEdit);
      editKey = income.id;
      incomeAmount.value = income.amount;
      incomeNote.value = income.note;
      editMode = true;
      editHint.classList.toggle("hidden");
    });
  });
};

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
  renderIncomeData();  // Re-render after adding
};

incomeForm.addEventListener("submit", (e) => {
  const amount = incomeAmount.value;
  const note = incomeNote.value;

  if (editMode === false) {
    addIncome(amount, note);
  } else {
    userDataObject.income = userDataObject.income.map((income) => {
      if (income.id === editKey) {
        return {
          id: income.id,
          amount: amount,
          note: note,
          date: income.date,
        };
      }
      return income;
    });

    editMode = false;
    editKey = null;
    editHint.classList.toggle("hidden");
    renderIncomeData();  // Re-render after editing
  }
  saveToLocalStorage();
});

const applySort = () => {
  const criteria = sortCriteriaDropdown.value;

  userDataObject.income.sort((a, b) => {
    if (criteria === "amount") {
      return parseFloat(a.amount) - parseFloat(b.amount);
    } else if (criteria === "note") {
      return a.note.localeCompare(b.note);
    } else if (criteria === "date") {
      return new Date(b.date) - new Date(a.date);
    }
  });

  renderIncomeData();  // Re-render after sorting
};

// Attach event listener to sort criteria dropdown
sortCriteriaDropdown.addEventListener("change", applySort);

// Initial render
renderIncomeData();
