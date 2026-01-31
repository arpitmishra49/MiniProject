const container = document.getElementById("product-container");
const searchInput = document.getElementById("searchInput");
const historyContainer = document.getElementById("search-history");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

let allProducts = [];
let currentProducts = [];
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

let currentPage = 1;
const itemsPerPage = 8;


fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;
    displayProducts(allProducts);
    renderHistory();
  })
  .catch(() => {
    container.innerHTML = "<p>Failed to load products</p>";
  });


function displayProducts(products) {
  currentProducts = products;
  currentPage = 1;
  renderPage();
}


function renderPage() {
  container.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageProducts = currentProducts.slice(start, end);

  if (pageProducts.length === 0) {
    container.innerHTML = "<p>No products found</p>";
    return;
  }

  pageProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p class="price">$${product.price}</p>
    `;

    card.onclick = () => {
      saveViewedProduct(product);
      window.location.href = `product.html?id=${product.id}`;
    };

    container.appendChild(card);
  });

  updatePagination();
}


function updatePagination() {
  const totalPages = Math.ceil(currentProducts.length / itemsPerPage);
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

prevBtn.onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
};

nextBtn.onclick = () => {
  const totalPages = Math.ceil(currentProducts.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderPage();
  }
};


function handleSearch() {
  const value = searchInput.value.toLowerCase().trim();
  if (!value) return;

  const filtered = allProducts.filter(product =>
    product.title.toLowerCase().includes(value) ||
    product.description.toLowerCase().includes(value)
  );

  displayProducts(filtered);
  addToHistory(value);
}


function addToHistory(term) {
  if (searchHistory.includes(term)) return;

  searchHistory.push(term);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  renderHistory();
}

function renderHistory() {
  historyContainer.innerHTML = "";

  searchHistory.forEach(term => {
    const btn = document.createElement("button");
    btn.className = "history-item";
    btn.textContent = term;

    btn.onclick = () => {
      searchInput.value = term;
      handleSearch();
    };

    historyContainer.appendChild(btn);
  });
}

function clearHistory() {
  searchHistory = [];
  localStorage.removeItem("searchHistory");
  historyContainer.innerHTML = "";
}
function saveViewedProduct(product) {
  let viewed = JSON.parse(localStorage.getItem("viewedProducts")) || [];

  // remove duplicate if already viewed
  viewed = viewed.filter(p => p.id !== product.id);

  viewed.unshift({
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail
  });

  // keep only last 10 viewed products
  viewed = viewed.slice(0, 10);

  localStorage.setItem("viewedProducts", JSON.stringify(viewed));
}

