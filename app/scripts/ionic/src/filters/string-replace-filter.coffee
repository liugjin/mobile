


define [], () ->

  StringReplaceFilter = ->
    (str, pattern, replacement, global=true) ->
#      global = if typeof global == 'undefined' then true else global
      try
        str = if str then (if typeof global == 'string' then str else str.toString()) else ''
        return str.replace(new RegExp(pattern, if global then 'g' else ''), replacement)
      catch e
        console.error 'error in string.replace', e
        return str or ''
  #    return


  exports =
    StringReplaceFilter: StringReplaceFilter
