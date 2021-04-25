FROM node:12.18.4-alpine3.9
RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
COPY ["package.json","yarn.lock","./"]
COPY ["/build","./build/"]
COPY ["/client/build","./client/build/"]
COPY ["./prisma","./prisma/"]
COPY ["./src/server/schema.graphql","./src/server/"]
CMD yarn ; yarn prisma generate ; yarn start ;