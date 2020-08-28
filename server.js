const app = require('./app')
const http = require('http').createServer(app)

http.listen(process.env.PORT, () =>
  console.log(`Battery monitoring magic is on port ${process.env.PORT}!`)
);
