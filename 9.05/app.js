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

app.get("/youtubers", (req, res) => {
  const youtubers = {};
  db.forEach((value, key) => {
    youtubers[key] = value;
  });

  res.json(youtubers);
});

app.get("/youtubers/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const youtuber = db.get(id);
  if (youtuber == undefined) {
    res.json({ message: "유튜버 정보를 찾을 수 없습니다." });
  } else {
    res.json(youtuber);
  }
});

app.post("/youtubers", (req, res) => {
  db.set(id++, req.body);

  res.json({
    message: `${db.get(id - 1).channelTitle}님, 유튜버 생활을 응원합니다`,
  });
});

app.delete("/youtubers/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const youtuber = db.get(id);

  if (youtuber == undefined) {
    res.json({ message: `요청하신 ${id}번은 없는 유튜버입니다.` });
  } else {
    const { channelTitle } = youtuber;

    db.delete(id);

    res.json({
      message: `${channelTitle}님, 아쉽지만 우리 인연은 여기까지 인가요`,
    });
  }
});

app.delete("/youtubers", (req, res) => {
  let message = "";
  if (db.size > 0) {
    db.clear();
    message = "전체 유튜버가 삭제되었습니다.";
  } else {
    message = "삭제할 유튜버가 없습니다.";
  }
  res.json({ message });
});

app.put("/youtubers/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const youtuber = db.get(id);

  if (youtuber == undefined) {
    res.json({ message: `요청하신 ${id}번은 없는 유튜버입니다.` });
  } else {
    const newTitle = req.body.channelTitle;
    const oldTitle = youtuber.channelTitle;

    youtuber.channelTitle = newTitle;
    db.set(id, youtuber);

    res.json({
      message: `${oldTitle}님, 채널명이 ${newTitle}로 수정되었습니다.`,
    });
  }
});

///////

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
