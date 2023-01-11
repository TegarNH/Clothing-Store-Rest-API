module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductSolds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idProduct: {
        type: Sequelize.INTEGER,
      },
      idCustomer: {
        type: Sequelize.INTEGER,
      },
      idBranch: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      totalPrice: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('ProductSolds');
  },
};
