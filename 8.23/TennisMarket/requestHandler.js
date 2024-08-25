const fs = require("fs");
const main_view = fs.readFileSync("./main.html");
const orderlist_view = fs.readFileSync("./orderlist.html");

const mariadb = require("./database/connect/mariadb");

const main = (response) => {
  console.log("main");

  mariadb.query("SELECT * FROM product", (err, rows) => {
    console.log(rows);
  });

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(main_view);
  response.end();
};

const redRacket = (response) => {
  console.log("redRacket");
  fs.readFile("./img/redRacket.png", (err, data) => {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
};

const blueRacket = (response) => {
  console.log("blueRacket");
  fs.readFile("./img/blueRacket.png", (err, data) => {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
};

const blackRacket = (response) => {
  console.log("blackRacket");
  fs.readFile("./img/blackRacket.png", (err, data) => {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
};

const order = (response, productId) => {
  response.writeHead(200, { "Content-Type": "text/html" });

  mariadb.query(
    "INSERT INTO orderlist VALUES (" +
      productId +
      ", '" +
      new Date().toLocaleDateString() +
      "');",
    (err, rows) => {
      console.log(rows);
    }
  );

  response.write(
    "Thank you for your order! <br> you can check the result on the order list page."
  );
  response.end();
};

const orderlist = (response) => {
  console.log("orderlist");

  response.writeHead(200, { "Content-Type": "text/html" });

  mariadb.query("SELECT * FROM orderlist", (err, rows) => {
    response.write(orderlist_view);

    rows.forEach((element) => {
      response.write(
        "<tr>" +
          "<td>" +
          element.product_id +
          "</td>" +
          "<td>" +
          element.order_date +
          "</td>" +
          "</tr>"
      );
    });

    response.write("</table>");
    response.end();
  });
};

const handle = {};
handle["/"] = main;
handle["/order"] = order;
handle["/orderlist"] = orderlist;

handle["/img/redRacket.png"] = redRacket;
handle["/img/blueRacket.png"] = blueRacket;
handle["/img/blackRacket.png"] = blackRacket;

exports.handle = handle;
