const http = require("http");
const url = require("url");

const start = (route, handle) => {
  const onRequest = (request, response) => {
    const pathName = url.parse(request.url).pathname;
    const query = url.parse(request.url, true).query;

    route(pathName, handle, response, query.productId);
  };

  http.createServer(onRequest).listen(8888);
};

exports.start = start;
