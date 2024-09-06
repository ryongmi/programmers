const arr = [1, 2, 3, 4, 5];

arr.forEach((value, index, all) => {
  // 데이터, 인덱스, 객체 전체
  console.log(`value: ${value}, index: ${index}, all: ${all}`);
});

const map = new Map();
map.set(7, "seven");
map.set(9, "nine");
map.set(8, "eight");

map.forEach((value, index, all) => {
  console.log(`value: ${value}, index: ${index}, all: ${all}`);
});
