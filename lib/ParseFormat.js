"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.W3C = exports.RSS = exports.RFC_850 = exports.RFC_822 = exports.RFC_2822 = exports.RFC_1123 = exports.RFC_1036 = exports.JULIAN = exports.ISO_8601 = exports.FULL = exports.COOKIE = exports.ATOM = void 0;
var _Calendars = _interopRequireWildcard(require("./Calendars"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
/* http://keith-wood.name/calendars.html
   Calendars parsing and formatting.
   Written by Keith Wood (kbwood.au{at}gmail.com) June 2022.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */

// Date form for ATOM (RFC 3339/ISO 8601).
var ATOM = exports.ATOM = 'yyyy-mm-dd';
// Date form for cookies.
var COOKIE = exports.COOKIE = 'D, dd M yyyy';
// Date form for full date.
var FULL = exports.FULL = 'DD, MM d, yyyy';
// Date form for ISO 8601.
var ISO_8601 = exports.ISO_8601 = 'yyyy-mm-dd';
// Date form for Julian day number.
var JULIAN = exports.JULIAN = 'J';
// Date form for RFC 822.
var RFC_822 = exports.RFC_822 = 'D, d M yy';
// Date form for RFC 850.
var RFC_850 = exports.RFC_850 = 'DD, dd-M-yy';
// Date form for RFC 1036.
var RFC_1036 = exports.RFC_1036 = 'D, d M yy';
// Date form for RFC 1123.
var RFC_1123 = exports.RFC_1123 = 'D, d M yyyy';
// Date form for RFC 2822.
var RFC_2822 = exports.RFC_2822 = 'D, d M yyyy';
// Date form for RSS (RFC 822).
var RSS = exports.RSS = 'D, d M yy';
// Date form for W3c (ISO 8601).
var W3C = exports.W3C = 'yyyy-mm-dd';

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
var formatDate = function formatDate(date) {
  var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var cal = date.calendar();
  pattern = pattern || cal.local.dateFormat;
  var index = 0;
  // Check whether a format character is doubled
  var doubled = (match, step) => {
    var matches = 1;
    while (index + matches < pattern.length && pattern.charAt(index + matches) === match) {
      matches++;
    }
    index += matches - 1;
    return Math.floor(matches / (step || 1)) > 1;
  };
  // Localise numbers if requested
  var localiseNumbers = value => cal.local.localiseDigits ? cal.local.localiseDigits(value) : value;
  // Format a number, with leading zeroes if necessary
  var formatNumber = (match, value, len) => {
    var num = "".concat(value);
    if (doubled(match)) {
      while (num.length < len) {
        num = "0".concat(num);
      }
    }
    return num;
  };
  // Format a name, short or long as requested
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
  var [y, m, d] = yearOrDate instanceof _Calendars.CDate
  // @ts-ignore: validate is protected
  ? this.validate('', yearOrDate)
  // @ts-ignore: validate is protected
  : this.validate(_Calendars.default.local.invalidDate, yearOrDate, monthOrPattern, day);
  return yearOrDate instanceof _Calendars.CDate ? formatDate(yearOrDate, monthOrPattern) : formatDate(this.date(y, m, d), pattern);
};
var errorMessages = {
  missingNumberAt: 'Missing number at position {0}',
  unknownNameAt: 'Unknown name at position {0}',
  unexpectedLiteralAt: 'Unexpected literal at position {0}',
  unexpectedText: 'Additional text found at end'
};

// Parse a string value into a date object.
var parseDate = function parseDate(cal, value) {
  var pattern = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  pattern = pattern || cal.local.dateFormat;
  var iValue = 0; // Position in the value
  var iPattern = 0; // Position in the pattern
  var shortYear = false;
  // Check whether a format character is doubled
  var doubled = (match, step) => {
    var matches = 1;
    while (iPattern + matches < pattern.length && pattern.charAt(iPattern + matches) === match) {
      matches++;
    }
    iPattern += matches - 1;
    return Math.floor(matches / (step || 1)) > 1;
  };
  // Extract a number from the string value
  var getNumber = (match, step) => {
    var isDoubled = doubled(match, step);
    if (match === 'y') {
      shortYear = !isDoubled;
    }
    var size = [2, 3, isDoubled ? 4 : 2, isDoubled ? 4 : 2]['oyY'.indexOf(match) + 1];
    // Normalise numbers if necessary
    var localValue = value.substring(iValue);
    localValue = cal.local.normaliseDigits ? cal.local.normaliseDigits(localValue) : localValue;
    var digits = new RegExp('^-?\\d{1,' + size + '}');
    var num = localValue.match(digits);
    if (!num) {
      throw new _Calendars.CalendarError(errorMessages.missingNumberAt.replace(/\{0\}/, "".concat(iValue)));
    }
    iValue += cal.local.localiseDigits ? cal.local.localiseDigits(num[0]).length : num[0].length;
    return parseInt(num[0], 10);
  };
  // Extract a name from the string value and convert to an index
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
  };
  // Confirm that a literal character matches the string value
  var checkLiteral = () => {
    if (value.charAt(iValue) !== pattern.charAt(iPattern)) {
      throw new _Calendars.CalendarError(errorMessages.unexpectedLiteralAt.replace(/\{0\}/, "".concat(iValue)));
    }
    iValue++;
  };
  var epoch = 1;
  var year = NaN;
  var month = NaN;
  var day = NaN;
  var doy = NaN;
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
  if (isNaN(year)) {
    year = cal.date().year();
  }
  if (year < 100 && shortYear) {
    year += Math.floor(cal.date().year() / 100) * 100;
  }
  if (epoch === 0) {
    year = -year;
  }
  if (!isNaN(doy)) {
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