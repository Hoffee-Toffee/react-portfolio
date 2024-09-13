FROM node:18-alpine
WORKDIR /

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci

# Download and install the prebuilt FFmpeg binary
RUN apk add --no-cache wget tar xz && \
    wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-i686-static.tar.xz && \
    tar -xJf ffmpeg-release-i686-static.tar.xz && \
    cp ffmpeg-*/ffmpeg /usr/local/bin/ffmpeg && \
    cp ffmpeg-*/ffprobe /usr/local/bin/ffprobe && \
    rm -rf ffmpeg-* && \
    apk del wget tar xz

COPY . .

ENV NODE_ENV=production
RUN npm run build --if-present
RUN npm run start --if-present
RUN npm prune --omit=dev