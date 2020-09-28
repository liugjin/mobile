
define [
  'filters/string-replace-filter'
  'clc.foundation.angular/filters/pretty-number-filter'
], (srf, prettyNumberFilter) ->

  filters = angular.module 'clc.filters', []

  filters.filter 'prettyNumber', [prettyNumberFilter.PrettyNumberFilter]

  filters.filter 'replace', [srf.StringReplaceFilter]


  filters
