const { Op } = require('sequelize');
const {
  Branch, Product, ProductSold, sequelize,
} = require('../models');

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
      message: 'Shows product data with the highest and lowest prices',
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

const getMostPurchasedPruductData = async (req, res) => {
  try {
    const month = req.query.month || new Date().getMonth() + 1;
    const year = req.query.year || new Date().getFullYear();

    if (isNaN(month) || isNaN(year)) {
      return res.status(400).json({ error: 'Invalid query type. Expecting number' });
    }

    if (!(parseInt(month, 10) >= 1 && parseInt(month, 10) <= 12)) {
      return res.status(400).json({
        status: 'error',
        msg: 'The month query must be a number from 1 to 12',
      });
    }

    // Search for data in the database according to the criteria
    const topProducts = [];
    const branches = await Branch.findAll();
    const branchesPromises = branches.map(async (branch) => {
      const options = {
        attributes: [
          'idProduct',
          [sequelize.fn('sum', sequelize.col('quantity')), 'quantity'],
        ],
        where: {
          [Op.and]: [
            sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM date')), parseInt(year, 10)),
            sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM date')), parseInt(month, 10)),
            { idBranch: branch.id },
          ],
        },
        group: ['idProduct'],
        order: [[sequelize.col('quantity'), 'DESC']],
        limit: 10,
      };
      const productsSold = await ProductSold.findAll(options);

      // look for customer data based on idProduct
      const products = [];
      const productsSoldPromises = productsSold.map(async (product) => {
        const itemProduct = await Product.findByPk(product.idProduct);
        products.push(itemProduct);
      });
      await Promise.all(productsSoldPromises);

      // Merges two arrays into 1 object
      for (let i = 0; i < productsSold.length; i++) {
        const data = {
          idProduct: productsSold[i].idProduct,
          quantity: productsSold[i].quantity,
          Product: products[i],
          branch,
        };
        topProducts.push(data);
      }
    });
    await Promise.all(branchesPromises);

    // Grouping responses into branches
    const formatedData = topProducts.reduce((acc, curr) => {
      if (!acc.find((branch) => branch.id === curr.branch.id)) {
        acc.push({
          id: curr.branch.id,
          name: curr.branch.name,
          topList: [{
            idProduct: curr.idProduct,
            quantity: curr.quantity,
            Product: curr.Product,
          }],
        });
      } else {
        const currentBranch = acc.find((branch) => branch.id === curr.branch.id);
        currentBranch.topList.push({
          idProduct: curr.idProduct,
          quantity: curr.quantity,
          Product: curr.Product,
        });
      }
      return acc;
    }, []);

    return res.status(200).json({
      status: 'Success',
      message: `Displays the most purchased products in month ${month} of ${year} in each branch`,
      branch: formatedData,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

const getProductsThatHaveIncreasedSales = async (req, res) => {
  try {
    let { date } = req.body;

    if (!date) {
      const currentDate = new Date().getDate();
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      date = new Date(currentYear, currentMonth, currentDate + 1).toISOString();
    }

    // Search for data in the database according to the criteria
    const optionsLastMonth = {
      attributes: [
        'idProduct',
        [sequelize.fn('COALESCE', sequelize.fn('SUM', sequelize.literal(`CASE WHEN (date_part('month', date) = date_part('month', '${date}'::date)) AND (date_part('year', date) = date_part('year', '${date}'::date)) THEN quantity ELSE 0 END`)), 0), 'quantitySoldThisMonth'],
        [sequelize.fn('COALESCE', sequelize.fn('SUM', sequelize.literal(`CASE WHEN (date_part('month', date) = date_part('month', '${date}'::date - INTERVAL '1 month')) AND (date_part('year', date) = date_part('year', '${date}'::date - (CASE WHEN (date_part('month', '${date}'::date)) = 1 THEN 1 ELSE 0 END))) THEN quantity ELSE 0 END`)), 0), 'quantitySoldLastMonth'],
      ],
      include: [Product],
      group: ['idProduct', 'Product.id'],
      limit: 5,
    };
    const products = await ProductSold.findAll(optionsLastMonth);

    // Calculate product sales increase and sort by increase
    const result = products.map((item) => {
      const increase = parseInt(item.dataValues.quantitySoldThisMonth, 10)
        - parseInt(item.dataValues.quantitySoldLastMonth, 10);
      return { ...item.dataValues, increase };
    }).sort((a, b) => b.increase - a.increase);

    return res.status(200).json({
      status: 'Success',
      message: `Shows products that experienced an increase in sales on ${date.split('T')[0]} compared to the previous month`,
      result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    return res.status(200).json({
      status: 'Success',
      message: 'Show all products in database',
      products,
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
  getMostPurchasedPruductData,
  getProductsThatHaveIncreasedSales,
  getAllProducts,
};
