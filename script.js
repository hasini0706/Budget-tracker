const balanceEl = document.getElementById("balance");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");
const typeEl = document.getElementById("type");
const addBtn = document.getElementById("addTransaction");
const transactionsEl = document.getElementById("transactions");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateBalance() {
  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);
  balanceEl.textContent = `Balance: $${balance.toFixed(2)}`;
}

function renderTransactions() {
  transactionsEl.innerHTML = "";
  transactions.forEach((t, index) => {
    const li = document.createElement("li");
    li.classList.add(t.amount > 0 ? "income" : "expense");
    li.innerHTML = `
      ${t.description}: $${t.amount.toFixed(2)}
      <button class="delete-btn" onclick="deleteTransaction(${index})">Delete</button>
    `;
    transactionsEl.appendChild(li);
  });
}

function addTransaction() {
  const description = descriptionEl.value.trim();
  const amount = parseFloat(amountEl.value);

  if (description === "" || isNaN(amount)) {
    alert("Please enter valid description and amount.");
    return;
  }

  const transaction = {
    description,
    amount: typeEl.value === "income" ? amount : -amount
  };

  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  descriptionEl.value = "";
  amountEl.value = "";
  typeEl.value = "income";

  updateBalance();
  renderTransactions();
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateBalance();
  renderTransactions();
}

addBtn.addEventListener("click", addTransaction);

// Initial render
updateBalance();
renderTransactions();