import http from "node:http";
import { router } from "./src/router.js";

const server = http.createServer((req, res) => {
  router(req, res);
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running on port ${PORT}`);
});

export default server;
