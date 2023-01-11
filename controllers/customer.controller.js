const { Op } = require('sequelize');
const {
  Branch, Customer, ProductSold, sequelize,
} = require('../models');

const getNewestAndOldestCustomer = async (req, res) => {
  try {
    const { idBranch } = req.query;

    if (!idBranch) {
      return res.status(400).json({
        status: 'Error',
        message: 'the idBranch parameter is required',
      });
    }

    const branch = await Branch.findByPk(idBranch);
    if (branch === null) {
      return res.status(400).json({
        status: 'Error',
        message: 'idBranch not found',
      });
    }

    const newestCustomer = await Customer.findOne({
      where: { idBranch },
      include: {
        model: Branch,
        attributes: ['name'],
      },
      order: [['createdAt', 'DESC']],
    });

    const oldestCustomer = await Customer.findOne({
      where: { idBranch },
      include: {
        model: Branch,
        attributes: ['name'],
      },
      order: [['createdAt', 'ASC']],
    });

    return res.status(200).json({
      status: 'Success',
      message: `Shows the newest and oldest customer data by branch ${branch.name}`,
      newestCustomer,
      oldestCustomer,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

const getCustomerDataThatSpendTheMost = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        status: 'Error',
        message: 'the month and year parameter is required',
      });
    }

    if (!(parseInt(month, 10) >= 1 && parseInt(month, 10) <= 12)) {
      return res.status(400).json({
        status: 'error',
        msg: 'The month parameter must be a number from 1 to 12',
      });
    }

    // Search for data in the database according to the criteria
    const topCustomers = [];
    const branches = await Branch.findAll();
    const branchesPromises = branches.map(async (branch) => {
      const options = {
        attributes: [
          'idCustomer',
          [sequelize.fn('sum', sequelize.col('totalPrice')), 'totalPrice'],
        ],
        where: {
          [Op.and]: [
            sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM date')), parseInt(year, 10)),
            sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM date')), parseInt(month, 10)),
            { idBranch: branch.id },
          ],
        },
        group: ['idCustomer'],
        order: [[sequelize.col('totalPrice'), 'DESC']],
        limit: 10,
      };
      const productsSold = await ProductSold.findAll(options);

      // look for customer data based on idCustomer
      const customers = [];
      const productsSoldPromises = productsSold.map(async (product) => {
        const customer = await Customer.findByPk(product.idCustomer);
        customers.push(customer);
      });
      await Promise.all(productsSoldPromises);

      // Merges two arrays into 1 object
      for (let i = 0; i < productsSold.length; i++) {
        const data = {
          idCustomer: productsSold[i].idCustomer,
          totalPrice: productsSold[i].totalPrice,
          Customer: customers[i],
          branch,
        };
        topCustomers.push(data);
      }
    });
    await Promise.all(branchesPromises);

    // Grouping responses into branches
    const formatedData = topCustomers.reduce((acc, curr) => {
      if (!acc.find((branch) => branch.id === curr.branch.id)) {
        acc.push({
          id: curr.branch.id,
          name: curr.branch.name,
          topList: [{
            idCustomer: curr.idCustomer,
            totalPrice: curr.totalPrice,
            Customer: curr.Customer,
          }],
        });
      } else {
        const currentBranch = acc.find((branch) => branch.id === curr.branch.id);
        currentBranch.topList.push({
          idCustomer: curr.idCustomer,
          totalPrice: curr.totalPrice,
          Customer: curr.Customer,
        });
      }
      return acc;
    }, []);

    return res.status(200).json({
      status: 'Success',
      message: `Displays Customer Data that spend the most in month ${month} of ${year} in each branch`,
      branch: formatedData,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

module.exports = {
  getNewestAndOldestCustomer,
  getCustomerDataThatSpendTheMost,
};
