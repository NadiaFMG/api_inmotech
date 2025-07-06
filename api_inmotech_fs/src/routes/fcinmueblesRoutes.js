const express = require('express');
const InmuebleController = require('../controllers/fcinmueblesController'); // Correctly points to the full search controller
const router = express.Router();

// Route for general filtered property search
router.get('/search', InmuebleController.getFilteredInmueblesFull);

module.exports = router;