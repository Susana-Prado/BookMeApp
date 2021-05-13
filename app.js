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

const venueRouter = require('./routes/venues.routes');
app.use('/api/venues', venueRouter);


module.exports = app;
