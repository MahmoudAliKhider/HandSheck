#first Stage
FROM node:16 as build

RUN  mkdir -p /app

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app/

RUN npm run build

#final stage
FROM nginx:alpine

COPY --from=build /app/dist/client /usr/share/nginx/html



