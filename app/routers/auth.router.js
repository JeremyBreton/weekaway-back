import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import validation from '../middlewares/validation.middleware.js';
import * as schemaPost from '../schemas/app.post.schema.js';
import schemaGet from '../schemas/app.get.schema.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';

const authRouter = Router();

// 2. Récupération d'un utilisateur par ID - GET `/api/user/:id` (Backend).
// 3. Mise à jour des informations d'un utilisateur - PATCH `/api/user/:id` (Backend).
// 4. Suppression d'un utilisateur - DELETE `/api/user/:id` (Backend).
// 5. Récupération de la liste de tous les utilisateurs - GET `/api/users` (Backend).

authRouter.post(
  '/api/login',
  validation(schemaPost.loginSchema, 'body'),
  controllerWrapper(authController.login),

);
authRouter.post(
  '/api/register',
  validation(schemaPost.registerSchema, 'body'),
  controllerWrapper(authController.register),
);

authRouter.route('/api/logout');

export default authRouter;
