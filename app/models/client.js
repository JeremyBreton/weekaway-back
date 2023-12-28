import pg from 'pg';
import Debug from 'debug';

const debug = Debug('louison:database');
const { Pool } = pg;

const client = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default client;

// const { Pool } = pg;

// const client = new Pool();

// client.connect().then(() => {
//   debug('database client connected');
// });

// export default {
//   originalClient: client,
//   async query(...params) { // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Functions/rest_parameters
//     return this.originalClient.query(...params);
//   },
// };
