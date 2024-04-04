const products = [
    {
        name: 'brake pro',
        category: 'brake',
        price: '20$',
        number: 57775,
        image: 'brake2.webp'
    },
    {
        name: 'brake max',
        category: 'brake',
        price: '20$',
        number: 57776,
        image: 'brake2.webp'
    },
    {
        name: 'motor pro',
        category: 'motor',
        price: '15$',
        number: 57777,
        image: 'motor.png'
    },
    {
        name: 'motor pro',
        category: 'motor',
        price: '20$',
        number: 57778,
        image: 'motor.png'
    },
    {
        name: 'filter pro',
        category: 'filter',
        price: '15$',
        number: 57779,
        image: 'car_filter.png'
    },
    {
        name: 'filter pro',
        category: 'filter',
        price: '20$',
        number: 57780,
        image: 'car_filter.png'
    },
    {
        name: 'other pro',
        category: 'other',
        price: '15$',
        number: 57781,
        image: 'others.png!w700wp'
    },
    {
        name: 'other pro',
        category: 'other',
        price: '20$',
        number: 57782,
        image: 'others.png!w700wp'
    }
];
function displayProducts(category) {
    const productsBox = document.querySelector('.products__box');
    productsBox.innerHTML = ''; // Clear previous products

    const filteredProducts = products.filter(product => product.category === category);
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product__card');
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
document.querySelectorAll('.category__card').forEach(card => {
    card.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        displayProducts(category);
    });
});