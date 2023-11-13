import bcrypt from 'bcrypt';
import UserDataMapper from '../models/user.dataMapper.js';

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
      'password',
      'address',
      'birth_date',
      'firstname',
      'lastname',
      'gender',
      'profile_picture',
      'profile_desc',
    ];

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    if (!req.file) {
      data.profile_picture = 'http://caca-boudin.fr/static/profilDefault.png';
    } else if (req.file) {
      data.profile_picture = `http://caca-boudin.fr/static/${req.file.filename}`;
    }

    dataToUpdateName.forEach((element) => {
      if (!data[element]) {
        data[element] = baseData[element];
      }
    });

    await datamapper.updateUserById(id, data);

    res.json('l\'utilisateur a bien été modifié');
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
