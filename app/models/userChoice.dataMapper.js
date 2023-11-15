import Debug from 'debug';
import client from './client.js';
import coreDataMapper from './datamapper.js';

const debug = Debug('WeekAway:models:userChoiceDataMapper');

export default class UserChoiceDataMapper extends coreDataMapper {
  static tableName = 'userchoice';

  constructor() {
    super();
    debug('userChoiceDataMapper constructor');
  }

  // Ordering by timestamptz
  async getUserChoiceByUserId(id) {
    const result = await client.query(`SELECT * FROM "${this.constructor.tableName}" WHERE user_id = $1 ORDER BY start_date_choice ASC`, [id]);
    return result.rows;
  }

  async updateUserChoice(id, data) {
    const result = await client.query(
      `UPDATE "${this.constructor.tableName}" SET start_date_choice = $1, end_date_choice = $2 WHERE user_id = $3 RETURNING *`,
      [
        data.startDate,
        data.endDate,
        id,
      ],
    );
    return result.rows[0];
  }

  // Ordering by timestamptz
  async getUserChoiceByEventId(id) {
    const result = await client.query(`SELECT * FROM "${this.constructor.tableName}" WHERE event_id = $1 ORDER BY start_date_choice ASC`, [id]);
    return result.rows;
  }

  async deleteChoiceByUserId(id) {
    const result = await client.query(`DELETE FROM "${this.constructor.tableName}" WHERE user_id = $1`, [id]);
    return result.rows[0];
  }

  async addUserChoice(data) {
    const query = `INSERT INTO ${this.constructor.tableName} (start_date_choice, end_date_choice, event_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [
      data.startDate,
      data.endDate,
      data.eventId,
      data.userId,
    ];
    const result = await client.query(query, values);
    return result.rows[0];
  }
}
