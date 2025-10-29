// src/Routes/produtoRoutes.js
const express = require('express');
const router = express.Router();

// Importamos o nosso controller
const produtoController = require('../controllers/produtoController');

const {verificaToken} = require('../middlewares/authMiddleware');   

// Definimos as rotas e associamos às funções do 
//rotas publicas
router.get('/', produtoController.listarTodos);
router.get('/:id', produtoController.buscarPorId);

//rotas protegidas
//middleware verificaToken é executado antes das funções do controller
router.post('/', verificaToken, produtoController.criar);
router.put('/:id',verificaToken, produtoController.atualizar);
router.delete('/:id', verificaToken, produtoController.deletar);

module.exports = router;
