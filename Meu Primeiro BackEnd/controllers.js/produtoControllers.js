const produtoModel = require('../Models/ProdutoModel');
exports.getAllProdutos = async (req, res) => {
    try {
        const produtos = await produtoModel.findAll();
        res.json(produtos);
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor ao buscar produtos." });
    }
};

exports.getProdutoById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const produto = await produtoModel.findById(id);
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
exports.createProduto = async (req, res) => {
    const { nome, preco } = req.body;
    if (!nome || preco === undefined) {
        return res.status(400).json({ message: 'Nome e preço são obrigatórios.' });
    }

    try {
        const novoProduto = await produtoModel.create(nome, preco);
        res.status(201).json(novoProduto);
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor ao criar produto." });
    }
};

// PUT (Atualizar)
exports.updateProduto = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, preco } = req.body;

    if (!nome || preco === undefined) {
        return res.status(400).json({ message: 'Nome e preço são obrigatórios.' });
    }

    try {
        const result = await produtoModel.update(id, nome, preco);
        if (result.changes > 0) {
            res.json({ id, nome, preco });
        } else {
            res.status(404).json({ message: 'Produto não encontrado para atualização.' });
        }
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor ao atualizar produto." });
    }
};

// DELETE
exports.deleteProduto = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const result = await produtoModel.deldel(id);
        if (result.changes > 0) {
            res.status(204).send(); 
        } else {
            res.status(404).json({ message: 'Produto não encontrado para exclusão.' });
        }
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor ao deletar produto." });
    }
};
