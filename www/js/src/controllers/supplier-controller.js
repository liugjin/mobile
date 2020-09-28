var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/controllers/controller'], function(base) {
  var Ctrl, exports;
  Ctrl = (function(_super) {
    __extends(Ctrl, _super);

    function Ctrl($scope, $rootScope, $routeParams, $location, $window, $state, cloudAuthService, toastService, $timeout, settingService, $ionicModal, $http, modelManager, modelEngine, $ionicPopup) {
      this.$state = $state;
      this.cloudAuthService = cloudAuthService;
      this.toastService = toastService;
      this.$timeout = $timeout;
      this.settingService = settingService;
      this.$ionicModal = $ionicModal;
      this.$http = $http;
      this.modelManager = modelManager;
      this.modelEngine = modelEngine;
      this.$ionicPopup = $ionicPopup;
      this.filterProjects = __bind(this.filterProjects, this);
      this.changeInput = __bind(this.changeInput, this);
      this.selectCompany = __bind(this.selectCompany, this);
      this.defaultProject = __bind(this.defaultProject, this);
      this.getRole = __bind(this.getRole, this);
      this.createRole = __bind(this.createRole, this);
      this.createEquip = __bind(this.createEquip, this);
      this.createStation = __bind(this.createStation, this);
      this.doRegister = __bind(this.doRegister, this);
      this.showConfirm = __bind(this.showConfirm, this);
      Ctrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, this.modelManager);
      this.load();
    }

    Ctrl.prototype.load = function() {
      var data, projectUrl, service, url;
      data = {
        token: this.$rootScope.preference.token,
        filter: {
          user: 'admin'
        },
        fields: 'user _id project name image updatetime stars keywords desc group'
      };
      service = this.modelManager.getService('project');
      projectUrl = "http://" + this.$rootScope.preference.ip + "/model/clc/api/v1/projects/:user/:project";
      url = service.replaceUrlParam(projectUrl, data);
      return service.getData(url, data, (function(_this) {
        return function(err, result) {
          if (err) {
            return console.log(err);
          } else {
            _this.items = _.filter(result, function(item) {
              return item.group === 'supplier';
            });
            if (_this.items[0]) {
              _this.selectProject = _this.items[0].project;
            }
            if (_this.items[0]) {
              return _this.projectUser = _this.items[0].user;
            }
          }
        };
      })(this));
    };

    Ctrl.prototype.showConfirm = function() {
      var confirmPopup, project;
      project = _.find(this.items, (function(_this) {
        return function(item) {
          return item.name === _this.selectProjectName;
        };
      })(this));
      if (!project) {
        M.toast({
          html: '该供应商未找到！'
        });
        return;
      }
      confirmPopup = this.$ionicPopup.confirm({
        title: '选择确认',
        template: "确定选择" + this.selectProjectName + "？"
      });
      return confirmPopup.then((function(_this) {
        return function(res) {
          if (res) {
            return _this.doRegister();
          }
        };
      })(this));
    };

    Ctrl.prototype.doRegister = function() {
      var preference, project, url, _ref;
      if (!this.selectProject) {
        M.toast({
          html: '请选择一个供应商'
        });
        return;
      }
      project = _.find(this.items, (function(_this) {
        return function(item) {
          return item.name === _this.selectProjectName;
        };
      })(this));
      this.selectProject = project != null ? project.project : void 0;
      this.projectUser = (_ref = _.find(this.items, (function(_this) {
        return function(project) {
          return project.project === _this.selectProject;
        };
      })(this))) != null ? _ref.user : void 0;
      if (localStorage.getItem('preference')) {
        preference = JSON.parse(localStorage.getItem('preference'));
        preference.user = this.$rootScope.preference.user;
        preference.name = this.$rootScope.preference.name;
        preference.project = this.selectProject;
        preference.projectUser = this.projectUser;
        localStorage.setItem('preference', JSON.stringify(preference));
      } else {
        preference = {
          user: this.$rootScope.preference.user,
          name: this.$rootScope.preference.name,
          project: this.selectProject,
          projectUser: this.projectUser
        };
        localStorage.setItem('preference', JSON.stringify(preference));
      }
      this.$rootScope.preference = preference;
      url = "http://" + preference.ip + "/model/clc/api/v1/stations/" + preference.projectUser + "/" + preference.project + '?filter={"name":"' + preference.name + '"}&token=' + preference.token;
      return this.$http.get(url).then((function(_this) {
        return function(res) {
          if (res.data.length === 0) {
            return _this.createStation(preference, function(preference) {
              return _this.createEquip(preference, function(preference) {
                return _this.createRole(preference);
              });
            });
          } else {
            url = "http://" + preference.ip + "/model/clc/api/v1/roles/" + preference.projectUser + "/" + preference.project + "/" + res.data[0].station + "?token=" + preference.token;
            return _this.$http.get(url).then(function(resp) {
              resp.data.users.push(preference.user);
              return _this.$http.put(url, resp.data).then(function(response) {
                return _this.$state.go('login');
              });
            });
          }
        };
      })(this));
    };

    Ctrl.prototype.createStation = function(preference, callback) {
      var data, url;
      data = {
        enable: true,
        parent: "",
        name: preference.name,
        token: preference.token
      };
      url = "http://" + preference.ip + "/model/clc/api/v1/stations/" + preference.projectUser + "/" + preference.project + "/" + preference.user;
      return this.$http.post(url, data).then((function(_this) {
        return function(res) {
          var _ref, _ref1;
          _this.stationId = (_ref = (_ref1 = res.data) != null ? _ref1.station : void 0) != null ? _ref : _this.$rootScope.preference.user;
          return typeof callback === "function" ? callback(preference) : void 0;
        };
      })(this));
    };

    Ctrl.prototype.createEquip = function(preference, callback) {
      var data, mu, sampleUnits, su, url;
      mu = 'mu-' + this.projectUser + '.' + this.selectProject + '.' + this.stationId;
      su = 'su-_station_management';
      sampleUnits = [
        {
          "id": "su-0",
          "value": "" + mu + "/" + su
        }
      ];
      data = {
        enable: true,
        parent: "",
        name: "站点管理设备",
        token: preference.token,
        type: "_station_management",
        vendor: "clc",
        template: "_station_management_template",
        sampleUnits: sampleUnits
      };
      url = "http://" + preference.ip + "/model/clc/api/v1/equipments/" + this.projectUser + "/" + this.selectProject + "/" + this.stationId + "/_station_management";
      return this.$http.post(url, data).then((function(_this) {
        return function(res) {
          return typeof callback === "function" ? callback(preference) : void 0;
        };
      })(this));
    };

    Ctrl.prototype.createRole = function(preference) {
      var data, url;
      data = {
        categories: ["_all"],
        modules: ["_all"],
        name: preference.user,
        operations: ["_all"],
        services: ["_all"],
        stations: [],
        users: [],
        token: preference.token
      };
      data.stations.push(preference.user);
      data.users.push(preference.user);
      url = "http://" + preference.ip + "/model/clc/api/v1/roles/" + preference.projectUser + "/" + preference.project + "/" + preference.user;
      return this.$http.post(url, data).then((function(_this) {
        return function(res) {
          return _this.$state.go('login');
        };
      })(this));
    };

    Ctrl.prototype.getRole = function(preference, callback) {
      var url;
      this.setRole = 'admin';
      url = "http://" + preference.ip + "/model/clc/api/v1/roles/admin/" + preference.project + "?token=" + preference.token;
      return this.$http.get(url).then((function(_this) {
        return function(res) {
          var filterRoles, role;
          if (res.data) {
            filterRoles = _.filter(res.data, function(item) {
              return item.role === _this.setRole;
            });
            role = filterRoles[0];
            if (role.users[0] !== "_all" && _.indexOf(role.users, preference.user < 0)) {
              role.users.push(preference.user);
            }
            if (role.stations[0] !== "_all" && _.indexOf(role.stations, preference.user < 0)) {
              role.stations.push(preference.user);
            }
            delete role._id;
            role.token = preference.token;
            url = "http://" + preference.ip + "/model/clc/api/v1/roles/admin/" + preference.project + "/" + _this.setRole;
            return _this.$http({
              method: 'PUT',
              url: url,
              data: role
            }).then(function(res) {
              console.info('设置权限：', res);
              return _this.$state.go('login');
            });
          } else {
            return M.toast({
              html: '角色不存在'
            });
          }
        };
      })(this));
    };

    Ctrl.prototype.defaultProject = function() {
      this.selectCompany();
      this.showConfirm();
    };

    Ctrl.prototype.selectCompany = function(project) {
      if (!project) {
        project = _.find(this.items, (function(_this) {
          return function(item) {
            return item.project === "iiot-cloud1";
          };
        })(this));
        if (!project) {
          project = this.items[0];
        }
      }
      return this.selectProjectName = project.name;
    };

    Ctrl.prototype.changeInput = function() {
      $('.suggestion').show();
    };

    Ctrl.prototype.filterProjects = function() {
      return (function(_this) {
        return function(item) {
          var text, _ref, _ref1, _ref2;
          text = (_ref = _this.selectProjectName) != null ? _ref.toLowerCase() : void 0;
          if (!text) {
            return false;
          }
          if (((_ref1 = item.project) != null ? _ref1.toLowerCase().indexOf(text) : void 0) >= 0) {
            return true;
          }
          if (((_ref2 = item.name) != null ? _ref2.toLowerCase().indexOf(text) : void 0) >= 0) {
            return true;
          }
          return false;
        };
      })(this);
    };

    return Ctrl;

  })(base.Controller);
  return exports = {
    Ctrl: Ctrl
  };
});
