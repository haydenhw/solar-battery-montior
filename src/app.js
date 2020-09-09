const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require("./mongodb/mongodb.connect");

require('dotenv').config();


const app = express();

// apply general middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // TODO look up the limit arg

// database initialization
  mongodb.connect();

// apply routes
const alertsRouter = require('./alerts/alerts.routes')
const sensorRouter = require('./sensors/sensors.routes')

app.use('/alerts', alertsRouter)
app.use('/sensors', sensorRouter)

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
