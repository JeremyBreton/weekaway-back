import { Router } from 'express';
import userChoiceController from '../controllers/userChoice.controller.js';
import validation from '../middlewares/validation.middleware.js';
import * as schemaPost from '../schemas/app.post.schema.js';
// eslint-disable-next-line no-unused-vars
import schemaGet from '../schemas/app.get.schema.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';

const userChoiceRouter = Router();

userChoiceRouter.route('/api/userchoice')
  .post(
    validation(schemaPost.userChoiceSchema, 'body'),
    controllerWrapper(userChoiceController.addUserChoice),

  )
  .get(
    controllerWrapper(userChoiceController.getAllUsersChoices),
  );

// Obtain user choice by event id
userChoiceRouter.route('/api/userchoice/event/:id')
  .get(
    controllerWrapper(userChoiceController.getUserChoiceByEventId),
  );
// get user choice by user id
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
