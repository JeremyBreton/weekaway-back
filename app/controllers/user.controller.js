import bcrypt from 'bcrypt';
import userDataMapper from '../models/user.dataMapper.js';

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
    const users = await userDataMapper.getAllUsers();
    res.json(users);
  },

  async getUserById(req, res) {
    const { id } = req.params;
    const user = await userDataMapper.getUserById(id);
    res.json(user);
  },

  async getUserByEmail(req, res) {
    const { email } = req.params;
    const user = await userDataMapper.getUserByEmail(email);
    res.json(user);
  },

  async deleteUserById(req, res) {
    const { id } = req.params;
    const user = await userDataMapper.deleteUserById(id);
    res.json(user);
  },

  async updateUserById(req, res) {
    const { id } = req.params;
    const data = req.body;
    const baseData = await userDataMapper.getUserById(id);

    const dataToUpdate = [
      'email',
      'password',
      'address',
      'birth_date',
      'firstname',
      'lastname',
      'gender',
      'profile_picture',
      'profile_desc',
    ];

    dataToUpdate.forEach((element) => {
      if (!data[element]) {
        data[element] = baseData[element];
      }
    });

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await userDataMapper.updateUserById(id, data);
    res.json('l\'utilisateur a bien été modifié');
  },

  async getUserWithEvents(req, res) {
    const { id } = req.params;
    const user = await userDataMapper.getUserWithEvents(id);
    res.json(user);
  },

  async getUserWithEventsAndUserChoices(req, res) {
    const { id } = req.params;
    const user = await userDataMapper.getUserWithEventsAndUserChoices(id);
    res.json(user);
  },
};
