
# Mining Management System

This is a mining management system made by Saeed Karimi.

## What's inside?

This app uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager and turborepo. It includes the following packages/apps:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app
- `api`: an [Express](https://expressjs.com/) server
- `eslint-config-custom`: `eslint` configurations for client side applications (includes `eslint-config-next` and `eslint-config-prettier`)
- `eslint-config-custom-server`: `eslint` configurations for server side applications (includes `eslint-config-next` and `eslint-config-prettier`)
- `scripts`: Jest configurations
- `logger`: Isomorphic logger (a small wrapper around console.log)
- `tsconfig`: tsconfig.json;s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Docker

This repo is configured to be built with Docker, and Docker compose. To build all apps in this repo:

```
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create app_network

# Build prod using new BuildKit engine
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build
# or
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker compose up --build

# Start prod in detached mode
docker-compose -f docker-compose.yml up -d
```
In order for this to work you might have to manually add your local ip address as the host for the environment variable on the frontend web package
inside the web folder create .env file and add the following
```
NEXT_PUBLIC_API_HOST=http://{local_ip}:3001/api/v1
# for example 192.168.1.233
```
Now you can open http://localhost:3000.
To shutdown all running containers:

```
# Stop all running containers
docker kill $(docker ps -q) && docker rm $(docker ps -a -q)
```


### Yarn
You can also run the application as a monorepo with the package manager yarn
Make sure all the necessary environment variables are set for the backend ( api package ) and then from the root of the monorepo run the following command
```
yarn dev
# or
yarn build
```
### Testing
You can run the tests with the following command from the root of the monorepo
```
yarn test
```
or just to test the backend ( api package ) run the following command from the api directory
```
yarn jest --detectOpenHandles
```
To make sure the tests run with no issues add the following environment variable to the backend ( api package )
```
 TEST_AUTH_TOKEN=<secret>
 ```
 This let's you bypass the middleware

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting
# DevOps
