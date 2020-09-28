###
* File: main
* User: Dow
* Date: 2014/10/24
###

# idea from google doc
window.require = window.require ? {}
require.config = require.config ? (a) -> window.require = a

# to use text!plugin of requirejs
require.nodeRequire = window.require

libPath = '../lib/'

require.config
  paths:
# jquery
    jquery: libPath + 'jquery/dist/jquery.min'
    'jquery-ui': libPath + 'jquery-ui/ui'
    'jquery-ui/ui': libPath + 'jquery-ui/ui'
    'jquery.ui': libPath + 'jquery-ui/jquery-ui.min'
    'jquery.ui.touch-punch': libPath + 'jquery.ui.touch-punch.dk/jquery.ui.touch-punch.dk'
#    'jquery.fancytree': libPath + 'jquery.fancytree/dist/jquery.fancytree-all.min'

# framework
    'materialize-css': libPath + 'materialize-css/dist/js/materialize.min'
    bootstrap: libPath + 'bootstrap/dist/js/bootstrap.min'

# angular
    angular: libPath + 'angular/angular.min'
    angularLocalStorage: libPath + 'angularLocalStorage/src/angularLocalStorage'
    angularMarked: libPath + 'angular-marked/angular-marked'
    angularHighlight: libPath + 'angular-highlightjs/build/angular-highlightjs.min'
    angularGrid: libPath + 'ag-grid/dist/ag-grid.min'
    'ag-grid': libPath + 'ag-grid/dist/ag-grid.min'
    angularSocketio: libPath + 'angular-socket-io/socket.min'
    angularTimeline: libPath + 'angular-timeline/dist/angular-timeline'
    'angular-moment': libPath + 'angular-moment/angular-moment.min'
    'angular.filter': libPath + 'angular-filter/dist/angular-filter.min'
    'angular-translate': libPath + 'angular-translate/dist/angular-translate.min'
    'angular-translate-load-url': libPath + 'angular-translate-load-url/angular-translate-load-url.min'
    'angular-translate-loader-static-files': libPath + 'angular-translate-loader-static-files/angular-translate-loader-static-files.min'
    ngSanitize: libPath + 'angular-sanitize/angular-sanitize.min'
    ngRoute: libPath + 'angular-route/angular-route.min'
    ngResource: libPath + 'angular-resource/angular-resource.min'
    ngCookies: libPath + 'angular-cookies/angular-cookies.min'
    dcbImgFallback: libPath + 'angular-img-fallback/angular.dcb-img-fallback.min'
    'angular-match-media': libPath + 'angular-media-queries/match-media'

# requirejs
    text: libPath + 'requirejs-plugins/lib/text'
    json: libPath + 'requirejs-plugins/src/json'
    async: libPath + 'requirejs-plugins/src/async'
    font: libPath + 'requirejs-plugins/src/font'
    css: libPath + 'require-css/css'
    'css-builder': '../../../../clc.share/lib/' + 'require-css/css-builder'
    normalize: '../../../../clc.share/lib/' + 'require-css/normalize'

# markdown
    showdown: libPath + 'showdown/dist/showdown.min'
    btfMarkdown: libPath + 'angular-markdown-directive/markdown'
    marked: libPath + 'marked/marked.min'

# utility
    rx: libPath + 'rxjs/dist/rx.all.min'
    moment: libPath + 'moment/min/moment.min'
    'moment-locale-cn': libPath + 'moment/locale/zh-cn'
    underscore: libPath + 'underscore/underscore-min'
    lodash: libPath + 'lodash/lodash.min'
    'iced-coffee-script': libPath + 'iced-coffee-script/extras/iced-coffee-script-108.0.9-min'
    numeraljs: libPath + 'numeral/min/numeral.min'
    asyncjs: libPath + 'async/dist/async.min'
    hammerjs: libPath + 'hammerjs/hammer'
    tween: libPath + 'tween.js/src/Tween'
    hotkeys: libPath + 'hotkeys-js/dist/hotkeys.js'
    'state-machine': libPath + 'javascript-state-machine/dist/state-machine.min'
    'js-shortid': libPath + 'js-shortid/lib/js-shortid'
    'in-view': libPath + 'in-view/dist/in-view.min'

