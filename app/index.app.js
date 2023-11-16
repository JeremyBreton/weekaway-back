/* eslint-disable linebreak-style */
import Debug from 'debug';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
// Suppression de l'importation inutile de express-session
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import router from './routers/index.router.js';
import passportConfig from './middlewares/passportConfig.js';
import userDocImplementation from './middlewares/swagger.doc.js';

const debug = Debug('WeekAway:app:index');

passportConfig(passport);

const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));

userDocImplementation(app);
app.use('/static', express.static('uploads'));
app.use(express.static('dist'));

/*
// CORS setup
const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
  credentials: true,
};
*/
const corsOptions = {
  origin: '*',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(cookieParser());
// Middleware pour récupérer un body au format JSON
app.use(express.json());
// Possibilité d'utiliser les deux formats (JSON et URL-encoded) dans la même app
app.use(express.urlencoded({ extended: true }));

// Passport middleware pour l'authentification
const indexPath = path.resolve('dist', 'index.html');
app.use(passport.initialize());

app.get('/login', (req, res) => res.sendFile(indexPath));
app.get('/profil', (req, res) => res.sendFile(indexPath));
app.get('*', (req, res) => {
  res.sendFile(indexPath);
});
// Routes
app.use(router);

export default app;
