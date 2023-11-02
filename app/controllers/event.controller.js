import datamapper from '../models/event.dataMapper.js';
import randomId from '../services/randomId.service.js';
import userHasEventDataMapper from '../models/userHasEvent.dataMapper.js';
import dateVerify from '../services/dateVerify.service.js';
import eventDateDataMapper from '../models/eventDate.dataMapper.js';

/**
   * @typedef {object} EventInput
   * @property {string} name
   * @property {integer} ownerId
   * @property {boolean} status
   * @property {string} description
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
    const password = randomId.makeId(5);
    const data = req.body;
    let eventDates = null;
    if (data.datesOfEvent !== undefined && data.datesOfEvent !== null) {
      eventDates = data.datesOfEvent;
    }
    if (data.startDate && data.endDate) {
      eventDates = {
        start_date: data.startDate,
        end_date: data.endDate,
      };
    }

    const dataEvent = {
      name: data.name,
      theme: data.theme,
      ownerId: data.ownerId,
      status: data.status,
      description: data.description,
      picture: data.picture,
      password,
    };

    // If someone upload a picture, we add the path to the data
    if (!req.file) {
      dataEvent.picture = 'http://caca-boudin.fr/static/default.png';
    } else if (req.file) {
      dataEvent.picture = `http://caca-boudin.fr/static/${req.file.filename}`;
    }

    const event = await datamapper.createEvent(dataEvent);
    if (eventDates !== undefined && eventDates !== null) {
      if (eventDates.date === undefined && eventDates.date === null) {
        const eventDateNoDuplicate = dateVerify.removeDuplicateDates(eventDates);
        await eventDateDataMapper.createEventDateWithMultipleEvent(event.id, eventDateNoDuplicate);
      } else {
        await eventDateDataMapper.createEventDate(event.id, eventDates);
      }
    }
    await userHasEventDataMapper.addUserToEvent(dataEvent.ownerId, event.id);
    res.json(event);
  },

  async updateEvent(req, res) {
    const { id } = req.params;
    const data = req.body;
    const baseData = await datamapper.findEventById(id);

    const dataToUpdate = [
      'name', 'owner_id', 'status', 'description', 'picture', 'theme',
    ];
    console.log(baseData);
    dataToUpdate.forEach((element) => {
      if (!data[element]) {
        data[element] = baseData[element];
      }
    });
    const event = await datamapper.updateEvent(id, data);
    res.json(event);
  },

  // ! TODO : delete eventDate when delete event
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
