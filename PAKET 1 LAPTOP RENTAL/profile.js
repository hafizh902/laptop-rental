function saveProfile(event) {
    event.preventDefault(); // Prevent form from submitting
    console.log("Form submitted"); // Debug log
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    console.log(name, address, phone); // Log input values

    const profile = {
        name,
        address,
        phone,
        purchaseHistory: [] // Initialize empty purchase history
    };

    localStorage.setItem('userProfile', JSON.stringify(profile)); // Save profile to local storage
    alert('Profile saved! You can now go to your profile page.');
    window.location.href = 'home.html'; // Redirect to home page
}

function loadProfile() {
    const profile = JSON.parse(localStorage.getItem('userProfile'));

    if (profile) {
        document.getElementById('profileInfo').innerHTML = `
            <p><strong>Name:</strong> ${profile.name}</p>
            <p><strong>Address:</strong> ${profile.address}</p>
            <p><strong>Phone Number:</strong> ${profile.phone}</p>
            <p><strong>Status:</strong> Online</p>
            <button onclick="deleteProfile()">Delete Profile</button>
        `;
        updatePurchaseHistoryDisplay(); // Load purchase history
    } else {
        // Redirect to registration if no profile found
        window.location.href = 'register.html';
    }
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

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
    updatePurchaseHistoryDisplay(); // Update history display
}

// Function to display purchase history using DOM
function updatePurchaseHistoryDisplay() {
    const historyDiv = document.getElementById('historyItems');
    historyDiv.innerHTML = ''; // Clear current history items

    const profile = JSON.parse(localStorage.getItem('userProfile'));
    if (profile && profile.purchaseHistory.length > 0) {
        profile.purchaseHistory.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
                <p>${item.laptopName} - Rp${item.rentPrice.toLocaleString()}</p>
            `;
            historyDiv.appendChild(itemDiv);
        });
    } else {
        historyDiv.innerHTML = '<p>No purchase history.</p>';
    }
}

// Function to delete user profile
function deleteProfile() {
    if (confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
        localStorage.removeItem('userProfile'); // Remove profile from localStorage
        alert("Profile deleted successfully.");
        window.location.href = 'register.html'; // Redirect to registration page
    }
}

// Load profile when the profile page is opened
document.addEventListener('DOMContentLoaded', loadProfile);
