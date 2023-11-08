import datamapper from '../models/userChoice.dataMapper.js';

/**
   * @typedef {object} UserChoice
   * @property {timestamp} startDate
   * @property {timestamp} endDate
   * @property {integer} eventId
   * @property {integer} userId
  */

export default {
  async getAllUsersChoices(req, res) {
    const userChoices = await datamapper.getAllUsersChoices();
    res.json(userChoices);
  },

  async getUserChoiceByUserId(req, res) {
    const { id } = req.params;
    const userChoice = await datamapper.getUserChoiceByUserId(id);
    res.json(userChoice);
  },
  async updateUserChoice(req, res) {
    const { id } = req.params;
    const {
      startDate,
      endDate,
    } = req.body;
    const data = {
      startDate,
      endDate,
    };
    const userChoice = await datamapper.updateUserChoice(id, data);
    res.json(userChoice);
  },

  async addUserChoice(req, res) {
    const data = req.body;
    const userChoiceData = await datamapper.getUserChoiceByUserId(data.userId);

    let hasVoted = false;

    userChoiceData.forEach((element) => {
      if (element.event_id === data.eventId) {
        const elementStartDate = new Date(element.start_date_choice);
        const elementEndDate = new Date(element.end_date_choice);
        const inputStartDate = new Date(data.startDate);
        const inputEndDate = new Date(data.endDate);

        if (
          elementStartDate.getTime() === inputStartDate.getTime()
          && elementEndDate.getTime() === inputEndDate.getTime()) {
          hasVoted = true;
        }
      }
    });

    if (hasVoted) {
      return res.json({ message: 'You have already voted for this date on this event' });
    }

    const userChoice = await datamapper.addUserChoice(data);
    return res.json(userChoice);
  },

  async getUserChoiceByEventId(req, res) {
    const { id } = req.params;
    const userChoice = await datamapper.getUserChoiceByEventId(id);
    res.json(userChoice);
  },

  async deleteChoiceByUserId(req, res) {
    const { id } = req.params;
    const userChoice = await datamapper.deleteChoiceByUserId(id);
    res.json(userChoice);
  },

};
