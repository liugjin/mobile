
/*
* File: totaltask-card-directive
* User: David
* Date: 2020/01/02
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", 'clc.foundation.angular/models/structure-model'], function(base, css, view, _, moment, sm) {
  var TotaltaskCardDirective, exports;
  TotaltaskCardDirective = (function(_super) {
    __extends(TotaltaskCardDirective, _super);

    function TotaltaskCardDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.getTotalHandlingWorkTaskInfos = __bind(this.getTotalHandlingWorkTaskInfos, this);
      this.getTotalExcepEquipInfos = __bind(this.getTotalExcepEquipInfos, this);
      this.show = __bind(this.show, this);
      this.id = "totaltask-card";
      TotaltaskCardDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
      if (this.types == null) {
        this.types = new sm.StructureModel('type');
      }
    }

    TotaltaskCardDirective.prototype.setScope = function() {};

    TotaltaskCardDirective.prototype.setCSS = function() {
      return css;
    };

    TotaltaskCardDirective.prototype.setTemplate = function() {
      return view;
    };

    TotaltaskCardDirective.prototype.show = function(scope, element, attrs) {
      var _ref, _ref1, _ref2;
      scope.oldHandlingType = scope.parameters.type;
      scope.oldExcepType = scope.parameters.type;
      scope.totaltaskReportDatas = [];
      scope.handlingReportDatas = [];
      scope.execepReportDatas = [];
      scope.reportTitle = "";
      scope.showVertical = false;
      scope.count = 0;
      scope.data = [
        {
          id: "task-defect",
          key: "故障工单",
          stack: "待处理工单",
          val: 0,
          sort: 0
        }, {
          id: "task-plan",
          key: "巡检工单",
          stack: "待处理工单",
          val: 0,
          sort: 1
        }, {
          id: "task-predict",
          key: "维保工单",
          stack: "待处理工单",
          val: 0,
          sort: 2
        }, {
          id: "excepequips-defect",
          key: "故障设备",
          stack: "异常设备",
          val: 0,
          sort: 0
        }, {
          id: "excepequips-plan",
          key: "巡检设备",
          stack: "异常设备",
          val: 0,
          sort: 1
        }, {
          id: "excepequips-predict",
          key: "维保设备",
          stack: "异常设备",
          val: 0,
          sort: 2
        }
      ];
      scope.headers = [
        {
          headerName: "单号",
          field: "name",
          width: 268
        }, {
          headerName: "工单类型",
          field: "typeName"
        }, {
          headerName: "工单状态",
          field: "statusName"
        }, {
          headerName: "当前执行时间",
          field: "currexcutetime"
        }, {
          headerName: "负责人",
          field: "excutor"
        }, {
          headerName: "创建时间",
          field: "createtime"
        }, {
          headerName: "创建人",
          field: "creator"
        }
      ];
      scope.garddatas = [
        {
          name: "--",
          typeName: "--",
          statusName: "--",
          currexcutetime: "--",
          excutor: "--",
          createtime: "--",
          creator: "--"
        }
      ];
      this.loadTypes((function(_this) {
        return function(err, typedatas) {};
      })(this));
      scope.changeVertical = (function(_this) {
        return function() {
          scope.showVertical = !scope.showVertical;
          return scope.$applyAsync();
        };
      })(this);
      if ((_ref = scope.handlingSubscipt) != null) {
        _ref.dispose();
      }
      scope.handlingSubscipt = this.commonService.subscribeEventBus('component-totaltask-handingsheets', (function(_this) {
        return function(msg) {
          scope.reportTitle = "待处理工单明细表";
          scope.headers = [
            {
              headerName: "单号",
              field: "name",
              width: 268
            }, {
              headerName: "工单类型",
              field: "typeName"
            }, {
              headerName: "工单状态",
              field: "statusName"
            }, {
              headerName: "当前执行时间",
              field: "currexcutetime"
            }, {
              headerName: "负责人",
              field: "excutor"
            }, {
              headerName: "创建时间",
              field: "createtime"
            }, {
              headerName: "创建人",
              field: "creator"
            }
          ];
          if (_.isEmpty(scope.handlingReportDatas)) {
            _this.getTotalHandlingWorkTaskInfos(scope);
          } else if (scope.oldHandlingType !== scope.parameters.type) {
            scope.handlingReportDatas = [];
            scope.oldHandlingType = scope.parameters.type;
            _this.getTotalHandlingWorkTaskInfos(scope);
          } else {
            scope.garddatas = _.clone(scope.handlingReportDatas);
          }
          return scope.showTotalDetails();
        };
      })(this));
      if ((_ref1 = scope.excepequipSubscipt) != null) {
        _ref1.dispose();
      }
      scope.excepequipSubscipt = this.commonService.subscribeEventBus('component-totaltask-excepequips', (function(_this) {
        return function(msg) {
          scope.reportTitle = "异常设备明细表";
          scope.headers = [
            {
              headerName: "单号",
              field: "name",
              width: 268
            }, {
              headerName: "站点",
              field: "stationName"
            }, {
              headerName: "设备",
              field: "equipmentName"
            }, {
              headerName: "工单类型",
              field: "typeName"
            }, {
              headerName: "工单状态",
              field: "statusName"
            }, {
              headerName: "当前执行时间",
              field: "currexcutetime"
            }, {
              headerName: "负责人",
              field: "excutor"
            }, {
              headerName: "创建时间",
              field: "createtime"
            }, {
              headerName: "创建人",
              field: "creator"
            }
          ];
          if (_.isEmpty(scope.execepReportDatas)) {
            _this.getTotalExcepEquipInfos(scope);
          } else if (scope.oldExcepType !== scope.parameters.type) {
            scope.execepReportDatas = [];
            scope.oldExcepType = scope.parameters.type;
            _this.getTotalExcepEquipInfos(scope);
          } else {
            scope.garddatas = _.clone(scope.execepReportDatas);
          }
          return scope.showTotalDetails();
        };
      })(this));
      scope.showTotalDetails = function() {
        $("#totaltask-reportdetail-modal").modal('open');
        return scope.$applyAsync();
      };
      if ((_ref2 = scope.gridSubscrib) != null) {
        _ref2.dispose();
      }
      scope.gridSubscrib = this.commonService.subscribeEventBus("grid-single-selection", (function(_this) {
        return function(msg) {
          if (msg.message) {
            if (scope.reportTitle === "待处理工单明细表") {
              scope.task = msg.message[0].task;
              _this.commonService.publishEventBus("task-model", msg.message[0].task);
              return $("#singletask-detail-modal").modal('open');
            }
          }
        };
      })(this));
      scope.exportReport = (function(_this) {
        return function(header, name) {
          var reportName;
          reportName = name + moment().format("YYYYMMDDHHmmss") + ".csv";
          return _this.commonService.publishEventBus("export-report", {
            header: header,
            name: reportName
          });
        };
      })(this);
      return scope.$watch("parameters", (function(_this) {
        return function(param) {
          var count;
          console.info(param);
          _.each(scope.data, function(d, i) {
            return scope.data[i].val = 0;
          });
          _.mapObject(param.data, function(d, i) {
            var defectItem, index, tmpDefects, _i, _len, _results;
            if (i === "task") {
              return _.each(d, function(item) {
                var index, key;
                if (!(_.isEmpty(item.phase))) {
                  key = i + "-" + item.type;
                  index = _.findIndex(scope.data, function(m) {
                    return m.id === key;
                  });
                  if (index > -1) {
                    return scope.data[index].val += item.val;
                  }
                }
              });
            } else if (i === "excepequips") {
              return _.each(d, function(item) {
                var index, key;
                key = i + "-" + item.type;
                index = _.findIndex(scope.data, function(m) {
                  return m.id === key;
                });
                if (index > -1) {
                  return scope.data[index].val += item.val;
                }
              });
            } else if (i === "equipment") {
              tmpDefects = _.filter(param.data["equipment"], function(equipItem) {
                return equipItem.type === "defect";
              });
              if (tmpDefects.length > 0) {
                index = _.findIndex(scope.data, function(m) {
                  return m.id === "excepequips-defect";
                });
                _results = [];
                for (_i = 0, _len = tmpDefects.length; _i < _len; _i++) {
                  defectItem = tmpDefects[_i];
                  _results.push(scope.data[index].val += defectItem.val);
                }
                return _results;
              }
            }
          });
          count = 0;
          _.each(param.data.task, function(task) {
            return count += task.val;
          });
          if (scope.count !== count) {
            return scope.count = count;
          }
        };
      })(this));
    };

    TotaltaskCardDirective.prototype.getTotalExcepEquipInfos = function(scope) {
      var execCount, filter, formatTypeMap, formatTypeMap2, type;
      type = scope.parameters.type;
      execCount = type === "year" ? 3 : 5;
      formatTypeMap = {
        day: "%Y-%m-%d",
        month: "%Y-%m",
        year: "%Y"
      };
      formatTypeMap2 = {
        day: "MM-DD",
        month: "YYYY-MM",
        year: "YYYY"
      };
      filter = {};
      filter.user = this.$routeParams.user;
      filter.project = this.$routeParams.project;
      filter.createtime = {
        $gte: moment().subtract(execCount, type).startOf(type),
        $lte: moment().endOf(type)
      };
      return this.commonService.loadProjectModelByService('tasks', filter, '_id user project type process name creator task phase nodes createtime', (function(_this) {
        return function(err, taskmodels) {
          var equip, equipid, excutor, oldEquipid, taskmodelItem, typeModel, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3, _ref4;
          if (!taskmodels) {
            return;
          }
          scope.taskRecNum = taskmodels.length;
          for (_i = 0, _len = taskmodels.length; _i < _len; _i++) {
            taskmodelItem = taskmodels[_i];
            if (taskmodelItem.type === "defect") {
              typeModel = _.filter(_this.types.model, function(modelItem) {
                return modelItem.type === taskmodelItem.type;
              });
              excutor = "";
              if ((_.isEmpty(taskmodelItem.phase.nextManager)) && (taskmodelItem.phase.progress === 1)) {
                excutor = taskmodelItem.phase.manager.name;
              } else if (_.isEmpty(taskmodelItem.phase.nextManager)) {
                excutor = null;
              } else if (!_.isEmpty(taskmodelItem.phase.manager)) {
                excutor = taskmodelItem.phase.manager.name;
              } else if (!_.isEmpty(taskmodelItem.phase.nextManager)) {
                excutor = taskmodelItem.phase.nextManager.name;
              }
              scope.execepReportDatas.push({
                _id: taskmodelItem._id,
                task: taskmodelItem.task,
                name: taskmodelItem.name,
                typeName: typeModel[0].name,
                stationName: (_ref = taskmodelItem.source) != null ? _ref.stationName : void 0,
                equipmentName: (_ref1 = taskmodelItem.source) != null ? _ref1.equipmentName : void 0,
                statusName: _this.getStatusName(taskmodelItem.phase.progress, taskmodelItem.phase.state, taskmodelItem.phase.nextManager),
                currexcutetime: (_.isEmpty(taskmodelItem.phase.timestamp) ? null : moment(taskmodelItem.phase.timestamp).format("YYYY-MM-DD HH:mm:ss")),
                excutor: excutor,
                creator: (_ref2 = taskmodelItem.creator) != null ? _ref2.name : void 0,
                createtime: moment(taskmodelItem.createtime).format("YYYY-MM-DD HH:mm:ss")
              });
            } else if (taskmodelItem.type === "plan") {
              typeModel = _.filter(_this.types.model, function(modelItem) {
                return modelItem.type === taskmodelItem.type;
              });
              excutor = "";
              if ((_.isEmpty(taskmodelItem.phase.nextManager)) && (taskmodelItem.phase.progress === 1)) {
                excutor = taskmodelItem.phase.manager.name;
              } else if (_.isEmpty(taskmodelItem.phase.nextManager)) {
                excutor = null;
              } else if (!_.isEmpty(taskmodelItem.phase.manager)) {
                excutor = taskmodelItem.phase.manager.name;
              } else if (!_.isEmpty(taskmodelItem.phase.nextManager)) {
                excutor = taskmodelItem.phase.nextManager.name;
              }
              oldEquipid = "";
              _ref3 = taskmodelItem.nodes[0].contents[0].content.content;
              for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
                equip = _ref3[_j];
                if (equip.status === 1) {
                  equipid = equip.stationName + equip.equipName;
                  if (oldEquipid !== equipid) {
                    oldEquipid = equipid;
                    scope.execepReportDatas.push({
                      _id: taskmodelItem._id,
                      task: taskmodelItem.task,
                      name: taskmodelItem.name,
                      typeName: typeModel[0].name,
                      stationName: equip.stationName,
                      equipmentName: equip.equipName,
                      statusName: _this.getStatusName(taskmodelItem.phase.progress, taskmodelItem.phase.state, taskmodelItem.phase.nextManager),
                      currexcutetime: (_.isEmpty(taskmodelItem.phase.timestamp) ? null : moment(taskmodelItem.phase.timestamp).format("YYYY-MM-DD HH:mm:ss")),
                      excutor: excutor,
                      creator: (_ref4 = taskmodelItem.creator) != null ? _ref4.name : void 0,
                      createtime: moment(taskmodelItem.createtime).format("YYYY-MM-DD HH:mm:ss")
                    });
                  }
                }
              }
            }
          }
          return scope.garddatas = _.clone(scope.execepReportDatas);
        };
      })(this), true);
    };

    TotaltaskCardDirective.prototype.getTotalHandlingWorkTaskInfos = function(scope) {
      var execCount, filter, formatTypeMap, formatTypeMap2, type;
      type = scope.parameters.type;
      execCount = type === "year" ? 3 : 5;
      formatTypeMap = {
        day: "%Y-%m-%d",
        month: "%Y-%m",
        year: "%Y"
      };
      formatTypeMap2 = {
        day: "MM-DD",
        month: "YYYY-MM",
        year: "YYYY"
      };
      filter = {};
      filter.user = this.$routeParams.user;
      filter.project = this.$routeParams.project;
      filter.createtime = {
        $gte: moment().subtract(execCount, type).startOf(type),
        $lte: moment().endOf(type)
      };
      return this.commonService.loadProjectModelByService('tasks', filter, '_id user project type process name creator task phase nodes createtime', (function(_this) {
        return function(err, taskmodels) {
          var excutor, taskmodelItem, typeModel, _i, _len, _ref;
          if (!taskmodels) {
            return;
          }
          scope.taskRecNum = taskmodels.length;
          for (_i = 0, _len = taskmodels.length; _i < _len; _i++) {
            taskmodelItem = taskmodels[_i];
            if (!(_.isEmpty(taskmodelItem.phase.nextNode))) {
              typeModel = _.filter(_this.types.model, function(modelItem) {
                return modelItem.type === taskmodelItem.type;
              });
              excutor = "";
              if ((_.isEmpty(taskmodelItem.phase.nextManager)) && (taskmodelItem.phase.progress === 1)) {
                excutor = taskmodelItem.phase.manager.name;
              } else if (_.isEmpty(taskmodelItem.phase.nextManager)) {
                excutor = null;
              } else if (!_.isEmpty(taskmodelItem.phase.manager)) {
                excutor = taskmodelItem.phase.manager.name;
              } else if (!_.isEmpty(taskmodelItem.phase.nextManager)) {
                excutor = taskmodelItem.phase.nextManager.name;
              }
              scope.handlingReportDatas.push({
                _id: taskmodelItem._id,
                name: taskmodelItem.name,
                task: taskmodelItem.task,
                typeName: typeModel[0].name,
                statusName: _this.getStatusName(taskmodelItem.phase.progress, taskmodelItem.phase.state, taskmodelItem.phase.nextManager),
                currexcutetime: (_.isEmpty(taskmodelItem.phase.timestamp) ? null : moment(taskmodelItem.phase.timestamp).format("YYYY-MM-DD HH:mm:ss")),
                excutor: excutor,
                creator: (_ref = taskmodelItem.creator) != null ? _ref.name : void 0,
                createtime: moment(taskmodelItem.createtime).format("YYYY-MM-DD HH:mm:ss")
              });
            }
          }
          return scope.garddatas = _.clone(scope.handlingReportDatas);
        };
      })(this), true);
    };

    TotaltaskCardDirective.prototype.getTypeName = function(id) {
      var typeName;
      typeName = id;
      switch (id) {
        case 'defect':
          typeName = "故障工单";
          break;
        case 'plan':
          typeName = "巡检工单";
          break;
        case 'predict':
          typeName = "预测维保";
      }
      return typeName;
    };

    TotaltaskCardDirective.prototype.getStatusName = function(progress, state, manager) {
      if ((_.isEmpty(manager)) && !(progress >= 0)) {
        return "等待处理";
      } else if (state === "reject") {
        return "拒绝";
      } else if (state === "cancel") {
        return "取消";
      } else if ((progress < 1) || (!_.isEmpty(manager))) {
        return "进行中";
      } else {
        return "已结束";
      }
    };

    TotaltaskCardDirective.prototype.loadTypes = function(callback, refresh) {
      return this.commonService.loadProjectModelByService('processtypes', {}, 'type name', (function(_this) {
        return function(err, model) {
          _this.types.setItems(model);
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    TotaltaskCardDirective.prototype.resize = function(scope) {};

    TotaltaskCardDirective.prototype.dispose = function(scope) {
      var _ref, _ref1, _ref2;
      if ((_ref = scope.gridSubscrib) != null) {
        _ref.dispose();
      }
      if ((_ref1 = scope.handlingSubscipt) != null) {
        _ref1.dispose();
      }
      return (_ref2 = scope.excepequipSubscipt) != null ? _ref2.dispose() : void 0;
    };

    return TotaltaskCardDirective;

  })(base.BaseDirective);
  return exports = {
    TotaltaskCardDirective: TotaltaskCardDirective
  };
});
