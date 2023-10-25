import { Router } from 'express';
import eventController from '../controllers/event.controller.js';
import validation from '../middlewares/validation.middleware.js';
import * as schemaPost from '../schemas/app.post.schema.js';
import schemaGet from '../schemas/app.get.schema.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';

const eventRouter = Router();

eventRouter.route('/api/event')
// Create a new event
  .post(
    validation(schemaPost.eventSchema, 'body'),
    controllerWrapper(eventController.createEvent),

  )
  .get(
    controllerWrapper(eventController.findAllEvents),
  );

eventRouter.route('/api/event/:id')
// Create a new event
  .get(

    validation(schemaGet, 'query'),

    controllerWrapper(eventController.findEventById),
  )

  .patch(
    validation(schemaPost.eventSchema, 'body'),

    controllerWrapper(eventController.updateEvent),
  )
  .delete(
    controllerWrapper(eventController.deleteEvent),

  );

export default eventRouter;
