import userDataMapper from '../models/user.dataMapper.js';
import eventDatamapper from '../models/event.dataMapper.js';
import mailService from '../services/mailer/inviteLink.mailer.js';
import userHasEventDataMapper from '../models/userHasEvent.dataMapper.js';

/**
   * @typedef {object} createEventLink
   * @property {integer} eventId
   * @property {string} email
  */

/**
   * @typedef {object} joinEvent
   * @property {string} password
   * @property {string} email
  */

export default {

  async createInviteLink(req, res) {
    const { email, eventId } = req.body;
    const userExist = await userDataMapper.getUserByEmail(email);
    const event = await eventDatamapper.findEventById(eventId);
    const eventOwner = await userDataMapper.getUserById(event.owner_id);

    const ownerInfos = { firstname: eventOwner.firstname, lastname: eventOwner.lastname };

    if (userExist) {
      mailService.sendMail(ownerInfos, event, email);
      res.json({ message: 'User existant Mail envoyé !' });
    } else {
      mailService.sendMail(ownerInfos, event, email);
      res.json({ message: 'User non existant, mail de registration envoyé !' });
    }
  },

  async joinEvent(req, res) {
    const { password, email } = req.body;
    const user = await userDataMapper.getUserByEmail(email);
    const event = await eventDatamapper.findEventByPassword(password);
    const userIsInEvent = await userHasEventDataMapper.verifyUserInEvent(user?.id, event?.id);

    if (!event || !user) {
      return res.json({ message: 'Mot de passe incorrect ou evènement non existant ou utilisateur non identifié / inexistant' });
    } if (!userIsInEvent) {
      const userHasEvent = await userHasEventDataMapper.addUserToEvent(user.id, event.id);
      return res.json({ message: `${user.firstname} ${user.lastname} ajouté à l'évènement ${event.name}` });
    }

    return res.json({ message: 'Utilisateur fait déjà partie de l\'event !' });
  },
};
