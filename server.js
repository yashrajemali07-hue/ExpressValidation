
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Registration route
app.post('/register', (req, res) => {

    const { name, email, phone, password } = req.body;

    let errors = [];

    // Validate name
    if (!name || name.trim() === '') {
        errors.push("Name is required");
    }

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Enter a valid email address");
    }

    // Validate phone
    if (!phone || !/^[0-9]{10}$/.test(phone)) {
        errors.push("Phone number must contain 10 digits");
    }

    // Validate password
    if (!password || password.length < 6) {
        errors.push("Password must be at least 6 characters");
    }

    // Return validation errors
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    }

    // Successful registration
    res.status(200).json({
        success: true,
        message: "Registration successful!"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
