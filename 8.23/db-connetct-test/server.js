const http = require("http");
const url = require("url");

const start = (route, handle) => {
  const onRequest = (request, response) => {
    const pathName = url.parse(request.url).pathname;
    route(pathName, handle, response);
  };

  http.createServer(onRequest).listen(8888);
};

exports.start = start;
