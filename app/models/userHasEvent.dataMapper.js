import client from './client.js';

export default {
  async addUserToEvent(userId, eventId) {
    const query = 'INSERT INTO user_has_event (user_id, event_id) VALUES ($1, $2) RETURNING *';
    const values = [userId, eventId];
    const result = await client.query(query, values);
    return result.rows[0];

  },

  async verifyUserInEvent(userId, eventId) {
    const result = await client.query('SELECT * FROM user_has_event WHERE user_id = $1 AND event_id = $2', [userId, eventId]);
    return result.rows[0];
  }
};
