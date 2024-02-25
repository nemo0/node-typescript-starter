import * as winston from "winston";
import morgan from "morgan";

const logConfiguration = {
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: winston.format.json(),
    }),
    new winston.transports.File({
      filename: "logs/info.log",
      level: "info",
      format: winston.format.json(),
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
      format: winston.format.json(),
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
};

const logger = winston.createLogger(logConfiguration);

const stream = {
  write: (message: string) => {
    // Use the 'info' level so HTTP logs will go into 'info.log' and 'combined.log'
    logger.info(message.trim());
  },
};

// Morgan configuration
const morganMiddleware = morgan(
  ":method :url :status :response-time ms - :res[content-length]",
  { stream }
);

// Export the logger
export { logger, morganMiddleware };
