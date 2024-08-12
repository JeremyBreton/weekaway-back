import Debug from 'debug';
import bcrypt from 'bcrypt';
import UserDataMapper from '../models/user.dataMapper.js';

const debug = Debug('WeekAway:Controller:userController');
const datamapper = new UserDataMapper();

/**
   * @typedef {object} data
   * @property {string} email
   * @property {string} password
   * @property {string} address
   * @property {timestamptz} birth_date
   * @property {string} firstname
   * @property {string} lastname
   * @property {string} gender
   * @property {string} profile_picture
   * @property {string} profile_desc
  */
export default {
  async getAllUsers(req, res) {
    const users = await datamapper.findAll();
    res.json(users);
  },

  async getUserById(req, res) {
    const { id } = req.params;
    const user = await datamapper.findById(id);
    res.json(user);
  },

  async getUserByEmail(req, res) {
    const { email } = req.params;
    const user = await datamapper.findByEmail(email);
    res.json(user);
  },

  async deleteUserById(req, res) {
    const { id } = req.params;
    const user = await datamapper.deleteUserById(id);
    res.json(user);
  },

  async updateUserById(req, res) {
    const { id } = req.params;
    const data = req.body;
    const baseData = await datamapper.findById(id);

    const dataToUpdateName = [
      'email',
      'newPassword',
      'address',
      'birth_date',
      'firstname',
      'lastname',
      'gender',
      'profile_picture',
      'profile_desc',
    ];

    if (data.newPassword) {
      const isMatch = bcrypt.compareSync(data.password, baseData.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Oups, il y a une erreur !' });
      }
      data.newPassword = bcrypt.hashSync(data.newPassword, 10);
      delete data.password;
    }

    if (!req.file) {
      data.profile_picture = 'http://localhost:3000/static/profilDefault.png';
    } else if (req.file) {
      data.profile_picture = `http://localhost:3000/static/${req.file.filename}`;
    }

    dataToUpdateName.forEach((element) => {
      if (!data[element]) {
        data[element] = baseData[element];
      }
    });

    if (data.newPassword === undefined || data.newPassword === null) {
      data.newPassword = baseData.password;
    }
    debug(data);
    await datamapper.updateUserById(id, data);

    return res.json('l\'utilisateur a bien été modifié');
  },

  async getUserWithEvents(req, res) {
    const { id } = req.params;
    const user = await datamapper.getUserWithEvents(id);
    res.json(user);
  },

  async getUserWithEventsAndUserChoices(req, res) {
    const { id } = req.params;
    const user = await datamapper.getUserWithEventsAndUserChoices(id);
    res.json(user);
  },
};
