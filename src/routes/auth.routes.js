const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findByLogin } = require('../data/users');
const { JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

router.post('/login', (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
    return res.status(400).json({
      erro: 'Login e senha sao obrigatorios'
    });
  }

  const usuario = findByLogin(login);

  if (!usuario) {
    return res.status(401).json({
      erro: 'Credenciais invalidas'
    });
  }

  const senhaValida = bcrypt.compareSync(senha, usuario.senha);

  if (!senhaValida) {
    return res.status(401).json({
      erro: 'Credenciais invalidas'
    });
  }

  const token = jwt.sign(
    { id: usuario.id, login: usuario.login },
    JWT_SECRET,
    { expiresIn: '2h' }
  );

  return res.status(200).json({ token });
});

module.exports = router;
