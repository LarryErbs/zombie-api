FROM node:14-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production && \
    npm i rimraf && \
    npm run build
COPY build build

FROM node:14-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/build build
COPY --from=build /usr/src/app/node_modules node_modules
COPY --from=build /usr/src/app/package.json .

CMD [ "node", "build/server" ]