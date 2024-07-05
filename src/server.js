const { createServer } = require("http");

const app = require("./app");
const { APP_CONFIG } = require("./config");

const port = APP_CONFIG.PORT;
const server = createServer(app);

server.listen(port, () => {
  console.log(`Server is and running at ${port} 🚀`);
});
