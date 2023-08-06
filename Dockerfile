FROM node:18-alpine as firstStep
WORKDIR /usr/app
COPY package*.json .
RUN npm install --save && npm cache clean --force
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/app
COPY --from=firstStep /usr/app/dist .
COPY --from=firstStep /usr/app/node_modules ./node_modules
EXPOSE 4000
CMD ["node", "./main.js"]