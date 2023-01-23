//
const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

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

const take = curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) return res;
  }
  return res;
});

const range = (l) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

const go = (...args) => reduce((a, f) => f(a), args);
const pipe =
  (f, ...fs) =>
  (...as) =>
    go(f(...as), ...fs);

// L.map, L.filter
const L = {};
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

L.map = curry(function* (f, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    yield f(a);
  }
});

L.filter = curry(function* (f, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (f(a)) {
      yield a;
    }
  }
});

// ex
console.time("");
go(
  range(10000),
  map((n) => n + 10),
  filter((n) => n % 2),
  take(10),
  console.log
);
console.timeEnd("");

console.time("lazy");
go(
  L.range(Infinity),
  L.map((n) => n + 10),
  L.filter((n) => n % 2),
  take(10),
  console.log
);
console.timeEnd("lazy");

//
console.clear();
L.entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};

const join = curry((sep = ",", iter) =>
  reduce((a, b) => `${a}${sep}${b}`, iter)
);

const queryStr = pipe(
  L.entries,
  L.map(([k, v]) => `${k}=${v}`),
  join("&")
);

console.log(queryStr({ limit: 10, offset: 10, type: "notice" }));
// limit=10&offset=10&type=notice

//
const users = [
  { age: 32 },
  { age: 31 },
  { age: 37 },
  { age: 28 },
  { age: 25 },
  { age: 32 },
  { age: 31 },
  { age: 37 },
];

const find = curry((f, iter) => go(iter, L.filter(f), take(1), ([a]) => a));

console.log(find((u) => u.age < 30)(users)); // { age: 28 }

go(
  users,
  L.map((u) => u.age),
  find((n) => n < 30),
  console.log
); // 28