# encryption
    tripledes: libPath + 'cryptojslib/rollups/tripledes'
    md5: libPath + 'cryptojslib/rollups/md5'

# network
    restangular: libPath + 'restangular/dist/restangular.min'
    mqtt: libPath + 'mqtt'
    socketio: libPath + 'socket.io-client/dist/socket.io'

# components
    hljs: libPath + 'highlightjs/highlight.pack.min'
    reveal: libPath + 'reveal.js/js/reveal'
    'cal-heatmap': libPath + 'cal-heatmap/cal-heatmap.min'
    fullcalendar: libPath + 'fullcalendar/dist/fullcalendar.min'
    calendar: libPath + 'lCalendar/LCalendar'
    heatmapjs: libPath + 'heatmap.js-amd/build/heatmap.min'
    'webui-popover': libPath + 'webui-popover/dist/jquery.webui-popover.min'
    qrcode: libPath + 'qrcode.js/qrcode'
    ionslider: libPath + 'ion.rangeSlider/js/ion.rangeSlider.min'
    pushjs: libPath + 'push.js/push.min'
    gridstack: libPath + 'gridstack/dist/gridstack.min'
    smoothie: libPath + 'smoothie/smoothie'
    gaugejs: libPath + 'gauge.js/dist/gauge.min'
    segment: libPath + 'SegmentDisplay/segment-display'
    segment2: './lib/segment-display'
    pathfinding: libPath + 'pathfinding/pathfinding-browser.min'
    'number-flip': libPath + 'number-flip/dist/number-flip.min'
    nouislider: libPath + 'materialize-css/extras/noUiSlider/nouislider'
    popperjs: libPath + 'popper.js/dist/umd/popper.min'

# additional components
    'gl-datepicker': libPath + 'gl-datepicker/glDatePicker.min'
    'js-xlsx': libPath + 'js-xlsx/dist/xlsx.min'
    'js-zip': libPath + 'js-xlsx/dist/jszip'
    'slick': libPath + 'slick/dist/slick.min'
    'zTree': libPath + 'zTree/js/jquery.ztree.all.min'
    'xlsx-populate': libPath + 'xlsx-populate/browser/xlsx-populate.min'
    'ckplayer': libPath + 'ckplayer/ckplayer.min'
    'slick-carousel': libPath + 'slick-carousel/slick/slick.min'
    'timebar': libPath + 'timebar'
    'vxgplayer': libPath + 'vxgplayer/vxgplayer-1.8.31.min'

# fancytree
    fancytree: libPath + 'jquery.fancytree/dist/modules/jquery.fancytree.filter'
    'jquery.fancytree': libPath + 'jquery.fancytree/dist/modules/jquery.fancytree'
    'jquery.fancytree.ui-deps':libPath + 'jquery.fancytree/dist/modules/jquery.fancytree.ui-deps'

# spreadjs
    spreadjs: libPath + 'spreadjs/scripts/gc.spread.sheets.all.11.0.0.min'
    'spreadjs-print': libPath + 'spreadjs/scripts/gc.spread.sheets.print.11.0.0.min'
    'spreadjs-excelio': libPath + 'spreadjs/scripts/gc.spread.excelio.11.0.0.min'
    'spreadjs-angular': libPath + 'spreadjs/scripts/gc.spread.sheets.angularjs.11.0.0.min'

# echarts
    'echarts': libPath + 'echarts/dist/echarts.min'
    'echarts-map': libPath + 'echarts/map'
    'echarts-extension': libPath + 'echarts/extension'
    'echarts-theme': libPath + 'echarts/theme'
    'echarts-liquidfill': libPath + 'echarts-liquidfill/dist/echarts-liquidfill.min'
    'echarts-bmap': libPath + 'echarts/extension/bmap-amd/bmap-amd.min'
#    'echarts-bmap': libPath + 'echarts/extension/bmap/bmap'

# baidu map
    'baidu-map': 'http://api.map.baidu.com/api?v=3.0&ak=wC3WdagtjdXARD0CkWcYZs6mPwvtIhfo'
    leaflet: libPath + 'leaflet/dist/leaflet'

