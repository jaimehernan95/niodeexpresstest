FROM node:8 

WORKDIR /src

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 4000

CMD ["node", "/src/index.js" ]