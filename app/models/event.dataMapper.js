/* eslint-disable max-len */
import client from './client.js';

export default {
  async findAllEvents() {
    const results = await client.query('SELECT * FROM event');
    return results.rows;
  },

  async findEventById(id) {
    const result = await client.query(`SELECT
      "event".id AS id,
      "event".name AS name,
      "event".owner_id AS owner_id,
      "event".status AS status,
      "event".description AS description,
      "event".picture AS picture,
      "event".theme AS theme,
      "event".password AS password,
      JSONB_AGG(DISTINCT event_dates) AS dates_of_event,
      JSONB_AGG(DISTINCT user_data) AS users
    FROM "event"
    LEFT JOIN (
      SELECT
        "event".id AS event_id,
        JSONB_BUILD_OBJECT(
          'start_date', "eventdate".start_date,
          'end_date', "eventdate".end_date
        ) AS event_dates
      FROM "event"
      JOIN "eventdate" ON "event".id = "eventdate".event_id
      WHERE "event".id = $1
    ) AS event_dates ON "event".id = event_dates.event_id
    LEFT JOIN (
      SELECT
      "user".id AS user_id,
      user_information,
        JSONB_AGG(DISTINCT user_choices) AS user_choices
      FROM ( 
        SELECT 
          "user".id,
          JSONB_BUILD_OBJECT(
          'user_firstname', "user".firstname,
          'user_lastname', "user".lastname, 
          'profile_picture', "user".profile_picture 
          ) AS user_information
          FROM "user"
      ) AS user_info
      JOIN "user" ON user_info.id = "user".id
      JOIN "user_has_event" ON "user".id = "user_has_event".user_id
      LEFT JOIN (
        SELECT
          "userchoice".id,
          "userchoice".user_id,
          "userchoice".start_date_choice,
          "userchoice".end_date_choice
        FROM "userchoice"
      ) AS user_choices ON "user".id = user_choices.user_id
      WHERE "user_has_event".event_id = $1
      GROUP BY "user".id, user_information
    ) AS user_data ON TRUE
    WHERE "event".id = $1
    GROUP BY "event".id;
      `, [id]);
    return result.rows[0];
  },

  async createEvent(data) {
    const query = `
    INSERT INTO event (name, owner_id,theme, status, description, picture, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const values = [
      data.name,
      data.ownerId,
      data.theme,
      data.status,
      data.description,
      data.picture,
      data.password,
    ];
    const result = await client.query(query, values);
    return result.rows[0];
  },

  async updateEvent(id, data) {
    const query = `
    UPDATE event SET name=$1, owner_id=$2, status=$3, description=$4, picture=$5, theme=$6 WHERE id=$7 RETURNING *`;
    const values = [
      data.name,
      data.owner_id,
      data.status,
      data.description,
      data.picture,
      data.theme,
      id];
    const result = await client.query(query, values);
    return result.rows[0];
  },

  // ! Voir pour optimiser la suppression et avoir qu'un seule appel a la BDD : CF createEventDate
  async deleteEvent(id) {
    await client.query('BEGIN');

    try {
      await client.query('DELETE FROM user_has_event WHERE event_id=$1', [id]);
      await client.query('DELETE FROM userchoice WHERE event_id=$1', [id]);
      await client.query('DELETE FROM eventdate WHERE event_id=$1', [id]);
      await client.query('DELETE FROM theme WHERE event_id=$1', [id]);
      const result = await client.query('DELETE FROM event WHERE id=$1', [id]);

      await client.query('COMMIT');
      return result.rowCount;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    }
  },

  async findEventByPassword(password) {
    const result = await client.query(
      'SELECT * FROM event WHERE password=$1',
      [password],
    );
    return result.rows[0];
  },

  async modifyEventPicture(id, picture) {
    const result = await client.query(
      'UPDATE event SET picture=$1 WHERE id=$2 RETURNING *',
      [picture, id],
    );
    return result.rows[0];
  },

  // Useful in EventLinkController, to send mail to user, gather infos about event and owner
  async findEventWithOwnerInfos(eventId) {
    const result = await client.query(
      'SELECT "event".*, "user".* FROM event JOIN "user" ON "event".owner_id = "user".id WHERE "event".id = $1;',
      [eventId],
    );
    return result.rows[0];
  },
};
