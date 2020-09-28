
/*
* File: plantask-card-directive
* User: David
* Date: 2020/01/02
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", 'clc.foundation.angular/models/structure-model', "angularGrid"], function(base, css, view, _, moment, sm, agGrid) {
  var PlantaskCardDirective, exports;
  PlantaskCardDirective = (function(_super) {
    __extends(PlantaskCardDirective, _super);

    function PlantaskCardDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.createGridTable = __bind(this.createGridTable, this);
      this.getPlanTaskInfos = __bind(this.getPlanTaskInfos, this);
      this.show = __bind(this.show, this);
      this.id = "plantask-card";
      PlantaskCardDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
      if (this.types == null) {
        this.types = new sm.StructureModel('type');
      }
    }

    PlantaskCardDirective.prototype.setScope = function() {};

    PlantaskCardDirective.prototype.setCSS = function() {
      return css;
    };

    PlantaskCardDirective.prototype.setTemplate = function() {
      return view;
    };

    PlantaskCardDirective.prototype.show = function(scope, element, attrs) {
      var _ref;
      scope.oldType = scope.parameters.type;
      scope.planExcepItems = [];
      scope.planHandlingTasks = [];
      scope.allPlanTasks = [];
      scope.allPlanWorkItems = [];
      scope.reportTitle = "";
      scope.funcType = "execepequips";
      scope.workSeries = [
        {
          key: "bar",
          name: "工单",
          color: "rgb(85, 189, 255)"
        }, {
          key: "line",
          name: "巡检项",
          color: "rgb(200, 134, 147)"
        }
      ];
      scope.rignData = [
        {
          type: "allworkitems",
          title: "巡检项总数",
          val: 30,
          peresent: 0
        }, {
          type: "handling",
          title: "未完成工单数",
          val: 10,
          peresent: 0
        }, {
          type: "execepequips",
          title: "异常巡检点",
          val: 10,
          peresent: 0
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
      scope.date = [];
      scope.workData = [];
      scope.type = "day";
      scope.count = 0;
      this.loadTypes((function(_this) {
        return function(err, typedatas) {};
      })(this));
      if ((_ref = scope.planringsSubscrib) != null) {
        _ref.dispose();
      }
      scope.planringsSubscrib = this.commonService.subscribeEventBus("showrings-plantask", (function(_this) {
        return function(msg) {
          scope.funcType = msg.message.id;
          if (scope.funcType === "execepequips") {
            scope.reportTitle = "异常巡检点单明细表";
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
                headerName: "巡检点",
                field: "signalName"
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
          } else if (scope.funcType === "allworkitems") {
            scope.reportTitle = "巡检项单明细表";
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
                headerName: "巡检点",
                field: "signalName"
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
          } else if (scope.funcType === "allplantasks") {
            scope.reportTitle = "工单明细表";
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
          } else if (scope.funcType === "handling") {
            scope.reportTitle = "未完成工单明细表";
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
          }
          if (_.isEmpty(scope.allPlanTasks)) {
            scope.planExcepItems = [];
            scope.planHandlingTasks = [];
            scope.allPlanTasks = [];
            scope.allPlanWorkItems = [];
            _this.getPlanTaskInfos(scope, element);
          } else if (scope.oldType !== scope.parameters.type) {
            scope.planExcepItems = [];
            scope.planHandlingTasks = [];
            scope.allPlanTasks = [];
            scope.allPlanWorkItems = [];
            scope.oldType = scope.parameters.type;
            _this.getTotalExcepEquipInfos(scope, element);
          } else {
            if (scope.funcType === "execepequips") {
              scope.garddatas = _.clone(scope.planExcepItems);
            } else if (scope.funcType === "allworkitems") {
              scope.garddatas = _.clone(scope.allPlanWorkItems);
            } else if (scope.funcType === "handling") {
              scope.garddatas = _.clone(scope.planHandlingTasks);
            } else if (scope.funcType === "allplantasks") {
              scope.garddatas = _.clone(scope.allPlanTasks);
            }
            _this.createGridTable(scope, scope.garddatas, scope.headers, element, 'plantask');
          }
          return scope.showPlanTaskDetails();
        };
      })(this));
      scope.showPlanTaskDetails = function() {
        $("#plantask-reportdetail-modal").modal('open');
        return scope.$applyAsync();
      };
      return scope.$watch("parameters", (function(_this) {
        return function(param) {
          var count, excepworkitem, excepworkitemCounts, handlecounts, list, ringItem, taskItem, tmpTaskObjs, workItem, workitemCounts, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref1, _ref2, _ref3, _ref4, _ref5;
          if (!param) {
            return;
          }
          if (scope.date.length === 0) {
            scope.date = param.date;
          }
          if (scope.type !== param.type) {
            scope.type = param.type;
            scope.date = param.date;
          }
          list = _.map(param.data.workitems, function(workitem) {
            return {
              key: 'line',
              val: workitem.val,
              time: workitem.time
            };
          });
          tmpTaskObjs = {};
          _ref1 = param.data.task;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            taskItem = _ref1[_i];
            if (!tmpTaskObjs[taskItem.time + "&" + taskItem.type]) {
              tmpTaskObjs[taskItem.time + "&" + taskItem.type] = 0;
            }
            tmpTaskObjs[taskItem.time + "&" + taskItem.type] += taskItem.val;
          }
          _.mapObject(tmpTaskObjs, function(val, key) {
            return list.push({
              key: 'bar',
              val: val,
              time: key.split("&")[0]
            });
          });
          scope.workData = list;
          count = 0;
          handlecounts = 0;
          _ref2 = param.data.task;
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            taskItem = _ref2[_j];
            if (!(_.isEmpty(taskItem.phase))) {
              handlecounts += taskItem.val;
            }
            count += taskItem.val;
          }
          workitemCounts = 0;
          _ref3 = param.data.workitems;
          for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
            workItem = _ref3[_k];
            workitemCounts += workItem.val;
          }
          excepworkitemCounts = 0;
          _ref4 = param.data.excepworkitems;
          for (_l = 0, _len3 = _ref4.length; _l < _len3; _l++) {
            excepworkitem = _ref4[_l];
            excepworkitemCounts += excepworkitem.val;
          }
          _ref5 = scope.rignData;
          for (_m = 0, _len4 = _ref5.length; _m < _len4; _m++) {
            ringItem = _ref5[_m];
            if (ringItem.type === "handling") {
              ringItem.val = handlecounts;
              ringItem.title += ": " + handlecounts;
            } else if (ringItem.type === "allworkitems") {
              ringItem.val = workitemCounts;
              ringItem.title += ": " + workitemCounts;
            } else if (ringItem.type === "execepequips") {
              ringItem.val = excepworkitemCounts;
              ringItem.title += ": " + excepworkitemCounts;
            }
          }
          if (scope.count !== count) {
            return scope.count = count;
          }
        };
      })(this));
    };

    PlantaskCardDirective.prototype.getPlanTaskInfos = function(scope, element) {
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
      filter.type = "plan";
      filter.createtime = {
        $gte: moment().subtract(execCount, type).startOf(type),
        $lte: moment().endOf(type)
      };
      return this.commonService.loadProjectModelByService('tasks', filter, '_id user project type process name creator task phase nodes createtime', (function(_this) {
        return function(err, taskmodels) {
          var equip, excutor, taskmodelItem, typeModel, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
          if (!taskmodels) {
            return;
          }
          scope.taskRecNum = taskmodels.length;
          for (_i = 0, _len = taskmodels.length; _i < _len; _i++) {
            taskmodelItem = taskmodels[_i];
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
            _ref = taskmodelItem.nodes[0].contents[0].content.content;
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              equip = _ref[_j];
              if (equip.status === 1) {
                scope.planExcepItems.push({
                  _id: taskmodelItem._id,
                  task: taskmodelItem.task,
                  name: taskmodelItem.name,
                  typeName: typeModel[0].name,
                  stationName: equip.stationName,
                  equipmentName: equip.equipName,
                  signalName: equip.signalName,
                  statusName: _this.getStatusName(taskmodelItem.phase.progress, taskmodelItem.phase.state, taskmodelItem.phase.nextManager),
                  currexcutetime: (_.isEmpty(taskmodelItem.phase.timestamp) ? null : moment(taskmodelItem.phase.timestamp).format("YYYY-MM-DD HH:mm:ss")),
                  excutor: excutor,
                  creator: (_ref1 = taskmodelItem.creator) != null ? _ref1.name : void 0,
                  createtime: moment(taskmodelItem.createtime).format("YYYY-MM-DD HH:mm:ss")
                });
              }
              scope.allPlanWorkItems.push({
                _id: taskmodelItem._id,
                task: taskmodelItem.task,
                name: taskmodelItem.name,
                typeName: typeModel[0].name,
                stationName: equip.stationName,
                equipmentName: equip.equipName,
                signalName: equip.signalName,
                statusName: _this.getStatusName(taskmodelItem.phase.progress, taskmodelItem.phase.state, taskmodelItem.phase.nextManager),
                currexcutetime: (_.isEmpty(taskmodelItem.phase.timestamp) ? null : moment(taskmodelItem.phase.timestamp).format("YYYY-MM-DD HH:mm:ss")),
                excutor: excutor,
                creator: (_ref2 = taskmodelItem.creator) != null ? _ref2.name : void 0,
                createtime: moment(taskmodelItem.createtime).format("YYYY-MM-DD HH:mm:ss")
              });
              scope.allPlanTasks.push({
                _id: taskmodelItem._id,
                task: taskmodelItem.task,
                name: taskmodelItem.name,
                typeName: typeModel[0].name,
                statusName: _this.getStatusName(taskmodelItem.phase.progress, taskmodelItem.phase.state, taskmodelItem.phase.nextManager),
                currexcutetime: (_.isEmpty(taskmodelItem.phase.timestamp) ? null : moment(taskmodelItem.phase.timestamp).format("YYYY-MM-DD HH:mm:ss")),
                excutor: excutor,
                creator: (_ref3 = taskmodelItem.creator) != null ? _ref3.name : void 0,
                createtime: moment(taskmodelItem.createtime).format("YYYY-MM-DD HH:mm:ss")
              });
            }
          }
          scope.planHandlingTasks = _.filter(scope.allPlanTasks, function(item) {
            return (item.statusName !== "拒绝") || (item.statusName !== "已结束") || (item.statusName !== "取消");
          });
          if (scope.funcType === "execepequips") {
            scope.garddatas = _.clone(scope.planExcepItems);
          } else if (scope.funcType === "allworkitems") {
            scope.garddatas = _.clone(scope.allPlanWorkItems);
          } else if (scope.funcType === "handling") {
            scope.garddatas = _.clone(scope.planHandlingTasks);
          } else if (scope.funcType === "allplantasks") {
            scope.garddatas = _.clone(scope.allPlanTasks);
          }
          return _this.createGridTable(scope, scope.garddatas, scope.headers, element, 'plantask');
        };
      })(this), true);
    };

    PlantaskCardDirective.prototype.getTypeName = function(id) {
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

    PlantaskCardDirective.prototype.getStatusName = function(progress, state, manager) {
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

    PlantaskCardDirective.prototype.createGridTable = function(scope, data, header, element, type) {
      var onSelectionChanged, _ref;
      onSelectionChanged = (function(_this) {
        return function() {
          return _this.commonService.publishEventBus("plantask-grid-single-selection", scope.gridOptions.api.getSelectedRows());
        };
      })(this);
      scope.gridOptions = {
        columnDefs: header,
        rowData: null,
        enableFilter: false,
        rowSelection: 'single',
        enableSorting: true,
        enableColResize: true,
        overlayNoRowsTemplate: "无数据",
        headerHeight: 41,
        rowHeight: 61
      };
      if ((_ref = this.agrid) != null) {
        _ref.destroy();
      }
      this.agrid = new agGrid.Grid(element.find("#" + type)[0], scope.gridOptions);
      scope.gridOptions.api.sizeColumnsToFit();
      return scope.gridOptions.api.setRowData(data);
    };

    PlantaskCardDirective.prototype.loadTypes = function(callback, refresh) {
      return this.commonService.loadProjectModelByService('processtypes', {}, 'type name', (function(_this) {
        return function(err, model) {
          _this.types.setItems(model);
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    PlantaskCardDirective.prototype.resize = function(scope) {};

    PlantaskCardDirective.prototype.dispose = function(scope) {
      var _ref, _ref1;
      if ((_ref = scope.gridSubscrib) != null) {
        _ref.dispose();
      }
      return (_ref1 = scope.planringsSubscrib) != null ? _ref1.dispose() : void 0;
    };

    return PlantaskCardDirective;

  })(base.BaseDirective);
  return exports = {
    PlantaskCardDirective: PlantaskCardDirective
  };
});
