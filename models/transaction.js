const Model = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.Customer, {
        foreignKey: 'idCustomer',
      });
      Transaction.belongsTo(models.Branch, {
        foreignKey: 'idBranch',
      });
      Transaction.hasMany(models.ProductSold, {
        foreignKey: 'idProductSold',
      });
    }
  }
  Transaction.init({
    idCustomer: DataTypes.INTEGER,
    idBranch: DataTypes.INTEGER,
    date: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    grandTotal: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};
