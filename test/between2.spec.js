const chai = require('chai');
const expect = chai.expect;

const between = require('../src');

function assertBetween (lo, hi, depth, __between = between) {
    const b = __between(lo, hi);

    expect(lo < hi).to.be.true;
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
        assertBetween('!', '~', 500);
    });

    it('generate strings that sort between two random strings', function() {
        assertBetween('!', '~', 500, function (a, b) {
            return between(a, b) + between.randstr(5);
        });
    });

    it('#inject', function() {
        assertBetween(between.lo, between.hi, 500, between.inject('$&[{}(=*)+]!#~`'));
    });

    it('generate string for two char set', function() {
        const b = between.inject('01');
        const res = b.between('0', '001');
        expect('0' < res).to.be.true;
        expect(res < '001').to.be.true;
    });

    it('generate string could be a substring', function() {
        const b = between.inject('01');
        const res = b.between('0', '001001');
        expect('0' < res).to.be.true;
        expect(res < '001001').to.be.true;
    });

});
