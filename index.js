// server.js
const express = require('express');
const mysql = require('mysql2');

// Initialize Express.js
const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// MySQL connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Replace with your MySQL password
    database: ''  // Replace with your MySQL database name
});

// Connect to the MySQL database
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Connected to MySQL database.');
    }
});

// Default route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/admin/login', (req, res) => {
    res.sendFile(__dirname + "/admin/login.html");
})

app.get('/admin', (req, res) => {
    // Authentication
    authenticated = true;

    if (authenticated)
        res.sendFile(__dirname + "/admin/admin.html");
    else
        res.sendFile(__dirname + '/public/index.html');
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
