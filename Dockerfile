# Use uma imagem base com Node.js
FROM node:latest as build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos do projeto para o contêiner
COPY . .

# Instale as dependências
RUN npm install

# Construa a aplicação React
RUN npm run build

# Etapa de produção
FROM nginx:alpine

# Copie os arquivos construídos da etapa de compilação para o diretório de publicação do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expõe a porta 80 para o tráfego da web
EXPOSE 80

# Comando para iniciar o servidor Nginx em segundo plano quando o contêiner for iniciado
CMD ["nginx", "-g", "daemon off;"]