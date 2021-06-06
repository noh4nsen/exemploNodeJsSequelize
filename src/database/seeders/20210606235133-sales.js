'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Sales",
      [
        {
          sellerId: 1,
          saleDate:
            Sequelize.literal("CURRENT_TIMESTAMP"),
          description: "Camiseta GG Modelo 1",
          value: 20.5,
        },
        {
          sellerId: 2,
          saleDate: "2021-05-10",
          description: "Camiseta M Modelo 2",
          value: 18.5,
        },
        {
          sellerId: 2,
          saleDate: "2021-05-01",
          description: "Calça M Modelo 1",
          value: 80,
        },
        {
          sellerId: 3,
          saleDate: "2021-05-01",
          description: "Calça G Modelo 2",
          value: 100,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete
      ("Sales", null, {});
  },
};
