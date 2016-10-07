const ava = require('ava');
const test = ava.test;

test(t => {
    t.deepEqual([1, 2], [1, 2]);
});