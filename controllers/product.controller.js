const { Branch, Product } = require('../models');

const getHighestAndLowestProductPrice = async (req, res) => {
  try {
    const highestPricedProduct = await Product.findOne({
      include: {
        model: Branch,
        attributes: ['name'],
      },
      order: [['price', 'DESC']],
    });

    const lowestPricedProduct = await Product.findOne({
      include: {
        model: Branch,
        attributes: ['name'],
      },
      order: [['price', 'ASC']],
    });

    return res.status(200).json({
      status: 'Success',
      message: 'Shows clothing data with the highest and lowest prices',
      highestPricedProduct,
      lowestPricedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

module.exports = {
  getHighestAndLowestProductPrice,
};
