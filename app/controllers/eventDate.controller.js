import eventDateDataMapper from '../models/eventDate.dataMapper.js';

export default {
  async getAllEventDates(req, res) {
    const eventDates = await eventDateDataMapper.getAllEventDates();
    res.json(eventDates);
  },

  async getEventDateById(req, res) {
    const { id } = req.params;
    const eventDate = await eventDateDataMapper.getEventDateById(id);
    res.json(eventDate);
  },

  async deleteEventDateById(req, res) {
    const { id } = req.params;
    const eventDate = await eventDateDataMapper.deleteEventDateById(id);
    res.json(eventDate);
  },

  async createEventDate(req, res) {
    const data = req.body;
    const eventDate = await eventDateDataMapper.createEventDate(data);
    res.json(eventDate);
  },

  async updateEventDateById(req, res) {
    const { id } = req.params;
    const data = req.body;
    const baseData = await eventDateDataMapper.getEventDateById(id);

    const dataToUpdate = [
      'event_id',
      'date',
      'participants',
      'description',
    ];

    dataToUpdate.forEach((element) => {
      if (!data[element]) {
        data[element] = baseData[element];
      }
    });

    const eventDate = await eventDateDataMapper.updateEventDateById(id, data);
    res.json(eventDate);
  },

  async getEventDateWithEvent(req, res) {
    const { id } = req.params;
    const eventDate = await eventDateDataMapper.getEventDateWithEvent(id);
    res.json(eventDate);
  },

  async getEventDateWithEventAndUserChoices(req, res) {
    const { id } = req.params;
    const eventDate = await eventDateDataMapper.getEventDateWithEventAndUserChoices(
      id,
    );
    res.json(eventDate);
  },
};
