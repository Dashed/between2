
function strord(a, b) {
    return (
        a == b ?  0 :
        a < b ? -1 : 1
    );
}

function inject(_chars = '!0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~') {

    const chars = _chars.split('').sort().join('');
    const charsLength = chars.length;

    let exports = between;

    exports.between = between;
    exports.before = before;
    exports.after = after;
    exports.lo = chars[0];
    exports.hi = chars[charsLength - 1];
    exports.strord = strord;
    exports.randstr = randstr;
    exports.trim = trim;
    exports.inject = inject;

    function randstr(l) {
        // expect l >= 0
        let str = '';
        while(l--) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    // trim lo chars on the right
    function trim(s) {
        let end = s.length;
        while(end > 1 && s[end-1] == exports.lo) {
            end--;
        }
        return s.substring(0, end);
    }

    function between(a, b, bypassCheck = false) {
        let betweenString = '', i = 0;

        if(!bypassCheck && strord(trim(a), trim(b)) >= 0) {
            throw Error(`Impossible to generate a string that lexicographically sorts between '${a}' and '${b}'`);
        }

        // invariant: a < b
        const guard = a.length + b.length;

        while (i <= guard) {
            // TODO: build lookup table
            let _a = chars.indexOf(a[i]);
            let _b = chars.indexOf(b[i]);

            if(_a == -1) _a = 0;
            if(_b == -1) _b = charsLength - 1;

            i++;

            const c = chars[(_a + 1) < _b ? Math.round((_a+_b)/2) : _a];

            betweenString += c;

            if(a < betweenString && betweenString < b && c != exports.lo) {
                return betweenString;
            }
        }

        throw Error(`Unable to produce proper string that can be sorted between '${a}' and '${b}'. Generated: ${betweenString}`);
    }

    function after(beforeString) {
        return between(beforeString, exports.hi);
    }

    function before(afterString) {
        return between(exports.lo, afterString);
    }

    return exports;
}

module.exports = inject();
