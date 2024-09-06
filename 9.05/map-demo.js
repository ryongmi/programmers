const arr = [1, 2, 3, 4, 5];

const foreachArr = arr.forEach((value, index, all) => {
  // 데이터, 인덱스, 객체 전체
  return value * 2;
});

const mapArr = arr.map((value, index, all) => {
  // 데이터, 인덱스, 객체 전체
  return value * 2;
});

// foreach: undefined, map: 2,4,6,8,10
console.log(`foreach: ${foreachArr}, map: ${mapArr}`);
