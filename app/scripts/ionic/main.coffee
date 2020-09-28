
## to use text!plugin of requirejs
#require.nodeRequire = window.require
#
#libPath = '../lib/'
#
#requirejs.config
#  paths:
## jquery
#    jquery: libPath + 'jquery/dist/jquery.min'
#    'jquery-ui': libPath + 'jquery-ui/ui'
#    'jquery.ui': libPath + 'jquery-ui/jquery-ui.min'
#    'jquery.ui.touch-punch': libPath + 'jquery.ui.touch-punch.dk/jquery.ui.touch-punch.dk'
#
## framework
#    materialize: libPath + 'materialize/dist/js/materialize.min'
#    'materialize-css': libPath + 'materialize-css/dist/js/materialize.min'
#    bootstrap: libPath + 'bootstrap/dist/js/bootstrap.min'
#
## angular
#    angularLocalStorage: libPath + 'angularLocalStorage/src/angularLocalStorage'
#    angular: libPath + 'angular/angular.min'
#    angularMarked: libPath + 'angular-marked/angular-marked'
#    angularHighlight: libPath + 'angular-highlightjs/angular-highlightjs'
#    angularGrid: libPath + 'ag-grid-new/dist/ag-grid.min'
#    angularSocketio: libPath + 'angular-socket-io/socket.min'
#    angularTimeline: libPath + 'angular-timeline/dist/angular-timeline'
#    'angular-moment': libPath + 'angular-moment/angular-moment.min'
#    'angular.filter': libPath + 'angular-filter/dist/angular-filter.min'
#    ngSanitize: libPath + 'angular-sanitize/angular-sanitize.min'
#    ngRoute: libPath + 'angular-route/angular-route.min'
#    ngResource: libPath + 'angular-resource/angular-resource.min'
#    ngCookies: libPath + 'angular-cookies/angular-cookies.min'
#
## requirejs
#    text: libPath + 'requirejs-plugins/lib/text'
#    json: libPath + 'requirejs-plugins/src/json'
#    async: libPath + 'requirejs-plugins/src/async'
#    font: libPath + 'requirejs-plugins/src/font'
#
## markdown
#    showdown: libPath + 'showdown/compressed/Showdown.min'
#    btfMarkdown: libPath + 'angular-markdown-directive/markdown'
#    marked: libPath + 'marked/marked.min'
#
## utility
#    rx: libPath + 'rxjs/dist/rx.all.min'
#    moment: libPath + 'moment/min/moment.min'
#    'moment-locale-cn': libPath + 'moment/locale/zh-cn'
#    underscore: libPath + 'underscore/underscore-min'
#    lodash: libPath + 'lodash/lodash.min'
#    'iced-coffee-script': libPath + 'iced-coffee-script/extras/iced-coffee-script-108.0.9-min'
#    numeraljs: libPath + 'numeral/min/numeral.min'
#    asyncjs: libPath + 'async/dist/async.min'
#    hammerjs: libPath + 'hammerjs/hammer'
#
## encryption
#    tripledes: libPath + 'cryptojslib/rollups/tripledes'
#    md5: libPath + 'cryptojslib/rollups/md5'
#
## network
#    restangular: libPath + 'restangular/dist/restangular.min'
#    mqtt: libPath + 'mqtt'
#    socketio: libPath + 'socket.io-client/dist/socket.io'
#
## components
#    highlight: libPath + 'highlightjs/highlight.pack'
#    reveal: libPath + 'reveal.js/js/reveal'
#    'cal-heatmap': libPath + 'cal-heatmap/cal-heatmap.min'
#    fullcalendar: libPath + 'fullcalendar/dist/fullcalendar.min'
#    heatmapjs: libPath + 'heatmap.js-amd/build/heatmap.min'
#    'webui-popover': libPath + 'webui-popover/dist/jquery.webui-popover.min'
#    qrcode: libPath + 'qrcode.js/qrcode'
#    ionslider: libPath + 'ion.rangeSlider/js/ion.rangeSlider.min'
#    pushjs: libPath + 'push.js/push.min'
#    gridstack: libPath + 'gridstack/dist/gridstack.min'
#    'gl-datepicker': libPath + 'gl-datepicker/glDatePicker.min'
##    ztree: libPath + 'zTree/js/jquery.ztree.all.min'
#    calendar: libPath + 'lCalendar/LCalendar'
#
## spreadjs
#    spreadjs: libPath + 'spreadjs/scripts/gcspread.sheets.all.9.40.20153.0.min'
#    'spreadjs-print': libPath + 'spreadjs/scripts/pluggable/gcspread.sheets.print.9.40.20153.0.min'
#    'spreadjs-angular': libPath + 'spreadjs/scripts/interop/angular.gcspread.sheets.9.40.20153.0.min'
#
## echars
#    'echarts': libPath + 'echarts/dist/echarts.min'
#    'echarts-map': libPath + 'echarts/map'
#    'echarts-extension': libPath + 'echarts/extension'
#    'echarts-theme': libPath + 'echarts/theme'
#
## d3
#    d3: libPath + 'd3/d3.min'
#    'd3-plugins': libPath + 'd3-plugins'
#    'd3-sankey': libPath + 'd3-plugins/sankey/sankey'
#
## threejs
#    threejs: libPath + 'threejs/build/three'
#    'trackball-controls': libPath + 'threejs/examples/js/controls/TrackballControls'
#    'orbit-controls': libPath + 'threejs/examples/js/controls/OrbitControls'
#    'transform-controls': libPath + 'threejs/examples/js/controls/TransformControls'
#    CombinedCamera: libPath + 'threejs/examples/js/cameras/CombinedCamera'
#    css3drenderer: libPath + 'threejs/examples/js/renderers/CSS3DRenderer'
#
## ace
#    ace: libPath + 'ace-builds/src-min-noconflict/ace'
#    'ace-json': libPath + 'ace-builds/src-noconflict/mode-javascript'
#    'ui-ace': libPath + 'angular-ui-ace/ui-ace'
#    'dat.gui': libPath + 'dat.gui/dat.gui'
#
## svg
#    canvg: libPath + 'canvg/canvg'
#    svgloader: libPath + 'threejs/examples/js/loaders/SVGLoader'
#    'rgb-color': libPath + 'rgb-color/rgb-color'
#    'svg.todataurl': libPath + 'svg.todataurl/svg_todataurl'
#
## snap.svg
#    'snap.svg': libPath + 'Snap.svg/dist/snap.svg'
#    'snap': libPath + 'Snap.svg/dist/snap.svg'
#    'snap.svg.freetransform': libPath + 'snap.svg.freetransform/snap.svg.free_transform'
## customization: support touch events
#    'snap.svg.zpd': './lib/snap.svg.zpd'
#
## font
#    'helvetiker_regular.typeface': '/visualization/res/font/helvetiker_regular.typeface'
#
## clc
#    'clc.foundation.angular': libPath + 'clc.foundation.angular/src'
#    'clc.visualization': libPath + 'clc.dist/clc.visualization.min'
#    'clc.graphic': libPath + 'clc.dist/clc.graphic.min'
#    'clc.reporting': libPath + 'clc.reporting/reporting-bundle.min'
#
#  shim:
#
## jquery
#    jquery:
#      exports: '$'
#    'jquery.ui':
#      deps: ['jquery']
#    'jquery.ui.touch-punch':
#      deps: ['jquery.ui']
#
## framework
#    materialize:
#      deps: ['jquery']
#    bootstrap:
#      deps: ['jquery']
#
## angular
#    angular:
#      exports: 'angular'
#    angularMarked:
#      deps: ['angular', 'marked', 'highlight']
#    angularHighlight:
#      deps: ['angular', 'highlight']
#    angularLocalStorage:
#      deps: ['angular', 'ngCookies']
#    angularTimeline:
#      deps: ['angular']
##    angularGrid:
##      deps: ['angular']
#    angularSocketio:
#      deps: ['angular', 'socketio']
#    'angular-moment':
#      deps: ['moment', 'moment-locale-cn', 'angular']
#    ngRoute:
#      deps: ['angular']
#    ngResource:
#      deps: ['angular']
#    ngSanitize:
#      deps: ['angular']
#    ngCookies:
#      deps: ['angular']
#
## markdown
#    btfMarkdown:
#      deps: ['angular', 'ngSanitize', 'showdown']
#    marked:
#      exports: 'marked'
#
## encryption
#    tripledes:
#      exports: 'CryptoJS'
#    md5:
#      exports: 'CryptoJS'
#
## utility
#    underscore:
#      exports: '_'
#    numeraljs:
#      exports: 'numeral'
#    'angular.filter':
#      deps: ['angular']
#    asyncjs:
#      exports: 'async'
#
## network
#    restangular:
#      deps: ['angular']
#    mqtt:
#      exports: 'mqtt'
#    socketio:
#      exports: 'io'
#
## components
#    reveal:
#      exports: 'Reveal'
#    gridstack:
#      deps: ['jquery.ui.touch-punch']
#      exports: 'GridStack'
#    'cal-heatmap':
#      deps: ['d3']
#      exports: 'CalHeatMap'
#    fullcalendar:
#      deps: ['jquery']
#      exports: 'fullCalendar'
#    heatmapjs:
#      exports: 'h337'
#    'webui-popover':
#      deps: ['jquery']
#      exports: 'WebuiPopover'
#    qrcode:
#      exports: 'QRCode'
#    ionslider:
#      deps: ['jquery']
#      exports: 'Ionslider'
#    calendar:
#      exports: 'calendar'
#
## echarts
#    echarts:
##      deps: ['angular', 'jquery']
#      exports: 'echarts'
#
## d3
#    d3:
#      exports: 'd3'
#    'd3-sankey':
#      deps: ['d3']
#      exports: 'd3'
#
## spreadjs
#    spreadjs:
#      deps: ['jquery']
#      exports: 'GcSpread'
#    'spreadjs-print':
#      deps: ['spreadjs']
#      exports: 'GcSpread'
#    'spreadjs-angular':
#      deps: ['angular', 'spreadjs']
#      exports: 'GcSpread'
#
## threejs
#    threejs:
#      exports: 'THREE'
#    'trackball-controls':
#      deps: ['threejs']
#    'orbit-controls':
#      deps: ['threejs']
#    'transform-controls':
#      deps: ['threejs']
#    CombinedCamera:
#      deps: ['threejs']
#    svgloader:
#      deps: ['threejs']
#    css3drenderer:
#      deps: ['threejs']
#
## svg
#    canvg:
#      deps: ['rgb-color']
#      exports: 'canvg'
#
## ace and dat
#    'ui-ace':
#      deps: ['angular', 'ace']
#    'dat.gui':
#      exports: 'GUI'
#
## snap.svg
#    'snap.svg':
#      exports: 'Snap'
#    'snap':
#      exports: 'Snap'
#    'snap.svg.zpd':
#      deps: ['snap.svg']
#      exports: 'zpd'
#    'svg.todataurl':
#      deps: ['canvg']
#      exports: 'SVG'
#    'snap.svg.freetransform':
#      deps: ['snap.svg']
#      exports: 'ft'
#
## font
#    'helvetiker_regular.typeface':
#      deps: ['threejs']
#      exports: 'helvetiker_regular'
#
##  packages: ['src']
##  waitSeconds: 180
#
##  http://requirejs.org/docs/api.html#config-bundles
#  bundles:
#    'clc.visualization': ['graphic-directives']
##    'clc.reporting': ['report-directives']


requirejs [
  'hammerjs'
#  'register-setting'
  'app'
  'routes'
#], (setting, app) ->
], (hammerjs, app) ->
#  window.setting = registerSetting.RegisterSetting
  window.jQuery = window.$ = $$
  window.Hammer = hammerjs

  start = ->
    angular.bootstrap document, [app['name']]

  if document.body and window.device
    start()
  else
    ionic.Platform.ready start



