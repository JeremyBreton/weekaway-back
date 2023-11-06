import client from './client.js';

export default {

  async registerUser(user) {
    const query = `
      INSERT INTO "user"(firstname,lastname,email,password)
      VALUES($1,$2,$3,$4)
      RETURNING *;
    `;
    const values = [
      user.firstname,
      user.lastname,
      user.email,
      user.password,
    ];
    const results = await client.query(query, values);
    return results.rows[0];
  },
};
