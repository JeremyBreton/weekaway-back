/* eslint-disable max-len */
import client from './client.js';

export default {
  async findAllEvents() {
    const results = await client.query('SELECT * FROM event');
    return results.rows;
  },

  async findEventById(id) {
    const result = await client.query(
      'SELECT * FROM event WHERE id=$1',
      [id],
    );
    return result.rows[0];
  },

  async createEvent(data) {
    const query = `
    INSERT INTO event (name, owner_id, status, description, picture, link_project, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const values = [
      data.name,
      data.owner_id,
      data.status,
      data.description,
      data.picture,
      data.link_project,
      data.password,
    ];
    const result = await client.query(query, values);
    return result.rows[0];
  },

  async updateEvent(id, data) {
    const query = `
    UPDATE event SET name=$1, owner_id=$2, status=$3, description=$4, picture=$5, link_project=$6 WHERE id=$7 RETURNING *`;
    const values = [
      data.name,
      data.owner_id,
      data.status,
      data.description,
      data.picture,
      data.link_project,
      id];
    const result = await client.query(query, values);
    return result.rows[0];
  },

  async deleteEvent(id) {
    const result = await client.query('DELETE FROM event WHERE id=$1', [id]);
    return result.rows[0];
  },
};
