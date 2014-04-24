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
    var d;

    d = new UTCDate(2000);
    d.setUTCMonth(5);
    d.getUTCMonth().should.equal(5);

    d = new UTCDate(2000);
    d.setUTCMonth(12);
    d.getUTCFullYear().should.equal(2001);
    d.getUTCMonth().should.equal(0);

    d.setUTCMonth(-1);
    d.getUTCFullYear().should.equal(2000);
    d.getUTCMonth().should.equal(11);

    d.setUTCMonth(-12);
    d.getUTCFullYear().should.equal(1999);
    d.getUTCMonth().should.equal(0);
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

    it("accepts month over/underflow (< 0, > 11)");
  });

  it("handles valueOf", function () {
    new UTCDate(1900).valueOf().should.equal(-2208988800000);
    new UTCDate(1970).valueOf().should.equal(0);
    new UTCDate(1970, 0, 1, 0, 0, 1).valueOf().should.equal(1000);
    new UTCDate(1970, 0, 1, 0, 1, 0).valueOf().should.equal(60000);
    new UTCDate(2014, 3, 10, 5, 13, 11).valueOf().should.equal(1397106791000);
  });

  it("handles toISOString", function () {
    new UTCDate(1900).toISOString().should.equal("1900-01-01T00:00:00.000Z");
    new UTCDate(1900, 5, 6, 7, 8, 9, 10).toISOString().should.equal(
        "1900-06-06T07:08:09.010Z");
    new UTCDate(1900, 10, 20, 14, 12, 30).toISOString().should.equal(
        "1900-11-20T14:12:30.000Z");
    new UTCDate(1900, 10, 20, 14, 0, 30, 123).toISOString().should.equal(
        "1900-11-20T14:00:30.123Z");
  });

  describe("localtime getters", function () {
    it("handles getHours", function () {
      var d = new UTCDate(2000, 0, 1, 12, 0, 0);
      d.setTimezoneOffset(6 * 60);  // UTC-6
      d.getHours().should.equal(6);

      d.setUTCHours(18);
      d.getHours().should.equal(12);

      d.setUTCHours(3);
      d.getHours().should.equal(21);
    });

    it("handles getMinutes", function () {
      var d = new UTCDate(2000, 0, 1, 12, 0, 0);
      d.setTimezoneOffset(6 * 60);  // UTC-6
      d.getMinutes().should.equal(0);

      d.setUTCMinutes(30);
      d.getMinutes().should.equal(30);

      d.setTimezoneOffset(6 * 60 + 30);
      d.setUTCMinutes(30);
      d.getMinutes().should.equal(0);
    });
  });

  describe("localtime setters", function () {
    describe("far from DST, full hour offset", function () {
      beforeEach(function () {
        // Offset is fixed, so DST doesn't play role.
        UTCDate.determineTimezoneOffset =
            UTCDate.createFixedTimezoneOffset(6 * 60);  // UTC-6
      });

      afterEach(function () {
        UTCDate.determineTimezoneOffset = UTCDate.timezoneOffsetFromDate;
      });

      it("handles milliseconds", function () {
        var d = new UTCDate(2000, 0, 1, 12, 0, 0);

        d.setMilliseconds(123);
        d.getMilliseconds().should.equal(123);
        d.getUTCMilliseconds().should.equal(123);
      });

      it("handles seconds", function () {
        var d = new UTCDate(2000, 0, 1, 12, 0, 0);

        d.setSeconds(35);
        d.getSeconds().should.equal(35);
        d.getUTCSeconds().should.equal(35);
      });

      it("handles minutes with full-hour offset", function () {
        var d = new UTCDate(2000, 0, 1, 12, 0, 0);
        d.setTimezoneOffset(6 * 60);  // UTC-6

        d.setMinutes(15);
        d.getMinutes().should.equal(15);
        d.getUTCMinutes().should.equal(15);
      });

      it("handles hours", function () {
        var d = new UTCDate(2000, 0, 1, 12, 0, 0);

        d.getHours().should.equal(6);

        d.setHours(5);
        d.getHours().should.equal(5);
        d.getUTCHours().should.equal(11);

        d.setHours(22);
        d.getHours().should.equal(22);
        d.getUTCHours().should.equal(4);
        d.getUTCDate().should.equal(2);
      });

      it("handles dates", function () {
        var d = new UTCDate(2000, 0, 1, 12, 0, 0);

        d.getDate().should.equal(1);

        d.setDate(2);
        d.getDate().should.equal(2);
        d.getUTCDate().should.equal(2);
        d.getHours().should.equal(6);
        d.getUTCHours().should.equal(12);
      });

      it("handles months", function() {
        var d = new UTCDate(2000, 0, 1, 12, 0, 0);

        d.getMonth().should.equal(0);

        d.setMonth(1);
        d.getMonth().should.equal(1);
        d.getUTCMonth().should.equal(1);
        d.getDate().should.equal(1);
        d.getUTCDate().should.equal(1);
        d.getHours().should.equal(6);
        d.getUTCHours().should.equal(12);
      });

      it("handles years", function() {
        var d = new UTCDate(2000, 0, 1, 12, 0, 0);

        d.getFullYear().should.equal(2000);

        d.setFullYear(1999); d.getFullYear().should.equal(1999);
        d.setMonth(11); d.getMonth().should.equal(11);
        d.setDate(31); d.getDate().should.equal(31);
        d.setHours(22); d.getHours().should.equal(22);
        d.setMinutes(0); d.getMinutes().should.equal(0);
        d.setSeconds(0); d.getSeconds().should.equal(0);
        d.setMilliseconds(0); d.getMilliseconds().should.equal(0);

        d.getUTCFullYear().should.equal(2000);
        d.getUTCMonth().should.equal(0);
        d.getUTCDate().should.equal(1);
        d.getUTCHours().should.equal(4);
        d.getUTCMinutes().should.equal(0);
        d.getUTCSeconds().should.equal(0);
        d.getUTCMilliseconds().should.equal(0);
      });
    });

    describe("far from DST, half hour offset", function () {
      beforeEach(function () {
        // Offset is fixed, so DST doesn't play role.
        UTCDate.determineTimezoneOffset =
            UTCDate.createFixedTimezoneOffset(6 * 60 + 30);  // UTC-6:30
      });

      afterEach(function () {
        UTCDate.determineTimezoneOffset = UTCDate.timezoneOffsetFromDate;
      });

      it("handles minutes", function () {
        var d = new UTCDate(2000, 0, 1, 12, 0, 0);

        d.setMinutes(15);
        d.getMinutes().should.equal(15);
        d.getUTCMinutes().should.equal(45);
        d.getUTCHours().should.equal(11);

        d.setMinutes(45);
        d.getMinutes().should.equal(45);
        d.getUTCMinutes().should.equal(15);
        d.getUTCHours().should.equal(12);
      });
    });

    describe("over DST -1", function () {
      beforeEach(function () {
        // on 1st Jan 12:00 UTC switch from -5 to -6 (one hour back)
        var cutoff = +(new UTCDate(2000, 0, 1, 12, 0, 0, 0));
        UTCDate.determineTimezoneOffset = function (utc_date) {
          if (+utc_date < cutoff) {
            return 5 * 60;  // UTC-5
          } else {
            return 6 * 60;  // UTC-6
          }
        };
      });

      afterEach(function () {
        UTCDate.determineTimezoneOffset = UTCDate.timezoneOffsetFromDate;
      });

      it("handles increasing hours", function () {
        var d = new UTCDate(2000, 0, 1, 10, 0, 0, 0);

        d.getHours().should.equal(5);
        d.getTimezoneOffset().should.equal(5 * 60);

        d.setHours(8);
        d.getHours().should.equal(8);
        d.getUTCHours().should.equal(14);
        d.getTimezoneOffset().should.equal(6 * 60);
      });

      it("handles decreasing hours", function () {
        var d = new UTCDate(2000, 0, 1, 14, 0, 0, 0);

        d.getHours().should.equal(8);
        d.getTimezoneOffset().should.equal(6 * 60);

        d.setHours(5);
        d.getHours().should.equal(5);
        d.getUTCHours().should.equal(10);
        d.getTimezoneOffset().should.equal(5 * 60);
      });
    });

    describe("near DST +1", function () {
      beforeEach(function () {
        // on 1st Jan 12:00 UTC switch from -6 to -5 (one hour forward)
        var cutoff = +(new UTCDate(2000, 0, 1, 12, 0, 0, 0));
        UTCDate.determineTimezoneOffset = function (utc_date) {
          if (+utc_date < cutoff) {
            return 6 * 60;  // UTC-6
          } else {
            return 5 * 60;  // UTC-5
          }
        };
      });

      afterEach(function () {
        UTCDate.determineTimezoneOffset = UTCDate.timezoneOffsetFromDate;
      });

      it("handles increasing hours", function () {
        var d = new UTCDate(2000, 0, 1, 11, 0, 0, 0);

        d.getHours().should.equal(5);
        d.getTimezoneOffset().should.equal(6 * 60);

        d.setHours(8);
        d.getHours().should.equal(8);
        d.getUTCHours().should.equal(13);
        d.getTimezoneOffset().should.equal(5 * 60);
      });

      it("handles decreasing hours", function () {
        var d = new UTCDate(2000, 0, 1, 13, 0, 0, 0);

        d.getHours().should.equal(8);
        d.getTimezoneOffset().should.equal(5 * 60);

        d.setHours(5);
        d.getHours().should.equal(5);
        d.getUTCHours().should.equal(11);
        d.getTimezoneOffset().should.equal(6 * 60);
      });
    });

    describe("onto DST -1", function () {
      beforeEach(function () {
        // on 1st Jan 12:00 UTC switch from -5 to -6 (one hour back)
        var cutoff = +(new UTCDate(2000, 0, 1, 12, 0, 0, 0));
        UTCDate.determineTimezoneOffset = function (utc_date) {
          if (+utc_date < cutoff) {
            return 5 * 60;  // UTC-5
          } else {
            return 6 * 60;  // UTC-6
          }
        };
      });

      afterEach(function () {
        UTCDate.determineTimezoneOffset = UTCDate.timezoneOffsetFromDate;
      });

      it("handles increasing hours", function () {
        // start before DST, finish before DST
        var d = new UTCDate(2000, 0, 1, 10, 30, 0, 0);

        d.getHours().should.equal(5);
        d.getMinutes().should.equal(30);
        d.getTimezoneOffset().should.equal(5 * 60);

        d.setHours(6);
        d.getHours().should.equal(6);
        d.getMinutes().should.equal(30);
        d.getUTCHours().should.equal(11);
        d.getTimezoneOffset().should.equal(5 * 60);
      });

      it("handles decreasing hours", function () {
        // start after DST, finish after DST
        var d = new UTCDate(2000, 0, 1, 13, 30, 0, 0);

        d.getHours().should.equal(7);
        d.getMinutes().should.equal(30);
        d.getTimezoneOffset().should.equal(6 * 60);

        d.setHours(6);
        d.getHours().should.equal(6);
        d.getMinutes().should.equal(30);
        d.getUTCHours().should.equal(12);
        d.getTimezoneOffset().should.equal(6 * 60);
      });
    });

    describe("onto DST +1", function () {
      beforeEach(function () {
        // on 1st Jan 12:00 UTC switch from -6 to -5 (one hour forward)
        var cutoff = +(new UTCDate(2000, 0, 1, 12, 0, 0, 0));
        UTCDate.determineTimezoneOffset = function (utc_date) {
          if (+utc_date < cutoff) {
            return 6 * 60;  // UTC-6
          } else {
            return 5 * 60;  // UTC-5
          }
        };
      });

      afterEach(function () {
        UTCDate.determineTimezoneOffset = UTCDate.timezoneOffsetFromDate;
      });

      it("handles increasing hours", function () {
        var d = new UTCDate(2000, 0, 1, 11, 30, 0, 0);

        d.getHours().should.equal(5);
        d.getMinutes().should.equal(30);
        d.getTimezoneOffset().should.equal(6 * 60);

        d.setHours(6);

        d.getHours().should.equal(7);
        d.getMinutes().should.equal(30);
        d.getUTCHours().should.equal(12);
        d.getTimezoneOffset().should.equal(5 * 60);
      });

      it("handles decreasing hours", function () {
        var d = new UTCDate(2000, 0, 1, 12, 30, 0, 0);

        d.getHours().should.equal(7);
        d.getMinutes().should.equal(30);
        d.getTimezoneOffset().should.equal(5 * 60);

        d.setHours(6);

        d.getHours().should.equal(5);
        d.getMinutes().should.equal(30);
        d.getUTCHours().should.equal(11);
        d.getTimezoneOffset().should.equal(6 * 60);
      });
    });
  });

  it("does initialization according to spec");
  it("allows overflow in costructor");
  it("initializes timezone offset from determineTimezoneOffset");
  it("converts all unit inputs to integer");

  describe("multiple setter arguments", function () {
    it("setUTCFullYear(y, M, d)");
    it("setUTCMonth(M, d)");
    it("setUTCHours(h, m, s, ms)");
    it("setUTCMinutes(m, s, ms)");
    it("setUTCSeconds(s, ms)");
  });

  describe("setTimezoneOffset", function () {
    it("sets offset from utc POV with a single argument");
    it("sets offset from local POV with a second true argument");
  });

  describe("getTimezoneOffset", function () {
    it("returns the setTimezoneOffset");
    it("returns the determineTimezoneOffset");
  });

  describe("determineTimezoneOffset", function () {
    it("has createFixedTimezoneOffset");
    it("has timezoneOffsetFromDate");
    it("has manualTimezoneOffset");
    it("is used for initializing timezoneOffset");
    it("??? can be set per UTCDate");
    it("??? can be defaulted for new UTCDates");
  });

  it("uses an array to store units");

  describe("NEXT", function () {
    it("try to use Date as a source of UTC getters/setters");
    it("implement add/subtract");
    it("implement function reporting of DST edge on modify");
    it("implement DST edge on create");
  });
});
