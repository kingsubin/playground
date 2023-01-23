const add5 = (a) => a + 5;
console.log(add5); // [Function: add5]
console.log(add5(5)); // 10

const f1 = () => () => 1;
console.log(f1()); // [Function (anonymous)]

const f2 = f1();
console.log(f2); // [Function (anonymous)]
console.log(f2()); // 1
