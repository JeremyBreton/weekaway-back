import Debug from 'debug';
import { Router } from 'express';
import userChoiceController from '../controllers/userChoice.controller.js';
import validation from '../middlewares/validation.middleware.js';
import * as schemaPost from '../schemas/app.post.schema.js';
import * as schemaPatch from '../schemas/app.patch.schema.js';
import schemaGet from '../schemas/app.get.schema.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';

const debug = Debug('WeekAway:router:userChoice');

const userChoiceRouter = Router();

userChoiceRouter.route('/api/userchoice')
  .post(
    validation(schemaPost.userChoiceSchema, 'body'),
    controllerWrapper(userChoiceController.addUserChoice),

  )
/**
   * POST /api/userchoice/
   * @summary add an userchoice
   * @tags UserChoices
   * @param {UserChoice} request.body.required
   *
   */
  .get(
    controllerWrapper(userChoiceController.getAllUsersChoices),
  );
/**
   * GET /api/userchoice
   * @summary Get all users choices
   * @tags UserChoices
 */

userChoiceRouter.route('/api/userchoice/event/:id')
  .get(
    validation(schemaGet, 'query'),
    controllerWrapper(userChoiceController.getUserChoiceByEventId),
  );
/**
   * GET /api/userchoice/event/:id
   * @summary Get all users choices by event id
   * @tags UserChoices
 */

userChoiceRouter.route('/api/userchoice/:id')
  .get(
    validation(schemaGet, 'query'),
    controllerWrapper(userChoiceController.getUserChoiceByUserId),
  )
/**
   * GET /api/userchoice/:id
   * @summary Get user choice by user id
   * @tags UserChoices
 */
  .patch(
    validation(schemaPatch.userChoiceSchema, 'body'),
    controllerWrapper(userChoiceController.updateUserChoice),
  )
/**
   * PATCH /api/userchoice/:id
   * @summary modify a user choice by user id
   * @tags UserChoices
   * @param {UserChoice} request.body.required
   *

   */
  .delete(
    validation(schemaGet, 'query'),
    controllerWrapper(userChoiceController.deleteChoiceByUserId),
  );
/**
   * DELETE /api/userchoice/:id
   * @summary delete user choice by user id
   * @tags UserChoices
   * @param {UserId} request.params.required
 */

export default userChoiceRouter;
