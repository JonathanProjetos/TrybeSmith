# TrybeSmith

# Contexto

Nesta aplicação foi desenvolvido uma API e um banco de dados, com intuito de produzir uma loja de produtos medievais. A aplicação segue os princípios REST. Para acessar os endereços da aplicação, é necessário fazer autenticação e quando autenticado a API responderá trazendo um token no corpo da requisição. O token deverá ser inserido no cabeçalho de cada requisição privada, com o intuito de autenticação. A arquitetura da aplicação se baseia em relações entre usuário por pedidos e de pedidos por produtos. Dentro do projeto existe um diagrama dentro da pasta images exemplificando estas ligações.

## Importante:

- E aconselhável o uso de softwares de envio de requisições REST como:
- [Insomia](https://insomnia.rest/)
- [Postman](https://www.postman.com/)
- [Httpie](https://httpie.io/)

## Detalhes das rotas

## Verbo Post : /users

>End-Point para cadastro de pessoas.

#### Esperado
 - A rota deve receber os campos username, classe, level e password.
 
 ```json
 
{ 
  "username": "Dante",
  "classe": "swordsman",
  "level": 10,
  "password": "SavingPeople"
}
 
 ```
- Se users foi feito com sucesso, o seja os dados foram preenchidos corretamente. Aplicação retornará status http 200 com um token.

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}

```
## Verbo Post : /login
>Authenticação.

#### Esperado
 - A rota deve receber os campos username e password.
 
 ```json
 
 {
  "username": "string",
  "password": "string"
 }
 
 ```
- Se o login foi feito com sucesso, o seja a pessoa já esta cadastrada. Aplicação retornará status http 200 com um token.

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}

```
- Se a pessoa não estriver cadastrada no banco. Aplicação retornará status http 401 com a mensagem "Username or password invalid".

## Verbo Post : /products
>Adicionar um novo produto.

#### Esperado
 - A rota deve receber os campos name e amount.
 
 ```json
 
 {
  "name": "string",
  "amount": "string"
 }
 
 ```
- Se o products foi feito com sucesso, o seja os campos para products foram preenchido corretamente. Aplicação retornará status http 201 com body.

```json
{
    "id": 1,
    "name": "string",
    "amount": "string",
}

```
## Verbo Get : /products
>Lista todos os produtos.

#### Esperado

```json
 [
   {
    "id": 1,
    "name": "Espada curta",
    "amount": "10 peças de ouro",
    "orderId": 12
   },
   {
    "id": 2,
    "name": "Escudo desnecessariamente grande",
    "amount": "20 peças de ouro",
    "orderId": 12
   },

 .... 

```

## Verbo Post : /orders
>Adicionar um novo pedido.

#### Esperado
 - A rota deve receber o campo productsIds.
 
 ```json
 
 {
   "productsIds": [1, 2]
 }
 
 ```
- Se o pedido foi feito com sucesso, o seja os campos para orders foram preenchido corretamente. Aplicação retornará status http 201 com body.

```json
 {
   "userId": 1,
   "productsIds": [1, 2]
 }

```


## Verbo Get : /orders
>Lista todos os pedidos.

#### Esperado

```json

  [
    {
      "id": 1,
      "userId": 2,
      "productsIds": [1, 2]
    },
    {
      "id": 2,
      "userId": 2,
      "productsIds": [1, 4]
    }

 .... 

```
## Técnologias usadas

> Desenvolvido em nodejs e typescript.

> Framework utilizado: Express.

> Libs: nodemon, eslint, express-async-errors, dotenv, joi, jsonwebtoken, mysql2

## Instalando Dependências

## Docker
```
cd TrybeSmith/
docker-compose up -d
docker exec -it trybesmith bash
cd src
npm install
npm run dev
```
## Sem o docker 
```
cd TrybeSmith/src/
npm install
npm run dev
```

## Aviso Importante 
Caso queira roda a aplicação via docker, deverá ter o docker instalado no dispositivo, caso não esteja instalado você pode encontra como instalar neste [link](https://docs.docker.com/engine/install/ubuntu/) site oficial 

