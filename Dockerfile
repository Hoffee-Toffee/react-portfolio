FROM node:18-alpine
WORKDIR /

COPY ["package.json", "package-lock.json*", "./"]

# ffmpeg - version 20181210-g0e8eb07980
RUN apk add --no-cache \
    bash \
    curl \
    tar \
    xz

RUN curl -L -o /tmp/ffmpeg-release-i686-static.tar.xz https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-i686-static.tar.xz && \
    tar -xJf /tmp/ffmpeg-release-i686-static.tar.xz -C /tmp && \
    mv /tmp/ffmpeg-4.1.3-i686-static/ffmpeg /usr/local/bin/ffmpeg && \
    mv /tmp/ffmpeg-4.1.3-i686-static/ffprobe /usr/local/bin/ffprobe && \
    chmod +x /usr/local/bin/ffmpeg /usr/local/bin/ffprobe && \
    rm -rf /tmp/ffmpeg*

RUN npm ci

COPY . .

ENV NODE_ENV=production
RUN npm run build --if-present
RUN npm run start --if-present
RUN npm prune --omit=dev