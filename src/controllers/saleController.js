const Sale = require("../models/Sale");
const Sequelize = require("sequelize");

module.exports = {
	async listAllSales(req, res) {
		const sales = await Sale.findAll({
			order: [["sellerId", "ASC"]],
		}).catch((error) => {
			res.status(500).json({ msg: "Falha na conexão." });
		});
		if (sales) res.status(200).json({ sales });
		else res.status(404).json({ msg: "Não foi possível encontrar vendas." });
	},
	async searchSalesByDate(req, res) {
		const { startDate, endDate } = req.body;
		if (!startDate || !endDate)
			res.status(400).json({
				msg: "Parâmetro obrigatório vazio.",
			});
		const Op = Sequelize.Op;
		const sales = await Sale.findAll({
			where: { saleDate: { [Op.between]: [startDate, endDate] } },
		}).catch((error) => res.status(500).json({ msg: "Falha na conexão." }));
		if (sales) {
			if (sales == "")
				res.status(404).json({ msg: "Não há vendas no período." });
			else res.status(200).json({ sales });
		} else res.status(404).json({ msg: "Não foi possível encontrar vendas." });
	},
	async searchSalesBySeller(req, res) {
		const sellerId = req.params.sellerId;
		if (!sellerId)
			res.status(400).json({
				msg: "Campo vendedor vazio.",
			});

		//Checar se seller existe

		const sales = await Sale.findAll({
			where: { sellerId },
		}).catch((error) => res.status(500).json({ msg: "Falha na conexão." }));
		if (sales) {
			if (sales == "")
				res.status(404).json({ msg: "Não há vendas para este vendedor." });
			else res.status(200).json({ sales });
		} else res.status(404).json({ msg: "Não foi possível encontrar vendas." });
	},
};