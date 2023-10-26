import crypto from 'crypto';
import datamapper from '../models/event.dataMapper.js';


// Generate a random validation code
function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

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
    const password = makeid(5);
    const {
      name, ownerId, status, description, picture, linkProject,
    } = req.body;
    const data = {
      name, ownerId, status, description, picture, password, linkProject,
    };
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
};
