import Debug from 'debug';
import { Router } from 'express';
import eventDateController from '../controllers/eventDate.controller.js';
import validation from '../middlewares/validation.middleware.js';
import * as schemaPost from '../schemas/app.post.schema.js';
import schemaGet from '../schemas/app.get.schema.js';
import * as schemaPatch from '../schemas/app.patch.schema.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';

const debug = Debug('WeekAway:router:eventDate');

const eventDateRouter = Router();

eventDateRouter.route('/api/eventDate')
  .get(controllerWrapper(eventDateController.getAllEventDates))
  /**
   * GET /api/eventDate
   * @summary Get all events dates
   * @tags EventDate
 */
  .post(
    validation(schemaPost.eventDateSchema, 'body'),
    controllerWrapper(eventDateController.createEventDate),
  );
/**
   * POST /api/eventDate
   * @summary Register a new event date
   * @tags EventDate
   * @param {EventDate} request.body.required - event infos
   * - object with different personnailzed sentence parts

   */

eventDateRouter.route('/api/eventDate/:id')
  .get(
    validation(schemaGet, 'query'),
    controllerWrapper(eventDateController.getEventDateById),
  )
/**
   * GET /api/eventDate/:id
   * @summary Get event date by id
   * @tags EventDate
 */
  .patch(
    validation(schemaPatch.eventDateSchema),
    controllerWrapper(eventDateController.updateEventDateById),
  )
  /**
   * PATCH /api/eventDate/:id
   * @summary Modify event date by id
   * @tags EventDate
   * @param {EventDate} request.body.required - event infos
   * - object with different personnailzed sentence parts

   */
  .delete(
    validation(schemaGet, 'query'),
    controllerWrapper(eventDateController.deleteEventDateById),
  );
/**
   * DELETE /api/eventDate/:id
   * @summary Delete event date by id
   * @tags EventDate

   */

eventDateRouter.route('/api/eventDate/event/:eventId')
  .get(
    validation(schemaGet, 'query'),
    controllerWrapper(eventDateController.getEventDateByeventId),
  );
/**
   * GET /api/eventDate/event/:eventId
   * @summary Get event date by his event id
   * @tags EventDate
 */

eventDateRouter.route('/api/eventDate/:id/event')
  .get(
    validation(schemaGet, 'query'),
    controllerWrapper(eventDateController.getEventDateWithEvent),
  );
/**
   * GET /api/eventDate/:id/event
   * @summary Get event(s) with the eventDate id
   * @tags EventDate
 */

export default eventDateRouter;
