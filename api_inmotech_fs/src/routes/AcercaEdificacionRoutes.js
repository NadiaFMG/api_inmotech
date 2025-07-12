 const express = require('express');
 const AcercaEdificacionController = require('../controllers/AcercaEdificacionController');
 const verifyToken = require('../middlewares/verifyToken');

 const router = express.Router();

 router.get('/', verifyToken, AcercaEdificacionController.findAll);
 router.get('/:id', verifyToken, AcercaEdificacionController.findById);
 router.post('/', verifyToken, AcercaEdificacionController.create);
 router.put('/:id', verifyToken, AcercaEdificacionController.update);
 router.delete('/:id', verifyToken, AcercaEdificacionController.delete);

 module.exports = router;

// const express = require('express');
// const AcercaEdificacionController = require('../controllers/AcercaEdificacionController');
// const verifyToken = require('../middlewares/verifyToken');
// const { authorize } = require('../middlewares/apimiddleware');

// const router = express.Router();

// router.get('/', verifyToken, authorize, AcercaEdificacionController.findAll);
// router.get('/:id', verifyToken, authorize, AcercaEdificacionController.findById);
// router.post('/', verifyToken, authorize, AcercaEdificacionController.create);
// router.put('/:id', verifyToken, authorize, AcercaEdificacionController.update);
// router.delete('/:id', verifyToken, authorize, AcercaEdificacionController.delete);

// module.exports = router;