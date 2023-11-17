const express = require('express');
const cors = require('cors'); // Import the 'cors' middleware
const app = express();
const port = 3000;
// Middleware to parse JSON data in requests
app.use(express.json());
// Middleware to handle CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', '*');
    next();
});
// Define a route to handle POST requests to store objects
app.post('/store-object', (req, res) => {
    const data = req.body;
    // Here, you can store the data in a database, a file, or any other storage method.
    // For simplicity, we'll log the data.
    console.log('Received object:', data);
    res.json({ message: 'Object stored successfully' });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
