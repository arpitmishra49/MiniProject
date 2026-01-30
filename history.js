const container = document.getElementById("history-container");

let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

renderHistory();

function renderHistory() {
  container.innerHTML = "";

  if (searchHistory.length === 0) {
    container.innerHTML = "<p>No search history available</p>";
    return;
  }

  searchHistory.forEach(term => {
    const card = document.createElement("div");
    card.className = "history-card";
    card.textContent = term;

    card.onclick = () => {
      window.location.href = `search.html?q=${encodeURIComponent(term)}`;
    };

    container.appendChild(card);
  });
}

function clearHistory() {
  localStorage.removeItem("searchHistory");
  searchHistory = [];
  renderHistory();
}

function goToProducts() {
  window.location.href = "index.html";
}
