# utc_date

JavaScript Date replacement that only works with fixed UTC offset.

## Disclaimer

This is in alpha stages, not ready for production. It might be coupled with
another tool to detect DST shifts happening on Date objects, so one can
implement a semi-standalone Date that has DST information extracted from js
Date, without also inheriting all of the bugs.

## Getting Started
Install the module with: `npm install utc_date`

```javascript
var utc_date = require('utc_date');
var d = utc_date.Date();
d.setUTCMonth(1);
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Iskren Chernev
Licensed under the BSD-3-Clause license.
