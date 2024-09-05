const express = require("express");
const app = express();
app.listen(1234);

app.get("/:id", (req, res) => {
  let { id } = req.params;

  console.log(id);

  id = parseInt(id);

  if (db.get(id) == undefined) {
    res.json({ message: "없는 상품입니다." });
  } else {
    res.send({ id, productName: db.get(id) });
  }
});

const db = new Map();
db.set(1, "NoteBook");
db.set(2, "Cup");
db.set(3, "Chair");
db.set("1", "Kim");

console.log(db);
console.log(db.get(1));
console.log(db.get("1"));
// console.log(db.get(2));
// console.log(db.get(3));
