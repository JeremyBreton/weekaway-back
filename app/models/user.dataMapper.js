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

  async deleteUserById(id) {
    const result = await client.query('DELETE FROM "user" WHERE id = $1', [
      id,
    ]);
    return result.rows[0];
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
      `SELECT * FROM "user" 
      INNER JOIN user_has_event ON "user".id = user_has_event.user_id
      INNER JOIN event ON user_has_event.event_id = event.id  
      WHERE "user".id = $1`,
      [id],
    );
    return result.rows;
  },

  async getUserWithEventsAndUserChoices(id) {
    const result = await client.query(
      `SELECT * FROM "user" 
        INNER JOIN user_has_event ON "user".id = user_has_event.user_id 
        INNER JOIN event ON user_has_event.event_id = event.id
        INNER JOIN userchoice ON event.id = userchoice.event_id
      WHERE "user".id = $1`,
      [id],
    );
    return result.rows;
  },
};
