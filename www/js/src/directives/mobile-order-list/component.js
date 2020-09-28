
/*
* File: mobile-order-list-directive
* User: bingo
* Date: 2019/06/28
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var MobileOrderListDirective, exports;
  MobileOrderListDirective = (function(_super) {
    __extends(MobileOrderListDirective, _super);

    function MobileOrderListDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "mobile-order-list";
      MobileOrderListDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
      this.taskService = commonService.modelEngine.modelManager.getService("tasks");
      this.processtypesService = commonService.modelEngine.modelManager.getService("processtypes");
    }

    MobileOrderListDirective.prototype.setScope = function() {};

    MobileOrderListDirective.prototype.setCSS = function() {
      return css;
    };

    MobileOrderListDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileOrderListDirective.prototype.show = function(scope, element, attrs) {
      var changeTable, colorMap, colorMap2, colorMap3, getDataSource, getDataSourceLazy, init, prioritiesMap, timeTranform, warpSource, _ref, _ref1;
      scope.orderImg = this.getComponentPath('image/order.svg');
      prioritiesMap = {
        1: "低",
        2: "中",
        3: "高"
      };
      this.allData = [];
      scope.processtypes = {};
      scope.data = [];
      scope.currentType = '';
      scope.count = {};
      scope.openIndex = 0;
      scope.toggle = false;
      scope.lastQuery = scope.project.getIds();
      scope.openTask = (function(_this) {
        return function(index) {
          if (index !== scope.openIndex) {
            scope.toggle = true;
            return scope.openIndex = index;
          } else {
            scope.toggle = !scope.toggle;
            return scope.openIndex = index;
          }
        };
      })(this);
      scope.selectOrder = (function(_this) {
        return function(task) {
          return _this.commonService.publishEventBus("task-model", {
            open: true,
            task: task,
            isEdit: true
          });
        };
      })(this);
      timeTranform = (function(_this) {
        return function(d) {
          var str;
          if (!d) {
            return null;
          }
          str = moment(d).format();
          return str.slice(0, 19).split("T").join(" ");
        };
      })(this);
      colorMap = {
        1: "#14C3F5",
        2: "#F53914",
        3: "#FF800B",
        4: "#32CA59",
        5: "#BECA32"
      };
      colorMap2 = {
        1: "#14C3F5",
        2: "#F53914",
        3: "#FF800B",
        4: "#32CA59",
        5: "#BECA32"
      };
      colorMap3 = {
        1: "#c0ca33",
        2: "#ff9800",
        3: "#ff8000",
        4: "#ff0000"
      };
      scope.tableConfig = [];
      changeTable = (function(_this) {
        return function(type) {
          if (type === "defect") {
            return scope.tableConfig = [
              {
                title: "完成状态",
                id: "phase",
                "class": "colorItem",
                color: colorMap,
                formate: function(d) {
                  return _this.getStatusName(d);
                }
              }, {
                title: "最近更新时间",
                id: "updatetime",
                "class": "time",
                formate: timeTranform
              }, {
                title: "故障值",
                id: "source",
                formate: function(d) {
                  return d.startValue;
                }
              }, {
                title: "故障原因",
                id: "source",
                formate: function(d) {
                  return d.title;
                }
              }, {
                title: "故障开始时间",
                id: "source",
                formate: function(d) {
                  return timeTranform(d != null ? d.startTime : void 0);
                }
              }, {
                title: "优先级",
                id: "priority",
                "class": "colorItem",
                color: colorMap2,
                formate: function(d) {
                  return prioritiesMap[d];
                }
              }, {
                title: "告警等级",
                id: "source",
                "class": "colorItem",
                color: colorMap3
              }, {
                title: "创建人",
                id: "creator",
                "class": "name",
                formate: function(d) {
                  return d.name;
                }
              }, {
                title: "备注",
                id: "memo",
                "class": ""
              }
            ];
          } else {
            return scope.tableConfig = [
              {
                title: "工单名称",
                id: "name",
                "class": "task"
              }, {
                title: "完成状态",
                id: "phase",
                "class": "colorItem",
                color: colorMap,
                formate: function(d) {
                  return _this.getStatusName(d);
                }
              }, {
                title: "工单创建时间",
                id: "createtime",
                "class": "time",
                formate: timeTranform
              }, {
                title: "最近更新时间",
                id: "updatetime",
                "class": "time",
                formate: timeTranform
              }, {
                title: "优先级",
                id: "priority",
                "class": "colorItem",
                color: colorMap2,
                formate: function(d) {
                  return prioritiesMap[d];
                }
              }, {
                title: "创建人",
                id: "creator",
                "class": "name",
                formate: function(d) {
                  return d.name;
                }
              }, {
                title: "备注",
                id: "memo",
                "class": ""
              }
            ];
          }
        };
      })(this);
      getDataSource = (function(_this) {
        return function(param, isInit) {
          var filter;
          filter = scope.project.getIds();
          if (isInit && !param) {
            filter["createtime"] = {
              "$gte": moment().subtract(7, 'days').format('YYYY-MM-DD 00:00:00'),
              "$lte": moment().format('YYYY-MM-DD 23:59:59')
            };
          } else {
            filter = param;
          }
          scope.lastQuery = filter;
          return _this.commonService.loadProjectModelByService('tasks', filter, null, function(err, resp) {
            var _data;
            if (!resp) {
              return _this.display("工单查询失败!!", 500);
            }
            _data = _.filter(resp, function(m) {
              return m.visible;
            });
            _this.allData = _.groupBy(_data, function(d) {
              return d.type;
            });
            scope.count = _.mapObject(scope.count, function(d, i) {
              if (_.has(_this.allData, i)) {
                return _this.allData[i].length;
              } else {
                _this.allData[i] = [];
                return 0;
              }
            });
            changeTable(scope.currentType);
            if (isInit) {
              scope.data = _this.allData[scope.currentType];
            } else {
              scope.data = _this.allData[scope.currentType];
            }
            return scope.$applyAsync();
          }, true);
        };
      })(this);
      getDataSourceLazy = _.throttle(getDataSource, 1000, {
        leading: false
      });
      init = (function(_this) {
        return function() {
          var filter;
          if (_.isEmpty(scope.processtypes)) {
            filter = scope.project.getIds();
            return _this.processtypesService.query(filter, null, function(err, datas) {
              var _datas;
              if (!datas || (datas != null ? datas.length : void 0) === 0) {
                return _this.display("查询工单类型失败/为空!!", 500);
              }
              _datas = _.sortBy(_.filter(datas, function(m) {
                return m.visible;
              }), function(d) {
                return d._index;
              });
              scope.currentType = _datas[0].type;
              scope.processtypes = _.object(_.map(_datas, function(d) {
                return d.type;
              }), _.map(_datas, function(d) {
                return d.name;
              }));
              scope.count = _.mapObject(scope.processtypes, function(d) {
                return 0;
              });
              return getDataSourceLazy(null, true);
            });
          } else {
            return getDataSourceLazy(null, true);
          }
        };
      })(this);
      init();
      scope.edit = (function(_this) {
        return function(task) {
          return _this.commonService.publishEventBus("task-model", {
            open: true,
            task: task,
            isEdit: true
          });
        };
      })(this);
      scope.info = (function(_this) {
        return function(task) {
          return _this.commonService.publishEventBus("task-model", {
            open: true,
            task: task,
            isEdit: false
          });
        };
      })(this);
      scope["delete"] = (function(_this) {
        return function(task) {
          return _this.taskService.remove(task, function(err, taskdata) {
            if (err) {
              return;
            }
            _this.dispose("删除成功", 500);
            return getDataSourceLazy(scope.lastQuery, false);
          });
        };
      })(this);
      scope.changeType = (function(_this) {
        return function(type) {
          if (scope.currentType === type) {
            return;
          }
          changeTable(type);
          scope.currentType = type;
          scope.data = _this.allData[type];
          return scope.$applyAsync();
        };
      })(this);
      if ((_ref = scope.subscribePage) != null) {
        _ref.dispose();
      }
      scope.subscribePage = this.commonService.subscribeEventBus("task-query", (function(_this) {
        return function(msg) {
          var query;
          if (!(msg != null ? msg.message : void 0)) {
            return;
          }
          if (typeof msg.message !== "string") {
            query = msg.message;
            query["createtime"] = {
              "$gte": moment(msg.message.createtime["$gte"]).format('YYYY-MM-DD 00:00:00'),
              "$lte": moment(msg.message.createtime["$lte"]).format('YYYY-MM-DD 23:59:59')
            };
            return getDataSourceLazy(query, true);
          }
        };
      })(this));
      warpSource = (function(_this) {
        return function(d, data) {
          if (data === "") {
            return {
              "startTime": d.startTime,
              "station": d.station,
              "stationName": d.stationName,
              "equipment": d.equipment,
              "equipName": d.equipmentName,
              "event": d.event,
              "eventName": d.eventName,
              "startValue": d.startValue,
              "defect_representation": "",
              "defect_reason": d.title,
              "defect_analysis": "",
              "loss_situation": "",
              "work_status": d.work_status,
              "startTime": timeTranform(d.startTime),
              "severity": d.severity,
              "severityName": d.severityName
            };
          }
          if (data.startValue !== d.startValue || data.startTime !== timeTranform(d.startTime) || data.severity !== d.severity) {
            return false;
          }
          data.startValue = d.startValue;
          data.startTime = timeTranform(d.startTime);
          data.severity = d.severity;
          return data;
        };
      })(this);
      if ((_ref1 = scope.subPlanTaskChange) != null) {
        _ref1.dispose();
      }
      scope.subPlanTaskChange = this.commonService.configurationLiveSession.subscribe("tasks/" + scope.$root.user.user + "/#", (function(_this) {
        return function(err, d) {
          var data, node, status, task;
          if (!d) {
            return;
          }
          if (d.topic.indexOf("configuration/task/create/") === 0 || d.topic.indexOf("configuration/task/update/") === 0) {
            if (d.message.type === "defect") {
              data = d.message.nodes[0].contents[0].content;
              status = _this.getStatusName(d.message.phase);
              if (status === 1 || status === 4) {
                task = d.message;
                node = warpSource(d.message.source, data);
                if (node) {
                  task.nodes[0].contents[0].content = {
                    content: [node],
                    handle_details: [],
                    attachments: []
                  };
                  _this.taskService.save(task, function(err, taskData) {
                    return getDataSourceLazy(scope.lastQuery, false);
                  }, true);
                  return;
                }
              }
            }
            return getDataSourceLazy(scope.lastQuery, false);
          }
        };
      })(this));
      return scope.stateMap = {
        1: "等待处理",
        2: "拒绝",
        3: "取消",
        4: "进行中",
        5: "已结束"
      };
    };

    MobileOrderListDirective.prototype.getStatusName = function(phase) {
      var status;
      status = 0;
      if (_.isEmpty(phase != null ? phase.nextManager : void 0) && !((phase != null ? phase.progress : void 0) >= 0)) {
        status = 1;
      } else if ((phase != null ? phase.state : void 0) === "reject") {
        status = 2;
      } else if ((phase != null ? phase.state : void 0) === "cancel") {
        status = 3;
      } else if (((phase != null ? phase.progress : void 0) < 1) || !_.isEmpty(phase != null ? phase.nextManager : void 0)) {
        status = 4;
      } else {
        status = 5;
      }
      return status;
    };

    MobileOrderListDirective.prototype.resize = function(scope) {};

    MobileOrderListDirective.prototype.dispose = function(scope) {
      var _ref, _ref1;
      if ((_ref = scope.subscribePage) != null) {
        _ref.dispose();
      }
      return (_ref1 = scope.subPlanTaskChange) != null ? _ref1.dispose() : void 0;
    };

    return MobileOrderListDirective;

  })(base.BaseDirective);
  return exports = {
    MobileOrderListDirective: MobileOrderListDirective
  };
});
