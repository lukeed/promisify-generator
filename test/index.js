const test = require('tape');
const fn = require('../lib');

const fixtures = {
	*foo() {
		let idx = 0;
		while (idx <= 5) yield idx++;
		return idx;
	},
	*bar() {
		let idx = 0;
		while (idx <= 5) {
			if (idx === 3) {
				throw new Error('EQUALS THREE');
			}
			yield idx++;
		}
		return idx;
	},
	*baz(a, b) {
		yield 'howdy~';
		return `I GOT ${a} && ${b}`;
	}
};

test('exports', t => {
	t.is(typeof fn, 'function', 'exports a function');
	t.end();
});

test('returns', t => {
	let foo = fn(fixtures.foo);
	t.is(typeof foo, 'function', 'returns a function');
	t.true(foo() instanceof Promise, 'returns a Promise when invoked');
	t.end();
});

test('usage::then', t => {
	t.plan(1);
	fn(fixtures.foo)().then(val => {
		t.is(val, 6, 'returns the expected value');
	});
});

test('usage::catch', t => {
	t.plan(2);
	fn(fixtures.bar)().then(console.log).catch(err => {
		t.true(err instanceof Error, 'returns an Error');
		t.is(err.message, 'EQUALS THREE', 'returns the error message');
	});
});

test('usage::arguments', t => {
	t.plan(1);
	fn(fixtures.baz)('hello', 42).then(val => {
		t.is(val, 'I GOT hello && 42', 'returns the expected value');
	});
});
