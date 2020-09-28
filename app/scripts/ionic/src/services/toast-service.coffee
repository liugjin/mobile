

define [], () ->

  service = ($window, $timeout, $ionicLoading, $cordovaToast, settingService) ->
    (message, duration = 'short') ->

      if $window.plugins?.toast?
        $cordovaToast.show message, duration, 'center'
      else
        # 加$timeout, 避免同时调用$ionicLoading.hide的时候toast也被关掉
        if duration is 'long'
          duration = settingService.TOAST_LONG_DELAY
        else
          duration = settingService.TOAST_SHORT_DELAY
        $timeout ->
          $ionicLoading.show
            template: message
            duration: duration
            noBackdrop: true

  exports =
    service: service
