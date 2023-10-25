import client from './client.js';

export default {
  async getAllTheme() {
    const result = await client.query('SELECT * FROM theme');
    return result.rows;
  },

  async getThemeById(id) {
    const result = await client.query('SELECT * FROM theme WHERE id = $1', [id]);
    return result.rows[0];
  },

  async createTheme(data) {
    const query = 'INSERT INTO theme (name) VALUES ($1) RETURNING *';
    const values = [data.name];
    const result = await client.query(query, values);
    return result.rows[0];
  },

  async updateTheme(id, data) {
    const query = 'UPDATE theme SET name=$1 WHERE id=$2 RETURNING *';
    const values = [data.name, id];
    const result = await client.query(query, values);
    return result.rows[0];
  },

  async deleteTheme(id) {
    const result = await client.query('DELETE FROM theme WHERE id=$1', [id]);
    return result.rows[0];
  },
};
