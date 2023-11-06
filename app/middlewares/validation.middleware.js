export default (schema, dataSource) => async (req, res, next) => {
  try {
    await schema.validateAsync(req[dataSource]);
    next();
  } catch (err) {
    next(err);
  }
};
