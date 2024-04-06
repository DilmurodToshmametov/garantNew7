let products; // Define 'products' variable globallyF
// Fetching data from JSON file
fetch("../includes/products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    // Assign 'data' to 'products' variable
    // After fetching, you can now perform any operations with 'products'
    console.log("Products data fetched:", products);

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    const foundProduct = products.find(
      (foundProduct) => foundProduct.number == productId
    );

    const productImage = document.querySelector('.product__image');
    const productName = document.querySelector('.product__name');
    const productPrice = document.querySelector('.product__price');
    const productNumber = document.querySelector('.product__number');

    productImage.src = foundProduct.image;
    productName.textContent = foundProduct.name;
    productPrice.textContent = foundProduct.price;
    productNumber.textContent = foundProduct.number;
  })
  .catch((error) => console.error("Error fetching products data:", error));
