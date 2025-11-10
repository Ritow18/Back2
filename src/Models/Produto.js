// models/produto.js (NOVO ARQUIVO)
const { DataTypes } = require('sequelize');
const sequelize = require('../../dataBase'); // Importa a instância do Sequelize

// Define o Modelo 'Produto'
const Produto = sequelize.define('Produto', {
    // Definição dos campos
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false // Garante que este campo não pode ser nulo
    },
    preco: {
        type: DataTypes.REAL,
        allowNull: false
    }
}, {
    // Opções do Modelo

    // 1. Mapeia para o nome da tabela 'produtos' (que já existe da Aula 12)
    tableName: 'produtos',

    // 2. Desabilita os campos 'createdAt' e 'updatedAt' que o Sequelize
    // adiciona por padrão, pois não os temos em nossa tabela.
    timestamps: false
});

module.exports = Produto;