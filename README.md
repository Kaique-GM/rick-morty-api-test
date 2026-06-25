# Teste para desenvolvedor - Vitafor

<p align="center">
    <img src="./public/assets/images/vitafor.webp" width="110">
</p>

## Tecnologias utilizadas

- PHP 8.2 
- SQLite
- Front-end com requisições assíncronas JavaScript

## Aplicação para exibir personagens

A aplicação desenvolvida consome a API do [Rick and Morty](https://rickandmortyapi.com/) para exibir informações dos personagens de forma dinâmica, utilizando requisições assíncronas.

Além da visualização dos dados externos, o sistema também permite a manipulação local das informações, oferecendo funcionalidades completas de CRUD (Create, Read, Update, Delete). O usuário pode:

- Visualizar personagens vindos da API
- Salvar personagens no banco de dados local
- Editar informações dos personagens salvos
- Excluir personagens do banco de dados

A aplicação foi estruturada com as seguintes páginas:

- Home: exibe personagens da API do Rick and Morty.
- Personagens: lista os personagens salvos no banco local.
- Sobre: informações sobre o desenvolvedor.
- Login / Cadastro: sistema de autenticação de usuários.
- 404: página para rotas não encontradas.

## Páginas da aplicação

**HOME**

A Home deverá conter uma listagem de personagens vindos diretamente da [API](https://rickandmortyapi.com/), o layout da tela deverá ser o seguinte:

![HOME](./blockframe-home.png)

Eles devem estar dispostos como uma lista de cards que permitem que o usuário clique e abra uma página de maiores detalhes do personagem, página de detalhes do personagem.

**DETALHES DO PERSONAGEM**

Esta página deverá seguir o seguinte layout:

![Detalhe do Personagem](./blockframe-detalhes-personagem.png)

O botão do canto inferior direito deve permitir que o usuário salve esse personagem à um banco de dados local, as informações que deverão ser salvas são:

    { name, species, image, url, created_at, updated_at }

Caso essa tela tenha sido aberta vindo da HOME, o botão deverá estar visível e as informações exibidas serão as vindas da API, caso ela tenha sido aberta vindo da página de personagens o botão não ficará disponível e as informações à serem exibidas serão as que estão salvas no banco de dados local. As informações que serão exibidas vindas da API são:

    { name, species, gender, location, image, url }

Caso o personagem já esteja salvo no banco de dados local, esta tela deverá permitir que o usuário exclua o registro e edite as informações.

**PERSONAGENS**

Está tela deverá ser similar à HOME com diferença de que apenas irá exibir os personagens que já estão salvos no banco de dados local. Também deverá permitir a visualização de detalhes ao clicar no personagem, direcionando assim para a tela de DETALHES DO PERSONAGEM.

![PERSONAGENS](./blockframe-personagens.png)

**SOBRE**

Está deverá ser uma página livre, onde você irá apresentar um mini currículo seu. Aqui você irá se apresentar, por links para sites que você desenvolveu, projetos e tudo que você achar interessante nos mostrar.

**LOGIN / CADASTRO**

O usuário deverá poder se cadastrar e logar com o cadastro realizado. O usuário só poderá salvar um personagem caso ele esteja logado no sistema, caso não esteja e clique no botão para salvar o personagem, ele deve ser direcionado para a tela de LOGIN / CADASTRO.

### Tela de login

![LOGIN](./blockframe-login.png)

### Tela de cadastro

![LOGIN](./blockframe-cadastro.png)
