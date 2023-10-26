import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import validation from '../middlewares/validation.middleware.js';
import * as schemaPost from '../schemas/app.post.schema.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';

const userRouter = Router();

userRouter.get('/api/users', controllerWrapper(userController.getAllUsers));

userRouter
  .route('/api/user/:id')
  .get(controllerWrapper(userController.getUserById))
  .patch(
    validation(schemaPost.UserGestionSchema, 'body'),
    controllerWrapper(userController.updateUserById),
  )
  .delete(controllerWrapper(userController.deleteUserByEmail));

export default userRouter;
