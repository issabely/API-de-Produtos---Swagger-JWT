const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');

const app = express();
const PORT = 3000;

app.use(express.json());

// Documentacao Swagger na rota /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rota de login (publica)
app.use('/', authRoutes);

// Rotas de produtos (protegidas pelo middleware)
app.use('/produtos', productsRoutes);

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API de Produtos - Acesse /api-docs para ver a documentacao'
  });
});

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Documentacao Swagger: http://localhost:${PORT}/api-docs`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\nErro: a porta ${PORT} ja esta em uso!`);
    console.error('Outro servidor ja esta rodando. Faca uma destas opcoes:\n');
    console.error('  1) Use a API que ja esta no ar: http://localhost:3000/api-docs');
    console.error('  2) Feche o outro terminal (Ctrl + C) e rode npm start de novo');
    console.error('  3) No PowerShell, libere a porta:');
    console.error('     Get-NetTCPConnection -LocalPort 3000 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }\n');
    process.exit(1);
  }
  throw err;
});
