/* eslint-disable linebreak-style */
import { Router } from 'express';
import controller from '../controllers/index.controller.js';
import validation from '../middlewares/validation.middleware.js';
import * as schemaPost from '../schemas/app.post.schema.js';
import schemaGet from '../schemas/app.get.schema.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';
import NotFoundError from '../errors/notfound.error.js';
import errorHandler from '../middlewares/error.middleware.js';
import logger from '../helpers/logger.js';
import authController from '../controllers/auth.controller.js';

/**
 * @typedef {object} ResponseError response error
 * @property {string} error the error string
 */

const router = Router();

router.use((req, _, next) => {
  logger.http(req.url, { method: req.method, ip: req.ip, os: req.headers['user-agent'] });
  next();
});

router.route('/')

  .get(
    validation(schemaGet, 'query'),
    controllerWrapper(controller),
  )

  .post(
    validation(schemaPost, 'body'),
    controllerWrapper(controller),

  );
router.route('/login')

  .get(
    validation(schemaGet, 'query'),
  )

  .post(
    validation(schemaPost.loginSchema, 'body'),
    authController.login,
  );

router.route('/register')

  .get(
    validation(schemaGet, 'query'),
  )
  .post(
    validation(schemaPost.registerSchema, 'body'),
    authController.register,
  );

router.route('/logout')

  .get(
    validation(schemaGet, 'query'),
  )

  .post(
    validation(schemaPost, 'body'),
  );
router.route('/users')

  .get(
    validation(schemaGet, 'query'),
    authController.findAllUsers,
  );

router.use((_, __, next) => {
  next(new NotFoundError('404 not found'));
});

router.use(errorHandler);

export default router;
