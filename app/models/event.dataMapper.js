/* eslint-disable max-len */
import client from './client.js';

export default {
  async findAllEvents() {
    const results = await client.query('SELECT * FROM event');
    return results.rows;
  },

  async findEventById(id) {
    const eventDetails = await client.query('SELECT * FROM event WHERE id=$1', [id]);

    const eventDates = await client.query('SELECT * FROM eventdate WHERE event_id=$1', [id]);

    const usersJoined = await client.query(`
        SELECT "user".* 
        FROM "user"
        JOIN user_has_event ON "user".id = user_has_event.user_id
        WHERE user_has_event.event_id=$1
    `, [id]);

    const usersWithChoices = await Promise.all(usersJoined.rows.map(async (user) => {
      const userChoices = await client.query(`
            SELECT start_date_choice, end_date_choice
            FROM userchoice 
            WHERE user_id=$1 AND event_id=$2
        `, [user.id, id]);

      return {
        ...user,
        choices: userChoices.rows,
      };
    }));

    return {
      event: eventDetails.rows[0],
      dates: eventDates.rows,
      users: usersWithChoices,
    };
  },

  async createEvent(data) {
    const query = `
    INSERT INTO event (name, owner_id, status, description, picture, link_project, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const values = [
      data.name,
      data.ownerId,
      data.status,
      data.description,
      data.picture,
      data.linkProject,
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
      data.ownerId,
      data.status,
      data.description,
      data.picture,
      data.linkProject,
      id];
    const result = await client.query(query, values);
    return result.rows[0];
  },

  async deleteEvent(id) {
    const result = await client.query('DELETE FROM event WHERE id=$1', [id]);
    return result.rows[0];
  },

  async findEventByPassword(password) {
    const result = await client.query(
      'SELECT * FROM event WHERE password=$1',
      [password],
    );
    return result.rows[0];
  }
};
