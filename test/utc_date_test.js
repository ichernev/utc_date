var utc_date = require('../lib/utc_date.js');
require('chai').should();

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

describe("utc_date", function() {
  it("can be created", function() {
    new utc_date.Date();
  });

  it("can manipulate utc-hour", function() {
    var d = new utc_date.Date();
    d.setUTCHours(5);
    d.getUTCHours().should.equal(5);

    d.setUTCHours(23);
    d.getUTCHours().should.equal(23);

    d.setUTCHours(25);
    d.getUTCHours().should.equal(1);

    d.setUTCHours(-5);
    d.getUTCHours().should.equal(19);
  });

  it("handles date", function () {
    var d = new utc_date.Date();
    d.setUTCDate(-1);
    d.getUTCDate().should.equal(30);

    d.setUTCDate(1);
    d.getUTCDate().should.equal(1);

    d.setUTCDate(31);
    d.getUTCDate().should.equal(31);

    d.setUTCDate(35);
    d.getUTCDate().should.equal(4);
  });

  it("handles month", function () {
    var d = new utc_date.Date();

    d.setUTCMonth(5);
    d.getUTCMonth().should.equal(5);

    d.setUTCMonth(12);
    d.getUTCMonth().should.equal(0);

    d.setUTCMonth(-1);
    d.getUTCMonth().should.equal(11);
  });

  it("handles fixed offset");
  it("uses _X for private stuff");
  it("handles the rest of the items");
  it("handles leap years");
  it("handles multiple arguments");
  it("doesn't use recursion");
  it("handles valueOf");
});
