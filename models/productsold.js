const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductSold extends Model {
    static associate(models) {
      ProductSold.belongsTo(models.Product, {
        foreignKey: 'idProduct',
      });
      ProductSold.belongsTo(models.Customer, {
        foreignKey: 'idCustomer',
      });
      ProductSold.belongsTo(models.Branch, {
        foreignKey: 'idBranch',
      });
    }
  }
  ProductSold.init({
    idProduct: DataTypes.INTEGER,
    idCustomer: DataTypes.INTEGER,
    idBranch: DataTypes.INTEGER,
    date: DataTypes.DATE,
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ProductSold',
  });
  return ProductSold;
};
