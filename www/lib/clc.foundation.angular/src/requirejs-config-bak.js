
/*
* File: main
* User: Dow
* Date: 2014/10/24
 */
var libPath, _ref, _ref1;

window.require = (_ref = window.require) != null ? _ref : {};

require.config = (_ref1 = require.config) != null ? _ref1 : function(a) {
  return window.require = a;
};

require.nodeRequire = window.require;

libPath = '../lib/';

require.config({
  paths: {
    jquery: libPath + 'jquery/dist/jquery.min',
    'jquery-ui': libPath + 'jquery-ui/ui',
    'jquery-ui/ui': libPath + 'jquery-ui/ui',
    'jquery.ui': libPath + 'jquery-ui/jquery-ui.min',
    'jquery.ui.touch-punch': libPath + 'jquery.ui.touch-punch.dk/jquery.ui.touch-punch.dk',
    materialize: libPath + 'materialize/dist/js/materialize.min',
    'materialize-css': libPath + 'materialize-css/dist/js/materialize.min',
    bootstrap: libPath + 'bootstrap/dist/js/bootstrap.min',
    angular: libPath + 'angular/angular.min',
    angularLocalStorage: libPath + 'angularLocalStorage/src/angularLocalStorage',
    angularMarked: libPath + 'angular-marked/angular-marked',
    angularHighlight: libPath + 'angular-highlightjs/build/angular-highlightjs.min',
    angularGrid: libPath + 'ag-grid/dist/ag-grid.min',
    'ag-grid': libPath + 'ag-grid/dist/ag-grid.min',
    angularSocketio: libPath + 'angular-socket-io/socket.min',
    angularTimeline: libPath + 'angular-timeline/dist/angular-timeline',
    'angular-moment': libPath + 'angular-moment/angular-moment.min',
    'angular.filter': libPath + 'angular-filter/dist/angular-filter.min',
    'angular-translate': libPath + 'angular-translate/dist/angular-translate.min',
    'angular-translate-load-url': libPath + 'angular-translate-load-url/angular-translate-load-url.min',
    'angular-translate-loader-static-files': libPath + 'angular-translate-loader-static-files/angular-translate-loader-static-files.min',
    ngSanitize: libPath + 'angular-sanitize/angular-sanitize.min',
    ngRoute: libPath + 'angular-route/angular-route.min',
    ngResource: libPath + 'angular-resource/angular-resource.min',
    ngCookies: libPath + 'angular-cookies/angular-cookies.min',
    dcbImgFallback: libPath + 'angular-img-fallback/angular.dcb-img-fallback.min',
    'angular-match-media': libPath + 'angular-media-queries/match-media',
    text: libPath + 'requirejs-plugins/lib/text',
    json: libPath + 'requirejs-plugins/src/json',
    async: libPath + 'requirejs-plugins/src/async',
    font: libPath + 'requirejs-plugins/src/font',
    showdown: libPath + 'showdown/dist/showdown.min',
    btfMarkdown: libPath + 'angular-markdown-directive/markdown',
    marked: libPath + 'marked/marked.min',
    rx: libPath + 'rxjs/dist/rx.all.min',
    moment: libPath + 'moment/min/moment.min',
    'moment-locale-cn': libPath + 'moment/locale/zh-cn',
    underscore: libPath + 'underscore/underscore-min',
    lodash: libPath + 'lodash/lodash.min',
    'iced-coffee-script': libPath + 'iced-coffee-script/extras/iced-coffee-script-108.0.9-min',
    numeraljs: libPath + 'numeral/min/numeral.min',
    asyncjs: libPath + 'async/dist/async.min',
    hammerjs: libPath + 'hammerjs/hammer',
    tween: libPath + 'tween.js/src/Tween',
    tripledes: libPath + 'cryptojslib/rollups/tripledes',
    md5: libPath + 'cryptojslib/rollups/md5',
    restangular: libPath + 'restangular/dist/restangular.min',
    mqtt: libPath + 'mqtt',
    socketio: libPath + 'socket.io-client/dist/socket.io',
    hljs: libPath + 'highlightjs/highlight.pack.min',
    reveal: libPath + 'reveal.js/js/reveal',
    'cal-heatmap': libPath + 'cal-heatmap/cal-heatmap.min',
    fullcalendar: libPath + 'fullcalendar/dist/fullcalendar.min',
    heatmapjs: libPath + 'heatmap.js-amd/build/heatmap.min',
    'webui-popover': libPath + 'webui-popover/dist/jquery.webui-popover.min',
    qrcode: libPath + 'qrcode.js/qrcode',
    ionslider: libPath + 'ion.rangeSlider/js/ion.rangeSlider.min',
    pushjs: libPath + 'push.js/push.min',
    gridstack: libPath + 'gridstack/dist/gridstack.min',
    smoothie: libPath + 'smoothie/smoothie',
    gaugejs: libPath + 'gauge.js/dist/gauge.min',
    segment: libPath + 'SegmentDisplay/segment-display',
    segment2: './lib/segment-display',
    pathfinding: libPath + 'pathfinding/pathfinding-browser.min',
    'number-flip': libPath + 'number-flip/dist/number-flip.min',
    'gl-datepicker': libPath + 'gl-datepicker/glDatePicker.min',
    'js-xlsx': libPath + 'js-xlsx/dist/xlsx.min',
    'js-zip': libPath + 'js-xlsx/dist/jszip',
    'slick': libPath + 'slick/dist/slick.min',
    'zTree': libPath + 'zTree/js/jquery.ztree.all.min',
    'xlsx-populate': libPath + 'xlsx-populate/browser/xlsx-populate.min',
    'ckplayer': libPath + 'ckplayer/ckplayer.min',
    'slick-carousel': libPath + 'slick-carousel/slick/slick.min',
    fancytree: libPath + 'jquery.fancytree/dist/modules/jquery.fancytree.filter',
    'jquery.fancytree': libPath + 'jquery.fancytree/dist/modules/jquery.fancytree',
    'jquery.fancytree.ui-deps': libPath + 'jquery.fancytree/dist/modules/jquery.fancytree.ui-deps',
    spreadjs: libPath + 'spreadjs/scripts/gc.spread.sheets.all.11.0.0.min',
    'spreadjs-print': libPath + 'spreadjs/scripts/gc.spread.sheets.print.11.0.0.min',
    'spreadjs-excelio': libPath + 'spreadjs/scripts/gc.spread.excelio.11.0.0.min',
    'spreadjs-angular': libPath + 'spreadjs/scripts/gc.spread.sheets.angularjs.11.0.0.min',
    'echarts': libPath + 'echarts/dist/echarts.min',
    'echarts-map': libPath + 'echarts/map',
    'echarts-extension': libPath + 'echarts/extension',
    'echarts-theme': libPath + 'echarts/theme',
    'baidu-map': 'http://api.map.baidu.com/api?v=2.0&ak=wC3WdagtjdXARD0CkWcYZs6mPwvtIhfo',
    d3: libPath + 'd3/d3.min',
    'd3-plugins': libPath + 'd3-plugins',
    'd3-sankey': libPath + 'd3-plugins/sankey/sankey',
    threejs: libPath + 'three.js/build/three.min',
    'trackball-controls': libPath + 'three.js/examples/js/controls/TrackballControls',
    'orbit-controls': libPath + 'three.js/examples/js/controls/OrbitControls',
    'orbit-controls2': './lib/OrbitControls',
    'transform-controls': libPath + 'three.js/examples/js/controls/TransformControls',
    'firstperson-controls': libPath + 'three.js/examples/js/controls/FirstPersonControls',
    'pointerlock-controls': libPath + 'three.js/examples/js/controls/PointerLockControls',
    'combined-camera': libPath + 'three.js/examples/js/cameras/CombinedCamera',
    'css3d-renderer': libPath + 'three.js/examples/js/renderers/CSS3DRenderer',
    'svg-renderer': libPath + 'three.js/examples/js/renderers/SVGRenderer',
    'svg-loader': libPath + 'three.js/examples/js/loaders/SVGLoader',
    'obj-loader': libPath + 'three.js/examples/js/loaders/OBJLoader',
    'mtl-loader': libPath + 'three.js/examples/js/loaders/MTLLoader',
    'collada-loader': libPath + 'three.js/examples/js/loaders/ColladaLoader',
    'stl-loader': libPath + 'three.js/examples/js/loaders/STLLoader',
    '3mf-loader': libPath + 'three.js/examples/js/loaders/3MFLoader',
    jszip: libPath + 'three.js/examples/js/libs/jszip.min',
    jszip2: libPath + 'jszip/dist/jszip.min',
    whitestormjs: libPath + '',
    ace: libPath + 'ace-builds/src-min-noconflict/ace',
    'ace-json': libPath + 'ace-builds/src-noconflict/mode-javascript',
    'ui-ace': libPath + 'angular-ui-ace/ui-ace',
    'dat.gui': libPath + 'dat.gui/dat.gui',
    canvg: libPath + 'canvg/canvg',
    svgloader: libPath + 'three.js/examples/js/loaders/SVGLoader',
    'rgb-color': libPath + 'rgb-color/rgb-color',
    'svg.todataurl': libPath + 'svg.todataurl/svg_todataurl',
    'snap.svg': libPath + 'Snap.svg/dist/snap.svg-min',
    'snap': libPath + 'Snap.svg/dist/snap.svg-min',
    'snap.svg.freetransform': libPath + 'snap.svg.freetransform/snap.svg.free_transform',
    'snap.svg.zpd': libPath + 'snap.svg.zpd/snap.svg.zpd',
    'snap.svg.zpd2': './lib/snap.svg.zpd',
    'canvas-gauge': libPath + 'canvas-gauges/gauge.min',
    pdfjs: libPath + 'pdfjs-dist/build/pdf.min',
    'pdfjs-dist': libPath + 'pdfjs-dist',
    neataptic: libPath + 'neataptic/dist/neataptic',
    'helvetiker_regular.typeface': '/visualization/res/font/helvetiker_regular.typeface',
    'clc.foundation.angular': libPath + 'clc.foundation.angular/src',
    'clc.graphic': libPath + 'clc.dist/clc.graphic.min',
    'clc.reporting': libPath + 'clc.reporting/reporting-bundle.min',
    'clc.materialize': libPath + 'clc.foundation.angular/dist/clc.materialize.min',
    'clc.markdown': libPath + 'clc.foundation.angular/clc.markdown'
  },
  shim: {
    jquery: {
      exports: '$'
    },
    'jquery.ui': {
      deps: ['jquery']
    },
    'jquery.ui.touch-punch': {
      deps: ['jquery.ui']
    },
    materialize: {
      deps: ['jquery']
    },
    'materialize-css': {
      deps: ['jquery'],
      exports: 'M'
    },
    bootstrap: {
      deps: ['jquery']
    },
    angular: {
      deps: ['jquery'],
      exports: 'angular'
    },
    angularMarked: {
      deps: ['angular', 'marked', 'highlight']
    },
    angularHighlight: {
      deps: ['angular', 'hljs']
    },
    angularLocalStorage: {
      deps: ['angular', 'ngCookies']
    },
    angularTimeline: {
      deps: ['angular']
    },
    angularGrid: {
      deps: ['angular']
    },
    'ag-grid': {
      deps: ['angular']
    },
    angularSocketio: {
      deps: ['angular', 'socketio']
    },
    'angular-moment': {
      deps: ['moment', 'moment-locale-cn', 'angular']
    },
    'angular-translate': {
      deps: ['angular']
    },
    'angular-translate-load-url': {
      deps: ['angular', 'angular-translate']
    },
    'angular-translate-loader-static-files': {
      deps: ['angular', 'angular-translate']
    },
    ngRoute: {
      deps: ['angular']
    },
    ngResource: {
      deps: ['angular']
    },
    ngSanitize: {
      deps: ['angular']
    },
    ngCookies: {
      deps: ['angular']
    },
    dcbImgFallback: {
      deps: ['angular']
    },
    'angular-match-media': {
      deps: ['angular']
    },
    showdown: {
      exports: 'showdown'
    },
    btfMarkdown: {
      deps: ['angular', 'ngSanitize', 'showdown']
    },
    marked: {
      exports: 'marked'
    },
    tripledes: {
      exports: 'CryptoJS'
    },
    md5: {
      exports: 'CryptoJS'
    },
    underscore: {
      exports: '_'
    },
    numeraljs: {
      exports: 'numeral'
    },
    'angular.filter': {
      deps: ['angular']
    },
    asyncjs: {
      exports: 'async'
    },
    tween: {
      exports: 'TWEEN'
    },
    hammerjs: {
      exports: 'Hammer'
    },
    restangular: {
      deps: ['angular', 'underscore']
    },
    mqtt: {
      exports: 'mqtt'
    },
    socketio: {
      exports: 'io'
    },
    reveal: {
      exports: 'Reveal'
    },
    gridstack: {
      deps: ['jquery.ui.touch-punch'],
      exports: 'GridStack'
    },
    'cal-heatmap': {
      deps: ['d3'],
      exports: 'CalHeatMap'
    },
    fullcalendar: {
      deps: ['jquery'],
      exports: 'fullCalendar'
    },
    heatmapjs: {
      exports: 'h337'
    },
    'webui-popover': {
      deps: ['jquery'],
      exports: 'WebuiPopover'
    },
    qrcode: {
      exports: 'QRCode'
    },
    ionslider: {
      deps: ['jquery'],
      exports: 'Ionslider'
    },
    smoothie: {
      exports: 'SmoothieChart'
    },
    gaugejs: {
      exports: 'gaugejs'
    },
    segment: {
      exports: 'SegmentDisplay'
    },
    segment2: {
      exports: 'SegmentDisplay'
    },
    pathfinding: {
      exports: 'PF'
    },
    'number-flip': {
      exports: 'Flip'
    },
    'js-xlsx': {
      deps: ['js-zip'],
      exports: 'XLSX'
    },
    'xlsx-populate': {
      exports: 'XlsxPopulate'
    },
    'slick-carousel': {
      exports: 'Slick'
    },
    'jquery.fancytree': {
      deps: ['jquery']
    },
    fancytree: {
      deps: ['jquery.fancytree', 'jquery.fancytree.ui-deps']
    },
    echarts: {
      deps: ['angular', 'jquery'],
      exports: 'echarts'
    },
    'baidu-map': {
      exports: 'BMap'
    },
    d3: {
      exports: 'd3'
    },
    'd3-sankey': {
      deps: ['d3'],
      exports: 'd3'
    },
    spreadjs: {
      exports: 'GC'
    },
    'spreadjs-print': {
      deps: ['spreadjs'],
      exports: 'GC'
    },
    'spreadjs-excelio': {
      deps: ['spreadjs'],
      exports: 'excel'
    },
    'spreadjs-angular': {
      deps: ['angular', 'spreadjs'],
      exports: 'GC'
    },
    threejs: {
      exports: 'THREE'
    },
    'trackball-controls': {
      deps: ['threejs']
    },
    'orbit-controls': {
      deps: ['threejs']
    },
    'orbit-controls2': {
      deps: ['threejs']
    },
    'transform-controls': {
      deps: ['threejs']
    },
    'firstperson-controls': {
      deps: ['threejs']
    },
    'pointerlock-controls': {
      deps: ['threejs']
    },
    'combined-camera': {
      deps: ['threejs']
    },
    'css3d-renderer': {
      deps: ['threejs']
    },
    'svg-renderer': {
      deps: ['threejs']
    },
    'svg-loader': {
      deps: ['threejs']
    },
    'obj-loader': {
      deps: ['threejs']
    },
    'mtl-loader': {
      deps: ['threejs']
    },
    'collada-loader': {
      deps: ['threejs']
    },
    'stl-loader': {
      deps: ['threejs']
    },
    '3mf-loader': {
      deps: ['threejs']
    },
    jszip: {
      exports: 'JSZip'
    },
    jszip2: {
      exports: 'JSZip'
    },
    canvg: {
      deps: ['rgb-color'],
      exports: 'canvg'
    },
    'ui-ace': {
      deps: ['angular', 'ace']
    },
    'dat.gui': {
      exports: 'GUI'
    },
    'snap.svg': {
      exports: 'Snap'
    },
    'snap': {
      exports: 'Snap'
    },
    'snap.svg.zpd': {
      deps: ['snap.svg', 'hammerjs']
    },
    'snap.svg.zpd2': {
      deps: ['snap.svg', 'hammerjs']
    },
    'svg.todataurl': {
      deps: ['canvg'],
      exports: 'SVG'
    },
    'snap.svg.freetransform': {
      deps: ['snap.svg'],
      exports: 'ft'
    },
    'helvetiker_regular.typeface': {
      deps: ['threejs'],
      exports: 'helvetiker_regular'
    }
  },
  packages: ['src'],
  waitSeconds: 180,
  bundles: {
    'clc.visualization': ['graphic-directives'],
    'clc.reporting': ['report-directives']
  }
});
