const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    static associate(models) {
      Branch.hasMany(models.Customer, {
        foreignKey: 'idBranch',
      });
      Branch.hasMany(models.Product, {
        foreignKey: 'idBranch',
      });
      Branch.hasMany(models.Transaction, {
        foreignKey: 'idBranch',
      });
    }
  }
  Branch.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Branch',
  });
  return Branch;
};
