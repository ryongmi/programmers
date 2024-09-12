const express = require("express");
const app = express();
app.use(express.json());
app.listen(7777);

const db = new Map();
let id = 1;

app
  .route("/channels")
  .get((req, res) => {
    if (db.size === 0) {
      res.status(404).json({ message: "조회할 채널이 없습니다" });
    }

    const channels = [];
    db.forEach((value, key) => {
      channels.push(value);
    });

    res.status(200).json(channels);
  })
  .post((req, res) => {
    if (!req.body?.channelTitle) {
      res.status(400).json({ message: "요청 값을 제대로 보내주세요." });
    }

    db.set(id++, req.body);

    res
      .status(201)
      .json({ message: `${req.body.channelTitle}님 채널을 응원합니다` });
  });

app
  .route("/channels/:id")
  .get((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    const channel = db.get(id);

    if (!channel) {
      res.status(400).json({ message: "채널 정보를 찾을 수 없습니다" });
    }

    res.status(200).json(channel);
  })
  .put((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    const channel = db.get(id);
    const oldTitle = channel.channelTitle;

    if (!channel) {
      res.status(400).json({ message: "채널 정보를 찾을 수 없습니다" });
    }

    const newTitle = req.body.channelTitle;
    channel.channelTitle = newTitle;
    db.set(id, channel);

    res.status(200).json({
      message: `채널명이 정상적으로 수정되었습니다. 기존 ${oldTitle} -> 수정 ${newTitle}`,
    });
  })
  .delete((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    const channel = db.get(id);

    if (!channel) {
      res.status(400).json({ message: "채널 정보를 찾을 수 없습니다" });
    }

    db.delete(id);
    res
      .status(200)
      .json({ message: `${channel.channelTitle}이 정상적으로 삭제되었습니다` });
  });
