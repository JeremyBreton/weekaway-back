import datamapper from '../models/userChoice.dataMapper.js';

/**
   * @typedef {object} UserChoice
   * @property {string} startDate
   * @property {string} endDate
   * @property {string} eventId
   * @property {string} userId
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
    const {
      startDate,
      endDate,
      eventId,
      userId,
    } = req.body;
    const data = {
      startDate,
      endDate,
      eventId,
      userId,
    };
    const userChoice = await datamapper.addUserChoice(data);
    res.json(userChoice);
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
