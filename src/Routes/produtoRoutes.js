// src/Routes/produtoRoutes.js
const express = require('express');
const router = express.Router();

// Importamos o nosso controller
const produtoController = require('../controllers/produtoController');

const {verificaToken} = require('../middlewares/authMiddleware');   

// Definimos as rotas e associamos às funções do 
//rotas publicas
router.get('/', produtoController.getAllProdutos);
router.get('/:id', produtoController.getProdutoById);

//rotas protegidas
//middleware verificaToken é executado antes das funções do controller
router.post('/', verificaToken, produtoController.createProduto);
router.put('/:id',verificaToken, produtoController.updateProduto);
router.delete('/:id', verificaToken, produtoController.deleteProduto);

module.exports = router;