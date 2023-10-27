import dataMapper from '../models/userHasEvent.dataMapper.js';

export default {
  async deleteUserFromEvent(req, res) {
    const { userId, eventId } = req.body;
    const userHasEvent = await dataMapper.deleteUserFromEvent(userId, eventId);
    console.log(userHasEvent);
    if (!userHasEvent) {
      res.status(404).json('User not found');
      return;
    }
    res.json('Deletion ok');
  },
};
