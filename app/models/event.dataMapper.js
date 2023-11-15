import Debug from 'debug';
import client from './client.js';
import CoreDataMapper from './datamapper.js';

const debug = Debug('WeekAway:models:eventDataMapper');

export default class EventDataMapper extends CoreDataMapper {
  static tableName = 'event';

  static deleteEventFunction = 'delete_event_on_cascade';

  constructor() {
    super();
    debug('EventDataMapper constructor');
  }

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
    FROM "${this.constructor.tableName}"
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
          "userchoice".event_id,
          "userchoice".start_date_choice,
          "userchoice".end_date_choice
        FROM "userchoice"
      ) AS user_choices ON "user".id = user_choices.user_id
      WHERE user_choices.event_id = $1
      GROUP BY "user".id, user_information
    ) AS user_data ON TRUE
    WHERE "event".id = $1
    GROUP BY "event".id;
      `, [id]);
    return result.rows[0];
  }

  async createEvent(data) {
    const query = `
    INSERT INTO ${this.constructor.tableName} (name, owner_id,theme, status, description, picture, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const values = [
      data.name,
      data.owner_id,
      data.theme,
      data.status,
      data.description,
      data.picture,
      data.password,
    ];
    const result = await client.query(query, values);
    return result.rows[0];
  }

  async updateEvent(id, data) {
    const query = `
    UPDATE ${this.constructor.tableName} SET name=$1, owner_id=$2, status=$3, description=$4, picture=$5, theme=$6 WHERE id=$7 RETURNING *`;
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
  }

  async deleteEvent(id) {
    const query = `SELECT * FROM ${this.constructor.deleteEventFunction}($1)`;
    const values = [
      id];
    const result = await client.query(query, values);
    return result.rowCount;
  }

  async findEventByPassword(password) {
    const result = await client.query(
      `SELECT * FROM ${this.constructor.tableName} WHERE password=$1`,
      [password],
    );
    return result.rows[0];
  }

  async modifyEventPicture(id, picture) {
    const result = await client.query(
      `UPDATE ${this.constructor.tableName} SET picture=$1 WHERE id=$2 RETURNING *`,
      [picture, id],
    );
    return result.rows[0];
  }

  // Useful in EventLinkController, to send mail to user, gather infos about event and owner
  async findEventWithOwnerInfos(eventId) {
    const result = await client.query(
      `SELECT "event".*, "user".firstname, "user".lastname FROM ${this.constructor.tableName} JOIN "user" ON "event".owner_id = "user".id WHERE "event".id = $1;`,
      [eventId],
    );
    return result.rows[0];
  }
}
