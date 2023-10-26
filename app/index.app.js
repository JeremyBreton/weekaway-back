/* eslint-disable linebreak-style */
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import router from './routers/index.router.js';
import passportConfig from './middlewares/passportConfig.js';

passportConfig(passport);

const app = express();

// CORS setup
const corsOptions = {
  origin: process.env.CORS_DOMAINS || '*',
};
app.use(cors(corsOptions));

// middleaware pour récupérer un body au format JSON
app.use(express.json());
// On peut donner la possibilité d'utiliser les 2 format dans la même app
app.use(express.urlencoded({ extended: true }));

// Session
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: true,
  }),
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(router);

export default app;
