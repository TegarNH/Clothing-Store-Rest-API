const productSoldsData = require('../masterdata/productSold.json');

module.exports = {
  async up(queryInterface) {
    const dataProductSoldsToBeSeeded = productSoldsData.map((eachProductSoldData) => ({
      idProduct: eachProductSoldData.idProduct,
      idCustomer: eachProductSoldData.idCustomer,
      idBranch: eachProductSoldData.idBranch,
      date: eachProductSoldData.date,
      quantity: eachProductSoldData.quantity,
      totalPrice: eachProductSoldData.totalPrice,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('ProductSolds', dataProductSoldsToBeSeeded, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('ProductSolds', null, { truncate: true, restartIdentity: true });
  },
};
