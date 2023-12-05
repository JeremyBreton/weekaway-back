import Debug from 'debug';
import { Router } from 'express';
import userHasEventController from '../controllers/userHasEvent.controller.js';
import validation from '../middlewares/validation.middleware.js';
import * as schemaPost from '../schemas/app.post.schema.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';

const debug = Debug('WeekAway:router:userHasEvent');

const userHasEventRouter = Router();

userHasEventRouter.post(
  '/api/userhasevent',
  validation(schemaPost.userHasEventSchema, 'body'),
  controllerWrapper(userHasEventController.deleteUserFromEvent),
);
/**
 * POST /api/userhasevent
 * @summary delete user from event
 * @tags UserHasEvents
 * @param {UserHasEvent} request.body.required
 * @return {UserHasEvent} 200 - UserHasEvent object
 * @return {Error}  default - Unexpected error
 * @return {Error}  400 - Bad request
 * @return {Error}  404 - UserHasEvent not found
 * @return {Error}  500 - Internal server error
 */

export default userHasEventRouter;