import { Router } from 'express';
import controller from '../controllers/index.controller.js';
import eventController from '../controllers/event.controller.js';
import validation from '../middlewares/validation.middleware.js';
import schemaPost from '../schemas/app.post.schema.js';
import schemaGet from '../schemas/app.get.schema.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';
import NotFoundError from '../errors/notfound.error.js';
import errorHandler from '../middlewares/error.middleware.js';
import logger from '../helpers/logger.js';

/**
 * @typedef {object} ResponseError response error
 * @property {string} error the error string
 */

const router = Router();

router.use((req, _, next) => {
  logger.http(req.url, { method: req.method, ip: req.ip, os: req.headers['user-agent'] });
  next();
});

router.route('/event')
// Create a new event
  .post(
    validation(schemaPost, 'body'),
    controllerWrapper(eventController.createEvent),

  )
  .get(
    controllerWrapper(eventController.findAllEvents),

  );

router.route('/event/:id')
// Create a new event
  .get(
    controllerWrapper(eventController.findEventById),

  )
  .patch(
    validation(schemaPost, 'body'),
    controllerWrapper(eventController.updateEvent),
  )
  .delete(
    controllerWrapper(eventController.deleteEvent),
  );
router.use((_, __, next) => {
  next(new NotFoundError('404 not found'));
});

router.use(errorHandler);

export default router;
