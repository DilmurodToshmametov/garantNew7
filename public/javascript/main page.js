let products; // Define 'products' variable globally

// Fetching data from JSON file
fetch("../includes/products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data; // Assign 'data' to 'products' variable
    // After fetching, you can now perform any operations with 'products'
    console.log("Products data fetched:", products);
  })
  .catch((error) => console.error("Error fetching products data:", error));

// categorizing
function displayProducts(category) {
  const productsBox = document.querySelector(".products__box");
  productsBox.innerHTML = ""; // Clear previous products

  const filteredProducts = products.filter(
    (product) => product.category === category
  );
  filteredProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product__card");
    productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h6>${product.name}</h6>
            <p>Price: ${product.price}</p>
            <p>Product Number: ${product.number}</p>
        `;
    productsBox.appendChild(productCard);
  });
}

// Event listener for category cards
document.querySelectorAll(".category__card").forEach((card) => {
  card.addEventListener("click", function () {
    const category = this.getAttribute("data-category");
    displayProducts(category);
  });
});

const searchInput = document.getElementById("searchInput");
const searchResultsContainer = document.getElementById("searchResults");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  const results = searchProducts(query);
  displaySearchResults(results);
});

function searchProducts(query) {
  if (!query) return []; // Return empty array if query is empty

  // Filter products based on search query
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.model.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query)
  );
}

function displaySearchResults(results, query) {
  searchResultsContainer.innerHTML = ""; // Clear previous search results

  if (results.length === 0) {
    searchResultsContainer.innerHTML = "<p>No results found.</p>";
  } else {
    results.forEach((result) => {
      const resultElement = document.createElement("a");

      const highlightedName = highlightMatchedString(result.name, query);
      const highlightedModel = highlightMatchedString(result.model, query);
      const highlightedBrand = highlightMatchedString(result.brand, query);

      resultElement.classList.add("resultsDiv");
      resultElement.setAttribute(
        "href",
        `./view/product.html?id=${result.number}`
      );
      resultElement.innerHTML = `<span class="left">${result.name} - ${result.model} (${result.brand})</span><span class="right">${result.price}</span>`;
      searchResultsContainer.appendChild(resultElement);
    });
  }
}
function highlightMatchedString(text, query) {
  const regex = new RegExp(query, "gi");
  return text.replace(
    regex,
    (match) => `<span class="highlight">${match}</span>`
  );
}
