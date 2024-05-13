import morgan from "morgan";
import logger from "./winston.logger.js";

// Define the custom format to be used by morgan
const stream = {
    // Use the http severity
    write: (message) => logger.http(message.trim()),
  };
  
  // Skip all the Morgan http log if the application is not running in development mode.
  const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
  };
  
  // Build the morgan middleware
  const morganMiddleware = morgan(
    ":remote-addr :method :url :status - :response-time ms",
    { stream, skip }
  );
  
  export default morganMiddleware;