import { Router } from 'express';
import themeController from '../controllers/theme.controller.js';
import validation from '../middlewares/validation.middleware.js';
import * as schemaPost from '../schemas/app.post.schema.js';
import schemaGet from '../schemas/app.get.schema.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';

const themeRouter = Router();

themeRouter.route('/api/theme')
  .post(
    validation(schemaPost.themeSchema, 'body'),
    controllerWrapper(themeController.createTheme),
  )
  /**
   * POST /api/theme
   * @summary add a theme
   * @tags Theme
   * @param {Theme} request.body.required
   *
   */
// ! TODO : Faire schema pour les .get
  .get(
    validation(schemaGet, 'query'),
    controllerWrapper(themeController.findAllTheme),
  );
/**
   * GET /api/theme
   * @summary Get all themes
   * @tags Theme
 */

themeRouter.route('/api/theme/:id')
// ! TODO : Faire schema pour les .get
  .get(

    validation(schemaGet, 'query'),

    controllerWrapper(themeController.findThemeById),
  )
/**
   * GET /api/theme/:id
   * @summary Get a theme by his id
   * @tags Theme
 */
// ! TODO : Faire schema pour les .patch (remettre les schema post dans un doc patch)
  .patch(
    validation(schemaPost.themeSchema, 'body'),

    controllerWrapper(themeController.updateTheme),
  )
/**
   * PATCH /api/theme/:id
   * @summary modify a theme
   * @tags Theme
   * @param {Theme} request.body.required
   *

   */
  .delete(
    controllerWrapper(themeController.deleteTheme),

  );
/**
   * DELETE /api/theme/:id
   * @summary Delete theme by id
   * @tags Theme

   */

export default themeRouter;
