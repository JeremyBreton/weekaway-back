import datamapper from '../models/event.dataMapper.js';

export default {
  async findAllEvents(req, res) {
    const events = await datamapper.findAllEvents();
    res.json(events);
  },

  async findEventById(req, res) {
    const { id } = req.params;
    const event = await datamapper.findEventById(id);
    res.json(event);
  },
  async createEvent(req, res) {
    const {
      name, owner_id, status, description, picture, password,
    } = req.body;
    const data = {
      name, owner_id, status, description, picture, password,
    };
    const event = await datamapper.createEvent(data);
    res.json(event);
  },

  async updateEvent(req, res) {
    const {
      name, owner_id, status, description, picture,
    } = req.body;
    const data = {
      name, owner_id, status, description, picture,
    };
    const { id } = req.params;
    const event = await datamapper.updateEvent(id, data);
    res.json(event);
  },

  async deleteEvent(req, res) {
    const { id } = req.params;
    const event = await datamapper.deleteEvent(id);
    res.json(event);
  },
};
