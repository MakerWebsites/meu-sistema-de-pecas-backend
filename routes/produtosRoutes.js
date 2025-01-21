const express = require('express');
const Produto = require('../models/produtoModel'); // Certifique-se de que o modelo está configurado corretamente
const router = express.Router();

// Rota para listar todos os produtos
router.get('/produtos', async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para adicionar um novo produto
router.post('/produtos', async (req, res) => {
  try {
    const { nome, modelo, descricao, preco, quantidade, imagem, senhaExclusao } = req.body;

    const produto = new Produto({
      nome,
      modelo,
      descricao,
      preco,
      quantidade,
      imagem,
      senhaExclusao, // Pode ser opcional, dependendo de sua lógica
    });

    await produto.save();
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar o produto', error });
  }
});

// Rota para excluir produto com validação de senha
router.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { senhaExclusao } = req.body; // Receber a senha no corpo da requisição

  // Verificar se a senha está correta
  if (senhaExclusao !== process.env.SENHA_EXCLUSAO) {
    return res.status(403).json({ message: 'Senha incorreta. Produto não excluído.' });
  }

  try {
    const produto = await Produto.findById(id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    await Produto.findByIdAndDelete(id);
    res.status(200).json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir o produto', error });
  }
});

// Rota para atualizar um produto
router.put('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, modelo, descricao, preco, quantidade, imagem } = req.body;

  try {
    const produtoAtualizado = await Produto.findByIdAndUpdate(
      id,
      { nome, modelo, descricao, preco, quantidade, imagem },
      { new: true }
    );

    if (!produtoAtualizado) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.status(200).json(produtoAtualizado);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o produto', error });
  }
});

module.exports = router;


  const SENHA_EXCLUSAO = process.env.SENHA_EXCLUSAO;

  router.delete('/produtos/:id', async (req, res) => {
      const { senhaExclusao } = req.body; // Obtenha a senha do corpo da requisição
      const produtoId = req.params.id;
  
      if (senhaExclusao !== SENHA_EXCLUSAO) {
          return res.status(401).json({ message: "Senha incorreta. Produto não excluído." });
      }
  
      try {
          await Produto.findByIdAndDelete(produtoId);
          res.json({ message: "Produto excluído com sucesso." });
      } catch (error) {
          res.status(500).json({ message: "Erro ao excluir o produto.", error });
      }
  });
  
  
  
  router.post('/produtos', async (req, res) => {
    console.log(req.body);  // Verifique o que está sendo recebido do cliente
    try {
      const { nome, modelo, descricao, preco, quantidade, imagem } = req.body;
  
      if (!nome || !modelo || !descricao || !preco || !quantidade || !imagem) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
      }
  
      const produto = new Produto({
        nome,
        modelo,
        descricao,
        preco,
        quantidade,
        imagem,
      });
  
      await produto.save();
      res.status(201).json(produto);
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);  // Exibe o erro no console
      res.status(500).json({ message: 'Erro ao adicionar o produto', error: error.message });
    }
  });
  
