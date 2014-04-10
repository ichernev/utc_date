var UTCDate = require('../lib/utc_date'),
    random = require('./random');

require('chai').should();

describe("utc_date correctness", function () {

  it("behaves like builtin Date object (1000 operations)", function () {
    var d1 = new Date(Date.UTC(1970, 0, 1, 0, 0, 0)),
        d2 = new UTCDate(1970, 0, 1, 0, 0, 0),
        i,
        ranges = {
          'setUTCFullYear': [1900, 2100],
          'setUTCMonth': [-20, 20],
          'setUTCDate': [-60, 60],
          'setUTCHours': [-72, 72],
          'setUTCMinutes': [-120, 120],
          'setUTCSeconds': [-120, 120],
          'setUTCMilliseconds': [-2000, 2000],
        },
        setters = [],
        setter,
        value;

    for (i in ranges) {
      setters.push(i);
    }

    d2.valueOf().should.equal(d1.valueOf());

    for (i = 0; i < 1000; ++i) {
      setter = random.choose(setters);
      value = random.range(ranges[setter][0], ranges[setter][1]);
      // console.log(d1.toISOString(), setter, value);
      d1[setter](value);
      d2[setter](value);
      // console.log('    ', d1.toISOString(), d2.toISOString());
      d2.valueOf().should.equal(d1.valueOf());
    }
  });
});
