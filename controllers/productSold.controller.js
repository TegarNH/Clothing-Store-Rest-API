const { ProductSold } = require('../models');

const getAllProductsSold = async (req, res) => {
  try {
    const productsSold = await ProductSold.findAll();

    return res.status(200).json({
      status: 'Success',
      message: 'Show all Products Sold in database',
      productsSold,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

module.exports = {
  getAllProductsSold,
};
