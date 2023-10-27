import datamapper from '../models/theme.dataMapper.js';
/**
   * @typedef {object} Theme
   * @property {string} name
   * @property {integer} theme_id
  */

export default {
  async findAllTheme(req, res) {
    const themes = await datamapper.getAllTheme();
    res.json(themes);
  },

  async findThemeById(req, res) {
    const { id } = req.params;
    const theme = await datamapper.getThemeById(id);
    res.json(theme);
  },

  async createTheme(req, res) {
    const { name } = req.body;
    const data = { name };
    const theme = await datamapper.createTheme(data);
    res.json(theme);
  },

  async updateTheme(req, res) {
    const { name } = req.body;
    const data = { name };
    const { id } = req.params;
    const theme = await datamapper.updateTheme(id, data);
    res.json(theme);
  },

  async deleteTheme(req, res) {
    const { id } = req.params;
    const theme = await datamapper.deleteTheme(id);
    res.json(theme);
  },
};
