var gen = require('./make_random')(1, 2);

exports.choose = function (a) {
  return a[gen(a.length)];
};

exports.range = function (a, b) {
  return a + gen(b - a + 1);
};
