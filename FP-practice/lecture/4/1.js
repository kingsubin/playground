const log = console.log;

const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

//
const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

log(map((p) => p.name, products));
log(map((p) => p.price, products));

//
console.clear();
log([1, 2, 3].map((a) => a + 1));

function* gen() {
  yield 2;
  if (false) yield 3;
  yield 4;
}

log(map((a) => a * a, gen())); // [4, 16]

let m = new Map([
  ["a", 10],
  ["b", 20],
]);
log(new Map(map(([k, a]) => [k, a * 2], m)));
// Map(2) { 'a' => 20, 'b' => 40 }

//
console.clear();
const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
};

log(...filter((p) => p.price < 20000, products));
log(...filter((p) => p.price >= 20000, products));

log(
  filter(
    (n) => n % 2,
    (function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    })()
  )
);

//
console.clear();

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};

const add = (a, b) => a + b;

log(reduce(add, 0, [1, 2, 3, 4, 5])); // 15
log(add(add(add(add(add(0, 1), 2), 3), 4), 5)); // 15
log(reduce(add, [1, 2, 3, 4, 5])); // 15

//
console.clear();

log(reduce((total_price, product) => total_price + product.price, 0, products));
