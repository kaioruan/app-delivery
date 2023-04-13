# Boas vindas ao repositório do projeto App de Delivery!

Esse projeto foi desenvolvido durante o módulo de _BackEnd_ na Trybe! #vqv 🚀

Aqui você vai encontrar os detalhes de como foi o desenvolvimento do projeto.

---
# Descrição:
  Delivery de bebidas, sendo uma aplicação fullstack, construido com 3 tipos de acesso, sendo eles:
 - Administrador: Gerencia os conteúdos da plataforma, adiciona e remove novos vendedores, cadastrar e remover produtos que são listados na plataforma.
 - Vendedor: tem acesso ao controle e gerenciamento de todas suas vendas, acesso a informações de contato do cliente e status dos pedidos.
 - Cliente: Acesso para realização de compras, acompanhamento de entregas e pedidos.
  
# Habilidades desenvolvidas
### BackEnd:
 - Modelagem dados com **MySQL** através do **Sequelize**;
 - Criação e associação tabelas usando `models` do `sequelize`;
 - Construção de uma **API REST** com endpoints para consumir os models criados;
 - Desenvolvimento de um `CRUD` utilizando `ORM` ;
 - Desenvolvimento de testes de integração;

 ### FrontEnd:
  - Construção de um **FrontEnd** utilizando **React**;
  - Consumo de API REST com **Axios**;
  - Gerenciamento de estado utilizando **ContextAPI**;
  - Utilização de **React Hooks**;
  - Estilização do Website através do CSS;
 ---

 ## Funcionamento da aplicação

⚠ **Atenção:** ⚠

- **Utilize o `node` na versão 16**

Não utilizar a versão 16 do `node` faz com  que alguns scripts utilizado no projeto falharem.


**Instalação de dependências na raiz do projeto:** 

```
npm run postinstall
```

- Para iniciar a aplicação React do front-end utilize o comando: `npm run dev:frontend` na raiz do projeto.

- Para iniciar a aplicação Express do back-end utilize o comando: `npm run dev:backend` na raiz do projeto.

- É necessário ter o `MySQL 5+` instalado no seu computador ou uma instância do mesmo rodando em Docker. Logo em seguida é necessário rodar o comando `db:reset` para subir o banco de dados e popular o mesmo. 

---

## Acessando a aplicação

- Para acessar a aplicação, você pode acessar o  `http://localhost:3000`;

---

## Portas utilizadas

  - Porta do frontend: `3000`;
  - Porta do backend: `3001`;
  - Porta do banco de dados: `3306`.
