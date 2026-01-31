const container = document.getElementById("history-container");

let viewedProducts = JSON.parse(localStorage.getItem("viewedProducts")) || [];

renderHistory();

function renderHistory() {
  container.innerHTML = "";

  if (viewedProducts.length === 0) {
    container.innerHTML = "<p class='empty'>No viewed products yet</p>";
    return;
  }

  viewedProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p class="price">$${product.price}</p>
    `;

    card.onclick = () => {
      window.location.href = `product.html?id=${product.id}`;
    };

    container.appendChild(card);
  });
}

function clearHistory() {
  localStorage.removeItem("viewedProducts");
  viewedProducts = [];
  renderHistory();
}

function goBack() {
  window.history.back();
}
