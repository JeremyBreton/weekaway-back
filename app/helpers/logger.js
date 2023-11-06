import winston from 'winston';

const {
  combine,
  json,
  timestamp,
  colorize,
  printf,
} = winston.format;

const logger = winston.createLogger({
  level: 'http',
  //! Be careful, the method order is important, final formal must be the last provided

  // (json, simple…)
  format: combine(
    timestamp(),
    json(),
  ),
  defaultMeta: { service: 'cadex' },
  transports: [
    new winston.transports.File({
//dont forget to add repertoy in .gitignore
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      level: 'http',
    }),
  ],
});

const consoleErrorFormat = printf(({
  // eslint-disable-next-line no-shadow
  level, timestamp, name, stack,
}) => `[${timestamp}] ${level}(${name}) - ${stack}`);

const consoleHttpFormat = printf(({
  // eslint-disable-next-line no-shadow
  level, timestamp, message, method, ip, os,
}) => `[${timestamp}] ${level} - ${ip} ${os} ${method} ${message}`);

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    level: 'error',
    format: combine(
      colorize({ all: true }),
      timestamp({ format: 'YYYY-MM-DD HH:ss' }),
      consoleErrorFormat,
    ),
  }));
  logger.add(new winston.transports.Console({
    level: 'http',
    format: combine(
      colorize({ all: true }),
      timestamp({ format: 'YYYY-MM-DD HH:ss' }),
      consoleHttpFormat,
    ),
  }));
}

export default logger;
