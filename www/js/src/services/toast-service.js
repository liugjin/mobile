define([], function() {
  var exports, service;
  service = function($window, $timeout, $ionicLoading, $cordovaToast, settingService) {
    return function(message, duration) {
      var _ref;
      if (duration == null) {
        duration = 'short';
      }
      if (((_ref = $window.plugins) != null ? _ref.toast : void 0) != null) {
        return $cordovaToast.show(message, duration, 'center');
      } else {
        if (duration === 'long') {
          duration = settingService.TOAST_LONG_DELAY;
        } else {
          duration = settingService.TOAST_SHORT_DELAY;
        }
        return $timeout(function() {
          return $ionicLoading.show({
            template: message,
            duration: duration,
            noBackdrop: true
          });
        });
      }
    };
  };
  return exports = {
    service: service
  };
});
