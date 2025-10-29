const db = require('../../dataBase'); // Importa a conexão do banco de dados

const produtoModel = {
    // Método para buscar todos os produtos
    findAll: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM produtos", [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    },

    // Método para buscar um produto por ID
    findById: (id) => {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM produtos WHERE id = ?", [id], (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    },

    // Método para criar um novo produto
    create: (nome, preco) => {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO produtos (nome, preco) VALUES (?, ?)", [nome, preco], function (err) {
                if (err) {
                    reject(err);
                }
                resolve({ id: this.lastID, nome, preco });
            });
        });
    },

    // Método para atualizar um produto
    update: (id, nome, preco) => {
        return new Promise((resolve, reject) => {
            db.run(`UPDATE produtos 
                       SET nome = ?, preco = ?
                     WHERE id = ?`,
                     [nome, preco, id], function (err) {
                if (err) {
                    reject(err);
                }
                resolve({ changes: this.changes });
            });
        });
    },

    // Método para deletar um produto
    deldel: (id) => {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM produtos WHERE id = ?", 
                   [id], function (err) {
                if (err) {
                    reject(err);
                }
                resolve({ changes: this.changes });
            });
        });
    }
};

module.exports = produtoModel;
