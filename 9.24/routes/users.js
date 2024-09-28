require("dotenv").config();
const express = require("express");
const route = express.Router();
const conn = require("../db-demo");
const { body, validationResult, param } = require("express-validator");
const jwt = require("jsonwebtoken");

const validator = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ message: err.array().at(0).msg });
  }
  next();
};

// 로그인
route.post(
  "/login",
  [
    body("email").notEmpty().isEmail().withMessage("이메일을 입력해주세요."),
    body("password")
      .notEmpty()
      .isNumeric()
      .withMessage("비밀번호를 입력해주세요."),
  ],
  validator,
  (req, res) => {
    const { email, password } = req.body;
    let loginUser = {};

    const sql = "SELECT * FROM users WHERE email = ?";
    conn.query(sql, email, (err, result) => {
      if (err) {
        return res.status(400).end();
      }

      if (result.length < 1) {
        return res.status(404).json({ message: "회원정보가 없습니다." });
      }

      loginUser = result[0];
      if (loginUser.password !== password) {
        return res.status(400).json({ message: "비밀번호가 틀렸습니다" });
      }

      const token = jwt.sign(
        { email: loginUser.email, name: loginUser.name },
        process.env.SECRET_KEY,
        {
          expiresIn: "30m",
          issuer: "geobuk",
        }
      );

      res.cookie("token", token, {
        httpOnly: true,
      });

      res
        .status(200)
        .json({ message: `${loginUser.name}님 로그인 되었습니다`, totken });
    });
  }
);

// 회원가입
route.post(
  "/join",
  [
    body("email").notEmpty().isEmail().withMessage("이메일을 입력해주세요."),
    body("name").notEmpty().isString().withMessage("이름을 입력해주세요."),
    body("password")
      .notEmpty()
      .isNumeric()
      .withMessage("비밀번호를 입력해주세요."),
    body("contact").notEmpty().isString().withMessage("연락처를 입력해주세요."),
  ],
  validator,
  (req, res) => {
    const { email, name, password, contact } = req.body;

    const sql =
      "INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)";
    conn.query(sql, [email, name, password, contact], (err, result, fields) => {
      if (err) {
        return res.status(400).end();
      }
      res.status(201).json(result);
    });
  }
);

route
  .route("/users")
  .get(
    body("email").notEmpty().isEmail().withMessage("이메일을 입력해주세요."),
    validator,
    (req, res) => {
      const { email } = req.body;

      const sql = "SELECT * FROM users WHERE email = ?";
      conn.query(sql, email, (err, result, fields) => {
        if (err) {
          return res.status(400).end();
        }

        if (result.length < 1) {
          res.status(404).json({ message: "회원 정보를 찾을 수 없습니다." });
        }

        res.json(result);
      });
    }
  )
  .delete(
    body("email").notEmpty().isEmail().withMessage("이메일을 입력해주세요."),
    validator,
    (req, res) => {
      const { email } = req.body;

      const sql = "DELETE FROM users WHERE email = ?";
      conn.query(sql, email, (err, result) => {
        if (err) {
          return res.status(400).end();
        }
        res.status(200).json(result);
      });
    }
  );

module.exports = route;
