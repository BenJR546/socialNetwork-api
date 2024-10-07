// routes/index.js

const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

// Fallback for invalid routes
router.use((req, res) => res.status(404).send("404 Not Found"));

module.exports = router;
