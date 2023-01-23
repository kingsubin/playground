import { find, log } from './functions.mjs';

log('hello');

//
const delay100 = a => new Promise(resolve =>
  setTimeout(() => resolve(a), 100));

const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);
const add5 = a => a + 5;

const n1 = 10;
const n2 = delay100(10);

go1(go1(n1, add5), log);
go1(go1(n2, add5), log);

/*
  Composition
  안전하게 합성하기 위한 도구
 */
console.clear();
let g = a => a + 1;
let f = a => a * a;

log(f(g(1)));
log(f(g()));

Array.of(1).map(g).map(f).forEach(r => log(r));
[].map(g).map(f).forEach(r => log(r));

Promise.resolve(2).then(g).then(f).then(r => log(r));
new Promise(resolve => setTimeout(() => resolve(2), 100))
  .then(g).then(f).then(r => log(r));

/*
  Kleisli Composition
  오류가 있을 수 있는 상황에서의 안전한 함수 합성

  f(g(x)) = f(g(x))
  f(g(x)) = g(x) err 상황
 */
const users = [
  { id: 1, name: 'aa' },
  { id: 2, name: 'bb' },
  { id: 3, name: 'cc' },
];

const getUserById = id =>
  find(u => u.id === id, users) || Promise.reject('없어요!');
f = ({ name }) => name;
g = getUserById;

const fg = id => f(g(id));
log(fg(2) === fg(2)); // true
// 외부(users)에 변화가 일어나면 합성함수의 결과가 같지 않거나 err 발생할 수 있음.

// users.pop()
const fg2 = id => Promise.resolve(id)
  .then(g).then(f)
  .catch(a => a);

//
log('bye');