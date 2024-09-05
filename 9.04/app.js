const express = require("express");
const app = express();
const port = 1234;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/test", (req, res) => {
  console.log(req.body.message);
  res.send("");
});

app.get("/yout", (req, res) => {
  res.json({ message: "test" });
});

app.get("/youtuber/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const youtuber = db.get(id);
  if (youtuber == undefined) {
    res.json({ message: "유튜버 정보를 찾을 수 없습니다." });
  } else {
    res.json(youtuber);
  }
});

app.post("/youtuber", (req, res) => {
  db.set(id++, req.body);

  res.json({
    message: `${db.get(4).channelTitle}님, 유튜버 생활을 응원합니다`,
  });
});

const db = new Map();
let id = 1;

const youtuber1 = {
  channelTitle: "십오야",
  sub: "593만명",
  videoNum: "993개",
};

const youtuber2 = {
  channelTitle: "침착맨",
  sub: "227만명",
  videoNum: "6.6천개",
};

const youtuber3 = {
  channelTitle: "테오",
  sub: "53.8만명",
  videoNum: "726개",
};

db.set(id++, youtuber1); // 키로 값을 찾을 수 있는 한 쌍을 저장
db.set(id++, youtuber2);
db.set(id++, youtuber3);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
