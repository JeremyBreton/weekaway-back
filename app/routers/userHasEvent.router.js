import { Router } from 'express';
import userHasEventController from '../controllers/userHasEvent.controller.js';
import validation from '../middlewares/validation.middleware.js';
import * as schemaPost from '../schemas/app.post.schema.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';

const userHasEventRouter = Router();

userHasEventRouter.post(
  '/api/userhasevent',
//   validation(schemaPost.userHasEventSchema, 'body'),
  controllerWrapper(userHasEventController.deleteUserFromEvent),
);

export default userHasEventRouter;
