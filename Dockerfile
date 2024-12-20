FROM node:22

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install
RUN npm install -g firebase-tools
RUN npx tsc --init

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
