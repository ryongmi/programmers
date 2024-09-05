// 기본형
function add1(x, y) {
  return x + y;
}

// 모듈화
let add2 = function (x, y) {
  return x + y;
};

// 화살표 함수(ArrowFunction)
const add3 = (x, y) => {
  return x + y;
};

// 화살표 함수 축약버전(return을 바로 표기)
var add4 = (x, y) => x + y;

console.log(add1(1, 2));
console.log(add2(1, 2));
console.log(add3(1, 2));
console.log(add4(1, 2));
