const express = require("express");
const route = express.Router();
const conn = require("../db-demo");
const { body, validationResult, param } = require("express-validator");

const db = new Map();
let id = 1;

const notFoundChannel = (res) => {
  res.status(404).json({ message: "채널 정보를 찾을 수 없습니다" });
};

const validator = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ message: err.array[0].msg });
  }
  next();
};

route
  .route("/")
  .get(
    body("userId").notEmpty().isInt().withMessage("숫자를 입력해주세요."),
    validator,
    (req, res) => {
      const { userId } = req.body;
      // if (!userId) {
      //   notFoundChannel(res);
      // }

      const sql = "SELECT * FROM channels WHERE user_id = ?";
      conn.query(sql, userId, (err, result) => {
        if (err) {
          return res.status(400).end();
        }

        if (result.length < 1) {
          notFoundChannel(res);
        }

        res.status(200).json(result);
      });
    }
  )
  .post(
    [
      body("userId").notEmpty().isInt().withMessage("숫자를 입력해주세요."),
      body("name").notEmpty().isString().withMessage("문자를 입력해주세요."),
    ],
    validator,
    (req, res) => {
      const { name, userId } = req.body;
      // if (!name || !userId) {
      //   res.status(400).json({ message: "요청 값을 제대로 보내주세요." });
      // }

      const sql = "INSERT INTO channels (name, user_id) VALUES (?, ?)";
      const value = [name, userId];
      conn.query(sql, value, (err, result, fields) => {
        if (err) {
          return res.status(400).end();
        }
        res.status(201).json(result);
      });
    }
  );

route
  .route("/:id")
  .get(
    param("id").notEmpty().withMessage("채널ID를 입력해주세요."),
    validator,
    (req, res) => {
      let { id } = req.params;
      id = parseInt(id);

      const sql = "SELECT * FROM channels WHERE id = ?";
      conn.query(sql, id, (err, result) => {
        if (err) {
          return res.status(400).end();
        }

        if (result.length < 1) {
          notFoundChannel(res);
        }

        res.status(200).json(result);
      });
    }
  )
  .put(
    [
      param("id").notEmpty().withMessage("채널ID를 입력해주세요."),
      body("name").notEmpty().isString().withMessage("채널명을 입렵해주세요."),
    ],
    validator,
    (req, res) => {
      const { name } = req.body;
      let { id } = req.params;
      id = parseInt(id);

      const sql = `UPDATE channels SET name = ? WHERE id = ?`;
      const value = [name, id];
      conn.query(sql, value, (err, result) => {
        if (err) {
          return res.status(400).end();
        }

        if (result.affectedRows == 0) {
          return res.status(400).end();
        }

        res.status(200).json(result);
      });
    }
  )
  .delete(
    param("id").notEmpty().withMessage("채널ID를 입력해주세요."),
    validator,
    (req, res) => {
      let { id } = req.params;
      id = parseInt(id);

      const sql = `DELETE FROM channels WHERE id = ?`;
      conn.query(sql, id, (err, result) => {
        if (err) {
          return res.status(400).end();
        }

        if (result.affectedRows == 0) {
          return res.status(400).end();
        }

        res.status(200).json(result);
      });
    }
  );

module.exports = route;
