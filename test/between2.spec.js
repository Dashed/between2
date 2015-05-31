const chai = require('chai');
const expect = chai.expect;

const between = require('../src');

function assertBetween (lo, hi, depth, __between = between) {
    const b = __between(lo, hi);

    expect(b > lo).to.be.true;
    expect(b < hi).to.be.true;

    if(!depth) return;

    if(~~(Math.random()*2)) {
        assertBetween(lo, b, depth - 1, __between);
    } else {
        assertBetween(b, hi, depth - 1, __between);
    }
}

describe('between', function() {

    it('generate strings that sort between two strings', function() {
        assertBetween('!', '~', 200);
    });

    it('generate strings that sort between two random strings', function() {
        assertBetween('!', '~', 200, function (a, b) {
            return between(a, b) + between.randstr(5);
        });
    });

    it('#inject', function() {
        assertBetween(between.lo, between.hi, 200, between.inject('$&[{}(=*)+]!#~`'));
    });

});
