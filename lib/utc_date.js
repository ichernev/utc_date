/*
 * utc_date
 * https://github.com/ichernev/utc_date
 *
 * Copyright (c) 2014 Iskren Chernev
 * Licensed under the BSD-3-Clause license.
 */

'use strict';

var UTCDate;

// Setters can get values bigger than the capacity, in which case it can change
// the bigger unit.
function makeSetter(key, upperGetter, upperSetter, max) {
  return function (value) {
    var extra = Math.floor(value / max);
    value = value % max;
    if (extra < 0) {
      value += max;
    }
    this[key] = value;
    this[upperSetter](this[upperGetter]() + extra);
  }
}

module.exports = UTCDate = function(y, M, d, h, m, s, ms) {
  this.y = ~~y;
  this.M = ~~M;
  this.d = d != null ? ~~d : 1;
  this.h = ~~h;
  this.m = ~~m;
  this.s = ~~s;
  this.ms = ~~ms;
};

UTCDate.fn = UTCDate.prototype;

UTCDate.fn.isLeapYear = function(y) {
  y = y != null ? ~~y : this.y;
  return (y % 400 == 0) || ((y % 4 == 0) && (y % 100 != 0));
};

UTCDate.fn.daysInMonth = function (y, M) {
  var res;

  y = y != null ? ~~y : this.y;
  M = M != null ? ~~M : this.M;

  y += Math.floor(M / 12);
  M %= 12;
  if (M < 0) {
    M += 12;
  }

  res = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][M];
  if (M === 1 && this.isLeapYear(y)) {
    ++ res;
  }
  return res;
};

UTCDate.fn.setUTCFullYear = function (year) {
  this.y = year;
};

UTCDate.fn.setUTCMonth = function (month) {
  var extra = Math.floor(month / 12);
  month = month % 12;
  if (extra < 0) {
    month += 12;
  }
  this.M = month;
  this.y += extra;
  this.setUTCDate(this.d);  // might skip forward
};

UTCDate.fn.setUTCDate = function (date) {
  var dim = this.daysInMonth(), diff = 0, m = this.M;

  while (date < 1) {
    diff -= 1;
    dim = this.daysInMonth(null, m + diff);
    date += dim
  }

  while (date > dim) {
    dim = this.daysInMonth(null, m + diff);
    diff += 1;
    date -= dim;
  }

  this.d = 1;
  if (diff !== 0) {
    this.setUTCMonth(this.getUTCMonth() + diff);
  }
  this.d = date;
};

UTCDate.fn.setUTCHours = makeSetter('h', 'getUTCDate', 'setUTCDate', 24);
UTCDate.fn.setUTCMinutes = makeSetter('m', 'getUTCHours', 'setUTCHours',  60);
UTCDate.fn.setUTCSeconds = makeSetter('s', 'getUTCMinutes', 'setUTCMinutes',  60);
UTCDate.fn.setUTCMilliseconds = makeSetter('ms', 'getUTCSeconds',
    'setUTCSeconds',  1000);

UTCDate.fn.getUTCFullYear = function () { return this.y; };
UTCDate.fn.getUTCMonth = function () { return this.M; };
UTCDate.fn.getUTCDate = function () { return this.d; };
UTCDate.fn.getUTCHours = function () { return this.h; };
UTCDate.fn.getUTCMinutes = function () { return this.m; };
UTCDate.fn.getUTCSeconds = function () { return this.s; };
UTCDate.fn.getUTCMilliseconds = function () { return this.ms; };
