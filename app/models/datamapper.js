import client from './client.js';

export default class coreDataMapper {
  async findAll() {
    const dataSource = this.constructor.tableName;
    const preparedQuery = {
      text: `SELECT * FROM "${dataSource}"`,
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  }
}
