const log4js = require("log4js");

import config from "../config";

const logger = log4js.getLogger();
logger.level = config.logLevel;

export default logger;
