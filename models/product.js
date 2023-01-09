const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Branch, {
        foreignKey: 'idBranch',
      });
      Product.hasMany(models.ProductSold, {
        foreignKey: 'idProduct',
      });
    }
  }
  Product.init({
    idBranch: DataTypes.INTEGER,
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    sold: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
