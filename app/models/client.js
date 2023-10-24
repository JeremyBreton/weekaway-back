import pg from 'pg';

const { Pool } = pg;

const client = new Pool({
  connectionString: process.env.DATABASE_URL
});

export default client;
