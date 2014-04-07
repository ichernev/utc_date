var UTCDate = require('../lib/utc_date.js');
require('chai').should();

describe("utc_date", function() {
  describe("construction", function () {
    it("creates 0th date with no args", function() {
      var d = new UTCDate();
      d.getUTCMilliseconds().should.equal(0);
      d.getUTCSeconds().should.equal(0);
      d.getUTCMinutes().should.equal(0);
      d.getUTCHours().should.equal(0);
      d.getUTCDate().should.equal(1);
      d.getUTCMonth().should.equal(0);
      d.getUTCFullYear().should.equal(0);
    });

    it("accepts all units for args", function() {
      var d = new UTCDate(2000, 7, 8, 9, 10, 11, 12);
      d.getUTCMilliseconds().should.equal(12);
      d.getUTCSeconds().should.equal(11);
      d.getUTCMinutes().should.equal(10);
      d.getUTCHours().should.equal(9);
      d.getUTCDate().should.equal(8);
      d.getUTCMonth().should.equal(7);
      d.getUTCFullYear().should.equal(2000);
    });

    it("accepts subset of args, defaulting the rest to 0", function() {
      var d = new UTCDate(2000, 7, 8, 9);
      d.getUTCMilliseconds().should.equal(0);
      d.getUTCSeconds().should.equal(0);
      d.getUTCMinutes().should.equal(0);
      d.getUTCHours().should.equal(9);
      d.getUTCDate().should.equal(8);
      d.getUTCMonth().should.equal(7);
      d.getUTCFullYear().should.equal(2000);
    });
  });

  it("can manipulate utc-hour", function() {
    var d = new UTCDate();
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
    var d = new UTCDate();
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
    var d = new UTCDate();

    d.setUTCMonth(5);
    d.getUTCMonth().should.equal(5);

    d.setUTCMonth(12);
    d.getUTCMonth().should.equal(0);

    d.setUTCMonth(-1);
    d.getUTCMonth().should.equal(11);
  });

  it("doesn't use recursion", function() {
    var d = new UTCDate();
    // This wouldn't work with recursive setUTCDate
    d.setUTCDate(10000000);
  });

  it("handles setMonth like browsers (+ days in months)", function() {
    var d = new UTCDate();
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

  it("handles year", function () {
    var d = new UTCDate();
    d.setUTCFullYear(2000);
    d.getUTCFullYear().should.equal(2000);

    d.setUTCFullYear(-1234567);
    d.getUTCFullYear().should.equal(-1234567);
  });

  it("handles minutes", function () {
    var d = new UTCDate();

    d.setUTCHours(5);
    d.setUTCMinutes(30);

    d.setUTCMinutes(45);
    d.getUTCHours().should.equal(5);
    d.getUTCMinutes().should.equal(45);

    d.setUTCMinutes(75);
    d.getUTCHours().should.equal(6);
    d.getUTCMinutes().should.equal(15);

    d.setUTCMinutes(-15);
    d.getUTCHours().should.equal(5);
    d.getUTCMinutes().should.equal(45);
  });

  it("handles seconds", function () {
    var d = new UTCDate();
    d.setUTCMinutes(5);
    d.setUTCSeconds(30);

    d.setUTCSeconds(45);
    d.getUTCMinutes().should.equal(5);
    d.getUTCSeconds().should.equal(45);

    d.setUTCSeconds(75);
    d.getUTCMinutes().should.equal(6);
    d.getUTCSeconds().should.equal(15);

    d.setUTCSeconds(-15);
    d.getUTCMinutes().should.equal(5);
    d.getUTCSeconds().should.equal(45);
  });

  it("handles milliseconds", function () {
    var d = new UTCDate();
    d.setUTCSeconds(5);
    d.setUTCMilliseconds(30);

    d.setUTCMilliseconds(45);
    d.getUTCSeconds().should.equal(5);
    d.getUTCMilliseconds().should.equal(45);

    d.setUTCMilliseconds(1075);
    d.getUTCSeconds().should.equal(6);
    d.getUTCMilliseconds().should.equal(75);

    d.setUTCMilliseconds(-15);
    d.getUTCSeconds().should.equal(5);
    d.getUTCMilliseconds().should.equal(985);
  });

  describe("leap years", function () {
    it("accepts an year argument", function () {
      var d = new UTCDate();
      d.isLeapYear(2000).should.equal(true);
      d.isLeapYear(2001).should.equal(false);
      d.isLeapYear(2002).should.equal(false);
      d.isLeapYear(2003).should.equal(false);
      d.isLeapYear(2004).should.equal(true);
      d.isLeapYear(1900).should.equal(false);
    });

    it("defaults to the date's year", function () {
      var d = new UTCDate();
      d.isLeapYear().should.equal(true);

      d.setUTCFullYear(2000);
      d.isLeapYear().should.equal(true);

      d.setUTCFullYear(2001);
      d.isLeapYear().should.equal(false);
    });
  });

  describe("daysInMonth", function() {
    it("defaults to current month", function () {
      var d = new UTCDate();
      d.daysInMonth().should.equal(31); // January
      d.setUTCMonth(1); d.daysInMonth().should.equal(29); // Feb, leap year
      d.setUTCMonth(2); d.daysInMonth().should.equal(31); // Mar
      d.setUTCMonth(3); d.daysInMonth().should.equal(30); // Apr
      d.setUTCMonth(4); d.daysInMonth().should.equal(31); // May
      d.setUTCMonth(5); d.daysInMonth().should.equal(30); // Jun
      d.setUTCMonth(6); d.daysInMonth().should.equal(31); // Jul
      d.setUTCMonth(7); d.daysInMonth().should.equal(31); // Aug
      d.setUTCMonth(8); d.daysInMonth().should.equal(30); // Sep
      d.setUTCMonth(9); d.daysInMonth().should.equal(31); // Oct
      d.setUTCMonth(10); d.daysInMonth().should.equal(30); // Nov
      d.setUTCMonth(11); d.daysInMonth().should.equal(31); // Dec

      d.setUTCFullYear(1); d.setUTCMonth(1);
      d.daysInMonth().should.equal(28); // Feb, non leap
    });

    it("accepts year and month arguments", function () {
      var d = new UTCDate();
      d.daysInMonth(2000, 0).should.equal(31);
      d.daysInMonth(2000, 1).should.equal(29);
      d.daysInMonth(2000, 2).should.equal(31);
      d.daysInMonth(2000, 3).should.equal(30);
      d.daysInMonth(2000, 4).should.equal(31);
      d.daysInMonth(2000, 5).should.equal(30);
      d.daysInMonth(2000, 6).should.equal(31);
      d.daysInMonth(2000, 7).should.equal(31);
      d.daysInMonth(2000, 8).should.equal(30);
      d.daysInMonth(2000, 9).should.equal(31);
      d.daysInMonth(2000, 10).should.equal(30);
      d.daysInMonth(2000, 11).should.equal(31);

      d.daysInMonth(2001, 0).should.equal(31);
      d.daysInMonth(2001, 1).should.equal(28);
      d.daysInMonth(2001, 2).should.equal(31);
      d.daysInMonth(2001, 3).should.equal(30);
      d.daysInMonth(2001, 4).should.equal(31);
      d.daysInMonth(2001, 5).should.equal(30);
      d.daysInMonth(2001, 6).should.equal(31);
      d.daysInMonth(2001, 7).should.equal(31);
      d.daysInMonth(2001, 8).should.equal(30);
      d.daysInMonth(2001, 9).should.equal(31);
      d.daysInMonth(2001, 10).should.equal(30);
      d.daysInMonth(2001, 11).should.equal(31);
    });
  });

  describe("multiple setter arguments", function () {
    it("setUTCMonth(M, d)");
    it("setUTCHours(h, m, s, ms)");
  });

  it("handles valueOf");
  it("handles fixed offset (with adjusting time before/after)");
  it("handles multiple arguments");
  it("handles random test vs js Date");
  it("uses an array to store units");
});
