import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import authDataMapper from '../models/auth.dataMapper.js';

export default function (passport) {
  //! Fonction de validation de l'e-mail

  function isValidEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i;
    return regex.test(email);
  }

  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          //! Vérification du format de l'e-mail

          if (!isValidEmail(email)) {
            return done(null, false, { message: 'Format d\'e-mail invalide.' });
          }

          //! La vérification de l'email

          const user = await authDataMapper.findUserByEmail(email);

          if (!user) {
            return done(null, false, { message: 'Email incorrecte.' });
          }

          //! La comparaison du mot de passe

          const isMatch = await bcrypt.compare(password, user.password);

          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, {
            message: 'Email ou mot de passe incorrect',
          });
        } catch (err) {
          return done(err);
        }
      },
    ),
  );

  //! Récupérer l'id de l'utilisateur et le stocker dans une session (cookie miam miam)

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await authDataMapper.findUserById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}
