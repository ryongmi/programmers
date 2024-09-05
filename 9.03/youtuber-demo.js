const express = require("express");
const app = express();

app.listen(1234);

app.get("/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const youtuber = db.get(id);
  if (youtuber == undefined) {
    res.json({ message: "유튜버 정보를 찾을 수 없습니다." });
  } else {
    res.json(youtuber);
  }
});

const db = new Map();

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

db.set(1, youtuber1); // 키로 값을 찾을 수 있는 한 쌍을 저장
db.set(2, youtuber2);
db.set(3, youtuber3);
