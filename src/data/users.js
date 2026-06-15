const bcrypt = require('bcryptjs');

// Usuarios em memoria (como nas aulas anteriores)
const users = [
  {
    id: 1,
    login: 'admin',
    // senha: 123456
    senha: bcrypt.hashSync('123456', 8)
  },
  {
    id: 2,
    login: 'usuario',
    // senha: senha123
    senha: bcrypt.hashSync('senha123', 8)
  }
];

function findByLogin(login) {
  return users.find((user) => user.login === login);
}

module.exports = { users, findByLogin };
