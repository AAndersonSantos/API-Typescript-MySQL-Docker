# Etapa 1: Construção
FROM node:18 AS build

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando os arquivos do projeto
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

# Instalando dependências
RUN npm install

# Compilando o TypeScript
RUN npm run build

# Etapa 2: Execução
FROM node:18

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando dependências da etapa de construção
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Copiando os arquivos necessários
COPY package*.json ./

# Instalando dependências de produção
RUN npm install --only=production

# Definindo a variável de ambiente
ENV NODE_ENV=production

# Expondo a porta da aplicação
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["node", "dist/src/server.js"]