# d3
    d3: libPath + 'd3/d3.min'
    'd3-plugins': libPath + 'd3-plugins'
    'd3-sankey': libPath + 'd3-plugins/sankey/sankey'

# threejs
    three: libPath + 'three.js/build/three.min'
    threejs: libPath + 'clc.foundation.angular/src/threejs-global'
    'trackball-controls': libPath + 'three.js/examples/js/controls/TrackballControls'
    'orbit-controls': libPath + 'three.js/examples/js/controls/OrbitControls'
    'orbit-controls2': './lib/OrbitControls'
    'transform-controls': libPath + 'three.js/examples/js/controls/TransformControls'
    'firstperson-controls': libPath + 'three.js/examples/js/controls/FirstPersonControls'
    'pointerlock-controls': libPath + 'three.js/examples/js/controls/PointerLockControls'
    'combined-camera': libPath + 'three.js/examples/js/cameras/CombinedCamera'
    'css2d-renderer': libPath + 'three.js/examples/js/renderers/CSS2DRenderer'
    'css3d-renderer': libPath + 'three.js/examples/js/renderers/CSS3DRenderer'
    'svg-renderer': libPath + 'three.js/examples/js/renderers/SVGRenderer'
    'svg-loader': libPath + 'three.js/examples/js/loaders/SVGLoader'
    'obj-loader': libPath + 'three.js/examples/js/loaders/OBJLoader'
    'mtl-loader': libPath + 'three.js/examples/js/loaders/MTLLoader'
    'collada-loader': libPath + 'three.js/examples/js/loaders/ColladaLoader'
    'stl-loader': libPath + 'three.js/examples/js/loaders/STLLoader'
    '3mf-loader': libPath + 'three.js/examples/js/loaders/3MFLoader'
    'gltf-loader': libPath + 'three.js/examples/js/loaders/GLTFLoader'
    'json-loader': libPath + 'three.js/examples/js/loaders/deprecated/LegacyJSONLoader'
    'copy-shader': libPath + 'three.js/examples/js/shaders/CopyShader'
    'fxaa-shader': libPath + 'three.js/examples/js/shaders/FXAAShader'
    'shader-pass': libPath + 'three.js/examples/js/postprocessing/ShaderPass'
    'effect-composer': libPath + 'three.js/examples/js/postprocessing/EffectComposer'
    'render-pass': libPath + 'three.js/examples/js/postprocessing/RenderPass'
    'outline-pass': libPath + 'three.js/examples/js/postprocessing/OutlinePass'
    jszip: libPath + 'three.js/examples/js/libs/jszip.min'
    jszip2: libPath + 'jszip/dist/jszip.min'

# whitestormjs
    whitestormjs: libPath + ''

# ace
    ace: libPath + 'ace-builds/src-min-noconflict/ace'
    'ace-json': libPath + 'ace-builds/src-noconflict/mode-javascript'
    'ui-ace': libPath + 'angular-ui-ace/ui-ace'
    'dat.gui': libPath + 'dat.gui/build/dat.gui.min'
# r.js optimization may lead the dynamic path issue
#    'mode-html': libPath + 'ace-builds/src-min-noconflict/ace/mode-html'
#    'mode-javascript': libPath + 'ace-builds/src-min-noconflict/ace/mode-javascript'
#    'mode-json': libPath + 'ace-builds/src-min-noconflict/ace/mode-json'

# svg
    canvg: libPath + 'canvg/canvg'
    svgloader: libPath + 'three.js/examples/js/loaders/SVGLoader'
    'rgb-color': libPath + 'rgb-color/rgb-color'
    'svg.todataurl': libPath + 'svg.todataurl/svg_todataurl'

# snap.svg
    'snap.svg': libPath + 'Snap.svg/dist/snap.svg-min'
    'snap': libPath + 'Snap.svg/dist/snap.svg-min'
    'snap.svg.freetransform': libPath + 'snap.svg.freetransform/snap.svg.free_transform'
# customization: support touch events
    'snap.svg.zpd': libPath + 'snap.svg.zpd/snap.svg.zpd'
    'snap.svg.zpd2': './lib/snap.svg.zpd'

