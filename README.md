# Demo

## Setup

### install nvm and Node version 12

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
nvm install 12.14.1
nvm use 12.14.1

### Set up backend and database

```
\$ cd backend
\$ yarn
\$ docker-compose up -d

# wait for the database to be created. This can take a minute or two
\$ yarn build
\$ yarn db:migrate
\$ yarn db:seed
\$ yarn start
```

### Set up frontend

```
\$ cd frontend
\$ yarn
\$ yarn start
```

## Local dev

Navigate to localhost:3000 and you should be able to login with { email: 'admin@test.com', password: 'Password123!' } or { email: 'bob@gmail.com', password: 'Password123!' }. There are three routes at the top level: /login, /dashboard, /admin.
