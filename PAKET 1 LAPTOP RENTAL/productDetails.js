const laptopList = [
    {
        laptopName: "Lenovo Laptop",
        brand: "lenovo",
        rentPrice: 50000,
        rating: 3,
        status: true,
        imageUrl: "images/Lenovo Laptop.jpg",
        specs: {
            processor: "Intel Core i5",
            ram: "8GB",
            storage: "256GB SSD",
            display: "15.6 inch FHD",
            battery: "Up to 8 hours",
            graphics: "Intel UHD Graphics"
        }
    },
    {
        laptopName: "Huawei Matebook",
        brand: "Huawei",
        rentPrice: 200000,
        rating: 4,
        status: true,
        imageUrl: "images/Huawei Laptop.jpg",
        specs: {
            processor: "Intel Core i7",
            ram: "16GB",
            storage: "512GB SSD",
            display: "14 inch FHD",
            battery: "Up to 10 hours",
            graphics: "Intel Iris Plus"
        }
    },
    {
        laptopName: "Dell Laptop",
        brand: "Dell",
        rentPrice: 100000,
        rating: 3,
        status: true,
        imageUrl: "images/DELL Laptop.jpg",
        specs: {
            processor: "Intel Core i7",
            ram: "16GB",
            storage: "512GB SSD",
            display: "14 inch FHD",
            battery: "Up to 10 hours",
            graphics: "Intel Iris Plus"
        }
    },
    {
        laptopName: "Asus Chromebook",
        brand: "Asus",
        rentPrice: 25000,
        rating: 5,
        status: true,
        imageUrl: "images/Asus Chromebook Laptop.jpg",
        specs: {
            processor: "Intel Core i7",
            ram: "16GB",
            storage: "512GB SSD",
            display: "14 inch FHD",
            battery: "Up to 10 hours",
            graphics: "Intel Iris Plus"
        }
    },
    {
        laptopName: "Alienware Laptop",
        brand: "Dell",
        rentPrice: 300000,
        rating: 4,
        status: false,
        imageUrl: "images/Alienware Laptop.jpg",
        specs: {
            processor: "Intel Core i7",
            ram: "16GB",
            storage: "512GB SSD",
            display: "14 inch FHD",
            battery: "Up to 10 hours",
            graphics: "Intel Iris Plus"
        }
    },
    {
        laptopName: "Lenovo Yoga",
        brand: "Lenovo",
        rentPrice: 300000,
        rating: 2,
        status: true,
        imageUrl: "images/Lenovo Yoga Duet Laptop.jpg",
        specs: {
            processor: "Intel Core i7",
            ram: "16GB",
            storage: "512GB SSD",
            display: "14 inch FHD",
            battery: "Up to 10 hours",
            graphics: "Intel Iris Plus"
        }
    },
    {
        laptopName: "ROG Strix",
        brand: "Asus",
        rentPrice: 250000,
        rating: 3,
        status: true,
        imageUrl: "images/ROG Laptop.jpg",
        specs: {
            processor: "Intel Core i7",
            ram: "16GB",
            storage: "512GB SSD",
            display: "14 inch FHD",
            battery: "Up to 10 hours",
            graphics: "Intel Iris Plus"
        }
    },
    {
        laptopName: "MSI Laptop",
        brand: "MSI",
        rentPrice: 300000,
        rating: 3,
        status: false,
        imageUrl: "images/MSI Laptop.jpg",
        specs: {
            processor: "Intel Core i7",
            ram: "16GB",
            storage: "512GB SSD",
            display: "14 inch FHD",
            battery: "Up to 10 hours",
            graphics: "Intel Iris Plus"
        }
    },
    {
        laptopName: "Asus Zenbook",
        brand: "Asus",
        rentPrice: 400000,
        rating: 2,
        status: true,
        imageUrl: "images/Zenbook Laptop.jpg",
        specs: {
            processor: "Intel Core i7",
            ram: "16GB",
            storage: "512GB SSD",
            display: "14 inch FHD",
            battery: "Up to 10 hours",
            graphics: "Intel Iris Plus"
        }
    },
    {
        laptopName: "ROG Zephyrus",
        brand: "Asus",
        rentPrice: 200000,
        rating: 5,
        status: true,
        imageUrl: "images/ROG Zephyrus Laptop.jpg",
        specs: {
            processor: "Intel Core i7",
            ram: "16GB",
            storage: "512GB SSD",
            display: "14 inch FHD",
            battery: "Up to 10 hours",
            graphics: "Intel Iris Plus"
        }
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display product details
function displayProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('product');
    const product = laptopList.find(p => p.laptopName === decodeURIComponent(productName));

    if (product) {
        document.getElementById("productImage").innerHTML = `
            <img src="${product.imageUrl}" alt="${product.laptopName}" style="max-width: 100%; height: auto;">
        `;
        document.getElementById("productSpecs").innerHTML = `
            <h2>${product.laptopName}</h2>
            <p><strong>Brand:</strong> ${product.brand}</p>
            <p><strong>Price:</strong> Rp${product.rentPrice.toLocaleString()}</p>
            <p><strong>Rating:</strong> ${'⭐'.repeat(product.rating)}</p>
            <p><strong>Processor:</strong> ${product.specs.processor}</p>
            <p><strong>RAM:</strong> ${product.specs.ram}</p>
            <p><strong>Storage:</strong> ${product.specs.storage}</p>
            <p><strong>Display:</strong> ${product.specs.display}</p>
            <p><strong>Battery Life:</strong> ${product.specs.battery}</p>
            <p><strong>Graphics:</strong> ${product.specs.graphics}</p>
            <button onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">Rent Now</button>
            <button onclick="goBack()">Back to Home</button>
        `;
    } else {
        document.getElementById("productSpecs").innerHTML = "<p>Product not found.</p>";
    }

    // Update cart display
    updateCartDisplay();
}

// Function to add a laptop to the cart
function addToCart(product) {
    if (!product.status) {
        alert("This laptop is not available for rent.");
        return;
    }

    // Check if the product is already in the cart
    const existingItem = cart.find(item => item.laptopName === product.laptopName);
    if (existingItem) {
        alert("This laptop is already in your cart.");
        return;
    }

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart)); // Save to localStorage
    alert(`${product.laptopName} has been added to your cart.`);
    updateCartCount(); // Update cart count after adding
}

