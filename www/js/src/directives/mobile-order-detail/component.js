
/*
* File: mobile-order-detail-directive
* User: bingo
* Date: 2019/06/28
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var MobileOrderDetailDirective, exports;
  MobileOrderDetailDirective = (function(_super) {
    __extends(MobileOrderDetailDirective, _super);

    function MobileOrderDetailDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "mobile-order-detail";
      MobileOrderDetailDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
      this.taskService = commonService.modelEngine.modelManager.getService("tasks");
    }

    MobileOrderDetailDirective.prototype.setScope = function() {};

    MobileOrderDetailDirective.prototype.setCSS = function() {
      return css;
    };

    MobileOrderDetailDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileOrderDetailDirective.prototype.show = function($scope, element, attrs) {
      var getStatus, initData, queryTaskReport, subscribeStationSignal, updateNode;
      $scope.equipSubscription = {};
      $scope.task = null;
      $scope.checkContent = null;
      $scope.checkAllValues = {};
      $scope.currTask = {
        memo: "",
        name: ""
      };
      initData = (function(_this) {
        return function() {
          $scope.currTask = {
            memo: "",
            name: ""
          };
          $scope.checkContent = [
            {
              equiptype: "ups",
              equiptypeName: "UPS状态",
              equips: [
                {
                  station: "center-qianjiang",
                  stationName: "中心机房",
                  equipment: "ups1",
                  equipmentName: "艾默生1#",
                  value: [
                    {
                      signal: "phase--output-load-percentage",
                      name: "负载容量",
                      value: 0,
                      checked: true
                    }, {
                      signal: "communication-status",
                      name: "运行状态",
                      value: 0,
                      checked: true
                    }
                  ],
                  checked: true
                }, {
                  station: "center-qianjiang",
                  stationName: "中心机房",
                  equipment: "ups2",
                  equipmentName: "艾默生2#",
                  value: [
                    {
                      signal: "phase--output-load-percentage",
                      name: "负载容量",
                      value: 0,
                      checked: true
                    }, {
                      signal: "communication-status",
                      name: "运行状态",
                      value: 0,
                      checked: true
                    }
                  ],
                  checked: true
                }
              ]
            }, {
              equiptype: "environmental",
              equiptypeName: "温湿状态",
              equips: [
                {
                  station: "center-qianjiang",
                  stationName: "中心机房",
                  equipment: "th1",
                  equipmentName: "中心机房",
                  value: [
                    {
                      signal: "temperature",
                      name: "温度",
                      value: 0,
                      checked: true
                    }, {
                      signal: "humidity",
                      name: "湿度",
                      value: 0,
                      checked: true
                    }
                  ],
                  checked: true
                }, {
                  station: "battery-room",
                  stationName: "中心机房",
                  equipment: "th16",
                  equipmentName: "电池室",
                  value: [
                    {
                      signal: "temperature",
                      name: "温度",
                      value: 0,
                      checked: true
                    }, {
                      signal: "humidity",
                      name: "湿度",
                      value: 0,
                      checked: true
                    }
                  ],
                  checked: true
                }
              ]
            }, {
              equiptype: "meter",
              equiptypeName: "配电柜电压值",
              equips: [
                {
                  station: "center-qianjiang",
                  stationName: "中心机房",
                  equipment: "meter4",
                  equipmentName: "一楼总配电柜",
                  value: 0,
                  checked: true
                }
              ]
            }, {
              equiptype: "systemstatus",
              equiptypeName: "系统状况",
              equips: [
                {
                  station: "center-qianjiang",
                  stationName: "中心机房",
                  equipment: "ac1",
                  equipmentName: "空调1#",
                  value: "",
                  checked: true
                }, {
                  station: "center-qianjiang",
                  stationName: "中心机房",
                  equipment: "spm1",
                  equipmentName: "SPM1#",
                  value: "",
                  checked: true
                }, {
                  station: "center-qianjiang",
                  stationName: "中心机房",
                  equipment: "donghuan",
                  equipmentName: "动环系统",
                  value: "",
                  checked: true
                }, {
                  station: "center-qianjiang",
                  stationName: "中心机房",
                  equipment: "video",
                  equipmentName: "摄像系统",
                  value: "",
                  checked: true
                }, {
                  station: "center-qianjiang",
                  stationName: "中心机房",
                  equipment: "access",
                  equipmentName: "门禁系统",
                  value: "",
                  checked: true
                }, {
                  station: "center-qianjiang",
                  stationName: "中心机房",
                  equipment: "xinfeng",
                  equipmentName: "新风系统",
                  value: "",
                  checked: true
                }
              ]
            }
          ];
          $scope.checkAllValues[$scope.checkContent[0].equips[0].equipmentName + $scope.checkContent[0].equips[0].value[0].name] = $scope.checkContent[0].equips[0].value[0].checked;
          $scope.checkAllValues[$scope.checkContent[0].equips[0].equipmentName + $scope.checkContent[0].equips[0].value[1].name] = $scope.checkContent[0].equips[0].value[1].checked;
          $scope.checkAllValues[$scope.checkContent[0].equips[1].equipmentName + $scope.checkContent[0].equips[1].value[0].name] = $scope.checkContent[0].equips[1].value[0].checked;
          $scope.checkAllValues[$scope.checkContent[0].equips[1].equipmentName + $scope.checkContent[0].equips[1].value[1].name] = $scope.checkContent[0].equips[1].value[1].checked;
          $scope.checkAllValues[$scope.checkContent[1].equips[0].equipmentName + $scope.checkContent[1].equips[0].value[0].name] = $scope.checkContent[1].equips[0].value[0].checked;
          $scope.checkAllValues[$scope.checkContent[1].equips[0].equipmentName + $scope.checkContent[1].equips[0].value[1].name] = $scope.checkContent[1].equips[0].value[1].checked;
          $scope.checkAllValues[$scope.checkContent[1].equips[1].equipmentName + $scope.checkContent[1].equips[1].value[0].name] = $scope.checkContent[1].equips[1].value[0].checked;
          $scope.checkAllValues[$scope.checkContent[1].equips[1].equipmentName + $scope.checkContent[1].equips[1].value[1].name] = $scope.checkContent[1].equips[1].value[1].checked;
          $scope.checkAllValues[$scope.checkContent[2].equips[0].equipmentName] = $scope.checkContent[2].equips[0].checked;
          $scope.checkAllValues[$scope.checkContent[3].equips[0].equipmentName] = $scope.checkContent[3].equips[0].checked;
          $scope.checkAllValues[$scope.checkContent[3].equips[1].equipmentName] = $scope.checkContent[3].equips[1].checked;
          $scope.checkAllValues[$scope.checkContent[3].equips[2].equipmentName] = $scope.checkContent[3].equips[2].checked;
          $scope.checkAllValues[$scope.checkContent[3].equips[3].equipmentName] = $scope.checkContent[3].equips[3].checked;
          $scope.checkAllValues[$scope.checkContent[3].equips[4].equipmentName] = $scope.checkContent[3].equips[4].checked;
          return $scope.checkAllValues[$scope.checkContent[3].equips[5].equipmentName] = $scope.checkContent[3].equips[5].checked;
        };
      })(this);
      queryTaskReport = (function(_this) {
        return function() {
          return _this.commonService.loadProjectModelByService('tasks', {
            task: $scope.parameters.orderId
          }, 'user _id  project type process name creator task phase nodes createtime', function(err, taskModels) {
            if (err || !taskModels) {
              return;
            }
            return $scope.task = taskModels;
          });
        };
      })(this);
      getStatus = (function(_this) {
        return function(value) {
          var str;
          str = "";
          if (value === 0) {
            str = "正常";
          } else {
            str = "异常";
          }
          return str;
        };
      })(this);
      subscribeStationSignal = (function(_this) {
        return function() {
          var filter, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
          filter = {
            user: $scope.project.model.user,
            project: $scope.project.model.project,
            station: "center-qianjiang",
            equipment: "ups1",
            signal: "a-phase--output-load-percentage"
          };
          if ((_ref = $scope.equipSubscription["center-qianjiang" + "ups1" + "a-phase--output-load-percentage"]) != null) {
            _ref.dispose();
          }
          $scope.equipSubscription["center-qianjiang" + "ups1" + "a-phase--output-load-percentage"] = _this.commonService.signalLiveSession.subscribeValues(filter, function(err, d) {
            if (err) {
              return;
            }
            if ($scope.checkContent[0].equips[0].value[0].value < d.message.value) {
              return $scope.checkContent[0].equips[0].value[0].value = d.message.value.toFixed(2);
            }
          }, true);
          filter = {
            user: $scope.project.model.user,
            project: $scope.project.model.project,
            station: "center-qianjiang",
            equipment: "ups1",
            signal: "b-phase--output-load-percentage"
          };
          if ((_ref1 = $scope.equipSubscription["center-qianjiang" + "ups1" + "b-phase--output-load-percentage"]) != null) {
            _ref1.dispose();
          }
          $scope.equipSubscription["center-qianjiang" + "ups1" + "b-phase--output-load-percentage"] = _this.commonService.signalLiveSession.subscribeValues(filter, function(err, d) {
            if (err) {
              return;
            }
            if ($scope.checkContent[0].equips[0].value[0].value < d.message.value) {
              return $scope.checkContent[0].equips[0].value[0].value = d.message.value.toFixed(2);
            }
          }, true);
          filter = {
            user: $scope.project.model.user,
            project: $scope.project.model.project,
            station: "center-qianjiang",
            equipment: "ups1",
            signal: "c-phase--output-load-percentage"
          };
          if ((_ref2 = $scope.equipSubscription["center-qianjiang" + "ups1" + "c-phase--output-load-percentage"]) != null) {
            _ref2.dispose();
          }
          $scope.equipSubscription["center-qianjiang" + "ups1" + "c-phase--output-load-percentage"] = _this.commonService.signalLiveSession.subscribeValues(filter, function(err, d) {
            if (err) {
              return;
            }
            if ($scope.checkContent[0].equips[0].value[0].value < d.message.value) {
              return $scope.checkContent[0].equips[0].value[0].value = d.message.value.toFixed(2);
            }
          }, true);
          filter = {
            user: $scope.project.model.user,
            project: $scope.project.model.project,
            station: "center-qianjiang",
            equipment: "ups2",
            signal: "a-phase--output-load-percentage"
          };
          if ((_ref3 = $scope.equipSubscription["center-qianjiang" + "ups2" + "a-phase--output-load-percentage"]) != null) {
            _ref3.dispose();
          }
          $scope.equipSubscription["center-qianjiang" + "ups2" + "a-phase--output-load-percentage"] = _this.commonService.signalLiveSession.subscribeValues(filter, function(err, d) {
            if (err) {
              return;
            }
            if ($scope.checkContent[0].equips[1].value[0].value < d.message.value) {
              return $scope.checkContent[0].equips[1].value[0].value = d.message.value.toFixed(2);
            }
          }, true);
          filter = {
            user: $scope.project.model.user,
            project: $scope.project.model.project,
            station: "center-qianjiang",
            equipment: "ups2",
            signal: "b-phase--output-load-percentage"
          };
          if ((_ref4 = $scope.equipSubscription["center-qianjiang" + "ups2" + "b-phase--output-load-percentage"]) != null) {
            _ref4.dispose();
          }
          $scope.equipSubscription["center-qianjiang" + "ups2" + "b-phase--output-load-percentage"] = _this.commonService.signalLiveSession.subscribeValues(filter, function(err, d) {
            if (err) {
              return;
            }
            if ($scope.checkContent[0].equips[1].value[0].value < d.message.value) {
              return $scope.checkContent[0].equips[1].value[0].value = d.message.value.toFixed(2);
            }
          }, true);
          filter = {
            user: $scope.project.model.user,
            project: $scope.project.model.project,
            station: "center-qianjiang",
            equipment: "ups2",
            signal: "c-phase--output-load-percentage"
          };
          if ((_ref5 = $scope.equipSubscription["center-qianjiang" + "ups2" + "c-phase--output-load-percentage"]) != null) {
            _ref5.dispose();
          }
          $scope.equipSubscription["center-qianjiang" + "ups2" + "c-phase--output-load-percentage"] = _this.commonService.signalLiveSession.subscribeValues(filter, function(err, d) {
            if (err) {
              return;
            }
            if ($scope.checkContent[0].equips[1].value[0].value < d.message.value) {
              return $scope.checkContent[0].equips[1].value[0].value = d.message.value.toFixed(2);
            }
          }, true);
          filter = {
            user: $scope.project.model.user,
            project: $scope.project.model.project,
            station: "center-qianjiang",
            equipment: "ups1",
            signal: "communication-status"
          };
          if ((_ref6 = $scope.equipSubscription["center-qianjiang" + "ups1" + "communication-status"]) != null) {
            _ref6.dispose();
          }
          $scope.equipSubscription["center-qianjiang" + "ups1" + "communication-status"] = _this.commonService.signalLiveSession.subscribeValues(filter, function(err, d) {
            if (err) {
              return;
            }
            return $scope.checkContent[0].equips[0].value[1].value = getStatus(d.message.value);
          }, true);
          filter = {
            user: $scope.project.model.user,
            project: $scope.project.model.project,
            station: "center-qianjiang",
            equipment: "ups2",
            signal: "communication-status"
          };
          if ((_ref7 = $scope.equipSubscription["center-qianjiang" + "ups2" + "communication-status"]) != null) {
            _ref7.dispose();
          }
          $scope.equipSubscription["center-qianjiang" + "ups2" + "communication-status"] = _this.commonService.signalLiveSession.subscribeValues(filter, function(err, d) {
            if (err) {
              return;
            }
            return $scope.checkContent[0].equips[1].value[1].value = getStatus(d.message.value);
          }, true);
          filter = {
            user: $scope.project.model.user,
            project: $scope.project.model.project,
            station: "center-qianjiang",
            equipment: "th1",
            signal: "temperature"
          };
          if ((_ref8 = $scope.equipSubscription["center-qianjiang" + "th1" + "temperature"]) != null) {
            _ref8.dispose();
          }
          $scope.equipSubscription["center-qianjiang" + "th1" + "temperature"] = _this.commonService.signalLiveSession.subscribeValues(filter, function(err, d) {
            if (err) {
              return;
            }
            return $scope.checkContent[1].equips[0].value[0].value = d.message.value.toFixed(2);
          }, true);
          filter = {
            user: $scope.project.model.user,
            project: $scope.project.model.project,
            station: "center-qianjiang",
            equipment: "th1",
            signal: "humidity"
          };
          if ((_ref9 = $scope.equipSubscription["center-qianjiang" + "th1" + "humidity"]) != null) {
            _ref9.dispose();
          }
          $scope.equipSubscription["center-qianjiang" + "th1" + "humidity"] = _this.commonService.signalLiveSession.subscribeValues(filter, function(err, d) {
            if (err) {
              return;
            }
            return $scope.checkContent[1].equips[0].value[1].value = d.message.value.toFixed(2);
          }, true);
          filter = {
            user: $scope.project.model.user,
            project: $scope.project.model.project,
            station: "battery-room",
            equipment: "th16",
            signal: "temperature"
          };
          if ((_ref10 = $scope.equipSubscription["battery-room" + "th16" + "temperature"]) != null) {
            _ref10.dispose();
          }
          $scope.equipSubscription["battery-room" + "th16" + "temperature"] = _this.commonService.signalLiveSession.subscribeValues(filter, function(err, d) {
            if (err) {
              return;
            }
            return $scope.checkContent[1].equips[1].value[0].value = d.message.value.toFixed(2);
          }, true);
          filter = {
            user: $scope.project.model.user,
            project: $scope.project.model.project,
            station: "battery-room",
            equipment: "th16",
            signal: "humidity"
          };
          if ((_ref11 = $scope.equipSubscription["battery-room" + "th16" + "humidity"]) != null) {
            _ref11.dispose();
          }
          $scope.equipSubscription["battery-room" + "th16" + "humidity"] = _this.commonService.signalLiveSession.subscribeValues(filter, function(err, d) {
            if (err) {
              return;
            }
            return $scope.checkContent[1].equips[1].value[1].value = d.message.value.toFixed(2);
          }, true);
          filter = {
            user: $scope.project.model.user,
            project: $scope.project.model.project,
            station: "center-qianjiang",
            equipment: "meter4",
            signal: "phase-a-voltage"
          };
          if ((_ref12 = $scope.equipSubscription["center-qianjiang" + "meter4" + "phase-a-voltage"]) != null) {
            _ref12.dispose();
          }
          $scope.equipSubscription["center-qianjiang" + "meter4" + "phase-a-voltage"] = _this.commonService.signalLiveSession.subscribeValues(filter, function(err, d) {
            if (err) {
              return;
            }
            if ($scope.checkContent[2].equips[0].value < d.message.value) {
              return $scope.checkContent[2].equips[0].value = d.message.value.toFixed(2);
            }
          }, true);
          filter = {
            user: $scope.project.model.user,
            project: $scope.project.model.project,
            station: "center-qianjiang",
            equipment: "meter4",
            signal: "phase-b-voltage"
          };
          if ((_ref13 = $scope.equipSubscription["center-qianjiang" + "meter4" + "phase-b-voltage"]) != null) {
            _ref13.dispose();
          }
          $scope.equipSubscription["center-qianjiang" + "meter4" + "phase-b-voltage"] = _this.commonService.signalLiveSession.subscribeValues(filter, function(err, d) {
            if (err) {
              return;
            }
            if ($scope.checkContent[2].equips[0].value < d.message.value) {
              return $scope.checkContent[2].equips[0].value = d.message.value.toFixed(2);
            }
          }, true);
          filter = {
            user: $scope.project.model.user,
            project: $scope.project.model.project,
            station: "center-qianjiang",
            equipment: "meter4",
            signal: "phase-c-voltage"
          };
          if ((_ref14 = $scope.equipSubscription["center-qianjiang" + "meter4" + "phase-c-voltage"]) != null) {
            _ref14.dispose();
          }
          return $scope.equipSubscription["center-qianjiang" + "meter4" + "phase-c-voltage"] = _this.commonService.signalLiveSession.subscribeValues(filter, function(err, d) {
            if (err) {
              return;
            }
            if ($scope.checkContent[2].equips[0].value < d.message.value) {
              return $scope.checkContent[2].equips[0].value = d.message.value.toFixed(2);
            }
          }, true);
        };
      })(this);
      initData();
      queryTaskReport();
      subscribeStationSignal();
      $scope.checkedChange = (function(_this) {
        return function(objId, data) {
          return $scope.checkAllValues[objId] = data;
        };
      })(this);
      $scope.refreshData = (function(_this) {
        return function() {
          initData();
          return subscribeStationSignal();
        };
      })(this);
      $scope.uploadData = (function(_this) {
        return function() {
          var item, node, tmpAllValues, _i, _len;
          tmpAllValues = _.values($scope.checkAllValues);
          for (_i = 0, _len = tmpAllValues.length; _i < _len; _i++) {
            item = tmpAllValues[_i];
            if (!item) {
              _this.display("温馨提示：有部分漏巡检，请查证！");
              return;
            }
          }
          node = _.find($scope.task.nodes, function(node) {
            return node.node === $scope.task.phase.nextNode;
          });
          if (node) {
            if (_.isEmpty(node.contents)) {
              node.contents = [];
            }
            $scope.checkContent.push($scope.currTask.memo);
            node.contents.push({
              content: $scope.checkContent
            });
            return updateNode(node, "approval", function(err, result) {
              if (result) {
                return _this.publishEventBus("updateNodeResult", {
                  result: true,
                  err: err
                });
              } else {
                return _this.publishEventBus("updateNodeResult", {
                  result: false,
                  err: err
                });
              }
            });
          }
        };
      })(this);
      return updateNode = (function(_this) {
        return function(node, action, callback) {
          var data, phase, schema, url, user;
          schema = _this.taskService.url;
          url = _this.taskService.replaceUrlParam(schema, $scope.task, true);
          url += "/" + node.node;
          user = $scope.$root.user;
          phase = {
            _id: node._id,
            node: node.node,
            parameters: node.parameters,
            contents: node.contents,
            state: action,
            timestamp: new Date,
            manager: {
              id: user.user,
              name: user.name
            }
          };
          if (action === 'forward') {
            phase.forwarder = node.forwarder;
          }
          data = {
            _id: $scope.task._id,
            data: phase
          };
          return _this.taskService.postData(url, data, function(err, result) {
            return typeof callback === "function" ? callback(err, result) : void 0;
          });
        };
      })(this);
    };

    MobileOrderDetailDirective.prototype.resize = function($scope) {};

    MobileOrderDetailDirective.prototype.dispose = function($scope) {
      return _.mapObject($scope.equipSubscription, function(equipSubscriptionItem) {
        return equipSubscriptionItem != null ? equipSubscriptionItem.dispose() : void 0;
      });
    };

    return MobileOrderDetailDirective;

  })(base.BaseDirective);
  return exports = {
    MobileOrderDetailDirective: MobileOrderDetailDirective
  };
});
