let products;

fetch("./includes/products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data; // Assign 'data' to 'products' variable
    // After fetching, you can now perform any operations with 'products'
    console.log("Products data fetched:", products);
  })
  .catch((error) => console.error("Error fetching products data:", error));

// categorizing
function displayProducts(category, model) {
  const productsBox = document.querySelector(".products__box");
  productsBox.innerHTML = ""; // Clear previous products
  let filteredProducts;
  if (model) {
    filteredProducts = products.filter(
      (product) =>
        product.category === category && product.model.includes(model)
    );
  } else {
    filteredProducts = products.filter(
      (product) => product.category === category
    );
  }
  filteredProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product__card");
    productCard.innerHTML = `
            <div class="product__img-container">
            <img src="${product.image}" alt="${product.name}">
            </div>
            <h6>${product.name}</h6>
            <p>Цена: ${product.price}$</p>
            <p>Код товара: ${product.number}</p>
            <a href="./view/product.html?id=${product.number}">Подробнее о товаре</a>
        `;
    productsBox.appendChild(productCard);
  });
}
function displayProductsByModel(model) {
  const productsBox = document.querySelector(".products__box");
  productsBox.innerHTML = ""; // Clear previous products

  let filteredProducts = products.filter((product) =>
    product.model.includes(model)
  );
  filteredProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product__card");
    productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h6>${product.name}</h6>
            <p>Price: ${product.price}</p>
            <p>Product Number: ${product.number}</p>
            <a href="./view/product.html?id=${product.number}">Подробнее о товаре</a>
        `;
    productsBox.appendChild(productCard);
  });
}
function displayProducts2(products) {
  const productsBox = document.querySelector(".products__box");
  productsBox.innerHTML = ""; // Clear previous products

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product__card");
    productCard.innerHTML = `
            <div class="product__img-container">
            <img src="${product.image}" alt="${product.name}">
            </div>
            <h6>${product.name}</h6>
            <p>Price: ${product.price}</p>
            <p>Product Number: ${product.number}</p>
            <a href="./view/product.html?id=${product.number}">Подробнее о товаре</a>
        `;
    productsBox.appendChild(productCard);
  });
}

const searchInput = document.getElementById("searchInput");
const searchResultsContainer = document.getElementById("searchResults");
const searchButton = document.querySelector(".search__button");

searchButton.addEventListener("click", () => {
  const userInput = searchInput.value.toLowerCase().trim();

  displayProducts2(searchProducts(userInput));
});

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

function displaySearchResults(results) {
  searchResultsContainer.innerHTML = ""; // Clear previous search results

  if (results.length === 0) {
    searchResultsContainer.innerHTML = "<p>No results found.</p>";
  } else {
    results.forEach((result) => {
      const resultElement = document.createElement("a");

      // const highlightedName = highlightMatchedString(result.name, query);
      // const highlightedModel = highlightMatchedString(result.model, query);
      // const highlightedBrand = highlightMatchedString(result.brand, query);

      resultElement.classList.add("resultsDiv");
      resultElement.setAttribute(
        "href",
        `./view/product.html?id=${result.number}`
      );
      resultElement.innerHTML = `<span class="left">${result.name} - ${result.model[0]} (${result.brand})</span><span class="right">${result.price}</span>`;
      searchResultsContainer.appendChild(resultElement);
    });
  }
}

const categoryList = {}; // Create an empty object to store category list elements
const categoryImage = document.getElementById("category__image");

// Define the category images object
const categoryImages = {
  cat1: "./images/1dvigatel.png",
  cat2: "./images/2korobka-peredach.png",
  cat3: "./images/3Steplenie.png",
  cat4: "./images/4sistema.png",
  cat5: "./images/5toplivnaya.png",
  cat6: "./images/6vixopnaya.png",
  cat7: "./images/7kardannie.png",
  cat8: "./images/8tormoznaya.png",
  cat9: "./images/9mosti.png",
  cat10: "./images/10stupitsa.png",
  cat11: "./images/11podveska.png",
  cat12: "./images/12rulevaya.png",
  cat13: "./images/13elektro.png",
  cat14: "./images/14filtra.png",
  cat15: "./images/15kuzov.png",
};

const selectModel = document.getElementById("select__model");
const selectCategory = document.getElementById("select__category");
let selectedCategoryId = null;

selectCategory.addEventListener("change", function () {
  selectedCategoryId = this.value; // Get the value of the selected option

  if (selectModel.value) {
    displayProducts(parseInt(selectedCategoryId), selectModel.value);
  } else {
    selectedCategoryId = this.value; // Get the value of the selected option
    displayProducts(parseInt(selectedCategoryId), null); // Display the products for the selected
  }
});
selectModel.addEventListener("change", function () {
  const selectedModel = this.value;

  if (selectCategory.value) {
    displayProducts(parseInt(selectCategory.value), selectedModel);
  } else {
    displayProductsByModel(selectedModel);
  }
});

let currentCategoryId = null; // Variable to store the currently clicked category ID

for (let i = 1; i <= 15; i++) {
  const categoryId = `cat${i}`;
  categoryList[categoryId] = document.getElementById(categoryId);

  categoryList[categoryId].addEventListener("mouseenter", function () {
    const imageSrc = categoryImages[categoryId];
    if (imageSrc) {
      categoryImage.src = imageSrc;
    }
  });

  // selectCategory.options[i].addEventListener('change', function(){
  //   displayProducts(i);
  // })

  categoryList[categoryId].addEventListener("click", function () {
    currentCategoryId = categoryId;
    displayProducts(i);
    selectModel.options[0].selected = true;
    selectCategory.options[i].selected = true;

    const prevFocused = document.querySelector(".focused");
    if (prevFocused) {
      prevFocused.classList.remove("focused");
    }

    categoryList[categoryId].classList.add("focused");

    categoryList[categoryId].addEventListener("mouseleave", function () {
      // Check if a category image is clicked
      if (currentCategoryId !== null) {
        // Check if the mouse is not hovering over any category name
        const hoveredCategory = Object.values(categoryList).find((cat) =>
          cat.matches(":hover")
        );
        if (!hoveredCategory) {
          // If not hovering over any category name, keep the clicked category image
          const imageSrc = categoryImages[currentCategoryId];
          if (imageSrc) {
            categoryImage.src = imageSrc;
          }
        }
      }
    });
  });
}