// Function to update cart count
function updateCartCount() {
    const cartCount = cart.length;
    document.getElementById("cart-count").innerText = cartCount;
}

// Function to handle checkout and record purchase
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const profile = JSON.parse(localStorage.getItem('userProfile'));
    if (profile) {
        // Add cart items to purchase history
        profile.purchaseHistory.push(...cart);
        localStorage.setItem('userProfile', JSON.stringify(profile)); // Update profile in localStorage
    }

    alert("Thank you for your purchase!");

    cart = []; // Clear the cart after checkout
    localStorage.removeItem('cart'); // Clear cart from localStorage
    updateCartDisplay();
}

// Function to update cart display
function updateCartDisplay() {
    const cartDiv = document.getElementById('cartItems');
    cartDiv.innerHTML = ''; // Clear current cart items

    let totalPrice = 0;

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <p>${item.laptopName} - Rp${item.rentPrice.toLocaleString()}</p>
            <button onclick="removeFromCart('${item.laptopName}')">Remove</button>
        `;
        cartDiv.appendChild(itemDiv);
        totalPrice += item.rentPrice;
    });

    const totalDiv = document.getElementById('totalPrice');
    totalDiv.innerHTML = `Total: Rp${totalPrice.toLocaleString()}`;
}

// Function to remove an item from the cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.laptopName !== productName);
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    updateCartDisplay();
}

// Initialize the cart display when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay(); // Load cart items
    updateCartCount(); // Update cart count
});

// Function to go back to the previous page
function goBack() {
    window.history.back(); // Navigate back to the previous page
}