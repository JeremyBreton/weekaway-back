import userDataMapper from '../models/user.dataMapper.js';
import eventDatamapper from '../models/event.dataMapper.js';
import mailService from '../services/mailer/inviteLink.mailer.js';

export default {

  async createInviteLink(req, res) {
    const { email, password, eventId } = req.body;
    const userExist = await userDataMapper.getUserByEmail(email);
    const event = await eventDatamapper.findEventById(eventId);
    const eventOwner = await userDataMapper.getUserById(event.owner_id);

    const ownerInfos = { firstname: eventOwner.firstname, lastname: eventOwner.lastname };

    if (userExist) {
      mailService.sendMail(ownerInfos, event, password, email);
      res.json({ message: 'User existant Mail envoyé !' });
    } else {
      mailService.sendMail(ownerInfos, event, password, email);
      res.json({ message: 'User non existant, mail de registration envoyé !' });
    }
  },
};
