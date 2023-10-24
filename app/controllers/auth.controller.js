/* eslint-disable no-inner-declarations */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
import bcrypt from 'bcrypt';
import passport from 'passport';
import authDataMapper from '../models/auth.dataMapper.js';

export default {
  //! CONNEXION
  login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        console.error(info.message);
        return res.status(401).json({ message: info.message });
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        console.log('Youhou tu t\'es bien connecté!');
        return res.status(200).json({ message: 'Connexion réussie.' });
      });
    })(req, res, next);
  },

  //! DECONNEXION

  logout(req, res) {
    req.logout();
    res.redirect('/login');
  },

  //! INSCRIPTION

  async register(req, res) {
    try {
      //! Fonction de validation de l'e-mail
      function isValidEmail(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i;
        return regex.test(email);
      }

      //! Vérification du format de l'e-mail
      if (!isValidEmail(req.body.email)) {
        return res.status(400).json({ message: 'Adresse mail incorrecte.' });
      }

      //! Vérification si l'email existe déjà
      const existingUser = await authDataMapper.findUserByEmail(req.body.email);
      if (existingUser) {
        return res.status(409).json({ message: 'L\'email est déjà utilisé.' });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        address: req.body.address,
        password: hashedPassword,
        birth_date: req.body.birth_date,
        gender: req.body.gender,
        profile_picture: req.body.profile_picture,
        profile_desc: req.body.profile_desc,
      };

      const registeredUser = await authDataMapper.registerUser(newUser);
      if (registeredUser) {
        res.status(201).json({ message: 'Inscription réussie!' });
        console.log('Inscription réussie mon pote !');
      } else {
        res.status(500).json({ message: 'Erreur lors de l’inscription.' });
      }
    } catch (error) {
      console.error('Erreur lors de l’inscription :', error);
      res.status(500).json({ message: 'Erreur lors de l’inscription.' });
    }
  },
  //! LISTE DE TOUS LES UTILISATEURS
  async findAllUsers(req, res) {
    try {
      const users = await authDataMapper.findAllUsers();

      if (users.length === 0) {
        return res.status(404).json({ message: 'Aucun utilisateurs trouvé.' });
      }

      res.status(200).json(users);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      res
        .status(500)
        .json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
  },
};
