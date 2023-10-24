import bcrypt from 'bcrypt';
import passport from 'passport';
import authDataMapper from '../models/auth.dataMapper.js';

//! vérification de l'email
const isValidEmail = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
  return regex.test(email);
};

export default {

  //! CONNEXION
  login(req, res, next) {
    return passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      req.login(user, (error) => {
        if (error) {
          return next(error);
        }
        return res.status(200).json({ message: 'Connexion réussie.' });
      });
    })(req, res, next);
  },
  //! DECONNEXION
  logout(req, res) {
    req.logout();
    res.redirect('/login');
  },
  //! REGISTERING
  async register(req, res) {
    try {
      if (!isValidEmail(req.body.email)) {
        return res.status(400).json({ message: 'Adresse mail incorrecte.' });
      }

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
        return res.status(201).json({ message: 'Inscription réussie!' });
      }
      return res.status(500).json({ message: 'Erreur lors de l’inscription.' });
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lors de l’inscription.' });
    }
  },
  //! FINDING ALL USERS
  async findAllUsers(req, res) {
    try {
      const users = await authDataMapper.findAllUsers();

      if (!users || users.length === 0) {
        return res.status(404).json({ message: 'Aucun utilisateur trouvé.' });
      }

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
  },
};
