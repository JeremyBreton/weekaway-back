/* eslint-disable linebreak-style */
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
// Suppression de l'importation inutile de express-session
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import router from './routers/index.router.js';
import passportConfig from './middlewares/passportConfig.js';
import userDocImplementation from './middlewares/swagger.doc.js';

passportConfig(passport);

const app = express();
app.set('trust proxy', 1)
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
userDocImplementation(app);
app.use('/static', express.static('uploads'));

// CORS setup
const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
// Middleware pour récupérer un body au format JSON
app.use(express.json());
// Possibilité d'utiliser les deux formats (JSON et URL-encoded) dans la même app
app.use(express.urlencoded({ extended: true }));

// Passport middleware pour l'authentification
app.use(passport.initialize());

// Routes
app.use(router);

export default app;
