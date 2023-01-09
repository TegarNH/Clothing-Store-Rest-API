const transactionsData = require('../masterdata/transaction.json');

module.exports = {
  async up(queryInterface) {
    const dataTransactionsToBeSeeded = transactionsData.map((eachTransactionData) => ({
      idCustomer: eachTransactionData.idCustomer,
      idBranch: eachTransactionData.idBranch,
      date: eachTransactionData.date,
      paymentMethod: eachTransactionData.paymentMethod,
      grandTotal: eachTransactionData.grandTotal,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Transactions', dataTransactionsToBeSeeded, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Transactions', null, { truncate: true, restartIdentity: true });
  },
};
