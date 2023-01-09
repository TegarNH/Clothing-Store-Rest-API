const { Customer, Branch } = require('../models');

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

module.exports = {
  getNewestAndOldestCustomer,
};
