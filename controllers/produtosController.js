const Produto = require('../models/produtoModel');

// Adicionar um produto
exports.adicionarProduto = async (req, res) => {
  const { nome, modelo, descricao, preco, quantidade } = req.body;
  
  try {
    const novoProduto = new Produto({ nome, modelo, descricao, preco, quantidade });
    await novoProduto.save();
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(400).json({ error: "Erro ao adicionar o produto." });
  }
};

// Obter todos os produtos
exports.getProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(400).json({ error: "Erro ao obter os produtos." });
  }
};
