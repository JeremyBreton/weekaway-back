import datamapper from '../models/userChoice.dataMapper.js';
import userChoiceVerify from '../services/userChoiceVerify.service.js';

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
    const hasVoted = userChoiceVerify.removeDuplicateDatesForEvent(data, userChoiceData);

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