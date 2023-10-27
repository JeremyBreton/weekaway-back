import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import validation from '../middlewares/validation.middleware.js';
import * as schemaPost from '../schemas/app.post.schema.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';

const authRouter = Router();

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Authenticate a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/loginSchema'
 *     responses:
 *       200:
 *         description: User authenticated successfully
 */
authRouter.post(
  '/api/login',
  validation(schemaPost.loginSchema, 'body'),
  controllerWrapper(authController.login),

);

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/registerSchema'
 *     responses:
 *       200:
 *         description: User registered successfully
 */
authRouter.post(
  '/api/register',
  validation(schemaPost.registerSchema, 'body'),
  controllerWrapper(authController.register),
);

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Logout the currently authenticated user
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
authRouter.route('/api/logout');

export default authRouter;
