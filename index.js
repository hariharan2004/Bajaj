const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Utility function to validate base64
const isBase64 = (str) => {
    if (typeof str !== 'string') return false;
    try {
        return Buffer.from(str, 'base64').toString('base64') === str;
    } catch (err) {
        return false;
    }
};

// POST endpoint to handle data
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    let numbers = [];
    let alphabets = [];
    let highestLowercase = [];

    // Separate numbers and alphabets
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/[a-zA-Z]/.test(item)) {
            alphabets.push(item);
            if (/[a-z]/.test(item)) {
                highestLowercase.push(item);
            }
        }
    });

    // Determine the highest lowercase alphabet
    highestLowercase = highestLowercase.length > 0 
        ? [highestLowercase.sort().reverse()[0]] 
        : [];

    // File handling
    let fileValid = isBase64(file_b64);
    let fileMimeType = fileValid ? "application/octet-stream" : null;
    let fileSizeKb = fileValid ? (Buffer.byteLength(file_b64, 'base64') / 1024).toFixed(2) : null;

    // Response structure
    res.json({
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercase,
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKb
    });
});

// GET endpoint to return the operation code
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
