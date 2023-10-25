import bcrypt from 'bcrypt';
import passport from 'passport';
import authDataMapper from '../models/auth.dataMapper.js';

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
  //! DISCONNEXION
  logout(req, res) {
    req.logout();
    res.redirect('/login');
  },

  //! REGISTRATION
  async register(req, res) {
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
      password: hashedPassword,
    };

    const registeredUser = await authDataMapper.registerUser(newUser);
    if (registeredUser) {
      return res.status(201).json({ message: 'Inscription réussie!' });
    }
    return res.status(500).json({ message: 'Erreur lors de l’inscription.' });
  },
  //! FIND ALL USERS
  async findAllUsers(req, res) {
    const users = await authDataMapper.findAllUsers();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé.' });
    }

    return res.status(200).json(users);
  },
};
