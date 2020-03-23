const { env } = process;
const config = require("./dist/config").default;

module.exports = {
  [env.NODE_ENV || "development"]: config.db
};
