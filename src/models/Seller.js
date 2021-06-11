const Sequelize = require("sequelize");

class Seller extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Sale, { foreignKey: "sellerId" });
    }
}

module.exports = Seller;