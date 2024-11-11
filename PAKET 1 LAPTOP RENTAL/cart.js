let cart = JSON.parse(localStorage.getItem('cart')) || [];

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
    updateCartDisplay();
}

// Function to display cart items
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

// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    // Simulate the checkout process
    alert("Thank you for your purchase!");
    cart = []; // Clear the cart after checkout
    localStorage.removeItem('cart'); // Clear cart from localStorage
    updateCartDisplay();
}
function goBack() {
    window.history.back(); // Navigate back to the previous page
}
// Initialize the cart display when the page loads
document.addEventListener('DOMContentLoaded', updateCartDisplay);
