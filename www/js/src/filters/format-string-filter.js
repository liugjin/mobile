
/*
* File: select-directive
* User: Dow
* Date: 2/15/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
define(['numeraljs', 'moment'], function(numeral, moment) {
  var FormatStringFilter, exports, formatCache;
  formatCache = {};
  FormatStringFilter = function() {
    return function(value, type, format, nullString) {
      var format2, kv, p, ps, result, _i, _len, _ref, _ref1;
      if (nullString == null) {
        nullString = '';
      }
      if (!value && value !== 0) {
        return nullString;
      }
      if (!format) {
        return value;
      }
      switch (type) {
        case 'float':
        case 'int':
        case 'increase-float':
        case 'decrease-float':
        case 'increase-int':
        case 'decrease-int':
          result = numeral(value).format(format);
          break;
        case 'enum':
        case 'state':
          if (formatCache.hasOwnProperty(format)) {
            format2 = formatCache[format];
          } else {
            format = format.trim();
            if (format[0] === '{') {
              format2 = angular.fromJson(format);
            } else {
              format2 = {};
              ps = format.split(',');
              for (_i = 0, _len = ps.length; _i < _len; _i++) {
                p = ps[_i];
                kv = p.split(':');
                if (kv.length === 2) {
                  format2[kv[0].trim()] = kv[1].trim();
                }
              }
            }
            formatCache[format] = format2;
          }
          result = (_ref = (_ref1 = format2[value]) != null ? _ref1 : format2['else']) != null ? _ref : value;
          break;
        case 'datetime':
          result = moment(value).format(format);
          break;
        default:
          result = value;
      }
      return result;
    };
  };
  return exports = {
    FormatStringFilter: FormatStringFilter
  };
});
