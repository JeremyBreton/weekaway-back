import Debug from 'debug';
import client from './client.js';

const debug = Debug('WeekAway:models:UserHasEventDataMapper');

export default class UserHasEventDataMapper {
  static tableName = 'user_has_event';

  constructor() {
    debug('UserHasEventDataMapper constructor');
  }

  async addUserToEvent(userId, eventId) {
    const query = `INSERT INTO ${this.constructor.tableName} (user_id, event_id) VALUES ($1, $2) RETURNING *`;
    const values = [userId, eventId];
    const result = await client.query(query, values);
    return result.rows[0];
  }

  async verifyUserInEvent(userId, eventId) {
    const result = await client.query(`SELECT * FROM ${this.constructor.tableName} WHERE user_id = $1 AND event_id = $2`, [userId, eventId]);
    return result.rows[0];
  }

  async deleteUserFromEvent(userId, eventId) {
    const result = await client.query(`DELETE FROM ${this.constructor.tableName} WHERE user_id = $1 AND event_id = $2`, [userId, eventId]);
    return result.rows[0];
  }
}
