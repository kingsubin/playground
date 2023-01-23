const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});

const go = (...args) => reduce((a, f) => f(a), args);

const add = (a, b) => a + b;

// range
const range = (l) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

const L = {};
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

const list1 = range(5);
const list2 = L.range(5);

console.log(list1);
console.log(list2);

function test(name, time, f) {
  console.time(name);
  while (time--) f();
  console.timeEnd(name);
}

test("range", 10, () => reduce(add, range(1000000)));
test("L.range", 10, () => reduce(add, L.range(1000000)));

// take
const take = curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) return res;
  }
  return res;
});

console.time("take - 1");
go(range(100000), take(5), reduce(add), console.log);
console.timeEnd("take - 1");

console.time("take - 2");
go(L.range(100000), take(5), reduce(add), console.log);
console.timeEnd("take - 2");
