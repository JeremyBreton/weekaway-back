import Debug from 'debug';
import { Router } from 'express';
import controllerWrapper from '../middlewares/controller.wrapper.js';
import eventLinkController from '../controllers/eventLink.controller.js';

const debug = Debug('WeekAway:router:eventLink');

const eventLinkRouter = Router();

eventLinkRouter.route('/api/invitelink')
  .post(
    controllerWrapper(eventLinkController.createInviteLink),

  );
/**
   * POST /api/inviteLink
   * @summary Send an event invite link to a user
   * @tags EventInvitation
   * @param {createEventLink} request.body.required - event infos
   * - Email = the email of the user to invite

   */

eventLinkRouter.route('/api/joinEvent')
  .post(
    controllerWrapper(eventLinkController.joinEvent),

  );

/**
   * POST /api/joinEvent
   * @summary Join an event with a password
   * @tags EventInvitation
   * @param {joinEvent} request.body.required - event infos
   * - Email = the email of the user to add into the event

   */

export default eventLinkRouter;
