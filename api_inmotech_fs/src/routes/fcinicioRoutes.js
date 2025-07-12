const express = require('express');
const InmuebleController = require('../controllers/fcinicioController'); // Correctly points to the inicio controller
 const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// Route for fetching featured properties (e.g., for a home page)
router.get('/featured', verifyToken, InmuebleController.getFeaturedInmuebles);

module.exports = router;