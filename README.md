# NodeStore 🚀

Bem-vindo ao **NodeStore**, um projeto pessoal desenvolvido com o intuito de aprendizado! 🧑‍💻

Este projeto é um sistema de gerenciamento de produtos, clientes e pedidos, utilizando **Node.js** com **Express** e **MongoDB** via **Mongoose** para a modelagem dos dados.

> **Contribuição**: Como o projeto é público, qualquer pessoa pode contribuir! 🎉

---

## 🔥 Tecnologias Utilizadas

- **Node.js** 🟢
- **Express.js** ⚡
- **Mongoose** 🗄️
- **MongoDB** 🍃
- **JWT (JSON Web Token)** 🔐
- **Body-parser** 📦
- **Dotenv** 🛠️
- **SendGrid** 📧 (Envio de e-mails)
- **MD5** 🔑 (Criptografia de senha)

---

## 📂 Estrutura do Projeto

```
Nodestr/
│-- bin/
│   ├── server.js
│-- src/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── repositories/  # Gerenciamento do acesso ao banco de dados
│   ├── services/      # Configuração dos serviços da aplicação, incluindo envio de e-mails
│   ├── validators/    # Implementação das regras de validação
│-- .env
│-- package.json
│-- README.md
```

---

## ⚙️ Configuração e Instalação

### 1️⃣ Clone o repositório

```bash
$ git clone https://github.com/seu-usuario/nodestore.git
$ cd nodestore
```

### 2️⃣ Instale as dependências

```bash
$ npm install
```

### 3️⃣ Configure as variáveis de ambiente

Crie um arquivo **.env** na raiz do projeto e adicione:

```plaintext
PORT=3000
CONNECTIONSTRING=mongodb+srv://usuario:senha@cluster.mongodb.net/nodestore?retryWrites=true&w=majority
JWT_SECRET=seu_segredo_aqui
SENDGRID_API_KEY=sua_chave_aqui
```

### 4️⃣ Execute o projeto

```bash
$ npm start
```

> O servidor estará rodando em **[http://localhost:3000](http://localhost:3000)**

---

## 📌 Uso do Mongoose

### Criar um modelo (schema)

```javascript
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String
});

module.exports = mongoose.model('Product', ProductSchema);
```

---

## 🌍 Rotas Disponíveis

| Rota         | Método | Descrição               |
| ------------ | ------ | ----------------------- |
| `/`          | GET    | Página inicial          |
| `/products`  | GET    | Lista todos os produtos |
| `/products`  | POST   | Cria um novo produto    |
| `/costumers` | GET    | Lista todos os clientes |
| `/orders`    | GET    | Lista todos os pedidos  |

---

## 🛠️ Como Contribuir

1️⃣ Faça um fork do repositório
2️⃣ Crie uma nova branch:

```bash
$ git checkout -b feature/nome_da_feature
```

3️⃣ Faça commit das suas alterações:

```bash
$ git commit -m "Descrição da feature"
```

4️⃣ Faça push para o repositório remoto:

```bash
$ git push origin feature/nome_da_feature
```

5️⃣ Abra um Pull Request (PR) na branch **main**.

---

## 🚀 Contato

Caso tenha dúvidas ou precise de suporte, entre em contato via **GitHub Issues**.

---

**Desenvolvido como um projeto de aprendizado!** ✨