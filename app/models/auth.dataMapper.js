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

  findAllUsers: async () => {
    try {
      const results = await client.query('SELECT * FROM "user"');
      return results.rows;
    } catch (error) {
      throw new Error(
        `Erreur lors de la récupération des utilisateurs : ${error}`,
      );
    }
  },

  //! TROUVER PAR EMAIL

  findUserByEmail: async (email) => {
    const results = await client.query('SELECT * FROM "user" WHERE email = $1', [
      email,
    ]);
    return results.rows[0];
  },

  //! TROUVER PAR ID

  findUserById: async (id) => {
    const results = await client.query('SELECT * FROM "user" WHERE id = $1', [
      id,
    ]);
    return results.rows[0];
  },

};
