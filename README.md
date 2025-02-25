# NodeFlow - Gerenciamento de Nós e Relacionamentos

## Autores
- Marcos Eduardo da Silva Santos  
- Ezemir Sabino Cavalcante  

## Sobre o Projeto
O **NodeFlow** é um sistema completo para gerenciamento de nós e relacionamentos utilizando **Neo4j** como banco de dados orientado a grafos. O projeto conta com um **backend** desenvolvido em **Java Spring Boot** e um **frontend** construído com **React**, permitindo uma interface visual para gerenciar nós e suas conexões.

## Tecnologias Utilizadas  

### Backend
- **Java 17**: Linguagem de programação utilizada no backend para a implementação da API REST. 🔗 [Site Oficial](https://www.java.com/)  
- **Spring Boot 3.4.3**: Framework para desenvolvimento rápido de aplicações Java, com suporte a APIs REST. 🔗 [Site Oficial](https://spring.io/projects/spring-boot)  
- **Spring Data Neo4j**: Biblioteca para integração entre Spring e o banco de dados Neo4j. 🔗 [Site Oficial](https://spring.io/projects/spring-data-neo4j)  
- **Docker**: Ferramenta utilizada para facilitar o deploy do banco de dados Neo4j. 🔗 [Site Oficial](https://www.docker.com/)  

### Frontend
- **React**: Biblioteca JavaScript utilizada para a construção do frontend. 🔗 [Site Oficial](https://react.dev/)  
- **Node.js**: Ambiente de execução JavaScript necessário para rodar o frontend. 🔗 [Site Oficial](https://nodejs.org/)  
- **Webpack**: Empacotador de módulos usado para otimizar a performance do frontend. 🔗 [Site Oficial](https://webpack.js.org/)  

## Como Executar

### 1️⃣ Clonar o Projeto
```sh
git clone https://github.com/uece-pos-engenharia-de-software-devops/nodeflow.git
```

### 2️⃣ Executar o Backend
1. Navegue até a pasta do backend:
   ```sh
   cd nodeflow-back
   ```
2. Execute o Neo4j via Docker:
   ```sh
   docker-compose up -d
   ```
> Existem dois arquivos docker-compose:
> - Na raiz do repositório, há um docker-compose que utiliza as imagens do Docker Hub para subir o banco e a aplicação.
> - Na raiz do backend, há um docker-compose para subir apenas o Neo4j, utilizado para testes   
3. Inicie o backend:
   ```sh
   mvn spring-boot:run
   ```
   A API estará disponível em **http://localhost:8080**.

### 3️⃣ Executar o Frontend
1. Navegue até a pasta do frontend:
   ```sh
   cd ../nodeflow-front
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Inicie o frontend:
   ```sh
   npm start
   ```
   O frontend estará disponível em **http://localhost:3000**.

## Documentação da API
A API REST do backend conta com documentação interativa via Swagger:
- **Swagger UI:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)  
- **JSON OpenAPI:** [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)  

## Sobre o Curso
Este projeto foi desenvolvido na disciplina de **Big Data**, sob a orientação do professor **Denis Menezes de Sousa**, como parte do curso de **Especialização em Engenharia de Software com DevOps** da Universidade Estadual do Ceará (UECE).

## Demo
![Demo](demo.gif)

