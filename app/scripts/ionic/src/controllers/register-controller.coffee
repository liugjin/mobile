
define ['clc.foundation.angular/controllers/controller'], (base) ->
  class Ctrl extends base.Controller
    constructor: ($scope, $rootScope, $routeParams, $location, $window, @$state, @cloudAuthService, @toastService, @$timeout, @settingService, @$ionicModal, @$http, @modelManager, @modelEngine, @$ionicPopup) ->
      super $scope, $rootScope, $routeParams, $location, $window
      @init()
      #console.info '$rootScope',@$rootScope
      @ismail = false
      @isAll = false
      @code = null
      @TIME = null

    init: ->
      @registerData = {}
      @btnTxt = '下一步'
      @isRegister = false
      @initModal()

    dispose: ->
      super
      @modal?.remove()

    openModal: ->
      @modal.show()

    initModal: ->
      @$ionicModal.fromTemplateUrl('templates/modals/reg.html',
        scope: @$scope
        animation: 'slide-in-up').then (modal) =>
          @modal = modal
          @$scope.modal = modal
          @$scope.controller = @

    # 注册
    doRegister: ->
      if !@registerData.name
        M.toast {html: '公司名称不能为空！', displayLength:1500}
        return
      if !@isNameAvailable(@registerData.name)
        M.toast {html: '公司名称必须为中文！', displayLength:1500}
        return
      if !@registerData.user
        M.toast {html: '账号名称不能为空！', displayLength:1500}
        return
      if !@isUserAvailable(@registerData.user)
        M.toast {html: '账号名称只能包含字母数字和_！', displayLength:1500}
        return
      if !@registerData.email
        M.toast {html: '邮箱不能为空！', displayLength:1500}
        return
      if !@isEmailAvailable(@registerData.email)
        M.toast {html: '邮箱格式不正确！', displayLength:1500}
        return
      if !@registerData.password
        M.toast {html: '密码不能为空！', displayLength:1500}
        return
      if !@registerData.passwordAgain
        M.toast {html: '确认密码不能为空！', displayLength:1500}
        return
      if @registerData.password != @registerData.passwordAgain
        M.toast {html: '两次输入的密码不一致', displayLength:1500}
        return
      if !@registerData.phone
        M.toast {html: '手机号码不能为空！', displayLength:1500}
        return
      if !@registerData.code
        M.toast {html: '验证码不能为空', displayLength:1500}
        return
      if !@code || !@registerData.code || @code.toString() != @registerData.code.toString()
        M.toast {html: '验证码不正确', displayLength:1500}
        return
      if @phone isnt @registerData.phone
        M.toast {html: '已经修改手机号码，请重新获取验证码', displayLength:1500}
        return

      @btnTxt = '注册中...'
      @isRegister = true
      onSuccess = (resp) =>
#        console.info 'resp',resp
        if not resp?._err
          @toastService '注册成功！'
          if @$rootScope.preference
            @$rootScope.preference.user = @registerData.user
            @$rootScope.preference.name = @registerData.name
          else
            @$rootScope.preference =
              user: @registerData.user
              name: @registerData.name
          @$timeout =>
            @$ionicPopup.show {
              title: '注册成功!',
              buttons: [
                {
                  text: "确认",
                  type: "button-positive",
                  onTap: (e) =>
                    @$state.go 'supplier'
                }
              ]
            }
            #@$state.go 'supplier'
          , 600
        else
          @btnTxt = '注 册'
          @isRegister = false
          M.toast {html: resp._err}

      onFailure = (resp) =>
        @btnTxt = '注 册'
        @isRegister = false
        console.info 'resp',resp
        M.toast {html: resp}

      @user =
        name: @registerData.user
        password: @registerData.password
        phone: @phone  #取保存的手机号码
        user: @registerData.user
        email: @registerData.email
        visible: true

      @cloudAuthService.register @user, (err, resp)=>
        return onFailure err if err
        return onSuccess resp
#      @cloudAuthService.register(@user).$promise.then(
#        onSuccess, onFailure
#      )

    changeInput: () =>
      if @registerData.name and @registerData.user and @registerData.email and @registerData.password and @registerData.passwordAgain and @registerData.phone and @registerData.code
        @isAll = true
      else
        @isAll = false

    # 检测电话号码
    checkPhone: () =>
#      console.info 'phone',@registerData.phone
      if !@registerData.phone
        M.toast {html: '请输入手机号码！', displayLength:1500}
        return
      if !@isPoneAvailable(@registerData.phone)
        return M.toast {html: "手机号码格式不正确"}
      @hasPhone (users) =>
        people = _.find users, (user) => user.phone is @registerData.phone
        return M.toast {html: "手机号码已经注册，请重新输入！"} if people
        @sendSmsCode()

    # 发送短信验证码
    sendSmsCode: () =>
      @phone = @registerData.phone #存储当前手机号码值，防止注册时更改手机号码
      @ismail = true
      @TIME = 30
      @timer = setInterval () =>
        @$scope.$applyAsync () =>
          @TIME--
          if @TIME < 0
            clearInterval @timer
            @TIME = null
            @ismail = false
      ,1000

      url = "http://#{@$rootScope.preference.ip}/auth/sendsmscode/#{@registerData.phone}"
      @$http.post(url, {}).then (res) =>
        # console.info 'res',res.data
        if res.data && res.data.code
          @code = res.data.code
          M.toast {html: "手机验证码已发送到您手机上，5分钟内有效"}
        else
          @$http.post(url, {}).then (r) =>
            console.info 'r',r.data
            @code = r.data.code
      ,(err) =>
        console.info 'err',err

    # 判断电话号码是否已经注册
    hasPhone: (callback) =>
      url = "http://#{@$rootScope.preference.ip}/model/clc/api/v1/users?token=#{@$rootScope.preference.token}"
      @$http.get(url).then (res) =>
        callback? res.data

    # 检测公司名称为中文
    isNameAvailable: (str) ->
#      strReg= /^[\u4e00-\u9fa5]+$/
#      if !strReg.test str
#        return false
#      else
        return true

    # 检测用户名为数字字母和下划线
    isUserAvailable: (str) ->
      strReg= /^\w+$/
      if !strReg.test str
        return false
      else
        return true

    # 判断电话号码是否正确
    isPoneAvailable: (str) ->
      strReg= /^[1][3,4,5,7,8][0-9]{9}$/
      if !strReg.test str
        return false
      else
        return true

    # 邮箱格式是否正确
    isEmailAvailable: (str) ->
      strReg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z\-_]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
      if !strReg.test str
        return false
      else
        return true

    # 发送邮件
    sendMail: (phone) ->
      successCallback = (resp) ->
        console.info 'success',resp
        return
      errorCallback = (resp) ->
        console.info 'error',resp
        return
      data =
        phone: phone
      @$http.post('/industry/mail', data).then(successCallback, errorCallback);

    # 复制项目
    copyProject: () ->
      data =
        user0: 'admin'
        project0: 'ups-monitoring'
        user: @registerData.user
        project: 'ups-monitoring'
        name: '物联智能云监控平台'
      service = @modelManager.getService 'project'
      console.log service, '<-- service'
      generateProjectUrl = "http://127.0.0.1/model/clc/api/v1/generateProject/:user/:project"
      url = service.replaceUrlParam generateProjectUrl, data
      service.postData url, data, (err, result) =>
        console.log err, '<-- err'
        console.log result, '<-- result'

  exports =
    Ctrl: Ctrl
