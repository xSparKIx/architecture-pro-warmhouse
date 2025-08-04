# Используем официальный образ Node.js
FROM node:21-alpine

# Создаем рабочую директорию в контейнере
WORKDIR /app

# Копируем файлы package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем все файлы проекта (исключая то, что указано в .dockerignore)
COPY . .

# Команда для запуска приложения
CMD ["npm", "start"]