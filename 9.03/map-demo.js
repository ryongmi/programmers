const express = require("express");
const app = express();
app.listen(1234);

app.get("/:id", (req, res) => {
  let { id } = req.params;

  id = parseInt(id);

  if (db.get(id) == undefined) {
    res.json({ message: "없는 상품입니다." });
  } else {
    product = db.get(id);
    product["id"] = id;
    // product.id = id;

    res.send(product);
  }
});

let db = new Map();

let notebook = {
  productName: "Notebook",
  price: 20000,
};

let cup = {
  productName: "Cup",
  price: 10000,
};

let chair = {
  productName: "Chair",
  price: 25000,
};

let poster = {
  productName: "{Poster}",
  price: 5000,
};

db.set(1, notebook); // 키로 값을 찾을 수 있는 한 쌍을 저장
db.set(2, cup);
db.set(3, chair);
db.set(4, poster);
// 그리고 찍어보기!!
console.log(db);
console.log(db.get(1));
console.log(db.get(2));
console.log(db.get(3));
console.log(db.get(4));
