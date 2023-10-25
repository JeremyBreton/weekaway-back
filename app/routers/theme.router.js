import { Router } from 'express';
import themeController from '../controllers/theme.controller.js';
import validation from '../middlewares/validation.middleware.js';
import * as schemaPost from '../schemas/app.post.schema.js';
import schemaGet from '../schemas/app.get.schema.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';

const themeRouter = Router();

themeRouter.route('/api/theme')
// theme
  .post(
    validation(schemaPost.themeSchema, 'body'),
    controllerWrapper(themeController.createTheme),

  )
  .get(
    validation(schemaGet, 'query'),
    controllerWrapper(themeController.findAllTheme),
  );

themeRouter.route('/api/theme/:id')
// theme par id
  .get(

    validation(schemaGet, 'query'),

    controllerWrapper(themeController.findThemeById),
  )

  .patch(
    validation(schemaPost.themeSchema, 'body'),

    controllerWrapper(themeController.updateTheme),
  )
  .delete(
    controllerWrapper(themeController.deleteTheme),

  );

export default themeRouter;
