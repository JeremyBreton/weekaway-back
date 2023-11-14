import Debug from 'debug';

import logger from '../helpers/logger.js';

const debug = Debug('WeekAway:middlewares:error');

export default (err, req, res, next) => {
  switch (err.name) {
    case 'NotFoundError':
      res.status(404).json({ error: err.message });
      break;

    case 'ValidationError':
      res.status(400).json({ error: err.message });
      break;

    case 'error':
    default:

      logger.error('', err);
      res.status(500).json({ error: 'Internal Server Error' });
      break;
  }
};
