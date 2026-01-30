const container = document.getElementById("product-container");
const searchInput = document.getElementById("searchInput");

let allProducts = [];
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

/* FETCH PRODUCTS */
fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;

    // Auto search if query exists
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");
    if (query) {
      searchInput.value = query;
      filterProducts(query.toLowerCase());
    }
  });

/* DISPLAY PRODUCTS */
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

    card.onclick = () => {
      window.location.href = `product.html?id=${product.id}`;
    };

    container.appendChild(card);
  });
}

/* FILTER */
function filterProducts(value) {
  const filtered = allProducts.filter(p =>
    p.title.toLowerCase().includes(value) ||
    p.description.toLowerCase().includes(value)
  );

  displayProducts(filtered);
}

/* SEARCH */
function handleSearch() {
  const value = searchInput.value.toLowerCase().trim();
  if (!value) return;

  filterProducts(value);
  saveHistory(value);
}


function saveHistory(term) {
  if (!searchHistory.includes(term)) {
    searchHistory.push(term);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }
}

function goBack() {
  window.location.href = "index.html";
}
