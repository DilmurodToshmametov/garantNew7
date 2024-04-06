let products; // Define 'products' variable globally

// Fetching data from JSON file
fetch("./products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data; // Assign 'data' to 'products' variable
    // After fetching, you can now perform any operations with 'products'
    console.log("Products data fetched:", products);
  })
  .catch((error) => console.error("Error fetching products data:", error));

export { products };
