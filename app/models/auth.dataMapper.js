import client from './client.js';

export default {

  //! INSCRIPTION
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

  //! TROUVER TOUS LES UTILISATEURS
  async findAllUsers() {
    const results = await client.query('SELECT * FROM "user"');
    return results.rows;
  },

  //! TROUVER PAR EMAIL
  async findUserByEmail(email) {
    const results = await client.query('SELECT * FROM "user" WHERE email = $1', [email]);
    return results.rows[0];
  },

  //! TROUVER PAR ID
  async findUserById(id) {
    const results = await client.query('SELECT * FROM "user" WHERE id = $1', [id]);
    return results.rows[0];
  },
};
