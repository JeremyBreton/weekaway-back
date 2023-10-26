import client from './client.js';

export default {
  async getAllEventDates() {
    const result = await client.query('SELECT * FROM "event_date"');
    return result.rows;
  },

  async getEventDateById(id) {
    const result = await client.query(
      'SELECT * FROM "event_date" WHERE id = $1',
      [id],
    );
    return result.rows[0];
  },

  async deleteEventDateById(id) {
    const result = await client.query(
      'DELETE FROM "event_date" WHERE id = $1',
      [id],
    );
    return result.rows[0];
  },

  async createEventDate(data) {
    const result = await client.query(
      'INSERT INTO "eventdate" (event_id, start_date, end_date) VALUES ($1, $2, $3) RETURNING *',
      [data.event_id, data.start_date, data.end_date],
    );
    return result.rows[0];
  },

  async updateEventDateById(id, data) {
    const result = await client.query(
      'UPDATE "event_date" SET event_id = $1, start_date = $2, end_date = $3 WHERE id = $5 RETURNING *',
      [
        data.event_id,
        data.start_date,
        data.end_date,
        id,
      ],
    );
    return result.rows[0];
  },

  async getEventDateWithEvent(id) {
    const result = await client.query(
      `SELECT * FROM "event_date" 
        INNER JOIN event ON event_date.event_id = event.id  
        WHERE event_date.id = $1`,
      [id],
    );
    return result.rows;
  },

  async getEventDateWithEventAndUserChoices(id) {
    const result = await client.query(
      `SELECT * FROM "event_date" 
        INNER JOIN event ON event_date.event_id = event.id
        INNER JOIN user_has_event_date ON event_date.id = user_has_event_date.event_date_id
        INNER JOIN "user" ON user_has_event_date.user_id = "user".id
        WHERE event_date.id = $1`,
      [id],
    );
    return result.rows;
  },
};
