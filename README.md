# Demo

## Setup

### install docker-compose

Follow the instructions here https://docs.docker.com/compose/install/

#### Set up database

```
\$ cd backend
\$ docker-compose up -d
```

### Set up React frontend

```
\$ cd frontend
\$ yarn
\$ yarn start
```

### Nodejs

#### install nvm and Node version 12

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
nvm install 12.14.1
nvm use 12.14.1

#### Set up backend

```
\$ cd backend/nodejs
\$ yarn

# Assuming the database has already been created with docker-compose
\$ yarn build
\$ yarn db:migrate
\$ yarn db:seed
\$ yarn start
```

## Local dev

Navigate to localhost:3000 and you should be able to login with { email: 'admin@test.com', password: 'Password123!' } or { email: 'bob@gmail.com', password: 'Password123!' }. There are three routes at the top level: /login, /dashboard, /admin.
