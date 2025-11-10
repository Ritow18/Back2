// src/app.js
require('dotenv').config();
const express = require('express');
const sequelize = require('../dataBase');
const Produto = require('./Models/Produto');
const app = express();
app.use(express.json());

// Importamos o nosso arquivo de rotas de produtos
const produtoRoutes = require('./Routes/produtoRoutes');
const usuarioRoutes = require('./Routes/usuarioRoutes');
  
// Usamos o roteador na nossa aplicação, definindo um prefixo
// Todas as rotas em 'produtoRoutes' terão '/api/produtos' antes
app.use('/api/produtos', produtoRoutes);
app.use('/api/usuarios', usuarioRoutes);

app.get('/', (req, res) => {
  res.send('API de Produtos e Usuarios funcionando!');
});

async function syncDatabase() {
    try {
        await sequelize.sync();
        console.log('Modelos sincronizados com o banco de dados.');
    } catch (error) {
        console.error('Erro ao sincronizar modelos:', error);
    }
}
syncDatabase();

// --- NOVA ROTA DE HEALTH CHECK ---
app.get('/api/health-check', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

module.exports = app;

/* retirado para usar o método tdd (jest e supertest)
// Inicialização do servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
*/