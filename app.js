const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require("./src/mongodb/mongodb.connect");

require('dotenv').config();

const alertsRouter = require('./src/alerts/alerts.routes')

const app = express();

// apply general middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // TODO look up the limit arg

// database initialization
  mongodb.connect();

// apply routes
app.use('/alerts', alertsRouter)

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

module.exports = app
