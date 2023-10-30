import client from './client.js';

export default {
  async getAllEventDates() {
    const result = await client.query('SELECT * FROM "eventdate"');
    return result.rows;
  },

  async getEventDateById(id) {
    const result = await client.query(
      'SELECT * FROM "eventdate" WHERE id = $1',
      [id],
    );
    return result.rows[0];
  },

  async getEventDateByeventId(eventId) {
    const result = await client.query(
      'SELECT * FROM "eventdate" WHERE event_id = $1',
      [eventId],
    );
    return result.rows;
  },

  async deleteEventDateById(id) {
    const result = await client.query(
      'DELETE FROM "eventdate" WHERE id = $1',
      [id],
    );
    return result.rows[0];
  },

  async createEventDate(id, datesOfEvent) {
    const insertPromises = Object.values(datesOfEvent).map((date) => client.query(
      'INSERT INTO "eventdate" (event_id, start_date, end_date) VALUES ($1, $2, $3) RETURNING *',
      [id, date.start_date, date.end_date],
    ));
    const results = await Promise.all(insertPromises);

    return results.map((result) => result.rows[0]);
  },

  async updateEventDateById(id, data) {
    const result = await client.query(
      'UPDATE "eventdate" SET event_id = $1, start_date = $2, end_date = $3 WHERE id = $4 RETURNING *',
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
      `SELECT * FROM "eventdate" 
        INNER JOIN event ON eventdate.event_id = event.id  
        WHERE eventdate.id = $1`,
      [id],
    );
    return result.rows;
  },
};
