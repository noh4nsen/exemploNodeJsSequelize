const Sequelize = require("sequelize");

class Sale extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                saleDate: Sequelize.DATE,
                description: Sequelize.STRING,
                value: Sequelize.FLOAT,
            },
            {
                sequelize,
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Seller, { foreignKey: "sellerId" });
    }
}

module.exports = Sale;