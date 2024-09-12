FROM node:18-alpine
WORKDIR /

COPY ["package.json", "package-lock.json*", "./"]
RUN apt-get install ffmpeg -y
RUN npm ci

COPY . .

ENV NODE_ENV=production
RUN npm run build --if-present
RUN npm run start --if-present
RUN npm prune --omit=dev