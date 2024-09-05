const express = require("express");
const app = express();

// app.get("/test/1", (req, res) => {
//   res.send("One!!");
// });

// app.get("/hello", (req, res) => {
//   res.json({ say: "안녕하세요" });
// });

// app.get("/bye", (req, res) => {
//   res.json({ say: "안녕히 가세요" });
// });

// app.get("/nicetomeetyou", (req, res) => {
//   res.json({ say: "만나서 반갑습니다" });
// });

app.get("/", (req, res) => {
  res.send("Hello World");
});

const nodejsBook = {
  title: "Node.js를 공부해보자",
  price: 20000,
  description: "이 책 좋음",
};

app.get("/products/1", (req, res) => {
  res.json(nodejsBook);
  // res.send(20000);
});

app.listen(3000);
