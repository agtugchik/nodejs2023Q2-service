# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Running application

Clone application

```
git clone git@github.com:agtugchik/nodejs2023Q2-service.git
```

Go to application folder

```
cd nodejs2023Q2-service
```

Switch to work branch

```
git switch docker-database
```

Install NPM modules

```
npm i
```

Start `Docker Desktop` on your PC, then run application with

```
docker-compose up -V
```

Run migration

```
npm run migration:run
```

Stop application with `Ctrl + C`, then use

```
docker-compose down
```

## Npm script for vulnerabilities

Register at https://app.snyk.io/, then run

```
npx snyx auth
```

and finaly

```
npm run vulnerability
```

## Testing

After application running open new terminal and enter:

```
npm run test:auth
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
