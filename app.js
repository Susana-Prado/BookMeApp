require('dotenv').config();
const express      = require('express');
const app = express();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon      = require('serve-favicon');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

//DB config
require('./configs/db.config');

// Middleware config
require('./configs/middleware.config')(app);
require('./configs/cors.config')(app);

// Session config + Passport
require('./configs/session.config')(app);
require('./configs/passport.config')(app);


//Routes
const authRouter = require('./routes/auth.routes');
const reservationRouter = require('./routes/reservation.routes');
const privateRouter = require('./routes/private.routes');

app.use('/api/auth', authRouter);
app.use('/api/reservation', reservationRouter);
app.use('/api/private', privateRouter);


app.use((req, res, next) => {
  return res.status(404).json({ message: "Not found"});
})


module.exports = app;
