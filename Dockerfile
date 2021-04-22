FROM node:12.18.4-alpine3.9
RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
COPY ["/build","./server/"]
COPY ["/client/build","./client/build/"]
COPY ["./prisma","./prisma/"]