const productModel = require('../models/productModel');
const ApiError = require('../utils/ApiError');

exports.createProduct = async (req, res, next) => {
    try {
        const createdById = parseInt(req.user.id); 
        const { name, description, price } = req.body;

        if (!name || !description || price === undefined) {
            throw new ApiError(400, 'All fields (name, description, price) are required.');
        }

        if (typeof price !== 'number' || price <= 0) {
            throw new ApiError(400, 'Price must be a positive number.');
        }

        const productId = await productModel.create(name, description, price, createdById);

        res.status(201).json({
            message: 'Product created successfully',
            productId: productId,
        });

    } catch (error) {
        console.error('Create product error:', error.message);
        next(error);
    }
};

exports.getProducts = async (req, res, next) => {
    try {
        const products = await productModel.findAll();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

 exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;

        if (!name || !description || price === undefined) {
            throw new ApiError(400, 'All fields (name, description, price) are required for update.');
        }

        const changes = await productModel.update(id, name, description, price);

        if (changes === 0) {
            throw new ApiError(404, `Product with ID ${id} not found.`);
        }

        res.status(200).json({
            message: 'Product updated successfully',
            changes: changes,
        });
    } catch (error) {
        next(error);
    }
};

 exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const changes = await productModel.remove(id);

        if (changes === 0) {
            throw new ApiError(404, `Product with ID ${id} not found.`);
        }

        res.status(200).json({
            message: 'Product deleted successfully.',
        });
    } catch (error) {
        next(error);
    }
};
