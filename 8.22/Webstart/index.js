const server = require("./server");
const router = require("./router");
const requestHandler = require("./requestHandler");

server.start(router.route, requestHandler.handle);
