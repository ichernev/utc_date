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

UtcDate.fn._daysInMonth = function () {
  return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][this.M];
};

UtcDate.fn.setUTCMonth = function (month) {
  var extra = Math.floor(month / 12);
  month = month % 12;
  if (extra < 0) {
    month += 12;
  }
  this.M = month;
  this.y += extra;
};

UtcDate.fn.setUTCDate = function (date) {
  var dim;
  if (date > (dim = this._daysInMonth())) {
    this.setUTCMonth(this.getUTCMonth() + 1);
    return this.setUTCDate(date - dim);
  } else if (date < 1) {
    this.setUTCMonth(this.getUTCMonth() - 1);
    dim = this._daysInMonth();
    return this.setUTCDate(date + dim);
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

UtcDate.fn.getUTCMonth = function () { return this.M; };
UtcDate.fn.getUTCDate = function () { return this.d; };
UtcDate.fn.getUTCHours = function () { return this.h; };