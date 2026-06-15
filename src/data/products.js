// Lista de produtos em memoria
let products = [
  { id: 1, nome: 'Notebook', preco: 3500.0, estoque: 10 },
  { id: 2, nome: 'Mouse', preco: 89.9, estoque: 50 },
  { id: 3, nome: 'Teclado', preco: 199.9, estoque: 30 }
];

let nextId = 4;

function getAll() {
  return products;
}

function getById(id) {
  return products.find((p) => p.id === Number(id));
}

function create(product) {
  const novo = { id: nextId++, ...product };
  products.push(novo);
  return novo;
}

function update(id, dados) {
  const index = products.findIndex((p) => p.id === Number(id));
  if (index === -1) return null;

  products[index] = { ...products[index], ...dados, id: Number(id) };
  return products[index];
}

function remove(id) {
  const index = products.findIndex((p) => p.id === Number(id));
  if (index === -1) return false;

  products.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove };
