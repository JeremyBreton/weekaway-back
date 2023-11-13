import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserDataMapper from '../models/user.dataMapper.js';
import isValidEmail from '../services/emailService.js';

const userDataMapper = new UserDataMapper();

export default function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        if (!isValidEmail(email)) {
          return done(null, false, { message: "Format d'e-mail invalide." });
        }

        const user = await userDataMapper.findByEmail(email);

        if (!user) {
          return done(null, false, { message: 'Email incorrect.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          const userForToken = {
            id: user.id,
            email: user.email,
            firstname: user.firstname,
          };

          const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
            expiresIn: '1d',
          });

          user.token = token;

          return done(null, user);
        }

        return done(null, false, {
          message: 'Email ou mot de passe incorrect.',
        });
      },
    ),
  );


  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UserDataMapper.findById(id);
    done(null, user);
  });

}
