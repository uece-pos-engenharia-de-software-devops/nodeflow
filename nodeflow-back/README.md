# NodeFlow Backend

## 📌 Descrição

O **NodeFlow Backend** é uma API REST desenvolvida com **Spring Boot 3.4.3** e **Neo4j** para gerenciar nós e relacionamentos em um banco de dados orientado a grafos.

## 🚀 Tecnologias Utilizadas

- **Java 17**
- **Spring Boot 3.4.3**
- **Spring Data Neo4j**
- **Docker & Docker Compose**
- **Swagger (Springdoc OpenAPI)**

## 🔧 Configuração e Execução

### 1️⃣ **Clonar o repositório**

```
  git clone https://github.com/seu-usuario/nodeflow-back.git
  cd nodeflow-back
```

### 2️⃣ **Executar o Neo4j com Docker Compose**

```
docker-compose up -d
```

> Isso iniciará o banco de dados Neo4j em localhost:7687.
> 

### 3️⃣ **Configurar credenciais no `application.yml`**

```
spring:
  neo4j:
    uri: bolt://localhost:7687
    authentication:
      username: neo4j
      password: password
```

### 4️⃣ **Rodar o projeto**

```
mvn spring-boot:run
```

A API estará disponível em **`http://localhost:8080`**.

## 📖 Documentação da API (Swagger UI)

Após iniciar o projeto, acesse a documentação interativa do Swagger:

- **Swagger UI:** http://localhost:8080/swagger-ui.html
- **JSON OpenAPI:** http://localhost:8080/v3/api-docs

## 📂 Endpoints Principais

### **📍 Gerenciamento de Nós**

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/api/nodes` | Lista todos os nós |
| `GET` | `/api/nodes/{id}` | Busca um nó pelo ID |
| `GET` | `/api/nodes/search?name=valor` | Busca nós pelo nome |
| `POST` | `/api/nodes` | Cria um novo nó |
| `PUT` | `/api/nodes/{id}` | Atualiza um nó existente |
| `DELETE` | `/api/nodes/{id}` | Remove um nó |
| `DELETE` | `/api/nodes/deleteall` | Remove todos os nós |

### **🔗 Gerenciamento de Relacionamentos**

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/api/nodes/{fromId}/connect/{toId}` | Cria um relacionamento |
| `PUT` | `/api/nodes/{fromId}/update-connect/{toId}` | Atualiza um relacionamento |
| `DELETE` | `/api/nodes/{fromId}/disconnect/{toId}` | Remove um relacionamento |

## 🐳 Rodando com Docker

Você pode rodar a API diretamente com Docker:

```
docker build -t nodeflow-back .
docker run -p 8080:8080 --name nodeflow-back --network host nodeflow-back
```

## 🛠️ Contribuição

1. Faça um fork do repositório
2. Crie uma nova branch (`git checkout -b minha-feature`)
3. Faça suas alterações e commit (`git commit -m 'Adicionando nova feature'`)
4. Envie para o GitHub (`git push origin minha-feature`)
5. Abra um Pull Request 🚀

## 📜 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo LICENSE para mais detalhes.