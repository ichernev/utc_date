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

  it("doesn't use recursion", function() {
    var d = new utc_date.Date();
    // This wouldn't work with recursive setUTCDate
    d.setUTCDate(10000000);
  });

  it("handles setMonth like browsers (+ days in months)", function() {
    var d = new utc_date.Date();
    d.setUTCMonth(2); // Mar
    d.setUTCDate(1);

    d.setUTCMonth(3); // Apr
    // Adding a month preserves the date
    d.getUTCMonth().should.equal(3);
    d.getUTCDate().should.equal(1);

    d.setUTCMonth(4); // May
    // Adding a month preserves the date, in any number-of-days per month
    d.getUTCMonth().should.equal(4);
    d.getUTCDate().should.equal(1);

    d.setUTCDate(31);
    d.getUTCMonth().should.equal(4);
    d.getUTCDate().should.equal(31);

    d.setUTCMonth(5); // Jun
    // 31 May + 1 month skips to 1st Jul
    d.getUTCMonth().should.equal(6);
    d.getUTCDate().should.equal(1);
  });

  it("handles the rest of the items");
  it("handles fixed offset");
  it("uses _X for private stuff");
  it("handles leap years");
  it("handles multiple arguments");
  it("handles valueOf");
});
