const container = document.getElementById("product-details");


const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (!productId) {
  container.innerHTML = "<p>Invalid product</p>";
} else {
  fetch(`https://dummyjson.com/products/${productId}`)
    .then(res => res.json())
    .then(product => {
      renderProduct(product);
    })
    .catch(() => {
      container.innerHTML = "<p>Failed to load product</p>";
    });
}

function renderProduct(product) {
  container.innerHTML = `
    <div class="product-card">
      <div class="image-section">
        <img src="${product.thumbnail}" alt="${product.title}" class="main-img"/>
        <div class="gallery">
          ${product.images
            .map(
              img => `<img src="${img}" onclick="changeImage('${img}')"/>`
            )
            .join("")}
        </div>
      </div>

      <div class="info-section">
        <h1>${product.title}</h1>
        <p class="brand">Brand: ${product.brand}</p>
        <p class="category">Category: ${product.category}</p>
        <p class="description">${product.description}</p>

        <p class="price">Price: $${product.price}</p>
        <p class="discount">Discount: ${product.discountPercentage}%</p>
        <p class="rating">Rating: ⭐ ${product.rating}</p>
        <p class="stock">Stock Available: ${product.stock}</p>
        <p class="Weight">Weight: ${product.weight}</p>
        <p class="Warranty:">Warranty: ${product.warrantyInformation}</p>
        <p class="Shipping:">Warranty: ${product.shippingInformation}</p>
         <p class="Minimum-Order:">Minimum Order Quantity: ${product.minimumOrderQuantity}</p>
       
      </div>
    </div>
  `;
}

function changeImage(src) {
  document.querySelector(".main-img").src = src;
}
