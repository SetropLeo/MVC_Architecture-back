const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const dotenv = require('dotenv');
const session = require('express-session');
const { loginCheck } = require('./auth/passport');
const PORT = process.env.PORT || 4111;

dotenv.config();

loginCheck(passport);

const database = process.env.MONGOLAB_URI;
mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Connected to Mongoose'))
  .catch((error) => console.log('Error', error));

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'oneboy',
    saveUninitialized: true,
    resave: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.set('view engine', 'ejs');
app.use('/', require('./routes/login'));

app.listen(PORT, console.log('Server started using port: ' + PORT));
