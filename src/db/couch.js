const Nano = require("nano");

const { APP_CONFIG } = require("../config");

module.exports = (async () => {
  const dbName = APP_CONFIG.DB_NAME;
  const nano = Nano(
    `http://${APP_CONFIG.DB_USER}:${APP_CONFIG.DB_PASSWORD}@${APP_CONFIG.DB_HOST}:${APP_CONFIG.DB_PORT}`
  );

  const dbList = await nano.db.list();

  try {
    if (!dbList.includes(dbName)) {
      await nano.db.create(dbName);
    }

    const db = nano.use(dbName);
    console.log("Database connected successfully");
    return db;
  } catch (error) {
    throw new Error(error);
  }
})();
