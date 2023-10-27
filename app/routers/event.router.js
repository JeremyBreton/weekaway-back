import { Router } from 'express';
import eventController from '../controllers/event.controller.js';
import validation from '../middlewares/validation.middleware.js';
import * as schemaPost from '../schemas/app.post.schema.js';
import schemaGet from '../schemas/app.get.schema.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';

const eventRouter = Router();

/**
 * @swagger
 * /api/event:
 *   post:
 *     summary: Create a new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/eventSchema'
 *     responses:
 *       200:
 *         description: Event created successfully

 *   get:
 *     summary: Get all events
 *     responses:
 *       200:
 *         description: List of all events
 */
eventRouter.route('/api/event')
  .post(
    validation(schemaPost.eventSchema, 'body'),
    controllerWrapper(eventController.createEvent),

  )
  .get(
    controllerWrapper(eventController.findAllEvents),
  );

/**
 * @swagger
 * /api/event/{id}:
 *   get:
 *     summary: Get an event by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: Event ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event details

 *   patch:
 *     summary: Update an event by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: Event ID
 *         schema:
 *           type: string
 *       - in: body
 *         name: event
 *         description: Event data to update
 *         schema:
 *           $ref: '#/components/schemas/eventSchema'
 *     responses:
 *       200:
 *         description: Event updated

 *   delete:
 *     summary: Delete an event by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: Event ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted
 */
eventRouter.route('/api/event/:id')
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
