'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Sales", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      sellerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Sellers", key: "id" },
        onUpdate: "RESTRICT",
        onDelete: "RESTRICT", 
      },
      saleDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue:
          Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull:false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue:
          Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Sales");
  }
};
