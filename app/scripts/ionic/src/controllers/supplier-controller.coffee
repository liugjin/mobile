define ['clc.foundation.angular/controllers/controller'], (base) ->
  class Ctrl extends base.Controller
    constructor: ($scope, $rootScope, $routeParams, $location, $window, @$state, @cloudAuthService, @toastService, @$timeout, @settingService, @$ionicModal, @$http, @modelManager, @modelEngine, @$ionicPopup) ->
      super $scope, $rootScope, $routeParams, $location, $window, @modelManager
      @load()

    load: () ->
      data =
        token: @$rootScope.preference.token
        filter:
          user: 'admin'
        fields: 'user _id project name image updatetime stars keywords desc group'
      service = @modelManager.getService 'project'
      # console.info 'project',setting.urls.project
      projectUrl = "http://#{@$rootScope.preference.ip}/model/clc/api/v1/projects/:user/:project"
      url = service.replaceUrlParam projectUrl, data
      service.getData url, data, (err, result) =>
        # console.info result
        if err
          console.log err
        else
          @items = _.filter result, (item) ->
            return item.group == 'supplier'
          @selectProject = @items[0].project if @items[0]
          @projectUser = @items[0].user if @items[0]

    # 弹出确认框
    showConfirm: () =>
      project = _.find @items, (item) => item.name is @selectProjectName
      if not project
        M.toast {html: '该供应商未找到！'}
        return
      confirmPopup = @$ionicPopup.confirm {
        title: '选择确认'
        template: "确定选择#{@selectProjectName}？"
      }
      confirmPopup.then (res) =>
        if res
          @doRegister()

    # 注册
    doRegister: =>
      if !@selectProject
        M.toast {html: '请选择一个供应商'}
        return
      project = _.find @items, (item) => item.name is @selectProjectName
      @selectProject = project?.project
      @projectUser = (_.find @items, (project) => project.project is @selectProject)?.user
      if localStorage.getItem 'preference'
        preference = JSON.parse localStorage.getItem 'preference'
        preference.user = @$rootScope.preference.user
        preference.name = @$rootScope.preference.name
        preference.project = @selectProject
        preference.projectUser = @projectUser
        localStorage.setItem 'preference', JSON.stringify preference
      else
        preference =
          user: @$rootScope.preference.user
          name: @$rootScope.preference.name
          project: @selectProject
          projectUser: @projectUser
        localStorage.setItem 'preference', JSON.stringify preference
      @$rootScope.preference = preference
      url ="http://"+preference.ip+"/model/clc/api/v1/stations/"+preference.projectUser+"/"+preference.project+'?filter={"name":"'+preference.name+'"}&token='+preference.token
      @$http.get(url).then (res) =>
        if res.data.length is 0
          @createStation preference, (preference) =>
            @createEquip preference, (preference) =>
              @createRole preference
        else
          url = "http://#{preference.ip}/model/clc/api/v1/roles/#{preference.projectUser}/#{preference.project}/#{res.data[0].station}?token=#{preference.token}"
          @$http.get(url).then (resp) =>
            resp.data.users.push preference.user
            @$http.put(url, resp.data).then (response) =>
              @$state.go 'login'


#      @$state.go 'tab.overview', {user: @$rootScope.preference.user, project: @$rootScope.preference.project}
#      @$state.reload()
#      @$state.go(@$state.current, {}, {reload: true})

    # 创建站点
    createStation: (preference, callback) =>
      # console.info 'createStation', preference
      data =
        enable: true
        parent: ""
        name: preference.name
        token: preference.token
      url = "http://#{preference.ip}/model/clc/api/v1/stations/#{preference.projectUser}/#{preference.project}/#{preference.user}"
      @$http.post(url, data).then (res) =>
        # console.info 'createStation', res
        @stationId = res.data?.station ? @$rootScope.preference.user
        callback? preference

    # 创建管理设备
    createEquip: (preference, callback) =>
      mu = 'mu-' + @projectUser + '.' + @selectProject + '.' + @stationId
      su = 'su-_station_management'
      sampleUnits = [{
          "id": "su-0",
          "value": "#{mu}/#{su}"
      }]
      data =
        enable: true
        parent: ""
        name: "站点管理设备"
        token: preference.token
        type: "_station_management"
        vendor: "clc"
        template: "_station_management_template"
        sampleUnits: sampleUnits
      url = "http://#{preference.ip}/model/clc/api/v1/equipments/#{@projectUser}/#{@selectProject}/#{@stationId}/_station_management"
      @$http.post(url, data).then (res) =>
        # console.info 'createEquip', res
        callback? preference

    # 创建角色
    createRole: (preference) =>
      data =
        categories: ["_all"]
        modules: ["_all"]
        name: preference.user
        operations: ["_all"]
        services: ["_all"]
        stations: []
        users: []
        token: preference.token
      data.stations.push preference.user
      data.users.push preference.user
      url = "http://#{preference.ip}/model/clc/api/v1/roles/#{preference.projectUser}/#{preference.project}/#{preference.user}"
      @$http.post(url, data).then (res) =>
        # console.info 'createRole', res
        @$state.go 'login'

    # 获取角色
    getRole: (preference, callback) =>
      @setRole = 'admin' #设置admin角色
      url = "http://#{preference.ip}/model/clc/api/v1/roles/admin/#{preference.project}?token=#{preference.token}"
      @$http.get(url).then (res) =>
        if res.data
          filterRoles = _.filter res.data,(item) =>
            return item.role == @setRole
          role = filterRoles[0]
          if role.users[0] != "_all" && _.indexOf role.users,preference.user < 0
            role.users.push preference.user
          if role.stations[0] != "_all" && _.indexOf role.stations,preference.user < 0
            role.stations.push preference.user
          delete role._id
          role.token = preference.token
          url = "http://#{preference.ip}/model/clc/api/v1/roles/admin/#{preference.project}/#{@setRole}"
          @$http({method: 'PUT',url: url,data: role}).then (res) =>
            console.info '设置权限：',res
            @$state.go 'login'
        else
          M.toast {html: '角色不存在'}

    # 不需要选择某个项目
    defaultProject: () =>
      @selectCompany()
      @showConfirm()
      return

    # 选择供应商
    selectCompany: (project) =>
      if not project
        project = _.find @items, (item) => item.project is "iiot-cloud1"
        project = @items[0] if not project
      @selectProjectName = project.name

    # 检测输入
    changeInput: () =>
      $('.suggestion').show()
      return

    # 过滤供应商
    filterProjects: () =>
      (item)=>
        text = @selectProjectName?.toLowerCase()
        if not text
          return false
        if item.project?.toLowerCase().indexOf(text) >= 0
          return true
        if item.name?.toLowerCase().indexOf(text) >= 0
          return true
        return false

  exports =
    Ctrl: Ctrl
