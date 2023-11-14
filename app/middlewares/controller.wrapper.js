import Debug from 'debug';

const debug = Debug('WeekAway:middlewares:TryCatch');

export default (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (err) {
    next(err);
  }
};
