import { Router } from 'express';
import eventDateController from '../controllers/eventDate.controller.js';
import validation from '../middlewares/validation.middleware.js';
import * as schemaPost from '../schemas/app.post.schema.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';

const eventDateRouter = Router();

eventDateRouter.route('/api/eventDate')
  .get(controllerWrapper(eventDateController.getAllEventDates))
  .post(
    validation(schemaPost.eventDateSchema),
    controllerWrapper(eventDateController.createEventDate),
  );

eventDateRouter.route('/api/eventDate/:id')
  .get(controllerWrapper(eventDateController.getEventDateById))
  .patch(
    validation(schemaPost.eventDateSchema),
    controllerWrapper(eventDateController.updateEventDateById),
  )
  .delete(controllerWrapper(eventDateController.deleteEventDateById));

eventDateRouter.route('/api/eventDate/:id/event')
  .get(controllerWrapper(eventDateController.getEventDateWithEvent));

eventDateRouter.route('/api/eventDate/:id/event/userChoices')
  .get(controllerWrapper(eventDateController.getEventDateWithEventAndUserChoices));

export default eventDateRouter;
