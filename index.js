const container = document.getElementById("product-container");
const searchInput = document.getElementById("searchInput");
const historyContainer = document.getElementById("search-history");

let allProducts = [];
let searchHistory = [];


fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;
    displayProducts(allProducts);
  })
  .catch(() => {
    container.innerHTML = "<p>Failed to load products</p>";
  });


function displayProducts(products) {
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p>No products found</p>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p class="price">$${product.price}</p>
    `;

    container.appendChild(card);
    card.addEventListener("click",()=>{
      console.log("Card clicked ",product.id);
      window.location.href=`product.html?id=${product.id}`;
    })
  });
}


function filterProducts(searchValue) {
  const filteredProducts = allProducts.filter(product =>
    product.title.toLowerCase().includes(searchValue) ||
    product.description.toLowerCase().includes(searchValue)
  );

  displayProducts(filteredProducts);
}


function handleSearch() {
  const searchValue = searchInput.value.toLowerCase().trim();
  if (!searchValue) return;

  filterProducts(searchValue);
  addToHistory(searchValue);
}


function addToHistory(term) {
  if (searchHistory.includes(term)) return;

  searchHistory.push(term);
  renderHistory();
}

function renderHistory() {
  historyContainer.innerHTML = "";

  searchHistory.forEach(term => {
    const btn = document.createElement("button");
    btn.textContent = term;
    btn.className = "history-item";

    btn.onclick = () => {
      searchInput.value = term;
      filterProducts(term);
    };

    historyContainer.appendChild(btn);
  });
}


function clearHistory() {
  searchHistory = [];
  historyContainer.innerHTML = "";
}
