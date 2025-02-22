# NodeFlow - Frontend

Este é o repositório do frontend do **NodeFlow**, um aplicativo para visualização e manipulação de grafos, utilizando **ReactFlow** e **Axios** para interagir com o backend em **Spring Boot**.

---

## **📌 Tecnologias Utilizadas**
- **React** 18
- **ReactFlow** (para edição visual de grafos)
- **Axios** (para chamadas HTTP)
- **React Scripts** (para build e execução do projeto)

---

## **📌 Requisitos**
Para rodar este projeto, é necessário ter instalado:
- **Node.js** v18 ou superior
- **npm** (gerenciador de pacotes do Node.js)

### **1️⃣ Instalar Dependências**
```sh
npm install
```

Caso precise instalar as bibliotecas manualmente, execute:
```sh
npm install react react-dom reactflow axios react-scripts
```

### **2️⃣ Iniciar o Backend** (Certifique-se de que o backend está rodando)
```sh
mvn spring-boot:run
```

### **3️⃣ Iniciar o Frontend**
```sh
npm start
```

### **4️⃣ Acessar no Navegador**
Abra [http://localhost:3000](http://localhost:3000)

---

## **📂 Estrutura do Projeto**
```
nodeflow-front/
│── public/
│   ├── index.html
│   ├── favicon.ico
│── src/
│   ├── components/
│   │   ├── GraphEditor.js  # Editor visual
│   │   ├── NodeForm.js      # Formulário para adicionar nós
│   ├── api.js              # API HTTP
│   ├── App.js              # Componente principal
│   ├── index.js            # Entrada do React
│   ├── App.css             # Estilos gerais
│── package.json
│── README.md
```

---

## **📌 Funcionalidades**
✅ Criar nós dinamicamente 🔵  
✅ Remover nós e conexões ❌  
✅ Conectar nós com arestas 🔗  
✅ Persistência de dados via backend ☁️  

---

## **🛠 API Endpoints**
O frontend se comunica com a API em `http://localhost:8080/api/nodes`. Aqui estão os principais endpoints utilizados:

| Método | Endpoint | Descrição |
|--------|---------|------------|
| GET | `/api/nodes` | Retorna todos os nós |
| POST | `/api/nodes` | Cria um novo nó |
| DELETE | `/api/nodes/{id}` | Remove um nó |
| POST | `/api/nodes/{fromId}/connect/{toId}` | Cria uma conexão entre nós |
| DELETE | `/api/nodes/{fromId}/disconnect/{toId}` | Remove uma conexão |

---

## **📌 Como Personalizar**
Se quiser modificar o estilo do grafo, edite o arquivo `src/App.css`.
```css
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}

button {
  margin-left: 10px;
}
```

Se precisar alterar a API, modifique `src/api.js`.

---

## **🚀 Próximos Passos**
🔹 Melhorar layout e responsividade 📱  
🔹 Adicionar suporte a múltiplos grafos 🌍  
🔹 Melhorar o tratamento de erros 🛠️  

---

## **👨‍💻 Contribuição**
1. Faça um fork do repositório
2. Crie uma branch (`git checkout -b feature-nova`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push da sua branch (`git push origin feature-nova`)
5. Abra um Pull Request 🚀

---

**🚀 Projeto em desenvolvimento!**

