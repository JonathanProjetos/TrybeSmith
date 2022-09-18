# TrybeSmith

# Contexto

Nesta aplicação foi desenvolvido uma API e um banco de dados, com intuito de produzir uma loja de produtos medievais. A aplicação segue os princípios REST. Para acessar os endereços da aplicação, é necessário fazer autenticação e quando autenticado a API responderá trazendo um token no corpo da requisição. O token deverá ser inserido no cabeçalho de cada requisição privada, com o intuito de autenticação. A arquitetura da aplicação se baseia em relações entre usuário por pedidos e de pedidos por produtos. Dentro do projeto existe um diagrama dentro da pasta images exemplificando estas ligações.

## Importante:

- E aconselhável o uso de softwares de envio de requisições REST como:
- [Insomia](https://insomnia.rest/)
- [Postman](https://www.postman.com/)
- [Httpie](https://httpie.io/)

## Detalhes das rotas

### Verbo Post : /login

##### Esperado
 - A rota deve receber os campos username e password, e esses campos devem ser validados no banco de dados.
 
 ```json
 
 {
  "username": "string",
  "password": "string"
 }
 
 ```
