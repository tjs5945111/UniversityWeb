# build environment
FROM luckyzune/node:publish as build
COPY package.json /app/package.json
RUN npm install --silent
COPY . /app
RUN npm run build
EXPOSE 5000
CMD ["serve","-s", "dist/"]