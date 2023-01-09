const Model = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.belongsTo(models.Branch, {
        foreignKey: 'idBranch',
      });
      Customer.hasMany(models.Transaction, {
        foreignKey: 'idCustomer',
      });
    }
  }
  Customer.init({
    idBranch: DataTypes.INTEGER,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};
