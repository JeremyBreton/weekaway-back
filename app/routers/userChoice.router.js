import { Router } from 'express';
import userChoiceController from '../controllers/userChoice.controller.js';
import validation from '../middlewares/validation.middleware.js';
import * as schemaPost from '../schemas/app.post.schema.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';

const userChoiceRouter = Router();
/**
 * @swagger
 * /api/userchoice:
 *   post:
 *     summary: Create a new user choice
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userChoiceSchema'
 *     responses:
 *       200:
 *         description: User choice created successfully

 *   get:
 *     summary: Get all user choices
 *     responses:
 *       200:
 *         description: List of all user choices
 */
userChoiceRouter.route('/api/userchoice')
  .post(
    validation(schemaPost.userChoiceSchema, 'body'),
    controllerWrapper(userChoiceController.addUserChoice),

  )
  .get(
    controllerWrapper(userChoiceController.getAllUsersChoices),
  );

/**
 * @swagger
 * /api/userchoice/event/{id}:
 *   get:
 *     summary: Get user choices by event ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Event ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user choices for the event
*/
userChoiceRouter.route('/api/userchoice/event/:id')
  .get(
    controllerWrapper(userChoiceController.getUserChoiceByEventId),
  );

/**
 * * @swagger
 * /api/userchoice/{id}:
 *   get:
 *     summary: Get user choices by user ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user choices for the user

 *   patch:
 *     summary: Update a user choice by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User choice ID
 *         schema:
 *           type: string
 *       - in: body
 *         name: userChoice
 *         description: User choice data to update
 *         schema:
 *           $ref: '#/components/schemas/userChoiceSchema'
 *     responses:
 *       200:
 *         description: User choice updated

 *   delete:
 *     summary: Delete a user choice by user ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User choice ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User choice deleted
 */
userChoiceRouter.route('/api/userchoice/:id')
  .get(
    controllerWrapper(userChoiceController.getUserChoiceByUserId),

  )
  .patch(
    validation(schemaPost.userChoiceSchema, 'body'),

    controllerWrapper(userChoiceController.updateUserChoice),
  )
  .delete(
    controllerWrapper(userChoiceController.deleteChoiceByUserId),

  );

export default userChoiceRouter;
