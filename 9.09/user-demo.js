const express = require("express");
const app = express();
app.use(express.json());
app.listen(7777);

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
app.post("/login", (req, res) => {
  const { userId, password } = req.body;
  let loginUser = {};

  db.forEach((user, id) => {
    if (user.userId === userId) {
      loginUser = user;
    }
  });

  if (!isExist(loginUser)) {
    console.log("해당 사용자가 없습니다.");
  }

  if (loginUser.password !== password) {
    console.log("사용자의 패스워드가 다릅니다.");
  }

  console.log("사용자를 찾았습니다.");
});

// 회원가입
app.post("/join", (req, res) => {
  if (req.body?.name) {
    db.set(id++, req.body);

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
// app.get("/users/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const user = db.get(id);

//   if (!user) {
//     res.status(404).json({ message: "유저 정보를 찾을 수 없습니다." });
//   }

//   res.json({ userId: user.userId, name: user.name });
// });

// // 회원 개별 탈퇴
// app.delete("/users/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const user = db.get(id);

//   if (!user) {
//     res.status(404).json({ message: "유저 정보를 찾을 수 없습니다." });
//   }

//   db.delete(id);

//   res.json({ message: `${user.name}` });
// });

app
  .route("/users/:id")
  .get((req, res) => {
    const id = parseInt(req.params.id);
    const user = db.get(id);

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
