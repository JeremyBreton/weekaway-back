import { Router } from 'express';
import themeController from '../controllers/theme.controller.js';
import validation from '../middlewares/validation.middleware.js';
import * as schemaPost from '../schemas/app.post.schema.js';
import schemaGet from '../schemas/app.get.schema.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';

const themeRouter = Router();

/**
 * @swagger
 * /api/theme:
 *   post:
 *     summary: Create a new theme
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/themeSchema'
 *     responses:
 *       200:
 *         description: Theme created successfully

 *   get:
 *     summary: Get all themes
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         description: Optional theme ID for filtering
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of all themes
 */
themeRouter.route('/api/theme')
  .post(
    validation(schemaPost.themeSchema, 'body'),
    controllerWrapper(themeController.createTheme),

  )
  .get(
    validation(schemaGet, 'query'),
    controllerWrapper(themeController.findAllTheme),
  );

/**
 * @swagger
 * /api/theme/{id}:
 *   get:
 *     summary: Get a theme by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: Theme ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Theme details

 *   patch:
 *     summary: Update a theme by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: Theme ID
 *         schema:
 *           type: string
 *       - in: body
 *         name: theme
 *         description: Theme data to update
 *         schema:
 *           $ref: '#/components/schemas/themeSchema'
 *     responses:
 *       200:
 *         description: Theme updated

 *   delete:
 *     summary: Delete a theme by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: Theme ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Theme deleted
 */
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
