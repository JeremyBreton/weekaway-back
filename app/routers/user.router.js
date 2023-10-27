import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import validation from '../middlewares/validation.middleware.js';
import * as schemaPost from '../schemas/app.post.schema.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';

const userRouter = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of all users
 */
userRouter.get('/api/users', controllerWrapper(userController.getAllUsers));

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *   patch:
 *     summary: Update a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *       - in: body
 *         name: user
 *         description: User data to update
 *         schema:
 *           $ref: '#/schemas/app.post.schema/UserGestionSchema'
 *     responses:
 *       200:
 *         description: User updated
 *   delete:
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 */
userRouter
  .route('/api/user/:id')
  .get(controllerWrapper(userController.getUserById))
  .patch(
    validation(schemaPost.UserGestionSchema, 'body'),
    controllerWrapper(userController.updateUserById),
  )
  .delete(controllerWrapper(userController.deleteUserById));

/**
 * @swagger
 * /api/user/{id}/events}:
 *  get:
 *    summary: Get all events by user ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: User ID
 *    responses:
 *      200:
 *        description: List of one User and all his events
*/
userRouter
  .route('/api/user/:id/events')
  .get(controllerWrapper(userController.getUserWithEvents));

/**
 * @swagger
 * /api/user/{id}/events/choices:
 *  get:
 *   summary: Get all events and user choices by user ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: User ID
 *    responses:
 *       200:
 *        description: List of all events and user choices
 */
userRouter
  .route('/api/user/:id/events/choices')
  .get(controllerWrapper(userController.getUserWithEventsAndUserChoices));

export default userRouter;
