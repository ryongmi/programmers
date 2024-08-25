const route = (pathName, handle, response, productId) => {
  console.log("pathName", pathName);

  if (typeof handle[pathName] === "function") {
    handle[pathName](response, productId);
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("Page not found");
    response.end();
  }
};

exports.route = route;
