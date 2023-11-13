import client from './client.js';
import CoreDataMapper from './datamapper.js';

export default class EventDateDataMapper extends CoreDataMapper {
  static tableName = 'eventdate';

  constructor() {
    super();
    console.log('eventDateDataMapper constructor');
  }

  async getEventDateByeventId(eventId) {
    const result = await client.query(
      `SELECT * FROM "${this.constructor.tableName}" WHERE event_id = $1`,
      [eventId],
    );
    return result.rows;
  }

  async createEventDateWithMultipleEvent(eventId, datesOfEvent) {
    const insertPromises = Object.values(datesOfEvent).map((date) => client.query(
      `INSERT INTO "${this.constructor.tableName}" (event_id, start_date, end_date) VALUES ($1, $2, $3) RETURNING *`,
      [eventId, date.start_date, date.end_date],
    ));

    const results = await Promise.all(insertPromises);

    return results.map((result) => result.rows[0]);
  }

  async createEventDate(data) {
    const result = await client.query(
      `INSERT INTO "${this.constructor.tableName}" (event_id, start_date, end_date) VALUES ($1, $2, $3) RETURNING *`,
      [data.id, data.start_date, data.end_date],
    );
    return result.rows[0];
  }

  async updateEventDateById(id, data) {
    const result = await client.query(
      `UPDATE "${this.constructor.tableName}" SET event_id = $1, start_date = $2, end_date = $3 WHERE id = $4 RETURNING *`,
      [
        data.event_id,
        data.start_date,
        data.end_date,
        id,
      ],
    );
    return result.rows[0];
  }

  async getEventDateWithEvent(id) {
    const result = await client.query(
      `SELECT * FROM "${this.constructor.tableName}" 
        JOIN event ON eventdate.event_id = event.id  
        WHERE eventdate.id = $1`,
      [id],
    );
    return result.rows;
  }
}
