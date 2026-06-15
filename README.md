
# API de Produtos - Swagger + JWT

Atividade de Backend: documentacao com Swagger e autenticacao JWT.

## Como rodar

```bash
npm install
npm start
```

- API: http://localhost:3000
- Swagger: http://localhost:3000/api-docs

## Usuarios para teste

| Login   | Senha    |
|---------|----------|
| admin   | 123456   |
| usuario | senha123 |

## Testes no Postman

### 1. Login
- **POST** `http://localhost:3000/login`
- Body (JSON):
```json
{
  "login": "admin",
  "senha": "123456"
}
```
- Copie o `token` da resposta.

### 2. Rota protegida (com token)
- **GET** `http://localhost:3000/produtos`
- Header: `Authorization` = `Bearer SEU_TOKEN_AQUI`

### 3. Sem token (deve dar erro 401)
- **GET** `http://localhost:3000/produtos` (sem header Authorization)

### 4. Token invalido (deve dar erro 401)
- **GET** `http://localhost:3000/produtos`
- Header: `Authorization` = `Bearer token_invalido`

## Estrutura do projeto

```
├── package.json
├── swagger.json
├── src/
│   ├── server.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── products.routes.js
│   └── data/
│       ├── users.js
│       └── products.js
```

## Prints para entrega

Tire capturas de tela mostrando:
1. Tela do Swagger (`/api-docs`)
2. Requisicao de login no Postman
3. Token retornado
4. Acesso a rota protegida com token
5. Erro ao acessar sem token
# API-de-Produtos---Swagger-JWT
# API-de-Produtos---Swagger-JWT
