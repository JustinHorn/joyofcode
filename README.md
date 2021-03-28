# Joy of Code

A platform where you can share your web dev project with other developers!

### How to set up

- add aws S3 bucket credentials to .env as described in .env.example
- add a postgresql database to prisma/.env (dont forget to specify the max. connections)
- add Github OAuth2 credentials to .env
- run `yarn`
- cd client/
- run `yarn`

### Start

- #### Development

  - run `yarn start` in client/
  - run `yarn watch` in root
  - development react app is on port 3000

- #### Production

  - run `yarn build` in client/
  - run `yarn start` in root
  - server is on on port 4000

### Tech Stack:

React.js > Apollo > GraphQl- Yoga (Express + GraphQl) > Prisma 2 > Heroku PostgreSQL

### How it was build:

I have built it in an iterative way. First using my own authentication later utilizing github.  
The project saw several database migrations as well as me moving the whole data from ElephantDB to Heroku PostgresQL

