import { Router } from 'express';
import controllerWrapper from '../middlewares/controller.wrapper.js';
import eventLinkController from '../controllers/eventLink.controller.js';

const eventLinkRouter = Router();

eventLinkRouter.route('/api/invitelink')
  .post(
    controllerWrapper(eventLinkController.createInviteLink),

  );

eventLinkRouter.route('/api/joinevent')
  .post(
    controllerWrapper(eventLinkController.joinEvent),

  );

export default eventLinkRouter;
