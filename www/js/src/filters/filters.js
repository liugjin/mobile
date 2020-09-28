define(['filters/string-replace-filter', 'clc.foundation.angular/filters/pretty-number-filter'], function(srf, prettyNumberFilter) {
  var filters;
  filters = angular.module('clc.filters', []);
  filters.filter('prettyNumber', [prettyNumberFilter.PrettyNumberFilter]);
  filters.filter('replace', [srf.StringReplaceFilter]);
  return filters;
});
