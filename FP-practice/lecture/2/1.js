const arr = [1, 2, 3];
let iter1 = arr[Symbol.iterator]();
for (const a of iter1) console.log(a); // 1, 2, 3

const set = new Set([1, 2, 3]);
for (const a of set) console.log(a); // 1, 2, 3

const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
for (const a of map.keys()) console.log(a);
for (const a of map.values()) console.log(a);
for (const a of map.entries()) console.log(a);

const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i === 0 ? { done: true } : { value: i--, done: false };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  },
};

const iterator = iterable[Symbol.iterator]();
console.log(iterator);
/*
{
  next: [Function: next],
  [Symbol(Symbol.iterator)]: [Function: [Symbol.iterator]]
}
 */
console.log(iterator.next()); // { value: 3, done: false }
iterator.next();
for (const a of iterator) console.log(a); // 1
