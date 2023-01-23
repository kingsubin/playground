import { add, go, L, log, reduce, take } from './functions.mjs';


/*
  지연평가 + Promise
  L.map, map, take
 */
go(
  [1, 2, 3],
  L.map(a => Promise.resolve(a + 10)),
  take(2),
  // log,
);

/*
  Kleisli Composition
  L.filter, filter, nop, take
 */
go(
  [1, 2, 3, 4, 5, 6],
  L.map(a => Promise.resolve(a * a)),
  L.filter(a => a % 2),
  L.map(a => a * a),
  take(4),
  // log,
);

/*
  reduce nop
 */
go(
  [1, 2, 3, 4],
  L.map(a => Promise.resolve(a * a)),
  L.filter(a => Promise.resolve(a % 2)),
  reduce(add),
  // log,
);

/*
  지연평가 + Promise 효율성
 */
go(
  [1, 2, 3, 4, 5, 6, 7, 8],
  L.map(a => new Promise(resolve => {
    log(a);
    return setTimeout(() => resolve(a * a), 1000);
  })),
  L.filter(a => new Promise(resolve => {
    log(a);
    return setTimeout(() => resolve(a % 2), 1000);
  })),
  take(2),
  log,
);

