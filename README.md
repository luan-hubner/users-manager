# Users Manager

Projeto desenvolvido conforme proposta do desafio técnico 🚀

> Para o desenvolvimento desse projeto
> foi pensado na usabilidade, todos os procesos
> foram simplificados a medida do possível.
> A identidade visual e prototipação foram criadas
> do zero para esse desafio.

## Techs

Conforme solicitado nos parâtros do desafio:

- [ReactJS] - framework web.
- [JSON Server] - mock http.
- [Material UI] - biblioteca utilizada para alguns componentes.
- [JS Cookies] - biblioteca utilizada para o gerencimentos de cookies.
- [React Hook Form] - biblioteca de formulários.
- [Buffer] - biblioteca utilizada para gerar o token do usuário.

As senhas, tokens e imagens foram convertidas para base64
para simular criptografia e armazenamento.

Em ambientes reais utilizaria-se outros métodos de armazenamento das imagens
e outros métodos de criptografia para os tokens como JWT.

## Instalação

Para rodar esse projeto é necessário o [Node.js](https://nodejs.org/), recomenda-se a versão 14+.

Instale as dependências e inicie o server:

```sh
npm install
npm run start
```

Caso utilize yarn:

```sh
yarn
yarn start
```

## Mock HTTP

Nesse projeto utilizamos o json-server como mock http,
nesse caso, precisamos instalar o json-server como dependência global
no computador, pois, precisamos executá-lo de forma global.

```sh
npm install -g json-server
npm run json-server
```

Caso utilize yarn:

```sh
yarn add -g json-server
yarn json-server
```

Nesse projeto o json-server está configurado para rodar na porta 3001.

Com o projeto e o json-server rodando podemos começar utilizá-lo.

As credenciais do usuário default são:

Usuário: admin@usm.com
Senha: 123456

[//]: #

  [JSON Server]: <https://www.npmjs.com/package/json-server>
  [ReactJS]: <https://pt-br.reactjs.org>
  [Material UI]: <https://mui.com/pt/>
  [JS Cookies]: <https://www.npmjs.com/package/js-cookie>
  [React Hook Form]: <https://react-hook-form.com/>
  [Buffer]: <https://www.npmjs.com/package/buffer>