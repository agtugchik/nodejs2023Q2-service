FROM node:18-alpine as firstStep
WORKDIR /usr/app
COPY package*.json .
RUN npm install --save && npm uninstall snyk && npm cache clean --force
COPY . .
CMD ["npm", "run", "start:dev"]