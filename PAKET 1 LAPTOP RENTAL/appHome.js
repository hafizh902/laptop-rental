const laptopList = [
    {
        laptopName: "Lenovo Laptop",
        brand: "Lenovo",
        rentPrice: 50000,
        rating: 3,
        status: true,
        imageUrl: "images/Lenovo Laptop.jpg"
    },
    {
        laptopName: "Huawei Matebook",
        brand: "Huawei",
        rentPrice: 200000,
        rating: 4,
        status: true,
        imageUrl: "images/Huawei Laptop.jpg"
    },
    {
        laptopName: "Dell Laptop",
        brand: "Dell",
        rentPrice: 100000,
        rating: 3,
        status: true,
        imageUrl: "images/DELL Laptop.jpg"
    },
    {
        laptopName: "Asus Chromebook",
        brand: "Asus",
        rentPrice: 25000,
        rating: 5,
        status: true,
        imageUrl: "images/Asus Chromebook Laptop.jpg"
    },
    {
        laptopName: "Alienware Laptop",
        brand: "Dell",
        rentPrice: 300000,
        rating: 4,
        status: false,
        imageUrl :"images/Alienware Laptop.jpg"
    },
    {
        laptopName: "Lenovo Yoga",
        brand: "Lenovo",
        rentPrice: 300000,
        rating: 2,
        status: true,
        imageUrl :"images/Lenovo Yoga Duet Laptop.jpg"
    },
    {
        laptopName: "ROG Strix",
        brand: "Asus",
        rentPrice: 250000,
        rating: 3,
        status: true,
        imageUrl :"images/ROG Laptop.jpg"
    },
    {
        laptopName: "MSI Laptop",
        brand: "MSI",
        rentPrice: 300000,
        rating: 3,
        status: false,
        imageUrl :"images/MSI Laptop.jpg"
    },
    {
        laptopName: "Asus Zenbook",
        brand: "Asus",
        rentPrice: 400000,
        rating: 2,
        status: true,
        imageUrl :"images/Zenbook Laptop.jpg"
    },
    {
        laptopName: "ROG Zephyrus",
        brand: "Asus",
        rentPrice: 200000,
        rating: 5,
        status: true,
        imageUrl :"images/ROG Zephyrus Laptop.jpg"
    }
];

function productList(productToDisplay) {
    const productListDiv = document.getElementById('productList');
    productListDiv.innerHTML = '';

    if (productToDisplay.length === 0) {
        productListDiv.innerHTML = '<p>No products found.</p>';
        return;
    }

    productToDisplay.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.laptopName}" onclick="openProductPage('${product.laptopName}')">
            <h3>${product.laptopName}</h3>
            <p>Brand: ${product.brand}</p>
            <p>Price: Rp${product.rentPrice.toLocaleString()}</p>
            <p>Rating: ${'⭐'.repeat(product.rating)}</p>
            <p>Status: <span class="${product.status ? '' : 'unavailable'}">${product.status ? "Available" : "Not Available"}</span></p>
        `;
        productListDiv.appendChild(productItem);
    });
}

function openProductPage(productName) {
    window.location.href = `productDetails.html?product=${encodeURIComponent(productName)}`;
}

function filterProducts() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const brandFilter = document.getElementById('brandFilter').value;

    const filteredProducts = laptopList.filter(product => {
        const matchesSearch = product.laptopName.toLowerCase().includes(searchInput);
        const matchesBrand = brandFilter ? product.brand.toLowerCase() === brandFilter.toLowerCase() : true;
        return matchesSearch && matchesBrand && product.status; // Filter only available products
    });

    const sortedFilteredProducts = sortProducts(filteredProducts);
    productList(sortedFilteredProducts);
}

function sortProducts(productsToSort) {
    const sortOption = document.getElementById('sortOptions').value;

    if (sortOption === 'name') {
        return productsToSort.sort((a, b) => a.laptopName.localeCompare(b.laptopName));
    } else if (sortOption === 'priceLow') {
        return productsToSort.sort((a, b) => a.rentPrice - b.rentPrice);
    } else if (sortOption === 'priceHigh') {
        return productsToSort.sort((a, b) => b.rentPrice - a.rentPrice);
    }
    return productsToSort;
}

function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = cartItems.length;
}

// Load the product list on page load
window.onload = function() {
    filterProducts(); // Display all products initially
    updateCartCount(); // Update cart count on load
};
let currentIndex = 0; // Track the current slide index
const itemWidth = 220; // Approximate width of each product item including gap

// Function to load products and create carousel items
function productList(productToDisplay) {
    const carouselTrack = document.getElementById('carouselTrack');
    carouselTrack.innerHTML = ''; // Clear previous items

    if (productToDisplay.length === 0) {
        carouselTrack.innerHTML = '<p>No products found.</p>';
        return;
    }

    productToDisplay.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.laptopName}" onclick="openProductPage('${product.laptopName}')">
            <h3>${product.laptopName}</h3>
            <p>Brand: ${product.brand}</p>
            <p>Price: Rp${product.rentPrice.toLocaleString()}</p>
            <p>Rating: ${'⭐'.repeat(product.rating)}</p>
            <p>Status: <span class="${product.status ? '' : 'unavailable'}">${product.status ? "Available" : "Not Available"}</span></p>
        `;
        carouselTrack.appendChild(productItem);
    });

    currentIndex = 0; // Reset slide position when products are loaded
    updateSlide();
}

// Function to handle sliding
function slideProducts(direction) {
    const carouselTrack = document.getElementById('carouselTrack');
    const maxIndex = Math.max(0, Math.floor(carouselTrack.children.length - document.getElementById('carousel').offsetWidth / itemWidth));
    
    // Update currentIndex based on direction (-1 for left, 1 for right)
    currentIndex += direction;

    // Ensure currentIndex is within bounds
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    updateSlide();
}

// Apply translation based on the current index
function updateSlide() {
    const carouselTrack = document.getElementById('carouselTrack');
    carouselTrack.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
}

// Load the product list on page load
window.onload = function() {
    filterProducts(); // Display all products initially
    updateCartCount(); // Update cart count on load
};
