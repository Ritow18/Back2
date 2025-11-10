const Produto = require('../Models/Produto');

// GET (Listar Todos)
// Sintaxe antiga: const produtos = await produtoModel.findAll();
exports.getAllProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll(); // Método do Sequelize
        res.json(produtos);
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor." });
    }
};

// GET (Buscar por ID)
// Sintaxe antiga: const produto = await produtoModel.findById(id);
exports.getProdutoById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const produto = await Produto.findByPk(id); // findByPk = Find by Primary Key
        if (produto) {
            res.json(produto);
        } else {
            res.status(404).send('Produto não encontrado.');
        }
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor." });
    }
};

// POST (Criar)
// Sintaxe antiga: const novoProduto = await produtoModel.create(nome, preco);
exports.createProduto = async (req, res) => {
    const { nome, preco } = req.body;
    if (!nome || preco === undefined) {
        return res.status(400).json({ message: 'Nome e preço são obrigatórios.' });
    }

    try {
        // create() agora espera um objeto
        const novoProduto = await Produto.create({ nome, preco });
        res.status(201).json(novoProduto);
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor." });
    }
};

// PUT (Atualizar)
// Sintaxe antiga: const result = await produtoModel.update(id, nome, preco);
exports.updateProduto = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, preco } = req.body;

    if (!nome || preco === undefined) {
        return res.status(400).json({ message: 'Nome e preço são obrigatórios.' });
    }

    try {
        // [0] ou [1] indica o número de linhas afetadas
        const [updated] = await Produto.update({ nome, preco }, {
            where: { id: id }
        });

        if (updated) {
            const produtoAtualizado = await Produto.findByPk(id);
            res.json(produtoAtualizado);
        } else {
            res.status(404).json({ message: 'Produto não encontrado.' });
        }
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor." });
    }
};

// DELETE
// Sintaxe antiga: const result = await produtoModel.delete(id);
exports.deleteProduto = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const deleted = await Produto.destroy({
            where: { id: id }
        });

        if (deleted) {
            res.status(204).send(); // Sucesso, sem conteúdo
        } else {
            res.status(404).json({ message: 'Produto não encontrado.' });
        }
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor." });
    }
};
