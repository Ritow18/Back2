// database.js (NOVA VERSÃO)
const { Sequelize } = require('sequelize');


// Instancia o Sequelize para conectar ao nosso banco SQLite
// O 'storage' aponta para o mesmo arquivo 'meu_banco.db' que criamos na Aula 12
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'Banco.db'
});

// Testa a conexão (opcional, mas recomendado)
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o Sequelize (SQLite) estabelecida com sucesso.');
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }
}

testConnection();

module.exports = sequelize;