# promisify-generator [![Build Status](https://travis-ci.org/lukeed/promisify-generator.svg?branch=master)](https://travis-ci.org/lukeed/promisify-generator)

> Convert a Generator into Promise~!

Lightweight utility to promisify a generator, without the need for an entire library like [`bluebird`](https://github.com/petkaantonov/bluebird) or [`co`](https://github.com/tj/co).


## Install

```sh
$ npm install --save promisify-generator
```


## Usage

```js
const pgen = require('promisify-generator');

function * foo() {
  let idx = 0;
  while (idx <= 5) {
    yield idx++;
  }
  return idx;
}

function * bar() {
  let idx = 0;
  while (idx <= 5) {
    if (idx === 3) {
      throw new Error('EQUALS THREE');
    }
    yield idx++;
  }
  return idx;
}

const pFoo = pgen(foo);
//=> [Function]
pFoo().then(console.log);
//=> 6

const pBar = pgen(bar);
pBar().then().catch(console.error);
//=> Error: EQUALS THREE
```


## API

### pgen(fn)

#### fn

Type: `GeneratorFunction`<br>
Returns: `Function`

The [Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) function to promisify.

A normal `Function` is returned, which invokes a `Promise` when called. Any arguments passed to this function will be passed to your orginal Generator.

> **Important:** This library **does not** validate that your `fn` is, in fact, a `GeneratorFunction`!

To manually check if `fn` is a Generator, you may use the [`is-generator-function`](https://www.npmjs.com/package/is-generator-function) module, or the following snippet:

```js
const isGenerator = fn => fn.constructor.name === 'GeneratorFunction';
```


## License

MIT © [Luke Edwards](https://lukeed.com)
