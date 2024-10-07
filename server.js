// server.js

const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use(routes);

// Start the server after the database connection is open
db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`🌍 Server running on port ${PORT}!`);
    });
});
