const Model = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductSold extends Model {
    static associate(models) {
      ProductSold.belongsTo(models.Product, {
        foreignKey: 'idProduct',
      });
      ProductSold.belongsTo(models.Transaction, {
        foreignKey: 'idTransaction',
      });
    }
  }
  ProductSold.init({
    idProduct: DataTypes.INTEGER,
    idTransaction: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ProductSold',
  });
  return ProductSold;
};
