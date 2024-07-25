const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors());

// Define the path to the `api` directory
const apiPath = path.join(__dirname, "../api");

// Serve static files from the `api` directory
app.use(express.static(apiPath));

// Root route
app.get("/", (req, res) => {
    res.send("OK");
});

// Route to serve language files
app.get("/api/localize/:lang", (req, res) => {
    const lang = req.params.lang;
    const filePath = path.join(apiPath, `localize/${lang}.json`);

    // Debugging statement to ensure the path is correct
    console.log(`Serving file from path: ${filePath}`);

    res.sendFile(filePath, err => {
        if (err) {
            console.error(`Error serving file: ${err.message}`);
            res.status(404).send('Language file not found');
        }
    });
});

// Route to list available languages
app.get("/api/localize/list", (req, res) => {
    res.json({
        "en": "English"
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});
