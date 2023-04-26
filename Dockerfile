FROM node:18-alpine 
ENV NODE_ENV=production

WORKDIR /var/www/open_ai

RUN npm i -g nodemon

COPY package*.json .

RUN npm i --production

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]
