require('dotenv').config(); // Carregar as variáveis de ambiente

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const produtosRoutes = require('./routes/produtosRoutes'); // Importar as rotas de produtos

const app = express();

// Usar JSON para interpretar os corpos das requisições
app.use(express.json());

// Habilitar CORS para todas as origens
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],  // Permitir os métodos necessários
  allowedHeaders: ['Content-Type'],
}));

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Usar as rotas definidas em produtosRoutes.js
app.use('/api', produtosRoutes);

// Definir a porta para o servidor
require('dotenv').config();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
.then(() => console.log("Conectado ao MongoDB"))
.catch((err) => {
  console.error("Erro ao conectar ao MongoDB:", err);
});
