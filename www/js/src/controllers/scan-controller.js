var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./base/feature-base-controller', 'clc.foundation.angular/filters/format-string-filter', 'underscore'], function(base, fsf, _) {
  var Ctrl, exports;
  Ctrl = (function(_super) {
    __extends(Ctrl, _super);

    function Ctrl($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $state, $ionicPopup) {
      this.$state = $state;
      this.$ionicPopup = $ionicPopup;
      this.writeText = __bind(this.writeText, this);
      this.scanQr = __bind(this.scanQr, this);
      this.goToScan = __bind(this.goToScan, this);
      this.init = __bind(this.init, this);
      Ctrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options);
      this.formatString = fsf.FormatStringFilter();
      this.qrcode = '';
      this.flag = 0;
      this.templates = {};
      this.device = null;
    }

    Ctrl.prototype.load = function(callback, refresh) {
      return Ctrl.__super__.load.call(this, (function(_this) {
        return function(err, model) {
          _this.init();
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    Ctrl.prototype.init = function() {
      this.createEquipment();
      return this.project.loadEquipmentTemplates({
        desc: {
          $nin: [null, void 0, ""]
        }
      }, null, (function(_this) {
        return function(err, templates) {
          var arr, key, model, template, _i, _len;
          for (_i = 0, _len = templates.length; _i < _len; _i++) {
            template = templates[_i];
            model = template.model;
            arr = model.desc.split("|");
            key = arr[0];
            if (arr.length === 2) {
              model.sampleId = arr[1];
            }
            _this.templates[key] = model;
          }
          if (_this.$routeParams.strScan) {
            return _this.scanQr();
          }
        };
      })(this), false);
    };

    Ctrl.prototype.goToScan = function() {
      return this.$state.go('scanQr', {
        user: this.$routeParams.user,
        project: this.$routeParams.project,
        station: this.$routeParams.station,
        origin: this.$routeParams.origin
      }, {
        reload: true
      });
    };

    Ctrl.prototype.scanQr = function() {
      var text, _ref;
      this.device = null;
      this.flag = 0;
      this.qrcode = '';
      text = (_ref = this.$routeParams.strScan) != null ? _ref : "";
      return this.handleCode(text);
    };

    Ctrl.prototype.writeText = function() {
      var myPopup;
      this.$scope.data = {};
      myPopup = this.$ionicPopup.show({
        template: '<input type="text" ng-model="data.strScan">',
        title: '请输入设备的ID',
        scope: this.$scope,
        buttons: [
          {
            text: '取消'
          }, {
            text: '确认',
            type: 'button-positive',
            onTap: (function(_this) {
              return function(e) {
                if (!_this.$scope.data.strScan) {
                  return e.preventDefault();
                } else {
                  return _this.$scope.data.strScan;
                }
              };
            })(this)
          }
        ]
      });
      return myPopup.then((function(_this) {
        return function(res) {
          if (res) {
            return _this.handleCode(res);
          }
        };
      })(this));
    };

    Ctrl.prototype.scanCode = function() {
      return this.$cordovaBarcodeScanner.scan().then((function(_this) {
        return function(result) {
          var text;
          _this.device = null;
          _this.flag = 0;
          _this.qrcode = '';
          text = (result != null ? result.text : void 0) || '';
          return _this.handleCode(text);
        };
      })(this), (function(_this) {
        return function(error) {
          _this.device = null;
          return _this.display('扫码错误 ' + error);
        };
      })(this));
    };

    Ctrl.prototype.handleCode = function(code) {
      var data, id, key, keys, template;
      if (!code || code.length !== 13) {
        return this.display(null, "无效二维码");
      } else {
        keys = _.keys(this.templates);
        key = _.find(keys, function(ky) {
          return code.substr(0, 6).indexOf(ky) >= 0;
        });
        if (key) {
          template = this.templates[key];
        }
        if (template) {
          this.qrcode = code;
          id = code + "-" + template.type;
          data = {
            user: this.project.model.user,
            project: this.project.model.project,
            station: '+',
            equipment: id
          };
          return this.queryEquipment(data, (function(_this) {
            return function(err, equipment) {
              var _ref, _ref1;
              if (err) {
                return;
              }
              if (!(_.isEmpty(equipment))) {
                return _this.project.loadStations(null, function(err, stations) {
                  var station;
                  station = _.find(stations, function(station) {
                    return station.model.station === equipment.station;
                  });
                  if (station) {
                    return _this.$state.go('equipment', {
                      user: equipment.user,
                      project: equipment.project,
                      station: equipment.station,
                      equipment: equipment.equipment,
                      origin: _this.$routeParams.origin
                    });
                  } else {
                    return _this.display(null, "此设备已被添加！");
                  }
                });
              } else {
                _this.device = JSON.parse(JSON.stringify(template));
                _this.device.id = id;
                _this.device.name = code + "-" + template.type + "-" + template.template;
                _this.device.station = _this.station.model.station;
                _this.device.time = new Date();
                _this.device.typeName = (_ref = _.find(_this.project.dictionary.equipmenttypes.items, function(item) {
                  return item.model.type === _this.device.type;
                })) != null ? _ref.model.name : void 0;
                _this.device.vendorName = (_ref1 = _.find(_this.project.dictionary.vendors.items, function(item) {
                  return item.model.vendor === _this.device.vendor;
                })) != null ? _ref1.model.name : void 0;
                return _this.device.templateName = template.name;
              }
            };
          })(this));
        } else {
          return this.display(null, "项目不支持此类设备添加");
        }
      }
    };

    Ctrl.prototype.goToEquipment = function(equipment) {
      if (equipment == null) {
        equipment = this.equipment;
      }
      return this.$state.go('equipment', {
        user: equipment.model.user,
        project: equipment.model.project,
        station: equipment.model.station,
        equipment: equipment.model.equipment
      });
    };

    Ctrl.prototype.queryEquipment = function(data, callback) {
      var service;
      service = this.modelManager.getService("equipments");
      return service.query(data, null, function(err, values) {
        return typeof callback === "function" ? callback(err, values) : void 0;
      }, true);
    };

    Ctrl.prototype.createEquipment = function(callback, refresh) {
      var model;
      if (!this.station) {
        return;
      }
      model = {
        user: this.project.user,
        project: this.project.project,
        station: this.station.model.station,
        equipment: "",
        name: "",
        enable: true,
        owner: this.project.user
      };
      this.equipment = this.station.createEquipment(model, null);
      return typeof callback === "function" ? callback(null, this.equipment) : void 0;
    };

    Ctrl.prototype.saveEquipment = function(callback) {
      return this.equipment.loadProperties(null, (function(_this) {
        return function(err, properties) {
          var mu, munit, su, sunit, value, _ref, _ref1;
          _this.equipment.model.equipment = _this.device.id;
          _this.equipment.model.name = _this.device.id + "-" + _this.device.template;
          _this.equipment.model.type = _this.device.type;
          _this.equipment.model.typeName = _this.device.typeName;
          _this.equipment.model.template = _this.device.template;
          _this.equipment.model.templateName = _this.device.templateName;
          _this.equipment.model.vendor = _this.device.vendor;
          _this.equipment.model.vendorName = _this.device.vendorName;
          _this.equipment.model.station = _this.device.station;
          _this.equipment.model.stationName = (_ref = _.find(_this.project.stations.items, function(item) {
            return item.model.station === _this.device.station;
          })) != null ? _ref.model.name : void 0;
          _this.equipment.model.owner = _this.device.user;
          _this.equipment.setPropertyValue('location', _this.device.location);
          if (!_this.equipment.model.equipment || (!_this.equipment.model.name)) {
            _this.display(null, '请填写完整资料');
            return;
          }
          value = "" + _this.qrcode + "/" + _this.device.sampleId;
          su = _.find(_this.device.sampleUnits, function(s) {
            return s.id.indexOf('su') >= 0;
          });
          if (!su) {
            su = _this.device.sampleUnits[0];
          }
          sunit = {
            id: su.id,
            value: value
          };
          mu = _.find(_this.device.sampleUnits, function(s) {
            return s.id.indexOf('mu') >= 0;
          });
          munit = {
            id: (_ref1 = mu != null ? mu.id : void 0) != null ? _ref1 : 'mu',
            value: "" + _this.qrcode + "/_"
          };
          _this.equipment.sampleUnits = {
            su: sunit,
            mu: munit
          };
          _this.device.name = _this.device.id + "-" + _this.device.template;
          return Ctrl.__super__.saveEquipment.call(_this, function(err, model) {
            if (err) {
              _this.flag = -1;
            } else {
              _this.flag = 1;
            }
            return typeof callback === "function" ? callback(err, model) : void 0;
          });
        };
      })(this));
    };

    Ctrl.prototype.goBack = function() {
      if (this.$routeParams.origin === 'overview') {
        return this.$state.go('tab.overview', {
          user: this.$routeParams.user,
          project: this.$routeParams.project
        });
      } else if (this.$routeParams.origin === 'setting') {
        return this.$state.go('tab.setting', {
          user: this.$routeParams.user,
          project: this.$routeParams.project
        });
      } else if (this.$routeParams.origin === 'signal') {
        return this.$state.go('tab.signal', {
          user: this.$routeParams.user,
          project: this.$routeParams.project
        });
      } else {

      }
    };

    return Ctrl;

  })(base.FeatureBaseController);
  return exports = {
    Ctrl: Ctrl
  };
});
