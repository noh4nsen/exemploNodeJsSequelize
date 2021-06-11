const Sequelize = require("sequelize");
const dbConfig = require("./config/dbconfig");

const Seller = require("../models/Seller");
const Sale = require("../models/Sale");

const connection = new Sequelize(dbConfig);

// Inicialize os modelos para o sequelize
Seller.init(connection);
Sale.init(connection);

// Defina os relacionamentos entre os modelos
Seller.associate(connection.models);
Sale.associate(connection.models);

module.exports = connection;