const express = require('express');
const axios = require('axios');
const router = express.Router();

// Shiprocket API Integration
router.post('/create-order', async (req, res) => {
  const { orderDetails } = req.body;

  try {
    const response = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create', orderDetails, {
      headers: { Authorization: `Bearer YOUR_SHIPROCKET_API_KEY` },
    });

    res.json({ message: 'Order created successfully.', data: response.data });
  } catch (err) {
    res.status(500).json({ error: 'Error creating order.' });
  }
});

module.exports = router;