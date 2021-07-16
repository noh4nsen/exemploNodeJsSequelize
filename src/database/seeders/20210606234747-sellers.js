"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Sellers",
			[
				{
					name: "José de Oliveira",
					email: "j_oliveira@mail.com",
					password:
						"$2a$12$WbVTHbAD2H.bqm2.s0uBG.CXbeYjJZSFpRY1XvDw5FbLt3ElkcnfK",
				},
				{
					name: "Maria Carla",
					email: "mcarla@mail.com",
					password:
						"$2a$12$WbVTHbAD2H.bqm2.s0uBG.CXbeYjJZSFpRY1XvDw5FbLt3ElkcnfK",
				},
				{
					name: "Felipe Candido",
					email: "felipe@mail.com",
					password:
						"$2a$12$WbVTHbAD2H.bqm2.s0uBG.CXbeYjJZSFpRY1XvDw5FbLt3ElkcnfK",
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Sellers", null, {});
	},
};
