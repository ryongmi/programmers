const express = require("express");
const app = express();
const route = express.Router();

const db = new Map();
let id = 1;

const isExist = (obj) => {
  if (Object.keys(obj).length === 0) {
    return true;
  } else {
    return false;
  }
};

// 로그인
route.post("/login", (req, res) => {
  const { userId, password } = req.body;
  let loginUser = {};

  db.forEach((user, id) => {
    if (user.userId === userId) {
      loginUser = user;
    }
  });

  if (!isExist(loginUser)) {
    res.status(404).json({ message: "회원정보가 없습니다" });
  }

  if (loginUser.password !== password) {
    res.status(400).json({ message: "비밀번호가 틀렸습니다" });
  }

  res.status(200).json({ message: `${loginUser.name}님 로그인 되었습니다` });
});

// 회원가입
route.post("/join", (req, res) => {
  if (req.body?.name) {
    const { userId } = req.body;
    db.set(userId, req.body);

    res.json({
      message: `${req.body.name}님 환영합니다.`,
    });
  } else {
    res.status(400).json({
      message: "입력 값을 확인해주세요.",
    });
  }
});

// 회원 개별 조회
// route.get("/users/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const user = db.get(id);

//   if (!user) {
//     res.status(404).json({ message: "유저 정보를 찾을 수 없습니다." });
//   }

//   res.json({ userId: user.userId, name: user.name });
// });

// // 회원 개별 탈퇴
// route.delete("/users/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const user = db.get(id);

//   if (!user) {
//     res.status(404).json({ message: "유저 정보를 찾을 수 없습니다." });
//   }

//   db.delete(id);

//   res.json({ message: `${user.name}` });
// });

route
  .route("/users/:id")
  .get((req, res) => {
    const { userId } = req.body;
    const user = db.get(userId);

    if (!user) {
      res.status(404).json({ message: "유저 정보를 찾을 수 없습니다." });
    }

    res.json({ userId: user.userId, name: user.name });
  })
  .delete((req, res) => {
    const id = parseInt(req.params.id);
    const user = db.get(id);

    if (!user) {
      res.status(404).json({ message: "유저 정보를 찾을 수 없습니다." });
    }

    db.delete(id);

    res.json({ message: `${user.name}님 다음에 또 뵙겠습니다` });
  });

module.exports = route;
