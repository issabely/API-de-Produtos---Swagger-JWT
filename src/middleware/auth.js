const jwt = require('jsonwebtoken');

const JWT_SECRET = 'chave_secreta_da_atividade';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      erro: 'Token nao informado. Envie o header Authorization: Bearer TOKEN'
    });
  }

  const partes = authHeader.split(' ');

  if (partes.length !== 2 || partes[0] !== 'Bearer') {
    return res.status(401).json({
      erro: 'Formato do token invalido. Use: Bearer TOKEN'
    });
  }

  const token = partes[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      erro: 'Token invalido ou expirado'
    });
  }
}

module.exports = { authMiddleware, JWT_SECRET };
