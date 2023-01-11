const {
  Branch, ProductSold, sequelize,
} = require('../models');

const getTotalSalesOfEachBranch = async (req, res) => {
  try {
    if (!req.params.year) {
      return res.status(400).json({ error: 'Missing required parameter (year)' });
    }

    const { year } = req.params;

    if (isNaN(year)) {
      return res.status(400).json({ error: 'Invalid parameter type. Expecting number' });
    }

    // Search for data in the database according to the criteria
    const options = {
      attributes: ['idBranch', [sequelize.fn('SUM', sequelize.col('totalPrice')), 'totalPrice']],
      where: [
        sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM date')), parseInt(year, 10)),
      ],
      include: {
        model: Branch,
        attributes: ['id', 'name'],
      },
      group: ['idBranch', 'Branch.id'],
    };
    const salesData = await ProductSold.findAll(options);

    // Grouping responses into branches
    const formatedData = salesData.reduce((acc, curr) => {
      if (!acc.find((branch) => branch.idBranch === curr.Branch.id)) {
        acc.push({
          id: curr.Branch.id,
          name: curr.Branch.name,
          totalSales: curr.totalPrice,
        });
      }
      return acc;
    }, []);

    return res.status(200).json({
      status: 'Success',
      message: `Shows the total sales of each branch in ${year}`,
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
  getTotalSalesOfEachBranch,
};
