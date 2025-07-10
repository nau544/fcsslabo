FROM node:18-alpine

WORKDIR /app

# システムの依存関係を更新
RUN apk update && apk add --no-cache \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

# Copy package files first for better caching
COPY package*.json ./

# 依存関係をインストール
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# 開発用の依存関係もインストール（TypeScriptコンパイル用）
RUN npm install --only=dev

EXPOSE 3000

# 開発モードで起動（ホットリロード対応）
CMD ["npm", "start"]
