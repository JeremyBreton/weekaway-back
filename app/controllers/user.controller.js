import bcrypt from 'bcrypt';
import userDataMapper from '../models/user.dataMapper.js';

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
    const { data } = req.body;
    const baseData = await userDataMapper.getUserById(id);
    // ! TODO : Création d'une boucle pour éviter les répétition de if (!data.email) {...}
    if (!data.email) {
      data.email = baseData.email;
    }
    if (!data.password) {
      data.password = baseData.password;
    }
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    if (!data.address) {
      data.address = baseData.address;
    }
    if (!data.birth_date) {
      data.birth_date = baseData.birth_date;
    }
    if (!data.firstname) {
      data.firstname = baseData.firstname;
    }
    if (!data.lastname) {
      data.lastname = baseData.lastname;
    }
    if (!data.gender) {
      data.gender = baseData.gender;
    }
    if (!data.profile_picture) {
      data.profile_picture = baseData.profile_picture;
    }
    if (!data.profile_desc) {
      data.profile_desc = baseData.profile_desc;
    }
    const user = await userDataMapper.updateUserById(id, data);
    res.json('ça a marché mec!');
  },
};
