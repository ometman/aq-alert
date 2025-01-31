const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const helmet = require('helmet');
// const errorHandler = require('./middleware/errorHandler');
const winston = require('winston');

const PORT = 3000;

// Initialize Express app
const app = express();

// Configure Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  });
  
  // Create a stream for morgan to use Winston
  const morganStream = {
    write: (message) => logger.info(message.trim()),
  };  

//middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
    origin: process.env.FRONT_URL = `http//localhost:${PORT}`,
    credentials: true,
}));
app.use(helmet());
app.use(morgan('combined', { stream: morganStream })); // Log HTTP requests

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
// limiter
app.use(limiter);

// Error handling middleware
// app.use(errorHandler);

module.exports = app;



