FROM node:12
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
# If you are building your code for production
# RUN npm ci --only=production
COPY . .
EXPOSE 3003
CMD [ "yarn", "start" ]
