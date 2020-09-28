var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./base/feature-base-controller', 'clc.foundation.angular/filters/format-string-filter'], function(base, fsf) {
  var Ctrl, exports;
  Ctrl = (function(_super) {
    __extends(Ctrl, _super);

    function Ctrl($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $cordovaBarcodeScanner, $state) {
      this.$cordovaBarcodeScanner = $cordovaBarcodeScanner;
      this.$state = $state;
      Ctrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options);
      this.formatString = fsf.FormatStringFilter();
      this.qrcode = '';
      this.msg = '';
      this.devices = {
        rebeng4: {
          id: 'rebeng4',
          name: '海悟产业园4#热泵',
          isNew: true
        },
        rebeng5: {
          id: 'rebeng5',
          name: '海悟产业园5#热泵',
          isNew: true
        }
      };
      this.device = null;
    }

    Ctrl.prototype.load = function(callback, refresh) {
      return Ctrl.__super__.load.call(this, (function(_this) {
        return function(err, model) {
          _this.createEquipment();
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    Ctrl.prototype.scanCode = function() {
      return this.$cordovaBarcodeScanner.scan().then((function(_this) {
        return function(result) {
          var _ref, _ref1;
          _this.qrcode = window.atob(result.text);
          if ((_ref = _this.devices[_this.qrcode]) != null ? _ref.isNew : void 0) {
            _this.device = _this.devices[_this.qrcode];
            return (_ref1 = _this.devices[_this.qrcode]) != null ? _ref1.isNew = false : void 0;
          } else {
            _this.device = null;
            if (_this.devices[_this.qrcode]) {
              return _this.$state.go('equipment', {
                user: 'clc',
                project: 'heatpump',
                station: 'shenzhen',
                equipment: _this.devices[_this.qrcode].id
              });
            }
          }
        };
      })(this), (function(_this) {
        return function(error) {
          _this.device = null;
          return alert('扫码错误 ' + error);
        };
      })(this))["finally"](function() {});
    };

    Ctrl.prototype.createEquipment = function(callback, refresh) {
      var model;
      model = {
        user: this.project.user,
        project: this.project.project,
        station: this.$routeParams.station,
        enable: true,
        owner: this.$rootScope.user.user,
        type: 'heart_pump',
        template: 'heatpump_template',
        vendor: 'haiwu'
      };
      this.equipment = this.station.createEquipment(model, null);
      return typeof callback === "function" ? callback(null, this.equipment) : void 0;
    };

    Ctrl.prototype.saveEquipment = function(callback) {
      var su, value, _ref, _ref1;
      this.equipment.model.equipment = (_ref = this.device) != null ? _ref.id : void 0;
      this.equipment.model.name = (_ref1 = this.device) != null ? _ref1.name : void 0;
      if (!this.equipment.model.equipment || (!this.equipment.model.name)) {
        this.display(null, '请填写完整资料');
        return;
      }
      value = "mu-" + this.equipment.model.user + "." + this.equipment.model.project + "." + this.equipment.model.station + "/su-" + this.equipment.model.equipment;
      su = {
        id: 'su',
        value: value
      };
      this.equipment.sampleUnits = {
        su: su
      };
      return Ctrl.__super__.saveEquipment.call(this, (function(_this) {
        return function(err, model) {
          _this.device = null;
          _this.msg = "" + _this.equipment.model.name + " 添加成功!";
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this));
    };

    return Ctrl;

  })(base.FeatureBaseController);
  return exports = {
    Ctrl: Ctrl
  };
});
