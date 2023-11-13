import EventDateDataMapper from '../models/eventDate.dataMapper.js';

const datamapper = new EventDateDataMapper();
/**
   * @typedef {object} EventDate
   * @property {integer} event_id
   * @property {timestamp} start_date
   * @property {timestamp} end_date

  */

export default {
  async getAllEventDates(req, res) {
    const eventDates = await datamapper.findAll();
    res.json(eventDates);
  },

  async getEventDateById(req, res) {
    const { id } = req.params;
    const eventDate = await datamapper.findById(id);
    res.json(eventDate);
  },

  async getEventDateByeventId(req, res) {
    const { eventId } = req.params;
    const eventDate = await datamapper.getEventDateByeventId(eventId);
    res.json(eventDate);
  },

  async deleteEventDateById(req, res) {
    const { id } = req.params;
    const eventDate = await datamapper.deleteById(id);
    res.json(eventDate);
  },

  async createEventDate(req, res) {
    const data = req.body;
    const eventDate = await datamapper.createEventDate(data);
    res.json(eventDate);
  },

  async updateEventDateById(req, res) {
    const { id } = req.params;
    const data = req.body;
    const baseData = await datamapper.findById(id);
    const dataToUpdate = [
      'event_id',
      'start_date',
      'end_date',
    ];

    dataToUpdate.forEach((element) => {
      if (!data[element]) {
        data[element] = baseData[element];
      }
    });

    const eventDate = await datamapper.updateEventDateById(id, data);
    res.json(eventDate);
  },

  async getEventDateWithEvent(req, res) {
    const { id } = req.params;
    const eventDate = await datamapper.getEventDateWithEvent(id);
    res.json(eventDate);
  },
};
