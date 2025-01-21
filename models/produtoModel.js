const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  modelo: { type: String, required: true },
  descricao: { type: String, required: true },
  preco: { type: Number, required: true },
  quantidade: { type: Number, required: true },
  imagem: { type: String, default: '' }, // Caminho ou nome da imagem
});

module.exports = mongoose.model('Produto', produtoSchema);
