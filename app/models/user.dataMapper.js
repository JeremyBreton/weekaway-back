import client from './client.js';

export default {
  async getAllUsers() {
    const result = await client.query('SELECT * FROM "user"');
    return result.rows;
  },

  async getUserById(id) {
    const result = await client.query('SELECT * FROM "user" WHERE id = $1', [
      id,
    ]);
    return result.rows[0];
  },

  async getUserByEmail(email) {
    const result = await client.query('SELECT * FROM "user" WHERE email = $1', [
      email,
    ]);
    return result.rows[0];
  },

  // ! TODO : faire en sorte de faire qu'une seule requete a la BDD
  async deleteUserById(id) {
    const query = 'SELECT * FROM delete_user_on_cascade($1)';
    const values = [
      id];
    const result = await client.query(query, values);
    return result.rowCount;
  },

  async updateUserById(id, data) {
    const result = await client.query(
      'UPDATE "user" SET firstname = $1, lastname = $2, email = $3, address = $4, password = $5, birth_date = $6,gender = $7, profile_picture = $8,profile_desc = $9 WHERE id = $10 RETURNING *',
      [
        data.firstname,
        data.lastname,
        data.email,
        data.address,
        data.password,
        data.birth_date,
        data.gender,
        data.profile_picture,
        data.profile_desc,
        id,
      ],
    );
    return result.rows[0];
  },

  async getUserWithEvents(id) {
    const result = await client.query(
      `SELECT
        "user_has_event".user_id,
        JSONB_AGG(
            JSONB_BUILD_OBJECT(
                'eventId', "user_has_event".event_id,
                'name', "event".name,
                'owner_id', "event".owner_id,
                'status', "event".status,
                'description', "event".description,
                'picture', "event".picture
        ) ORDER BY "user_has_event".event_id
      ) AS events
      FROM
        "user"
      JOIN "user_has_event" ON "user".id = "user_has_event".user_id
      JOIN "event" ON "user_has_event".event_id = "event".id
      WHERE
            "user".id = $1
      GROUP BY
            "user_has_event".user_id;
        `,
      [id],
    );
    return result.rows[0];
  },

  async getUserWithEventsAndUserChoices(id) {
    const result = await client.query(
      `SELECT DISTINCT
          "user".id,
          "user"."firstname",
          "user"."lastname",
          "user"."email",
          "user"."address",
          "user"."birth_date",
          "user"."gender",
          "user"."profile_picture",
          "user"."profile_desc", 
          JSONB_AGG(DISTINCT event_info) AS "event_his_choices"  
          FROM "user" 
        JOIN "user_has_event" ON "user".id = "user_has_event".user_id
        LEFT JOIN (
          SELECT
            "event".id AS event_id,
            "event".name,
            "event".owner_id,
            "event".status,
            "event".description,
            "event".picture,
            JSONB_AGG(DISTINCT user_choices) AS user_choices
          FROM "event"
          LEFT JOIN (
            SELECT
              "userchoice".id,
              "userchoice".event_id AS choice_event_id,
              "userchoice".start_date_choice,
              "userchoice".end_date_choice
                FROM "userchoice"
              ) AS user_choices ON "event".id = user_choices.choice_event_id
              GROUP BY "event".id
        ) AS event_info ON "event_info".event_id = "user_has_event".event_id        
        WHERE "user".id = $1
        GROUP BY "user".id
        `,
      [id],
    );
    return result.rows[0];
  },
};
