import userDataMapper from '../models/user.dataMapper.js';
import eventDatamapper from '../models/event.dataMapper.js';
import mailService from '../services/mailer/inviteLink.mailer.js';
import userHasEventDataMapper from '../models/userHasEvent.dataMapper.js';

/**
   * @typedef {object} createEventLink
   * @property {integer} eventId
   * @property {integer} id
  */

/**
   * @typedef {object} joinEvent
   * @property {string} password
   * @property {integer} id
  */

export default {

  async createInviteLink(req, res) {
    const { email, eventId } = req.body;
    const userExist = await userDataMapper.getUserByEmail(email);
    const event = await eventDatamapper.findEventWithOwnerInfos(eventId);
    console.log(event);
    const ownerInfos = { firstname: event.firstname, lastname: event.lastname };

    if (userExist) {
      mailService.sendMail(ownerInfos, event, email);
      res.json({ message: 'User existant Mail envoyé !' });
    } else {
      mailService.sendMail(ownerInfos, event, email);
      res.json({ message: 'User non existant, mail de registration envoyé !' });
    }
  },

  async joinEvent(req, res) {
    const { password, id } = req.body;
    const user = await userDataMapper.getUserById(id);
    const event = await eventDatamapper.findEventByPassword(password);
    const userIsInEvent = await userHasEventDataMapper.verifyUserInEvent(user?.id, event?.id);

    if (!event || !user) {
      return res.json({ message: 'Mot de passe incorrect ou evènement non existant ou utilisateur non identifié / inexistant' });
    } if (!userIsInEvent) {
      await userHasEventDataMapper.addUserToEvent(user.id, event.id);
      return res.json({ eventId: event.id, message: `${user.firstname} ${user.lastname} ajouté à l'évènement ${event.name}` });
    }

    return res.json({ message: 'Utilisateur déjà dans l\'évènement' });
  },
};
