import { Router } from 'express';

import validation from '../middlewares/validation.middleware.js';
import * as schemaPost from '../schemas/app.post.schema.js';
import schemaGet from '../schemas/app.get.schema.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';
import eventLinkController from '../controllers/eventLink.controller.js';

const eventLinkRouter = Router();

eventLinkRouter.route('/api/invitelink')
  .post(
    controllerWrapper(eventLinkController.createInviteLink),

  );

export default eventLinkRouter;
