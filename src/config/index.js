require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
const { str, port, host, cleanEnv } = require("envalid");

exports.APP_CONFIG = cleanEnv(process.env, {
  DB_NAME: str({ desc: "Name of the database to be used" }),
  DB_HOST: host({ devDefault: "127.0.0.1", desc: "Database Host" }),
  DB_PORT: port({ devDefault: 5984, desc: "Database Port" }),
  DB_USER: str({ desc: "Database Username" }),
  DB_PASSWORD: str({ desc: "Database Password" }),
  PORT: port({ devDefault: 8081, desc: "Application Port for listening requests." }),
});
