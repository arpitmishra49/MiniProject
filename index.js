const container = document.getElementById("product-container");
const searchInput = document.getElementById("searchInput");

let allProducts = [];

fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;
    displayProducts(allProducts);
  })
  .catch(err => {
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
      <p>${product.description.substring(0, 60)}...</p>
      <p class="price">$${product.price}</p>
    `;

    container.appendChild(card);
  });
}

// 🔍 Search functionality
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();

  const filteredProducts = allProducts.filter(product =>
    product.title.toLowerCase().includes(searchValue) ||
    product.description.toLowerCase().includes(searchValue)
  );

  displayProducts(filteredProducts);
});
