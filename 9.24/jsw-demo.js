// require("dotenv").config();
const jwt = require("jsonwebtoken");
const secetKey = "shhhhh";

// 해당 내용으로 jwt 토큰 발급
// 페이로드 : { foo: "bar" }
// 시크릿키 : shhhhh
const token = jwt.sign({ foo: "bar" }, secetKey);

console.log(token);

// jwt 토큰 복호화
const decoded = jwt.verify(token, secetKey);
console.log(decoded);
