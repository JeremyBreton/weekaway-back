/* eslint-disable linebreak-style */
import { Router } from 'express';
import authRouter from './auth.router.js';
import eventRouter from './event.router.js';
import themeRouter from './theme.router.js';
import userRouter from './user.router.js';
import userChoiceRouter from './userChoice.router.js';
import eventDateRouter from './eventDate.router.js';
import NotFoundError from '../errors/notfound.error.js';
import errorHandler from '../middlewares/error.middleware.js';
import logger from '../helpers/logger.js';
import eventLinkRouter from './eventLink.router.js';

/**
 * @typedef {object} ResponseError response error
 * @property {string} error the error string
 */
const mainRouter = Router();

mainRouter.use((req, _, next) => {
  logger.http(req.url, {
    method: req.method,
    ip: req.ip,
    os: req.headers['user-agent'],
  });
  next();
});

mainRouter.use(authRouter);
mainRouter.use(eventRouter);
mainRouter.use(userRouter);
mainRouter.use(userChoiceRouter);
mainRouter.use(themeRouter);
mainRouter.use(eventDateRouter);
mainRouter.use(eventLinkRouter);
mainRouter.use((_, __, next) => {
  next(new NotFoundError('404 not found'));
});

mainRouter.use(errorHandler);

export default mainRouter;
