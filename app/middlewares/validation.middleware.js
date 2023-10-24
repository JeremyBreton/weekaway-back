/*
In this schema : schemaGet ou schemaPost
in dataSource : 'query' ou 'body'
*/

// 
export default (schema, dataSource) => async (req, res, next) => {
  try {
    // req['query'] ou req['body']
    // same as à req.query ou req.body
    await schema.validateAsync(req[dataSource]);
    next();
  } catch (err) {
    next(err);
  }
};
