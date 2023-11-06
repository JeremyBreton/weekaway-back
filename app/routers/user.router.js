import { Router } from 'express';
import upload from '../services/multer.js';
import userController from '../controllers/user.controller.js';
import validation from '../middlewares/validation.middleware.js';
import * as schemaPatch from '../schemas/app.patch.schema.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';

const userRouter = Router();

userRouter.get('/api/users', controllerWrapper(userController.getAllUsers));
/**
   * GET /api/users
   * @summary Get all users
   * @tags User
 */

userRouter
  .route('/api/user/:id')
// ! TODO : Faire schema pour les .get
  .get(controllerWrapper(userController.getUserById))
  /**
   * GET /api/user/:id
   * @summary Get user by id
   * @tags User
 */
// ! TODO : Faire schema pour les .patch (remettre les schema post dans un doc patch)
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
  .delete(controllerWrapper(userController.deleteUserById));
/**
   * DELETE /api/user/:id
   * @summary Delete user by id
   * @tags User

   */

userRouter
  .route('/api/user/:id/events')
// ! TODO : Faire schema pour les .get
  .get(controllerWrapper(userController.getUserWithEvents));

/**
   * GET /api/users/:id/events
   * @summary Get user by id with his events
   * @tags User
 */

userRouter
  .route('/api/user/:id/events/choices')
// ! TODO : Faire schema pour les .get
  .get(controllerWrapper(userController.getUserWithEventsAndUserChoices));
/**
   * GET /api/users/:id/choices
   * @summary Get user by id with his events and choices
   * @tags User
 */

export default userRouter;
