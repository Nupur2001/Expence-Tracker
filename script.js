document.addEventListener("DOMContentLoaded", () => {
  let balence = document.querySelector(".balence");
  let incomeAndExpense = document.querySelector(".incomeAndExpense");
  let incomeBalence = document.querySelector(".incomeBalence");
  let expenseBalence = document.querySelector(".expenseBalence");
  let list = document.querySelector(".list");
  let form = document.querySelector(".form");
  let moneySpentOn = document.getElementById("moneySpentOn");
  let moneySpent = document.getElementById("moneySpent");

  let transactionInLocalStorage = JSON.parse(
    localStorage.getItem("Transactions")
  );
  let transactions =
    localStorage.getItem("Transactions") !== null
      ? transactionInLocalStorage
      : [];
  function transactionAddOn(transaction) {
    let sign = transaction.amount < 0 ? "-" : "+";
    let item = document.createElement("li");

    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML = `
      ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
      <button class="deleteBtn"><i class="fa-solid fa-x"></i></button>
    `;

    item.querySelector(".deleteBtn").addEventListener("click", function () {
      deleteTransaction(transaction.id);
    });

    list.appendChild(item);
    saveInLocalStorage();
  }

  function updateValues() {
    let allAmount = transactions.map((t) => t.amount);
    let totalAmount = allAmount
      .reduce((total, item) => total + item, 0)
      .toFixed(2);

    let income = allAmount
      .filter((amount) => amount > 0)
      .reduce((total, item) => total + item, 0)
      .toFixed(2);

    let expense = allAmount
      .filter((amount) => amount < 0)
      .reduce((total, item) => total + item, 0)
      .toFixed(2);

    balence.innerHTML = `$${totalAmount}`;
    incomeBalence.innerHTML = `$${income}`;
    expenseBalence.innerHTML = `$${expense}`;
    saveInLocalStorage();
  }

  function initTransaction() {
    list.innerHTML = "";
    transactions.forEach(transactionAddOn);
    updateValues();
    saveInLocalStorage();
  }

  function generateID() {
    let id = Math.floor(Math.random() * 1000000);
    return id;
  }

  function addTransaction(e) {
    e.preventDefault();
    if (moneySpentOn.value.trim() === "" || moneySpent.value.trim() === "") {
      alert("Please enter values");
    } else {
      const transaction = {
        id: generateID(),
        text: moneySpentOn.value,
        amount: parseFloat(moneySpent.value),
      };
      transactions.push(transaction);
      transactionAddOn(transaction);
      updateValues();
      saveInLocalStorage();

      moneySpent.value = "";
      moneySpentOn.value = "";
    }
  }

  function deleteTransaction(id) {
    transactions = transactions.filter((transaction) => transaction.id !== id);
    saveInLocalStorage();
    initTransaction();
  }

  if (form) {
    form.addEventListener("submit", addTransaction);
  }

  initTransaction();

  function saveInLocalStorage() {
    localStorage.setItem("Transactions", JSON.stringify(transactions));
  }
});
