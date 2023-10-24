/* eslint-disable linebreak-style */
import client from './client.js';

export default {

  //! INSCRIPTION
  async registerUser(user) {
    const query = `
            INSERT INTO users(firstname,lastname,email,address,password,birth_date,gender,profile_picture,profile_desc)
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING *;
        `;
    const values = [
      user.firstname,
      user.lastname,
      user.email,
      user.address,
      user.password,
      user.birth_date,
      user.gender,
      user.profile_picture,
      user.profile_desc,
    ];
    const results = await client.query(query, values);
    return results.rows[0];
  },

  //! TROUVER TOUS LES UTILISATEURS

  findAllUsers: async () => {
    try {
      const results = await client.query('SELECT * FROM users');
      return results.rows;
    } catch (error) {
      throw new Error(
        `Erreur lors de la récupération des utilisateurs : ${error}`,
      );
    }
  },

  //! TROUVER PAR EMAIL

  findUserByEmail: async (email) => {
    const results = await client.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    return results.rows[0];
  },

  //! TROUVER PAR ID

  findUserById: async (id) => {
    const results = await client.query('SELECT * FROM users WHERE id = $1', [
      id,
    ]);
    return results.rows[0];
  },

};
