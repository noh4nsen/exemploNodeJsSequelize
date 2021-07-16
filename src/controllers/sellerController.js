const Seller = require("../models/Seller");
const Sale = require("../models/Sale");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function passwordValidation(password) {
	if (password.length < 8) return "Senha deve ter no mínimo 8 caracteres.";
	else if (!password.match(/[a-zA-Z]/g))
		return "Senha deve ter no mínimo uma letra.";
	else if (!password.match(/[0-9]+/))
		return "Senha deve ter no mínimo um número.";
	else return "OK";
}

function generateToken(id) {
	process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
	const token = jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: 82800, // Token expira em 24 horas
	});
	return token;
}

module.exports = {
	async authentication(req, res) {
		const email = req.body.email;
		const password = req.body.password;
		if (!email || !password)
			return res.status(400).json({ msg: "Campos obrigatórios vazios!" });
		try {
			const seller = await Seller.findOne({
				where: { email },
			});
			if (!seller)
				return res.status(404).json({ msg: "Usuário ou senha inválidos." });
			else {
				if (bcrypt.compareSync(password, seller.password)) {
					const token = generateToken(seller.id);
					return res
						.status(200)
						.json({ msg: "Autenticado com sucesso", token });
				} else
					return res.status(404).json({ msg: "Usuário ou senha inválidos." });
			}
		} catch (error) {
			res.status(500).json(error);
		}
	},
	async listAllSellers(req, res) {
		const sellers = await Seller.findAll({
			order: [["name", "ASC"]],
		}).catch((error) => {
			res.status(500).json({ msg: "Falha na conexão." });
		});
		if (sellers)
			if (sellers == "")
				res.status(404).json({ msg: "Não foi possível encontrar vendedores." });
			else res.status(200).json({ sellers });
		else
			res.status(404).json({ msg: "Não foi possível encontrar vendedores." });
	},
	async searchSellerByName(req, res) {
		const name = req.body.name;
		if (!name)
			res.status(400).json({
				msg: "Parâmetro nome está vazio.",
			});
		const Op = Sequelize.Op;
		const seller = await Seller.findAll({
			where: { name: { [Op.like]: "%" + name + "%" } },
		});
		if (seller) {
			if (seller == "")
				res.status(404).json({ msg: "Vendedor não encontrado" });
			else res.status(200).json({ seller });
		} else
			res.status(404).json({
				msg: "Vendedor não encontrado.",
			});
	},
	async newSeller(req, res) {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			res.status(400).json({
				msg: "Dados obrigatórios não foram preenchidos.",
			});
		}

		const passwordValid = passwordValidation(password);
		if (passwordValid !== "OK")
			return res.status(400).json({ msg: passwordValid });

		//Procurar no BD por vendedor já existente
		const isSellerNew = await Seller.findOne({
			where: { email },
		});

		if (isSellerNew)
			res.status(403).json({ msg: "Vendedor já foi cadastrado." });
		else {
			//calcular hash da password
			const salt = bcrypt.genSaltSync(12);
			const hash = bcrypt.hashSync(password, salt);

			const seller = await Seller.create({
				name,
				email,
				password: hash,
			}).catch((error) => {
				res.status(500).json({ msg: "Não foi possível inserir os dados." });
			});
			if (seller)
				res.status(201).json({ msg: "Novo vendedor foi adicionado." });
			else
				res
					.status(404)
					.json({ msg: "Não foi possível cadastrar novo vendedor." });
		}
	},
	async deleteSeller(req, res) {
		const sellerId = req.params.id;
		if (!sellerId) res.status(403).json({ msg: "ID vazio" });
		const deletedSeller = await Seller.destroy({
			where: { id: sellerId },
		}).catch(async (error) => {
			const sellerHasRef = await Sale.findOne({
				where: { sellerId },
			}).catch((error) => {
				res.status(500).json({ msg: "Falha na conexão." });
			});
			if (sellerHasRef)
				return res
					.status(403)
					.json({ msg: "Vendedor possui vendas em seu nome." });
		});
		if (deletedSeller != 0)
			res.status(200).json({ msg: "Vendedor excluido com sucesso." });
		else res.status(404).json({ msg: "Vendedor não encontrado." });
	},
	async updateSeller(req, res) {
		const sellerId = req.body.id;
		const seller = req.body;
		if (!sellerId) res.status(400).json({ msg: "ID do vendedor vazio." });
		else {
			const sellerExists = await Seller.findByPk(sellerId);
			if (!sellerExists)
				res.status(404).json({ msg: "Vendedor não encontrado." });
			else {
				if (seller.name || seller.email) {
					await Seller.update(seller, {
						where: { id: sellerId },
					});
					return res
						.status(200)
						.json({ msg: "Vendedor atualizado com sucesso." });
				} else
					return res
						.status(400)
						.json({ msg: "Campos obrigatórios não preenchidos." });
			}
		}
	},
	logout(req, res) {
		process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
		res.sendStatus(200);
	},
};