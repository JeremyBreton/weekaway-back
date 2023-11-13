import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authDataMapper from '../models/auth.dataMapper.js';
import userDataMapper from '../models/user.dataMapper.js';
import isValidEmail from '../services/emailService.js';

export default function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        if (!isValidEmail(email)) {
          return done(null, false, { message: "Format d'e-mail invalide." });
        }

        const user = await userDataMapper.getUserByEmail(email);

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
}
