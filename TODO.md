DateStorage
===========

+ get/set for all units
+ get/set unix ms
+ storing invalid values is undefined (because of native Date)

implementations:
* native utc-only-fn Date
* store ms only
* store units only

RawDate
=======

* use any DateStorage
* create with units, verify (store invalid info)
* set / get
  * 31th Jan + 1 month -> 28 Feb
  * for days --> compute overflow fast
  * for years --> careful with 29 feb
  * for rest -- work on ms values
* add / subtract
  * reuse set / get
* toISOString

LocalDate
=========

- RawDate
- callback for utcOffset(RawDate)
- callback for DST: hole/overlap+create/switch(like add)/set/add
  => return -1/0 (follow utc, not on create)/+1 or throw exception

+ if utcOffset function is constant, the DST callback would never be triggered

* convert LocalDate to LocalDate with different offset function
  * keepLocalTime flag (can hit hole/overlap)
  * keepUTCTime can not trigger cb
* create with tokens
  * create LocalDate with fixed offset 0 (check for overflow)
  * switch to target offset (might trigger cb), keepLocalTime == true
* set / get
  * perform DST adjust if hours or bigger (might trigger cb)
* add / sub
  * perform DST adjust if days or bigger (might trigger cb)
* toISOString
