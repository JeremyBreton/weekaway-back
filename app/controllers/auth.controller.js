import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import passport from 'passport';
import authDataMapper from '../models/auth.dataMapper.js';
import mailService from '../services/mailer/mailer.js';

const isValidEmail = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
  return regex.test(email);
};

/**
   * @typedef {object} UserInput
   * @property {string} firstname
   * @property {string} lastname
   * @property {string} email
   * @property {string} password
  */

/**
   * @typedef {object} UserInputLogin
   * @property {string} email
   * @property {string} password
  */

export default {

  login(req, res, next) {
    return passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({ message: info.message, logged: false });
      }

      req.login(user, (error) => {
        if (error) {
          return next(error);
        }

        return res.status(200)
          .cookie('jwt', user.token, {
            httpOnly: true,
            //! secure / HTTPS à ajouté plus tard pour plus de sécurité
            maxAge: 24 * 60 * 60 * 1000, //!  1 jour (à choisir selon les préférences)
          })
          .json({
            message: 'Connexion réussie!',
            firstname: user.firstname,
            logged: true,
            token: user.token,
          });
      });
    })(req, res, next);
  },

  logout(req, res) {
    req.logout();
    res.clearCookie('jwt').redirect('/login');
  },

  async register(req, res) {
    if (!isValidEmail(req.body.email)) {
      return res.status(400).json({ message: 'Adresse mail incorrecte.' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
    };

    const registeredUser = await authDataMapper.registerUser(userData);
    if (registeredUser) {
      const userForToken = {
        id: registeredUser.id,
        email: registeredUser.email,
        firstname: registeredUser.firstname,
      };

      const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      return res.status(201)
        .cookie('jwt', token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, //!  1 jour (à choisir selon les préférences)
        })
        .json({
          message: 'Inscription réussie!',
          firstname: registeredUser.firstname,
          logged: true,
        });
    }
    return res.status(500).json({ message: 'Erreur lors de l’inscription.', logged: false });
  },

  async findAllUsers(req, res) {
    const users = await authDataMapper.findAllUsers();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé.' });
    }

    return res.status(200).json(users);
  },
};
