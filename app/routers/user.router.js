import Debug from 'debug';
import { Router } from 'express';
import upload from '../services/multer.js';
import userController from '../controllers/user.controller.js';
import validation from '../middlewares/validation.middleware.js';
import * as schemaPatch from '../schemas/app.patch.schema.js';
import schemaGet from '../schemas/app.get.schema.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';

const debug = Debug('WeekAway:router:user');

const userRouter = Router();

userRouter.get('/api/users', controllerWrapper(userController.getAllUsers));
/**
   * GET /api/users
   * @summary Get all users
   * @tags User
 */

userRouter
  .route('/api/user/:id')
  .get(
    validation(schemaGet, 'query'),
    controllerWrapper(userController.getUserById),
  )
  /**
   * GET /api/user/:id
   * @summary Get user by id
   * @tags User
 */
  .patch(
    upload.single('profile'),
    validation(schemaPatch.UserGestionSchema, 'body'),
    controllerWrapper(userController.updateUserById),
  )
  /**
   * PATCH /api/user/:id
   * @summary modify a user
   * @tags User
   * @param {UserInput} request.body.required
   *

   */
  .delete(
    validation(schemaGet, 'query'),
    controllerWrapper(userController.deleteUserById),
  );
/**
   * DELETE /api/user/:id
   * @summary Delete user by id
   * @tags User

   */

userRouter
  .route('/api/user/:id/events')
  .get(controllerWrapper(userController.getUserWithEvents));

/**
   * GET /api/users/:id/events
   * @summary Get user by id with his events
   * @tags User
 */

userRouter
  .route('/api/user/:id/events/choices')
  .get(
    validation(schemaGet, 'query'),
    controllerWrapper(userController.getUserWithEventsAndUserChoices),
  );
/**
   * GET /api/users/:id/choices
   * @summary Get user by id with his events and choices
   * @tags User
 */

export default userRouter;
