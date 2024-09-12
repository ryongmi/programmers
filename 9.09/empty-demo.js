const obj1 = {};
const obj2 = { msg: "안빔" };
const num = 1;
const str1 = "one";
const str2 = "";

console.log(isEmpty(obj1));
console.log(isEmpty(obj2));

console.log(isEmpty(str1));
console.log(isEmpty(str2));

const isEmpty = (obj) => {
  if (Object.keys(obj).length === 0) {
    return true;
  } else {
    return false;
  }
};
