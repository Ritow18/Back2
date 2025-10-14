const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuariosControllers');
//rota para criar um usuario
router.post('/', usuarioController.criarUsuario);
//rota para autenticar um usuario
router.post('/login', usuarioController.login);

module.exports = router;