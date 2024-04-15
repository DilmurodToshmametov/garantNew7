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
    const productBrand = document.querySelector('.product__brand');
    const productModel = document.querySelector('.product__model');

    productImage.src = foundProduct.image;
    productName.textContent = "Имя товара: " + foundProduct.name;
    productPrice.textContent = "Цена: " + foundProduct.price;
    productNumber.textContent = "Код товара: " + foundProduct.number;
    productBrand.textContent = "Для бренда: " + foundProduct.brand;
    productModel.textContent = "Для моделя: " + foundProduct.model;
  })
  .catch((error) => console.error("Error fetching products data: ", error));
