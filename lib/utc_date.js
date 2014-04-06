/*
 * utc_date
 * https://github.com/ichernev/utc_date
 *
 * Copyright (c) 2014 Iskren Chernev
 * Licensed under the BSD-3-Clause license.
 */

'use strict';

var UtcDate;

exports.Date = UtcDate = function() {
  this.y = 0;
  this.M = 0;
  this.d = 1;
  this.h = 0;
  this.m = 0;
  this.s = 0;
  this.ms = 0;
};

UtcDate.fn = UtcDate.prototype;

UtcDate.fn._daysInMonth = function (diff) {
  diff = diff == null ? 0 : diff;
  return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][
    ((this.M + diff) % 12 + 12) % 12];
};

UtcDate.fn.setUTCFullYear = function (year) {
  this.y = year;
};

UtcDate.fn.setUTCMonth = function (month) {
  var extra = Math.floor(month / 12);
  month = month % 12;
  if (extra < 0) {
    month += 12;
  }
  this.M = month;
  this.y += extra;
  this.setUTCDate(this.d);  // might skip forward
};

UtcDate.fn.setUTCDate = function (date) {
  var dim = this._daysInMonth(), diff = 0;

  while (date < 1) {
    diff -= 1;
    dim = this._daysInMonth(diff);
    date += dim
  }

  while (date > dim) {
    dim = this._daysInMonth(diff);
    diff += 1;
    date -= dim;
  }

  this.d = 1;
  if (diff !== 0) {
    this.setUTCMonth(this.getUTCMonth() + diff);
  }
  this.d = date;
};

UtcDate.fn.setUTCHours = function (hours) {
  var extra = Math.floor(hours / 24);
  hours = hours % 24;
  if (extra < 0) {
    hours += 24;
  }
  this.h = hours;
  this.setUTCDate(this.getUTCDate() + extra);
};

UtcDate.fn.setUTCMinutes = function (minutes) {
  var extra = Math.floor(minutes / 60);
  minutes = minutes % 60;
  if (extra < 0) {
    minutes += 60;
  }
  this.m = minutes;
  this.setUTCHours(this.getUTCHours() + extra);
};

UtcDate.fn.getUTCFullYear = function () { return this.y; };
UtcDate.fn.getUTCMonth = function () { return this.M; };
UtcDate.fn.getUTCDate = function () { return this.d; };
UtcDate.fn.getUTCHours = function () { return this.h; };
UtcDate.fn.getUTCMinutes = function () { return this.m; };
