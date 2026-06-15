const express = require('express');
const products = require('../data/products');
const authMiddleware = require('../middleware/auth').authMiddleware;

const router = express.Router();

// Todas as rotas de produtos sao protegidas
router.use(authMiddleware);

// GET /produtos - listar todos
router.get('/', (req, res) => {
  return res.status(200).json(products.getAll());
});

// GET /produtos/:id - buscar por id
router.get('/:id', (req, res) => {
  const produto = products.getById(req.params.id);

  if (!produto) {
    return res.status(404).json({ erro: 'Produto nao encontrado' });
  }

  return res.status(200).json(produto);
});

// POST /produtos - criar
router.post('/', (req, res) => {
  const { nome, preco, estoque } = req.body;

  if (!nome || preco === undefined || estoque === undefined) {
    return res.status(400).json({
      erro: 'Campos obrigatorios: nome, preco e estoque'
    });
  }

  const novo = products.create({
    nome,
    preco: Number(preco),
    estoque: Number(estoque)
  });

  return res.status(201).json(novo);
});

// PUT /produtos/:id - atualizar
router.put('/:id', (req, res) => {
  const { nome, preco, estoque } = req.body;
  const atualizado = products.update(req.params.id, { nome, preco, estoque });

  if (!atualizado) {
    return res.status(404).json({ erro: 'Produto nao encontrado' });
  }

  return res.status(200).json(atualizado);
});

// DELETE /produtos/:id - remover
router.delete('/:id', (req, res) => {
  const removido = products.remove(req.params.id);

  if (!removido) {
    return res.status(404).json({ erro: 'Produto nao encontrado' });
  }

  return res.status(204).send();
});

module.exports = router;