# canvas-gauge
    'canvas-gauge': libPath + 'canvas-gauges/gauge.min'

# pdf
    pdfjs: libPath + 'pdfjs-dist/build/pdf.min'
    'pdfjs-dist': libPath + 'pdfjs-dist'

# ai
    neataptic: libPath + 'neataptic/dist/neataptic'
    '@tensorflow': libPath + '@tensorflow'
    '@tensorflow/tfjs': libPath + '@tensorflow/tfjs/dist/tf.min'
    '@tensorflow/tfjs-core': libPath + '@tensorflow/tfjs-core/dist/tf-core.min'
    '@tensorflow/tfjs-converter': libPath + '@tensorflow/tfjs-converter/dist/tf-converter.min'
    '@tensorflow-models': libPath + '@tensorflow-models'
    '@tensorflow-models/coco-ssd': libPath + '@tensorflow-models/coco-ssd/dist/coco-ssd.min'

# video
    videojs: libPath + 'video.js/dist/video.min'
    VideojsRecord: libPath + 'videojs-record/dist/videojs.record.min'
    RecordRTC: libPath + 'recordrtc/RecordRTC.min'
    'videojs-zh': libPath + 'video.js/dist/lang/zh-CN'
    'videojs-record-zh': libPath + 'videojs-record/dist/lang/zh'
    'videojs-css': libPath + 'video.js/dist/video-js.min'
    'videojs-record-css': libPath + 'videojs-record/dist/css/videojs.record.min'

# font
    'helvetiker_regular.typeface': '/visualization/res/font/helvetiker_regular.typeface'
    'microsoft_yahei_regular': '/visualization/res/font/Microsoft_YaHei_Regular.json'

# clc
    'clc.foundation.angular': libPath + 'clc.foundation.angular/src'
# clc.visualization bundle
    'clc.visualization': libPath + 'clc.dist/clc.visualization.min'
# graphic bundle
    'clc.graphic': libPath + 'clc.dist/clc.graphic.min'
#    'clc.reporting': libPath + 'clc.dist/reporting-bundle.min'
    'clc.reporting': libPath + 'clc.dist/clc.reporting.min'
    'clc.report': libPath + 'clc.dist/clc.report.min'
    'clc.auth': libPath + 'clc.dist/clc.auth.min'
    'clc.materialize': libPath + 'clc.dist/clc.materialize.min'
    'clc.markdown': libPath + 'clc.dist/clc.markdown.min'
    'clc.gateway': libPath + 'clc.dist/clc.gateway.min'
    'clc.bus': libPath + 'clc.dist/clc.bus.min'
    'clc.dcim': libPath + 'clc.dist/clc.dcim.min'
    'clc.monitoring': libPath + 'clc.dist/clc.monitoring.min'
    'clc.cloud': libPath + 'clc.dist/clc.cloud.min'
    'clc.notification': libPath + 'clc.dist/clc.notification.min'
    'clc.admin': libPath + 'clc.dist/clc.admin.min'
    'clc.model': libPath + 'clc.dist/clc.model.min'
    'clc.skeleton': libPath + 'clc.dist/clc.skeleton.min'
    'clc.resource': libPath + 'clc.dist/clc.resource.min'
    'clc.sensorflow': libPath + 'clc.dist/clc.sensorflow.min'
    'clc.workflow': libPath + 'clc.dist/clc.workflow.min'
    'clc.office': libPath + 'clc.dist/clc.office.min'

#    'clc.materialize': libPath + 'clc.foundation.angular/dist/clc.materialize.min'
#    'clc.materialize': libPath + 'clc.foundation.angular/clc.materialize'
#    'clc.markdown': libPath + 'clc.foundation.angular/dist/clc.markdown.min'
#    'clc.markdown': libPath + 'clc.foundation.angular/clc.markdown'

  shim:
# jquery
    jquery:
      exports: '$'
    'jquery.ui':
      deps: ['jquery']
      exports: '$'
    'jquery.ui.touch-punch':
      deps: ['jquery.ui']
      exports: '$'

# framework
    'materialize-css':
      deps: ['jquery']
      exports: 'M'
    bootstrap:
      deps: ['jquery']

