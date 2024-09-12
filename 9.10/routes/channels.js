const express = require("express");
const route = express.Router();

const db = new Map();
let id = 1;

const notFoundChannel = () => {
  res.status(404).json({ message: "채널 정보를 찾을 수 없습니다" });
};

route
  .route("/")
  .get((req, res) => {
    const { userId } = req.body;
    if (db.size === 0 || !userId) {
      notFoundChannel();
    }

    const channels = [];
    db.forEach((value, key) => {
      if (userId === value.userId) {
        channels.push(value);
      }
    });

    if (channels.length < 1) {
      notFoundChannel();
    }

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

route
  .route("/:id")
  .get((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    const channel = db.get(id);

    if (!channel) {
      notFoundChannel();
    }

    res.status(200).json(channel);
  })
  .put((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    const channel = db.get(id);
    const oldTitle = channel.channelTitle;

    if (!channel) {
      notFoundChannel();
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
      notFoundChannel();
    }

    db.delete(id);
    res
      .status(200)
      .json({ message: `${channel.channelTitle}이 정상적으로 삭제되었습니다` });
  });

module.exports = route;
