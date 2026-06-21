FROM node:lts-alpine3.24

WORKDIR /app

COPY . .

RUN npm install

ENV PORT=3000

EXPOSE 3000

USER node

CMD ["npm", "start"]