# angular
    angular:
      deps: ['jquery']
      exports: 'angular'
    angularMarked:
      deps: ['angular', 'marked', 'hljs']
    angularHighlight:
      deps: ['angular', 'hljs']
    angularLocalStorage:
      deps: ['angular', 'ngCookies']
    angularTimeline:
      deps: ['angular']
    angularGrid:
      deps: ['angular']
    'ag-grid':
      deps: ['angular']
    angularSocketio:
      deps: ['angular', 'socketio']
    'angular-moment':
      deps: ['moment', 'moment-locale-cn', 'angular']
    'angular-translate':
      deps: ['angular']
    'angular-translate-load-url':
      deps: ['angular-translate']
    'angular-translate-loader-static-files':
      deps: ['angular-translate']
    ngRoute:
      deps: ['angular']
    ngResource:
      deps: ['angular']
    ngSanitize:
      deps: ['angular']
    ngCookies:
      deps: ['angular']
    dcbImgFallback:
      deps: ['angular']
    'angular-match-media':
      deps: ['angular']

# markdown
    showdown:
      exports: 'showdown'
    btfMarkdown:
      deps: ['angular', 'ngSanitize', 'showdown']
    marked:
      exports: 'marked'

# encryption
    tripledes:
      exports: 'CryptoJS'
    md5:
      exports: 'CryptoJS'

# utility
    underscore:
      exports: '_'
    numeraljs:
      exports: 'numeral'
    'angular.filter':
      deps: ['angular']
    asyncjs:
      exports: 'async'
    tween:
      exports: 'TWEEN'
    hammerjs:
      exports: 'Hammer'
    hotkeys:
      exports: 'hotkeys'
    'state-machine':
      exports: 'StateMachine'
    'js-shortid':
      exports: 'shortid'
    'in-view':
      exports: 'inView'

# network
    restangular:
      deps: ['angular', 'underscore']
    mqtt:
      exports: 'mqtt'
    socketio:
      exports: 'io'

# components
    reveal:
      exports: 'Reveal'
    gridstack:
      deps: ['jquery.ui.touch-punch']
      exports: 'GridStack'
    'cal-heatmap':
      deps: ['d3']
      exports: 'CalHeatMap'
    fullcalendar:
      deps: ['jquery']
      exports: 'fullCalendar'
    calendar:
      exports: 'calendar'
    heatmapjs:
      exports: 'h337'
    'webui-popover':
      deps: ['jquery']
      exports: 'WebuiPopover'
    qrcode:
      exports: 'QRCode'
    ionslider:
      deps: ['jquery']
      exports: 'Ionslider'
    smoothie:
      exports: 'SmoothieChart'
    gaugejs:
      exports: 'gaugejs'
    segment:
      exports: 'SegmentDisplay'
    segment2:
      exports: 'SegmentDisplay'
    pathfinding:
      exports: 'PF'
    'number-flip':
      exports: 'Flip'
    nouislider:
      exports: 'noUiSlider'
    popperjs:
      deps: ['jquery']
      exports: 'Popper'

    'js-xlsx':
      deps: ['js-zip']
      exports: 'XLSX'
    'xlsx-populate':
      exports: 'XlsxPopulate'
    'slick-carousel':
      exports: 'Slick'

    'jquery.fancytree':
      deps: ['jquery']
    fancytree:
      deps:['jquery.fancytree','jquery.fancytree.ui-deps']

# echarts
    echarts:
      deps: ['angular', 'jquery']
      exports: 'echarts'
    'echarts-bmap':
      deps: ['echarts']
    'echarts-liquidfill':
      deps: ['echarts']
      exports: 'echarts'

# baidu-map
    'baidu-map':
      exports: 'BMap'
    leaflet:
      exports: 'L'

# d3
    d3:
      exports: 'd3'
    'd3-sankey':
      deps: ['d3']
      exports: 'd3'

# spreadjs
    spreadjs:
#      deps: ['jquery']
      exports: 'GC'
    'spreadjs-print':
      deps: ['spreadjs']
      exports: 'GC'
    'spreadjs-excelio':
      deps: ['spreadjs']
      exports: 'excel'
    'spreadjs-angular':
      deps: ['angular', 'spreadjs']
      exports: 'GC'

