const products = [
  { name: "반팔티", price: 15000, quantity: 1, is_selected: true },
  { name: "긴팔티", price: 20000, quantity: 2, is_selected: false },
  { name: "핸드폰케이스", price: 15000, quantity: 3, is_selected: true },
  { name: "후드티", price: 30000, quantity: 4, is_selected: false },
  { name: "바지", price: 25000, quantity: 5, is_selected: false },
];

const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

const add = (a, b) => a + b;

const sum = curry((f, iter) => go(iter, map(f), reduce(add)));

const total_quantity = sum((p) => p.quantity);

const total_price = sum((p) => p.price * p.quantity);

total_quantity(filter((p) => p.is_selected, products));
total_price(filter((p) => p.is_selected, products));
