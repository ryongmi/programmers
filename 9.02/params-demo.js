const express = require("express");
const app = express();

app.get("/products/:n", (req, res) => {
  const number = parseInt(req.params.n) - 10;
  console.log(number);

  res.json({ num: number });
  // res.send(20000);
});

// 채널주소 https://www.youtube.com/@15ya.fullmoon
// 채널주소 https://www.youtube.com/@ChimChakMan_Official
// app.get("/:nickname", (req, res) => {
//   const param = req.params;

//   res.json({ channel: param.nickname });
//   // res.send(20000);
// });

app.get("/watch", (req, res) => {
  // const q = req.query;
  // console.log(q.v);
  // console.log(q.t);

  // 객체의 비구조화
  const { v, t } = req.query;
  console.log(v);
  console.log(t);

  res.json({ video: v, timeline: t });
});

// 영상주소 https://www.youtube.com/watch?v=6tdavlFMRMU
// 영상주소 https://www.youtube.com/watch?v=WMBAow87zPM
// 타임라인주소 https://www.youtube.com/watch?v=WMBAow87zPM&t=257s

app.listen(3000);
