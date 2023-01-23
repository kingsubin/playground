import { pipe, add, curry, go, L, log, reduce, take } from './functions.mjs';
/*
  지연된 함수열을 병력적으로 평가
  C.reduce, C.take
 */

const C = {};

function noop() {
}

const catchNoop = ([...arr]) =>
  (arr.forEach(a => a instanceof Promise ? a.catch(noop) : a), arr);

C.reduce = curry((f, acc, iter) => iter ?
  reduce(f, acc, catchNoop(iter)) :
  reduce(f, catchNoop(acc)));

C.take = curry((l, iter) => {
  return take(l, catchNoop(iter));
});

const delay1000 = a => new Promise(resolve =>
  setTimeout(() => resolve(a), 1000));

console.time('reduce');
go(
  [1, 2, 3, 4, 5],
  L.map(a => delay1000(a * a)),
  L.filter(a => a % 2),
  reduce(add),
  log,
  _ => console.timeEnd('reduce'),
);

console.time('C.reduce');
go(
  [1, 2, 3, 4, 5],
  L.map(a => delay1000(a * a)),
  L.filter(a => a % 2),
  C.reduce(add),
  log,
  _ => console.timeEnd('C.reduce'),
);

/*
  즉시 병렬적으로 평가
  C.map, C.filter
 */
console.clear();

C.takeAll = C.take(Infinity);
C.map = curry(pipe(
  L.map,
  C.takeAll,
));
C.filter = curry(pipe(
  L.filter,
  C.takeAll,
));

go(
  [1, 2, 3, 4],
  C.map(a => delay1000(a * a)),
  log,
);
go(
  [1, 2, 3, 4],
  C.filter(a => delay1000(a % 2)),
  log,
);