define([], function() {
  var StringReplaceFilter, exports;
  StringReplaceFilter = function() {
    return function(str, pattern, replacement, global) {
      var e;
      if (global == null) {
        global = true;
      }
      try {
        str = str ? (typeof global === 'string' ? str : str.toString()) : '';
        return str.replace(new RegExp(pattern, global ? 'g' : ''), replacement);
      } catch (_error) {
        e = _error;
        console.error('error in string.replace', e);
        return str || '';
      }
    };
  };
  return exports = {
    StringReplaceFilter: StringReplaceFilter
  };
});
