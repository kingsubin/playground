const isIterable = (a) => a && a[Symbol.iterator];

const Lflatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* a;
    else yield a;
  }
};

const x = Lflatten([[1, 2, 3], 4, 5, [6, 7], 8, 9]);
console.log(x);
console.log(x.next());

const LdeepFlat = function* f(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* f(a);
    else yield a;
  }
};
const y = LdeepFlat([1, [2, [3, 4], [[5]]]]);
console.log(...y);
