import datamapper from '../models/event.dataMapper.js';
import randomId from '../services/randomId.services.js';

/**
   * @typedef {object} EventInput
   * @property {string} name
   * @property {integer} ownerId
   * @property {boolean} status
   * @property {string} description
   * @property {string} linkProject
  */

export default {
  async findAllEvents(req, res) {
    const events = await datamapper.findAllEvents();
    res.json(events);
  },

  async findEventById(req, res) {
    const { id } = req.params;
    const eventDetails = await datamapper.findEventById(id);
    res.json(eventDetails);
  },

  async createEvent(req, res) {
    const path = `http://caca-boudin.fr/static/${req.file.filename}`;
    const password = randomId.makeId(5);
    const {
      name, ownerId, status, description, picture, linkProject,
    } = req.body;
    const data = {
      name, ownerId, status, description, picture, password, linkProject,
    };
    data.picture = path;
    const event = await datamapper.createEvent(data);
    res.json(event);
  },

  async updateEvent(req, res) {
    const {
      name, ownerId, status, description, picture,
    } = req.body;
    const data = {
      name, ownerId, status, description, picture,
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

  async findEventByPassword(req, res) {
    const { password } = req.body;
    const event = await datamapper.findEventByPassword(password);
    res.json(event);
  },
};
