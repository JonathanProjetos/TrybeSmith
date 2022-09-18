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
- Se o products foi feito com sucesso, o seja os campos para products fotam preenchido corretamente. Aplicação retornará status http 201 com body.

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
 
 {
  "name": "string",
  "amount": "string"
 }
 
 ```
- Se o products foi feito com sucesso, o seja os campos para products fotam preenchido corretamente. Aplicação retornará status http 201 com body.

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

