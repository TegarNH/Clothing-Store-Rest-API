const Model = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
