function* gen() {
  yield 1;
  if (false) yield 2;
  yield 3;
}

let iter = gen();
console.log(iter[Symbol.iterator]() === iter); // true
console.log(iter.next()); // { value: 1, done: false }
console.log(iter.next()); // { value: 3, done: false }
console.log(iter.next()); // { value: undefined, done: true }

for (const a of gen()) console.log(a); // 1, 3

//
console.clear();

function* infinity(i = 0) {
  while (true) yield i++;
}

function* limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (a === l) return;
  }
}

function* odds(l) {
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
  }
}

let iter2 = odds(10);
console.log(iter2); // Object [Generator] {}
console.log(iter2.next()); // { value: 1, done: false }
console.log(iter2.next()); // { value: 3, done: false }
console.log(iter2.next()); // { value: 5, done: false }
console.log(iter2.next()); // { value: 7, done: false }
console.log(iter2.next()); // { value: 9, done: false }
console.log(iter2.next()); // { value: undefined, done: false }

//
console.clear();

console.log(...odds(10)); // 1 3 5 7 9
console.log([...odds(10), ...odds(20)]);

const [head, ...tail] = odds(5);
console.log(head); // 1
console.log(tail); // [3, 5]
