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
RUN npm ci

# Copy source code
COPY . .

EXPOSE 3000

# 開発モードで起動（ホットリロード対応）
CMD ["npm", "start"]
