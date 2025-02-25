# Etapa 1: Build do projeto Spring Boot
FROM maven:3.8.5-openjdk-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Etapa 2: Configuração do ambiente de execução
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

# Para Construir e rodar o container
#  Agora, crie a imagem Docker:
#  $> docker build -t nodeflow .
#  --
#  E execute o container:
#  $> docker run -p 8080:8080 nodeflow-app
# A aplicação agora estará disponível em http://localhost:8080.

# Para enviar sua imagem Docker para o Docker Hub:
#  docker tag nodeflow marcoseduardoss/nodeflow:latest  
#  docker login  
#  docker push marcoseduardoss/nodeflow:latest  
	