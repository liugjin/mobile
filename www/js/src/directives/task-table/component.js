
/*
* File: task-table-directive
* User: David
* Date: 2019/11/14
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var TaskTableDirective, exports;
  TaskTableDirective = (function(_super) {
    __extends(TaskTableDirective, _super);

    function TaskTableDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "task-table";
      TaskTableDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
      this.taskRecordService = commonService.modelEngine.modelManager.getService("reporting.records.task");
      this.taskService = commonService.modelEngine.modelManager.getService("tasks");
      this.processtypesService = commonService.modelEngine.modelManager.getService("processtypes");
    }

    TaskTableDirective.prototype.setScope = function() {};

    TaskTableDirective.prototype.setCSS = function() {
      return css;
    };

    TaskTableDirective.prototype.setTemplate = function() {
      return view;
    };

    TaskTableDirective.prototype.show = function(scope, element, attrs) {
      var allData, changeTable, checkPage, colorMap, colorMap2, colorMap3, getDataSource, getDataSourceLazy, init, initPage, prioritiesMap, timeTranform, warpSource, _ref, _ref1;
      prioritiesMap = {
        1: "低",
        2: "中",
        3: "高"
      };
      allData = [];
      scope.processtypes = {};
      scope.data = [];
      scope.pages = {
        page: [],
        current: 1
      };
      scope.currentType = '';
      scope.count = {};
      scope.lastQuery = scope.project.getIds();
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
      initPage = (function(_this) {
        return function(len) {
          var arr, count, x, _i, _j;
          arr = [];
          if (len > 0) {
            count = Math.ceil(len / 10);
            if (count <= 10) {
              for (x = _i = count; count <= 1 ? _i <= 1 : _i >= 1; x = count <= 1 ? ++_i : --_i) {
                arr.push(x);
              }
            } else {
              for (x = _j = count; count <= 1 ? _j <= 1 : _j >= 1; x = count <= 1 ? ++_j : --_j) {
                if (x <= 3 || x >= count - 2) {
                  arr.push(x);
                } else if (x === 4) {
                  arr.push(-2);
                } else if (x === count - 3) {
                  arr.push(-1);
                }
              }
            }
          }
          return scope.pages = {
            page: arr,
            current: 1
          };
        };
      })(this);
      changeTable = (function(_this) {
        return function(type) {
          if (type === "defect") {
            return scope.tableConfig = [
              {
                title: "工单号",
                id: "task",
                "class": "task"
              }, {
                title: "工单类型",
                id: "type",
                "class": ""
              }, {
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
                title: "故障原因",
                id: "source",
                formate: function(d) {
                  return d.title;
                }
              }, {
                title: "故障值",
                id: "source",
                formate: function(d) {
                  return d.startValue;
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
                title: "工单号",
                id: "task",
                "class": "task"
              }, {
                title: "工单名称",
                id: "name",
                "class": "task"
              }, {
                title: "工单类型",
                id: "type",
                "class": ""
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
            var current, _data;
            if (!resp) {
              return _this.display("工单查询失败!!", 500);
            }
            _data = _.filter(resp, function(m) {
              return m.visible;
            });
            allData = _.groupBy(_data, function(d) {
              return d.type;
            });
            scope.count = _.mapObject(scope.count, function(d, i) {
              if (_.has(allData, i)) {
                return allData[i].length;
              } else {
                allData[i] = [];
                return 0;
              }
            });
            changeTable(scope.currentType);
            if (isInit) {
              initPage(allData[scope.currentType].length);
              scope.data = allData[scope.currentType].slice(0, 10);
            } else {
              current = scope.pages.current;
              scope.data = allData[scope.currentType].slice((current - 1) * 10, current * 10);
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
      scope["export"] = (function(_this) {
        return function() {
          var current, data, excel, wb;
          if (allData[scope.currentType].length === 0) {
            return _this.display("当前列表为空!!", 500);
          }
          current = scope.processtypes[scope.currentType];
          data = _.map(allData[scope.currentType], function(row) {
            var arr;
            arr = {};
            _.each(scope.tableConfig, function(col) {
              if (col.id === "type") {
                return arr["type"] = current;
              }
              if (_.has(row, col.id) && _.has(col, "formate")) {
                return arr[col.title] = row[col.id] ? col.formate(row[col.id]) : "";
              } else if (_.has(row, col.id)) {
                return arr[col.title] = row[col.id] ? row[col.id] : "";
              } else {
                return arr[col.title] = "";
              }
            });
            return arr;
          });
          wb = XLSX.utils.book_new();
          excel = XLSX.utils.json_to_sheet(data);
          XLSX.utils.book_append_sheet(wb, excel, "Sheet1");
          return XLSX.writeFile(wb, current + "-" + moment().format('YYYYMMDDHHMMSS') + ".xlsx");
        };
      })(this);
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
          initPage(allData[type].length);
          scope.data = allData[type].slice(0, 10);
          return scope.$applyAsync();
        };
      })(this);
      checkPage = function(pages) {
        var _pageItems, _pages;
        _pages = _.uniq(pages);
        _pageItems = _.filter(_pages, function(d) {
          return d > 0;
        });
        if (_pageItems.length === 6) {
          return pages;
        } else {
          if (_pages[_pages.length - 1] === 0) {
            _pageItems.push(-5);
          }
          if (_pages[0] === -3) {
            _pageItems.unshift(-4);
          }
          return _pageItems;
        }
      };
      scope.update = (function(_this) {
        return function(page) {
          var count, len, max, min;
          if (scope.pages.current === page) {
            return;
          }
          count = Math.ceil(allData[scope.currentType].length / 10);
          if (page <= 0 && count > 10) {
            if (scope.pages.page.indexOf(-1) === -1 && scope.pages.page.indexOf(-2) === -1) {
              if (page === -4) {
                max = _.max(scope.pages.page);
                min = _.min(_.filter(scope.pages.page, function(p) {
                  return p > 0;
                }));
                scope.pages.page = [max + 3, max + 2, max + 1, -1, -2, min + 2, min + 1, min];
              } else if (page === -5) {
                max = _.max(scope.pages.page);
                min = _.min(_.filter(scope.pages.page, function(p) {
                  return p > 0;
                }));
                scope.pages.page = [max, max - 1, max - 2, -1, -2, min - 1, min - 2, min - 3];
              }
              if (scope.pages.page[0] !== count) {
                scope.pages.page.unshift(-3);
              }
              if (scope.pages.page[scope.pages.page.length - 1] !== count) {
                scope.pages.page.push(0);
              }
              return scope.$applyAsync();
            }
            len = scope.pages.page.length;
            if (page === 0) {
              scope.pages.page = _.map(scope.pages.page, function(d, i) {
                if (i >= 5 && d > 0) {
                  return d - 3;
                } else {
                  return d;
                }
              });
              if (scope.pages.page[len - 1] === 0 && scope.pages.page[len - 2] === 1) {
                scope.pages.page = _.filter(scope.pages.page, function(d) {
                  return d !== 0;
                });
              }
            } else if (page === -1) {
              scope.pages.page = _.map(scope.pages.page, function(d, i) {
                if (i <= 3 && d > 0) {
                  return d - 3;
                } else {
                  return d;
                }
              });
              if (scope.pages.page[0] > 0 && scope.pages.page !== count) {
                scope.pages.page.unshift(-3);
              }
            } else if (page === -2) {
              scope.pages.page = _.map(scope.pages.page, function(d, i) {
                if (i >= 5 && d > 0) {
                  return d + 3;
                } else {
                  return d;
                }
              });
              if (scope.pages.page[len - 1] > 1) {
                scope.pages.page.push(0);
              }
            } else if (page === -3) {
              scope.pages.page = _.map(scope.pages.page, function(d, i) {
                if (i <= 3 && d > 0) {
                  return d + 3;
                } else {
                  return d;
                }
              });
              if (scope.pages.page[1] === count) {
                scope.pages.page = _.filter(scope.pages.page, function(d) {
                  return d !== -3;
                });
              }
            }
            scope.pages.page = checkPage(scope.pages.page);
            return scope.$applyAsync();
          }
          scope.pages.current = page;
          scope.data = allData[scope.currentType].slice(10 * page - 10, 10 * page);
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

    TaskTableDirective.prototype.getStatusName = function(phase) {
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

    TaskTableDirective.prototype.resize = function(scope) {};

    TaskTableDirective.prototype.dispose = function(scope) {
      var _ref, _ref1;
      if ((_ref = scope.subscribePage) != null) {
        _ref.dispose();
      }
      return (_ref1 = scope.subPlanTaskChange) != null ? _ref1.dispose() : void 0;
    };

    return TaskTableDirective;

  })(base.BaseDirective);
  return exports = {
    TaskTableDirective: TaskTableDirective
  };
});
