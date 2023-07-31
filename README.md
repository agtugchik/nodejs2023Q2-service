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
Switch to develop branch

```
git switch develop
```

Installing NPM modules

```
npm install
```

Running application

```
npm start
```
Or Running application in developer mode

```
npm run start:dev
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```


### Auto-fix and format

```
npm run lint
```

```
npm run format
```