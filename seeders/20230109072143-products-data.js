const productsData = require('../masterdata/product.json');

module.exports = {
  async up(queryInterface) {
    const dataProductsToBeSeeded = productsData.map((eachProductData) => ({
      idBranch: eachProductData.idBranch,
      name: eachProductData.name,
      category: eachProductData.category,
      price: eachProductData.price,
      stock: eachProductData.stock,
      sold: eachProductData.sold,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Products', dataProductsToBeSeeded, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Products', null, { truncate: true, restartIdentity: true });
  },
};
