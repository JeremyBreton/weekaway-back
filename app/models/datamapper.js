import Debug from 'debug';
import client from './client.js';

const debug = Debug('WeekAway:models:dataMapper');

export default class coreDataMapper {
  async findAll() {
    const dataSource = this.constructor.tableName;
    const preparedQuery = {
      text: `SELECT * FROM "${dataSource}"`,
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  }

  async findById(id) {
    const dataSource = this.constructor.tableName;
    const preparedQuery = {
      text: `SELECT * FROM "${dataSource}" WHERE id = $1`,
      values: [id],
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }

  async findByEmail(email) {
    const dataSource = this.constructor.tableName;
    const preparedQuery = {
      text: `SELECT * FROM "${dataSource}" WHERE email = $1`,
      values: [email],
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }

  async deleteById(id) {
    const dataSource = this.constructor.tableName;
    const preparedQuery = {
      text: `DELETE FROM "${dataSource}" WHERE id = $1`,
      values: [id],
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }
}
