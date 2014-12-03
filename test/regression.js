var UTCDate = require('../lib/utc_date.js');
require('chai').should();

describe("regressions", function() {
    it("handles month overflow when setting overflown Date", function () {
        var d = UTCDate.fromUnixMs(1398355892720);
        d.setUTCDate(d.getUTCDate() + 37);
        d.toISOString().should.equal("2014-05-31T16:11:32.720Z");
    });
});
