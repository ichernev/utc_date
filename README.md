# UTCDate

JavaScript Date replacement that only works with fixed UTC offset.

## Disclaimer

This is in alpha stages, not ready for production. It might be coupled with
another tool to detect DST shifts happening on Date objects, so one can
implement a semi-standalone Date that has DST information extracted from js
Date, without also inheriting all of the bugs.

## Getting Started
Install the module with: `npm install utc_date`

```javascript
var UTCDate = require('utc_date');
var d = UTCDate();
d.setUTCMonth(1);
```

## Documentation
This is a native Date replacement for anal retentives and software idealists.

### Background

Native js Date objects have getters and setters for each date-time unit, for
both UTC and local time. `setUTCMonths` is the UTC setter for the unit month,
`getSeconds` is the local getter for the unit seconds.

To achieve adding/subtracting a duration from a date, one can use a setter with
a given offset from the current value (getter). For example
`d.setUTCMonths(d.getUTCMonths() + 5)`. This works by allowing
overflow/underflow of all unit setters, and bubbling the change to the other
units. For example `d.setUTCMonths(d.getUTCMonths() + 15)`, applied on 1st Jan
2000, would result in 1st Mar 2001.

When we talk about UTC the setting and add/subtracting work seamlessly
together. In other words setting works (you'll get what you just set), and
adding/subtracting would work: adding 5 months is achieved by
`d.setUTCMonths(d.getUTCMonths() + 5)`, no other fields change.

When we put DST in the picture things get a bit more complicated. Changing the
time might result in changing the timezone, which has a side effect of changing
the hour.

Imagine a DST at UTC noon, 12:00 on 1st of Jan, changing from UTC-6 to UTC-5.
In other words after 5:59 1st Jan UTC-6, the time goes to 7:00 1st Jan UTC-5
(one hours gap). Lets say have your date set to 5:00 1st Jan, it would have
timezone UTC-6. Now imagine setting the hour to 8. If we think about _setter_
case from above, the right answer is 8:00 1st Jan UTC-5. If we think about
_adding_ then we're actually adding 3 hours, so the answer is 9:00 1st Jan
UTC-5 (because of the 1 hour gap).

There are more weird cases of DST: landing in a gap, or landing on an overlap,
and creating a date in a gap/overlap. The native js Date doesn't handle these
very reliably [[citation needed]]. Not only is the handling unreliable but
there is no feedback when such a weird case was hit by a recent date mutation.

UTCDate tries to fix these problems, and also provide a mechanism for manually
specifying the timezone offsets for each date, thus creating the basis of
a multi-timezone Date object: one that can handle Central European and Pacific
time at the same time.

UTCDate was created to be used as a more predictable replacement of the native
Date object in moment.js and moment-timezone.

### Differences with native Date

* proper handling of year (check for weird examples)
* proper handling of month setting (31 Jan -\[set month to feb\]-> 28 Feb,
  instead of 2 Mar)
* proper handling of local time around / on top of DST (examples with broken
  date)
* DST edge-case detection
  * after modifying a date in local time, these two might be hit:
    * changing timezone (+/- difference), adjusting hour (set semantics)
    * changing timezone, no hour adjustment (add semantics)
  * creating a Date given local time can hit:
    * created on overlap, newer timezone (one going into the future) chosen by default
    * created in gap, newer timezone chosen by default (with accompanying hour
      shift)
* configurable timezone offset
  * native Date as source (single timezone, determined by native Date object)
  * external timezone offset source (like Oslon database)
  * custom timezone offset, set by the user only
* ? add/subtract unit methods

### What is **NOT** handled

* other calendar systems
* leap seconds
* old date changes (assume existing leap year rule for all years)
* date string parsing (this is a beast of its own)

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Iskren Chernev
Licensed under the BSD-3-Clause license.
