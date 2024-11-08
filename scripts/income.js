const entryDiv = document.getElementById("entry-div");
const editHint = document.getElementById("edit-hint");
const sortCriteriaDropdown = document.getElementById("sortCriteria");

let editMode = false;
let editKey ;



const renderEntryData = () => {
  entryDiv.innerHTML = "";
  axios
    .post(
      "http://localhost/finanz-tracker-enhanced/apis/displayIncomes.php",
      {
        userId: localStorage.getItem("currentUser"),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      response.data.forEach((entryData) => {
        entryDiv.innerHTML += `
        <div class="entry-card" key=${entryData.id}>
          <div class="information">
            <h2 class="amount">$${entryData.amount}</h2>
            <p class="note">${entryData.note}</p>
          </div>
          <div class="actions-container">
            <div class="actions edit" key="edit-${entryData.id}">
              <img src="/assets/edit-icon.svg" alt="edit-icon">
            </div>
            <div class="actions delete" key="delete-${entryData.id}">
              <img src="/assets/delete-icon.svg" alt="delete-icon">
            </div>
          </div>
        </div>
      `;
      });
      const deleteButtons = document.querySelectorAll(".delete");
const editButtons = document.querySelectorAll(".edit");

deleteButtons.forEach((button) => {
  button?.addEventListener("click", function () {
    console.log("hi")
    const incomeCard = this.closest(".entry-card");
    const keyToDelete = incomeCard.getAttribute("key");
    incomeCard.remove();
    axios.post(
      "http://localhost/finanz-tracker-enhanced/apis/deleteIncome.php",
      {
        id:keyToDelete,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });
});

editButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const incomeCard = this.closest(".entry-card");
    const keyToEdit = incomeCard.getAttribute("key");
    axios.post(
      "http://localhost/finanz-tracker-enhanced/apis/selectIncome.php",
      {
        id:keyToEdit,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res)=>{
      editKey = res.data.id;
      entryAmount.value = res.data.amount;
      entryNote.value = res.data.note;
      editMode = true;
      editHint.classList.toggle("hidden");
    })
   
  });
});
    })
    .catch((err) => console.log(err));

};

const entryForm = document.getElementById("entry-form");
const entryAmount = document.getElementById("entry-amount");
const entryNote = document.getElementById("entry-note");

const addIncome = (amount, note) => {
  axios.post(
    "http://localhost/finanz-tracker-enhanced/apis/createIncome.php",
    {
      amount: amount,
      note: note,
      userId: localStorage.getItem("currentUser"),
      date: new Date().toISOString(),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res)=>{
    console.log(res.data)
    renderEntryData();  // Re-render after adding
  }).catch((err)=>console.log(err))
};

entryForm.addEventListener("submit", (e) => {
  const amount = entryAmount.value;
  const note = entryNote.value;
  if (editMode === false) {
    addIncome(amount, note);
  } else {
    axios.post(
      "http://localhost/finanz-tracker-enhanced/apis/editIncome.php",
      {
        id:editKey,
        amount:amount,
        note:note,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res)=>{
      editMode = false;
      editKey = null;
      editHint.classList.toggle("hidden");
      renderEntryData();

    })

  }
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

  // renderEntryData();  // Re-render after sorting
};

// Attach event listener to sort criteria dropdown
sortCriteriaDropdown.addEventListener("change", applySort);

// // Initial render

renderEntryData();
