requirejs(['hammerjs', 'app', 'routes'], function(hammerjs, app) {
  var start;
  window.jQuery = window.$ = $$;
  window.Hammer = hammerjs;
  start = function() {
    return angular.bootstrap(document, [app['name']]);
  };
  if (document.body && window.device) {
    return start();
  } else {
    return ionic.Platform.ready(start);
  }
});