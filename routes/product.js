const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Seller = require('../models/seller');

// Add Product
router.post('/add', async (req, res) => {
  const { name, description, price, images, stock, category, sellerId } = req.body;

  try {
    const seller = await Seller.findById(sellerId);
    if (!seller) return res.status(404).json({ error: 'Seller not found.' });

    const newProduct = new Product({ name, description, price, images, stock, category, seller: sellerId });
    await newProduct.save();
    res.json({ message: 'Product added successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Error adding product.' });
  }
});

// Remove Product
router.delete('/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    await Product.findByIdAndDelete(productId);
    res.json({ message: 'Product removed successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Error removing product.' });
  }
});

module.exports = router;