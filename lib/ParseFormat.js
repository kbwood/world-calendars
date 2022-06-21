"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.W3C = exports.RSS = exports.RFC_850 = exports.RFC_822 = exports.RFC_2822 = exports.RFC_1123 = exports.RFC_1036 = exports.JULIAN = exports.ISO_8601 = exports.FULL = exports.COOKIE = exports.ATOM = void 0;

var _Calendars = _interopRequireWildcard(require("./Calendars"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* http://keith-wood.name/calendars.html
   Calendars parsing and formatting.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) June 2022.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */
// Date form for ATOM (RFC 3339/ISO 8601).
var ATOM = 'yyyy-mm-dd'; // Date form for cookies.

exports.ATOM = ATOM;
var COOKIE = 'D, dd M yyyy'; // Date form for full date.

exports.COOKIE = COOKIE;
var FULL = 'DD, MM d, yyyy'; // Date form for ISO 8601.

exports.FULL = FULL;
var ISO_8601 = 'yyyy-mm-dd'; // Date form for Julian day number.

exports.ISO_8601 = ISO_8601;
var JULIAN = 'J'; // Date form for RFC 822.

exports.JULIAN = JULIAN;
var RFC_822 = 'D, d M yy'; // Date form for RFC 850.

exports.RFC_822 = RFC_822;
var RFC_850 = 'DD, dd-M-yy'; // Date form for RFC 1036.

exports.RFC_850 = RFC_850;
var RFC_1036 = 'D, d M yy'; // Date form for RFC 1123.

exports.RFC_1036 = RFC_1036;
var RFC_1123 = 'D, d M yyyy'; // Date form for RFC 2822.

exports.RFC_1123 = RFC_1123;
var RFC_2822 = 'D, d M yyyy'; // Date form for RSS (RFC 822).

exports.RFC_2822 = RFC_2822;
var RSS = 'D, d M yy'; // Date form for W3c (ISO 8601).

exports.RSS = RSS;
var W3C = 'yyyy-mm-dd';
/* Format a date object into a string value.
   The format can be combinations of the following:
    * d  - day of month (no leading zero)
    * dd - day of month (two digit)
    * o  - day of year (no leading zeros)
    * oo - day of year (three digit)
    * D  - day name short
    * DD - day name long
    * w  - week of year (no leading zero)
    * ww - week of year (two digit)
    * m  - month of year (no leading zero)
    * mm - month of year (two digit)
    * M  - month name short
    * MM - month name long
    * yy - year (two digit)
    * yyyy - year (four digit)
    * YYYY - formatted year
    * e - epoch
    * '...' - literal text
    * '' - single quote */

exports.W3C = W3C;

var formatDate = function formatDate(date) {
  var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var cal = date.calendar();
  pattern = pattern || cal.local.dateFormat;
  var index = 0; // Check whether a format character is doubled

  var doubled = (match, step) => {
    var matches = 1;

    while (index + matches < pattern.length && pattern.charAt(index + matches) === match) {
      matches++;
    }

    index += matches - 1;
    return Math.floor(matches / (step || 1)) > 1;
  }; // Localise numbers if requested


  var localiseNumbers = value => cal.local.localiseDigits ? cal.local.localiseDigits(value) : value; // Format a number, with leading zeroes if necessary


  var formatNumber = (match, value, len) => {
    var num = "".concat(value);

    if (doubled(match)) {
      while (num.length < len) {
        num = "0".concat(num);
      }
    }

    return num;
  }; // Format a name, short or long as requested


  var formatName = (match, value, shortNames, longNames) => doubled(match) ? longNames[value] : shortNames[value];

  var output = '';
  var literal = false;

  for (index = 0; index < pattern.length; index++) {
    if (literal) {
      if (pattern.charAt(index) === "'" && !doubled("'")) {
        literal = false;
      } else {
        output += pattern.charAt(index);
      }
    } else {
      switch (pattern.charAt(index)) {
        case 'd':
          output += localiseNumbers(formatNumber('d', date.day(), 2));
          break;

        case 'D':
          output += formatName('D', date.dayOfWeek(), cal.local.dayNamesShort, cal.local.dayNames);
          break;

        case 'o':
          output += localiseNumbers(formatNumber('o', date.dayOfYear(), 3));
          break;

        case 'w':
          output += localiseNumbers(formatNumber('w', date.weekOfYear(), 2));
          break;

        case 'm':
          output += localiseNumbers(formatNumber('m', date.month(), 2));
          break;

        case 'M':
          output += formatName('M', date.month() - cal.minMonth, cal.local.monthNamesShort, cal.local.monthNames);
          break;

        case 'y':
          output += localiseNumbers("".concat(doubled('y', 2) ? date.year() : (date.year() % 100 < 10 ? '0' : '') + date.year() % 100));
          break;

        case 'Y':
          doubled('Y', 2);
          output += date.formatYear();
          break;

        case 'e':
          output += date.epoch();
          break;

        case "'":
          if (doubled("'")) {
            output += "'";
          } else {
            literal = true;
          }

          break;

        default:
          output += pattern.charAt(index);
      }
    }
  }

  return output;
};

_Calendars.CalendarBase.prototype.format = function format(yearOrDate, monthOrPattern, day, pattern) {
  var [y, m, d] = yearOrDate instanceof _Calendars.CDate // @ts-ignore: validate is protected
  ? this.validate('', yearOrDate) // @ts-ignore: validate is protected
  : this.validate(_Calendars.default.local.invalidDate, yearOrDate, monthOrPattern, day);
  return yearOrDate instanceof _Calendars.CDate ? formatDate(yearOrDate, monthOrPattern) : formatDate(this.date(y, m, d), pattern);
};

var errorMessages = {
  missingNumberAt: 'Missing number at position {0}',
  unknownNameAt: 'Unknown name at position {0}',
  unexpectedLiteralAt: 'Unexpected literal at position {0}',
  unexpectedText: 'Additional text found at end'
}; // Parse a string value into a date object.

var parseDate = function parseDate(cal, value) {
  var pattern = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  pattern = pattern || cal.local.dateFormat;
  var iValue = 0; // Position in the value

  var iPattern = 0; // Position in the pattern

  var shortYear = false; // Check whether a format character is doubled

  var doubled = (match, step) => {
    var matches = 1;

    while (iPattern + matches < pattern.length && pattern.charAt(iPattern + matches) === match) {
      matches++;
    }

    iPattern += matches - 1;
    return Math.floor(matches / (step || 1)) > 1;
  }; // Extract a number from the string value


  var getNumber = (match, step) => {
    var isDoubled = doubled(match, step);

    if (match === 'y') {
      shortYear = !isDoubled;
    }

    var size = [2, 3, isDoubled ? 4 : 2, isDoubled ? 4 : 2]['oyY'.indexOf(match) + 1]; // Normalise numbers if necessary

    var localValue = value.substring(iValue);
    localValue = cal.local.normaliseDigits ? cal.local.normaliseDigits(localValue) : localValue;
    var digits = new RegExp('^-?\\d{1,' + size + '}');
    var num = localValue.match(digits);

    if (!num) {
      throw new _Calendars.CalendarError(errorMessages.missingNumberAt.replace(/\{0\}/, "".concat(iValue)));
    }

    iValue += cal.local.localiseDigits ? cal.local.localiseDigits(num[0]).length : num[0].length;
    return parseInt(num[0], 10);
  }; // Extract a name from the string value and convert to an index


  var getName = function getName(match, shortNames, longNames) {
    var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var names = doubled(match) ? longNames : shortNames;
    var index = -1;

    for (var i = 0; i < names.length; i++) {
      if (value.substring(iValue, iValue + names[i].length).toLowerCase() === names[i].toLowerCase()) {
        if (index === -1) {
          index = i;
        } else if (names[i].length > names[index].length) {
          index = i;
        }
      }
    }

    if (index > -1) {
      iValue += names[index].length;
      return index + offset;
    }

    throw new _Calendars.CalendarError(errorMessages.unknownNameAt.replace(/\{0\}/, "".concat(iValue)));
  }; // Confirm that a literal character matches the string value


  var checkLiteral = () => {
    if (value.charAt(iValue) !== pattern.charAt(iPattern)) {
      throw new _Calendars.CalendarError(errorMessages.unexpectedLiteralAt.replace(/\{0\}/, "".concat(iValue)));
    }

    iValue++;
  };

  var epoch = 1;
  var year = Number.NEGATIVE_INFINITY;
  var month = -1;
  var day = -1;
  var doy = -1;
  var literal = false;

  for (iPattern = 0; iPattern < pattern.length; iPattern++) {
    if (literal) {
      if (pattern.charAt(iPattern) === "'" && !doubled("'")) {
        literal = false;
      } else {
        checkLiteral();
      }
    } else {
      switch (pattern.charAt(iPattern)) {
        case 'd':
          day = getNumber('d');
          break;

        case 'D':
          getName('D', cal.local.dayNamesShort, cal.local.dayNames);
          break;

        case 'o':
          doy = getNumber('o');
          break;

        case 'w':
          getNumber('w');
          break;

        case 'm':
          month = getNumber('m');
          break;

        case 'M':
          month = getName('M', cal.local.monthNamesShort, cal.local.monthNames, cal.minMonth);
          break;

        case 'y':
          year = getNumber('y', 2);
          break;

        case 'Y':
          year = getNumber('Y', 2);
          break;

        case 'e':
          epoch = getName('e', cal.local.epochs, cal.local.epochs);
          break;

        case '*':
          iValue = value.length;
          break;

        case "'":
          if (doubled("'")) {
            checkLiteral();
          } else {
            literal = true;
          }

          break;

        default:
          checkLiteral();
      }
    }
  }

  if (iValue < value.length) {
    throw new _Calendars.CalendarError(errorMessages.unexpectedText);
  }

  if (year === Number.NEGATIVE_INFINITY) {
    year = cal.date().year();
  }

  if (year < 100 && shortYear) {
    year += Math.floor(cal.date().year() / 100) * 100;
  }

  if (epoch === 0) {
    year = -year;
  }

  if (doy > -1) {
    month = cal.firstMonth;
    day = doy;

    for (var dim = cal.daysInMonth(year, month); day > dim; dim = cal.daysInMonth(year, month)) {
      month++;

      if (month > cal.monthsInYear(year)) {
        month = cal.minMonth;
      }

      day -= dim;
    }
  }

  return cal.date(year, month, day);
};

_Calendars.CalendarBase.prototype.parse = function (value) {
  var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return parseDate(this, value, pattern);
};
//# sourceMappingURL=ParseFormat.js.map