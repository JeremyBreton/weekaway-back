import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import passport from 'passport';
import authDataMapper from '../models/auth.dataMapper.js';
import mailService from '../services/mailer/mailer.js';
import isValidEmail from '../services/emailService.js';

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
            user_id: user.id,
            firstname: user.firstname,
            logged: true,
            token: user.token,
          });
      });
    })(req, res, next);
  },

  logout(req, res) {
    req.logout();
    res.clearCookie('jwt').redirect('/login'); // (à changer?)
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

    if (!req.file) {
      userData.profile_picture = 'http://caca-boudin.fr/static/profilDefault.png';
    } else if (req.file) {
      userData.profile_picture = `http://caca-boudin.fr/static/${req.file.filename}`;
    }

    const registeredUser = await authDataMapper.registerUser(userData);
    if (registeredUser) {
      const userForToken = {
        id: registeredUser.id,
        email: registeredUser.email,
        firstname: registeredUser.firstname,
      };

      const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
        expiresIn: '1d', // TOKEN DURATION TIME
      });
      mailService.sendMail(registeredUser);

      return res.status(201)
      // ! TODO : A revoir pour la récurité en https et avec secure : true
        .cookie('jwt', token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, //!  1 jour (à choisir selon les préférences)
        })
        .json({
          message: 'Inscription réussie!',
          firstname: registeredUser.firstname,
          logged: true,
          token,
        });
    }
    return res.status(500).json({ message: 'Erreur lors de l’inscription.', logged: false });
  },
};
