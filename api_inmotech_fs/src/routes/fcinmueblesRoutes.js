const express = require('express');
const InmuebleController = require('../controllers/fcinmueblesController'); // Correctly points to the full search controller
 const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// Route for general filtered property search
router.get('/search', verifyToken, InmuebleController.getFilteredInmueblesFull);

module.exports = router;