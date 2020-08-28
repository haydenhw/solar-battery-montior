const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');

require('dotenv').config();
require('./src/core/config/passport.config');

const productsRoutes = require('./src/products/products.routes');
const ordersRoutes = require('./src/orders/orders.routes');
const usersRoutes = require('./src/users/users.routes');
const authRoutes = require('./src/auth/auth.routes');
const establishmentRoutes = require('./src/establishment/establishment.routes');
const tagsRoutes = require('./src/tags/tags.routes');

const app = express();
const http = require('http').createServer(app);

const socket = require('./src/socket');
const io = require('socket.io')(http);
socket.loadConfig(io);
exports.io = io;

//apply general middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60,
    keys: [process.env.SECRET_KEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());

//database initialization
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('Connected to a database');
});

//apply routes
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);
app.use('/establishments', establishmentRoutes);
app.use('/tags', tagsRoutes);
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
  console.log(`Waitermaster magic is on port ${process.env.PORT}!`)
);
