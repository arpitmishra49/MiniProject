const container = document.getElementById("product-container");

fetch("https://dummyjson.com/products")
  .then(response => response.json())
  .then(data => {
    const products = data.products;

    products.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.description.substring(0, 60)}...</p>
        <p class="price">$${product.price}</p>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error fetching data:", error);
    container.innerHTML = "<p>Failed to load products.</p>";
  });
