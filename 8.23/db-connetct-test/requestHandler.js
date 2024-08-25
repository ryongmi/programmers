const mariadb = require("./database/connect/mariadb");

const main = (response) => {
  console.log("main");

  mariadb.query("SELECT * FROM product", (err, rows) => {
    console.log(rows);
  });

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write("Main page");
  response.end();
};

const login = (response) => {
  console.log("login");

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write("Login page");
  response.end();
};

const handle = {};
handle["/"] = main;
handle["/login"] = login;

exports.handle = handle;
