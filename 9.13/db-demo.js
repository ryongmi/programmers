const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Youtube",
  dateStrings: true,
});

conn.query("SELECT * FROM users", (err, result, fields) => {
  const { id, email, name, created_at } = result[0];

  console.log(id);
  console.log(email);
  console.log(name);
  console.log(created_at);
});
