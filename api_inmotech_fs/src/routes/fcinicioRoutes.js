const express = require('express');
const InmuebleController = require('../controllers/fcinicioController'); // Correctly points to the inicio controller
const router = express.Router();

// Route for fetching featured properties (e.g., for a home page)
router.get('/featured', InmuebleController.getFeaturedInmuebles);

module.exports = router;