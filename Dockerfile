# Etapa 1: Build
FROM node:20-alpine AS builder

# Instalação de dependências essenciais para build
RUN apk add --no-cache python3 make g++

# Diretório de trabalho
WORKDIR /app

# Copiar apenas arquivos necessários para o build
COPY package*.json ./

# Instalar todas as dependências (incluindo devDependencies)
RUN npm install

# Copiar o restante do código para o container
COPY . .

# Compilar a aplicação
RUN npm run build

# Etapa 2: Runtime
FROM node:20-alpine AS runtime

# Instalar dependências para runtime
RUN apk add --no-cache gcompat

# Diretório de trabalho
WORKDIR /app

# Copiar dependências de produção da etapa de build
COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Copiar build da etapa anterior
COPY --from=builder /app/dist ./dist

# Expor a porta usada pela aplicação
EXPOSE 3001

# Comando de inicialização
CMD ["node", "dist/main"]