# threejs
    three:
      exports: 'THREE'
    threejs:
      exports: 'THREE'
    'trackball-controls':
      deps: ['threejs']
    'orbit-controls':
      deps: ['threejs']
    'orbit-controls2':
      deps: ['threejs']
    'transform-controls':
      deps: ['threejs']
    'firstperson-controls':
      deps: ['threejs']
    'pointerlock-controls':
      deps: ['threejs']
    'combined-camera':
      deps: ['threejs']
    'css3d-renderer':
      deps: ['threejs']
    'css2d-renderer':
      deps: ['threejs']
    'svg-renderer':
      deps: ['threejs']
    'svg-loader':
      deps: ['threejs']
    'obj-loader':
      deps: ['threejs']
    'mtl-loader':
      deps: ['threejs']
    'collada-loader':
      deps: ['threejs']
    'stl-loader':
      deps: ['threejs']
    '3mf-loader':
      deps: ['threejs']
    'gltf-loader':
      deps: ['threejs']
    'json-loader':
      deps: ['threejs']
    'copy-shader':
      deps: ['threejs']
    'fxaa-shader':
      deps: ['threejs']
    'effect-composer':
#      deps: ['copy-shader', 'shader-pass']
      deps: ['copy-shader']
#      deps: ['threejs']
    'render-pass':
      deps: ['effect-composer']
    'shader-pass':
      deps: ['render-pass']
    'outline-pass':
      deps: ['shader-pass', 'fxaa-shader']
    jszip:
      exports: 'JSZip'
    jszip2:
      exports: 'JSZip'

# svg
    canvg:
      deps: ['rgb-color']
      exports: 'canvg'

# ace and dat
    ace:
      exports: 'ace'
    'ui-ace':
      deps: ['angular', 'ace']
      exports: 'ace'
    'dat.gui':
      exports: 'dat'

# snap.svg
    'snap.svg':
      exports: 'Snap'
    'snap':
      exports: 'Snap'
    'snap.svg.zpd':
      deps: ['snap.svg', 'hammerjs']
#      exports: 'zpd'
    'snap.svg.zpd2':
      deps: ['snap.svg', 'hammerjs']
#      exports: 'zpd'
    'svg.todataurl':
      deps: ['canvg']
      exports: 'SVG'
    'snap.svg.freetransform':
      deps: ['snap.svg']
      exports: 'ft'

# ai
    '@tensorflow/tfjs':
      exports: 'tfjs'
    '@tensorflow-models/coco-ssd':
#      deps: ['tensorflow']
      exports: 'cocoSsd'

# video
    videojs:
      exports: 'videojs'
    VideojsRecord:
      deps: ['videojs', 'RecordRTC']
      exports: 'VideojsRecord'
    RecordRTC:
      exports: 'RecordRTC'
    'videojs-zh':
      deps: ['videojs']
    'videojs-record-zh':
      deps: ['videojs']

# font
    'helvetiker_regular.typeface':
      deps: ['threejs']
      exports: 'helvetiker_regular'

# clc
    'clc.visualization':
      deps: ['angular', 'threejs', 'rx']
    'clc.graphic':
      deps: ['angular', 'threejs', 'rx']
    'clc.markdown':
      deps: ['angular']
    'clc.auth':
      deps: ['angular']
    'clc.reporting':
      deps: ['angular', 'spreadjs', 'rx']
    'clc.report':
      deps: ['angular', 'spreadjs', 'rx']
    'clc.model':
      deps: ['angular']
    'clc.bus':
      deps: ['angular']
    'clc.admin':
      deps: ['angular']
    'clc.gateway':
      deps: ['angular']
    'clc.notification':
      deps: ['angular']
    'clc.dcim':
      deps: ['angular', 'd3']
    'clc.cloud':
      deps: ['angular']
    'clc.skeleton':
      deps: ['angular']
    'clc.resource':
      deps: ['angular']
    'clc.sensorflow':
      deps: ['angular']
    'clc.workflow':
      deps: ['angular']
    'clc.office':
      deps: ['angular']


#  map:
#    '*':
#        css: libPath + 'require-css/css'

  packages: ['src']
  waitSeconds: 60

