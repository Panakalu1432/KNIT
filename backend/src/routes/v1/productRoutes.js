const express = require('express');
const { authenticate, authorize } = require('../../middleware/authMiddleware');
const productController = require('../../controllers/productController');

const router = express.Router();

 router.get('/', authenticate, productController.getProducts); 
 
 router.post('/', authenticate, authorize('Admin'), productController.createProduct);
router.put('/:id', authenticate, authorize('Admin'), productController.updateProduct);
router.delete('/:id', authenticate, authorize('Admin'), productController.deleteProduct);

module.exports = router;
