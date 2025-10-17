# --- Estágio 1: Build ---
FROM mirror.gcr.io/library/node:20-slim AS build

# Diretório de trabalho
WORKDIR /app

# Instala dependências do sistema necessárias para compilar pacotes nativos
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        python3 \
        build-essential \
        g++ \
        make && \
    rm -rf /var/lib/apt/lists/*

# Copia apenas arquivos de dependências para aproveitar cache
COPY package*.json ./

# Instala TODAS as dependências (incluindo dev, pois Next precisa delas para build)
RUN npm install

# Copia o restante da aplicação
COPY . .

# Faz o build da aplicação Next.js
RUN npm run build

# --- Estágio 2: Runtime ---
FROM mirror.gcr.io/library/node:20-slim AS runtime

WORKDIR /app

# Instala apenas dependências necessárias em produção
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

# Copia arquivos compilados do estágio de build
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/next.config.* ./ || true

# Define variáveis de ambiente
ENV NODE_ENV=production \
    PORT=3000

# Expõe a porta do Next.js
EXPOSE 3000

# Comando para iniciar o servidor Next.js
CMD ["npm", "run", "start"]
