const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
const http = require('http').createServer(app);

// apply general middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // TODO look up the limit arg

// database initialization
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('Connected to a database');
});

// apply routes

app.get('/ping', (req, res) => {
  res.json({message: 'pong'})
})

app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

http.listen(process.env.PORT, () =>
  console.log(`Battery monitoring magic is on port ${process.env.PORT}!`)
);
