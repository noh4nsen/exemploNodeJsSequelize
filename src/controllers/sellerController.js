const Seller = require("../models/Seller");
const Sale = require("../models/Sale");
const Sequelize = require("sequelize");

module.exports = {
//Lista todos os vendedores
    async listAllSellers(req, res) {
        const sellers = await Seller.findAll({
            order: [["name", "ASC"]],
        }).catch((error) => {
            res.status(500).json({ msg: "Falha na conexao. "});
        });

        if (sellers) res.status(200).json({ sellers });
        else    
            res.status(404).json({ msg: "Nao foii possivel encontrar vendedores." });
    },

//Lista vendedor por nome
    async searchSellerByName(req, res) {
        const name = req.body.name;
        
        if (!name)
            res.status(400).json({ msg: "Parametro nome esta vazio ",});
        
        const Op = Sequelize.Op;
        const seller = await Seller.findAll({
            where: { name: { [Op.like]: "%" + name + "%" } },
        });

        console.log(seller);

        if (seller) {
            if (seller == "")
                res.status(404).json({ msg: "Vendedor nao encontrado" });
            else
                res.status(200).json({ seller });
        } else
            res.status(404).json({ msg: "Vendedor nao encontrado" });
    },

//Insere novo vendedor
    async newSeller(req, res) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ msg: "Dados obrigatorios nao foram preenchidos" });
        }

        //Procurar no BD por vendedor ja existente usando email como registro unico
        const isSellerNew = await Seller.findOne({ where: { email },});

        if (isSellerNew)
            res.status(403).json({ msg: "Vendedor ja esta cadastrado" });
        else {
            const seller = await Seller.create({
                name,
                email,
                password
            }).catch((error) => {
                res.status(500).json({ msg: "Nao foi possivel inserir os dados" });
            });

            if (seller)
                res.status(201).json({ msg: "Novo vendedor foi adicionado" });
            else
                res.status(404).json({ msg: "Falha ao cadastrar novo vendedor" });
        }
    },

//Deleta vendedor
    async deleteSeller(req, res) {
        const sellerId = req.params.id;
        const deletedSeller = await Seller.destroy({
            where: { id: sellerId },
        }).catch( async (error) => {
            const sellerHasRef = await Sale.findOne({
                where: { sellerId },
            }).catch((error) => {
                res.status(500).json({ msg: "Falha na conexao" });
            });

            if (sellerHasRef)
                return res.status(403).json({ msg: "Vendedor possui vendas em seu nome" });
        })
        
        if (deletedSeller != 0)
            res.status(200).json({ msg: "Vendedor excluido com sucesso "});
        else
            res.status(404).json({ msg: "Vendedor nao encontrado" });
    },

//Editar vendedor
    async updateSeller(req, res){
        const sellerId = req.body.id;
        const seller = req.body;

        if(!sellerId)
            res.status(400).json({ msg: "ID do vendedor vazio" });
        else {
            if (seller.name || seller.email) {
                
                await Seller.update(seller, {
                    where: { id: sellerId},
                });
                
                return res.status(200).json({ msg: "Vendedor atualizado com sucesso" });
            } else {
                return res.status(400).json({ msg: "Campos obrigatorios nao preenchidos" });
            }
        }
    },
};