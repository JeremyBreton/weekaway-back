import userDataMapper from '../models/user.dataMapper.js';
import dataMapper from '../models/userHasEvent.dataMapper.js';

/**
   * @typedef {object} data
   * @property {integer} event_id
   * @property {integer} user_id
  */
export default {
  async deleteUserFromEvent(req, res) {
    const data = req.body;
    const userExists = await userDataMapper.getUserWithEvents(data.user_id);
    if (userExists.length === 0) {
      return res.status(404).json('User not found');
    }
    const userInEvent = userExists.events.find((element) => element.event_id === data.eventId);
    if (!userInEvent) {
      return res.status(404).json('User not found in this event');
    }

    await dataMapper.deleteUserFromEvent(data.user_id, data.event_id);

    return res.json('Deletion ok');
  },
};
