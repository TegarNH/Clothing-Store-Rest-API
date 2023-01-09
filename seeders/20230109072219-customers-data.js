const customersData = require('../masterdata/customer.json');

module.exports = {
  async up(queryInterface) {
    const dataCostumersToBeSeeded = customersData.map((eachCustomerData) => ({
      idBranch: eachCustomerData.idBranch,
      name: eachCustomerData.name,
      address: eachCustomerData.address,
      phone: eachCustomerData.phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Customers', dataCostumersToBeSeeded, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Customers', null, { truncate: true, restartIdentity: true });
  },
};
