import client from './client.js';

export default {
  async getAllUsersChoices() {
    const result = await client.query('SELECT * FROM "userchoice"');
    return result.rows;
  },
  // Ordering by timestamp
  async getUserChoiceByUserId(id) {
    const result = await client.query('SELECT * FROM "userchoice" WHERE user_id = $1 ORDER BY start_date_choice ASC', [id]);
    return result.rows;
  },

  async updateUserChoice(id, data) {
    const result = await client.query(
      'UPDATE "userchoice" SET start_date_choice = $1, end_date_choice = $2 WHERE user_id = $3 RETURNING *',
      [
        data.startDate,
        data.endDate,
        id,
      ],
    );
    return result.rows[0];
  },

  // Ordering by timestamp
  async getUserChoiceByEventId(id) {
    const result = await client.query('SELECT * FROM "userchoice" WHERE event_id = $1 ORDER BY start_date_choice ASC', [id]);
    return result.rows;
  },

  async deleteChoiceByUserId(id) {
    const result = await client.query('DELETE FROM "userchoice" WHERE user_id = $1', [id]);
    return result.rows[0];
  },

  async addUserChoice(data) {
    const query = 'INSERT INTO userchoice (start_date_choice, end_date_choice, event_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [
      data.startDate,
      data.endDate,
      data.eventId,
      data.userId,
    ];
    const result = await client.query(query, values);
    return result.rows[0];
  },

};
