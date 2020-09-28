

define [
  'clc.foundation.angular/services/service'
  'tripledes'
], (base, CryptoJS) ->
  class CloudAuthService extends base.Service
#    constructor: ($rootScope, @storage, $resource, @settingService) ->
    constructor: ($rootScope, @storage, @httpService, @settingService) ->
      super $rootScope

#      @loginResource = $resource settingService.urls.login
#      @registerResource = $resource settingService.urls.register
      @loginCookie = settingService.loginCookie
      @muSettingkey = settingService.muSettingCookie

    login: (username='', password='', callback) ->
      _password = @_encrypt password, username
      @httpService.post @settingService.urls.login, {username: username, password: _password}, (err, resp) =>
        if not err
          resp.password = password
          @$rootScope.user = resp
          @$rootScope.muSetting = @getMuSetting()
          @setUserCookie resp
        callback? err, resp
#      @loginResource.save(
#        null,
#        {
#          username: username,
#          password: _password
#        },
#        (resp) =>
#          if not resp?._err
#            resp.password = password
#            @$rootScope.user = resp
#            @$rootScope.muSetting = @getMuSetting()
#            @setUserCookie resp
#      )

    logout: ->
      @$rootScope.user = null

    register: (user, callback) ->
      user.password = @_encrypt user.password, user.user
      @httpService.post @settingService.urls.register, user, (err, resp) =>
        callback? err, resp

#      @registerResource.save(
#        null,
#        user,
#        (resp) =>
##          console.log resp, '<-- resp'
##          if not resp?._err
#
#      )


    getUserCookie: (encryption=true) ->
      user = @storage.get @loginCookie
      if encryption and user?.password and user.user
        user.password = @_decrypt user.password, user.user

      user

    setUserCookie: (value, encryption=true) ->
      if encryption and value?.password and value.user
        value.password = @_encrypt value.password, value.user

      @storage.set @loginCookie, value


    getMuSetting: ->
      muSetting = @storage.get @muSettingkey

      if not muSetting
        muSetting = @settingService.muSetting

      muSetting



    _encrypt: (message, secret) ->
      CryptoJS.DES.encrypt(message, secret).toString()

    _decrypt: (encrypted, secret) ->
      CryptoJS.DES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8)





  exports =
    CloudAuthService: CloudAuthService
