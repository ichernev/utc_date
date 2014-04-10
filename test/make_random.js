// http://stackoverflow.com/questions/424292/seedable-javascript-random-number-generator
module.exports = function (state1, state2) {
    var mod1 = 4294967087;
    var mul1 = 65539;
    var mod2 = 4294965887;
    var mul2 = 65537;
    if (typeof state1 !== "number"){
        state1 = +new Date();
    }
    if (typeof state2 !== "number"){
        state2 = state1;
    }
    state1 = state1 % (mod1 - 1) + 1;
    state2 = state2 % (mod2 - 1) + 1;
    function random (limit) {
        state1 = (state1 * mul1) % mod1;
        state2 = (state2 * mul2) % mod2;
        if (state1 < limit && state2 < limit &&
                state1 < mod1 % limit && state2 < mod2 % limit) {
            return random(limit);
        }
        return (state1 + state2) % limit;
    }
    return random;
};
