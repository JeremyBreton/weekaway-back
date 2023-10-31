import { Router } from 'express';
import upload from '../services/multer.js';
import eventController from '../controllers/event.controller.js';
import validation from '../middlewares/validation.middleware.js';
import * as schemaPost from '../schemas/app.post.schema.js';
import schemaGet from '../schemas/app.get.schema.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';

const eventRouter = Router();

eventRouter.route('/api/event')
  .post(
    upload.single('event'),
    validation(schemaPost.eventSchema, 'body'),
    controllerWrapper(eventController.createEvent),

  )
  /**
   * POST /api/event
   * @summary Register a new event
   * @tags Event
   * @param {EventInput} request.body.required - event infos
   * - object with different personnailzed sentence parts

   */
// ! TODO : Faire schema pour les .get
  .get(
    controllerWrapper(eventController.findAllEvents),
  );
/**
   * GET /api/event/
   * @summary Get all events
   * @tags Event
 */

eventRouter.route('/api/event/:id')
  .get(
    // ! TODO : Faire schema pour les .get
    validation(schemaGet, 'query'),

    controllerWrapper(eventController.findEventById),
  )
  /**
   * GET /api/event/:id
   * @summary Get an evet by id
   * @tags Event
 */
// ! TODO : Faire schema pour les .patch (remettre les schema post dans un doc patch)
  .patch(
    validation(schemaPost.eventSchema, 'body'),

    controllerWrapper(eventController.updateEvent),
  )
/**
   * PATCH /api/event/:id
   * @summary Modify event infos
   * @tags Event
   * @param {EventInput} request.body.required - event infos
   * - object with different personnailzed sentence parts

   */
  .delete(
    controllerWrapper(eventController.deleteEvent),

  );

/**
   * DELETE /api/event/:id
   * @summary Delete an event by id
   * @tags Event
 */

export default eventRouter;
