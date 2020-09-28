
/*
* File: mobile-mocha-itom-directive
* User: David
* Date: 2020/03/10
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var MobileMochaItomDirective, exports;
  MobileMochaItomDirective = (function(_super) {
    __extends(MobileMochaItomDirective, _super);

    function MobileMochaItomDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.getEquipDefectCounts = __bind(this.getEquipDefectCounts, this);
      this.getExcepWorkItems = __bind(this.getExcepWorkItems, this);
      this.getExcepEquipCounts = __bind(this.getExcepEquipCounts, this);
      this.getEquipCounts = __bind(this.getEquipCounts, this);
      this.getEquipCheckCounts = __bind(this.getEquipCheckCounts, this);
      this.getTaskCount = __bind(this.getTaskCount, this);
      this.getDateArr = __bind(this.getDateArr, this);
      this.show = __bind(this.show, this);
      this.id = "mobile-mocha-itom";
      MobileMochaItomDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileMochaItomDirective.prototype.setScope = function() {};

    MobileMochaItomDirective.prototype.setCSS = function() {
      return css;
    };

    MobileMochaItomDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileMochaItomDirective.prototype.show = function(scope, element, attrs) {
      var update, updateLazy, _ref;
      scope.type = "day";
      scope.typeList = [
        {
          name: '日',
          key: 'day'
        }, {
          name: '月',
          key: 'month'
        }, {
          name: '年',
          key: 'year'
        }
      ];
      scope.dateArr = [];
      scope.defect = {
        equipment: [],
        task: [],
        workitems: [],
        excepequips: [],
        excepworkitems: [],
        tenRank: []
      };
      scope.plan = {
        equipment: [],
        task: [],
        workitems: [],
        excepequips: [],
        excepworkitems: []
      };
      scope.predict = {
        equipment: [],
        task: [],
        workitems: [],
        excepequips: [],
        excepworkitems: []
      };
      scope.total = {
        equipment: [],
        task: [],
        workitems: [],
        excepequips: [],
        excepworkitems: []
      };
      this.getDateArr(scope);
      this.getTaskCount(scope);
      this.getEquipCounts(scope);
      this.getEquipCheckCounts(scope);
      this.getExcepEquipCounts(scope);
      this.getExcepWorkItems(scope);
      update = (function(_this) {
        return function() {
          _this.getDateArr(scope);
          _this.getTaskCount(scope);
          _this.getEquipCounts(scope);
          _this.getEquipCheckCounts(scope);
          _this.getExcepEquipCounts(scope);
          return _this.getExcepWorkItems(scope);
        };
      })(this);
      updateLazy = _.throttle(update, 500, {
        leading: true
      });
      if ((_ref = scope.subTimeType) != null) {
        _ref.dispose();
      }
      return scope.subTimeType = this.commonService.subscribeEventBus("task-type", (function(_this) {
        return function(msg) {
          console.log("msg123", msg);
          if (!msg) {
            return;
          }
          if (scope.dateArr.length === 0) {
            return updateLazy();
          } else if (scope.type !== msg.message.type) {
            scope.type = msg.message.type;
            return updateLazy();
          }
        };
      })(this));
    };

    MobileMochaItomDirective.prototype.getDateArr = function(scope) {
      var exec, map, _i, _results;
      exec = scope.type === "year" ? 3 : 5;
      map = {
        day: "MM-DD",
        month: "YYYY-MM",
        year: "YYYY"
      };
      scope.dateArr = _.map((function() {
        _results = [];
        for (var _i = exec; exec <= 0 ? _i <= 0 : _i >= 0; exec <= 0 ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this), (function(_this) {
        return function(d) {
          var time;
          time = moment().subtract(d, scope.type).format(map[scope.type]);
          return time;
        };
      })(this));
      return scope.$applyAsync();
    };

    MobileMochaItomDirective.prototype.getTaskStatus = function(phase) {
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
      return status === 1 || state === 4;
    };

    MobileMochaItomDirective.prototype.getTaskCount = function(scope) {
      var aggregateCons, execCount, filter, formatTypeMap, formatTypeMap2, groupObj, matchObj, type;
      aggregateCons = [];
      matchObj = {};
      groupObj = {};
      type = scope.type;
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
      filter = scope.project.getIds();
      filter.createtime = {
        $gte: moment().subtract(execCount, type).startOf(type),
        $lte: moment().endOf(type)
      };
      groupObj.$group = {
        _id: {
          createtime: {
            $dateToString: {
              format: formatTypeMap[type],
              date: "$createtime"
            }
          },
          type: "$type",
          phase: "$phase.nextNode"
        },
        total_sheets: {
          $sum: 1
        }
      };
      matchObj.$match = filter;
      aggregateCons.push(matchObj);
      aggregateCons.push(groupObj);
      return this.commonService.reportingService.aggregateTasks({
        filter: scope.project.getIds(),
        pipeline: aggregateCons,
        options: {
          allowDiskUse: true
        }
      }, (function(_this) {
        return function(err, records) {
          var tasks;
          if (!records) {
            return;
          }
          if (records.length === 0) {
            return _.each(["defect", "plan", "predict", "total"], function(d) {
              return scope[d].task = [];
            });
          } else {
            tasks = [];
            _.each(["defect", "plan", "predict"], function(d) {
              scope[d].task = _.map(_.filter(records, function(m) {
                return m._id.type === d;
              }), function(m) {
                var item;
                item = {
                  val: m.total_sheets,
                  time: moment(m._id.createtime).format(formatTypeMap2[scope.type]),
                  type: m._id.type,
                  phase: m._id.phase
                };
                return item;
              });
              return tasks = tasks.concat(scope[d].task);
            });
            return scope.total.task = tasks;
          }
        };
      })(this));
    };

    MobileMochaItomDirective.prototype.getEquipCheckCounts = function(scope) {
      var aggregateCons, execCount, filter, formatTypeMap, formatTypeMap2, groupObj, matchObj, type;
      aggregateCons = [];
      matchObj = {};
      groupObj = {};
      type = scope.type;
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
      filter = scope.project.getIds();
      filter.createtime = {
        $gte: moment().subtract(execCount, type).startOf(type),
        $lte: moment().endOf(type)
      };
      groupObj.$group = {
        _id: {
          type: "$type",
          phase: "$phase.nextNode",
          createtime: {
            $dateToString: {
              format: formatTypeMap[type],
              date: "$createtime"
            }
          }
        },
        total_equips: {
          $sum: "$workequips"
        }
      };
      matchObj.$match = filter;
      aggregateCons.push(matchObj);
      aggregateCons.push({
        $project: {
          _id: 1,
          type: 1,
          phase: 1,
          "nodes.contents.content.content": 1,
          createtime: 1,
          "workcontent": "$nodes.contents.content.content"
        }
      });
      aggregateCons.push({
        $unwind: "$workcontent"
      });
      aggregateCons.push({
        $project: {
          _id: 1,
          type: 1,
          phase: 1,
          createtime: 1,
          "workequips": {
            $sum: {
              $map: {
                input: "$workcontent",
                as: "workitem",
                "in": {
                  $size: {
                    $cond: {
                      "if": {
                        $isArray: "$$workitem"
                      },
                      then: "$$workitem",
                      "else": []
                    }
                  }
                }
              }
            }
          }
        }
      });
      aggregateCons.push(groupObj);
      return this.commonService.reportingService.aggregateTasks({
        filter: scope.project.getIds(),
        pipeline: aggregateCons,
        options: {
          allowDiskUse: true
        }
      }, (function(_this) {
        return function(err, records) {
          if (!records) {
            return;
          }
          if (records.length === 0) {
            return _.each(["defect", "plan", "predict", "total"], function(d) {
              return scope[d].workitems = [];
            });
          } else {
            scope.total.workitems = [];
            return _.each(["defect", "plan", "predict"], function(d) {
              scope[d].workitems = _.map(_.filter(records, function(m) {
                return m._id.type === d;
              }), function(n) {
                var item;
                item = n._id;
                item.val = n.total_equips;
                item.time = moment(n._id.createtime).format(formatTypeMap2[scope.type]);
                return item;
              });
              return scope.total.workitems = scope.total.workitems.concat(scope[d].workitems);
            });
          }
        };
      })(this));
    };

    MobileMochaItomDirective.prototype.getEquipCounts = function(scope) {
      var aggregateCons, execCount, filter, formatTypeMap, formatTypeMap2, matchObj, type;
      aggregateCons = [];
      matchObj = {};
      type = scope.type;
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
      filter = scope.project.getIds();
      filter.createtime = {
        $gte: moment().subtract(execCount, type).startOf(type),
        $lte: moment().endOf(type)
      };
      matchObj.$match = filter;
      aggregateCons.push(matchObj);
      aggregateCons.push({
        $unwind: "$nodes"
      });
      aggregateCons.push({
        $unwind: "$nodes.contents"
      });
      aggregateCons.push({
        $unwind: "$nodes.contents.content.content"
      });
      aggregateCons.push({
        $group: {
          _id: {
            type: "$type",
            phase: "$phase.nextNode",
            createtime: {
              $dateToString: {
                format: formatTypeMap[scope.type],
                date: "$createtime"
              }
            },
            task: "$task",
            station: "$nodes.contents.content.content.station",
            equipment: "$nodes.contents.content.content.equipment"
          }
        }
      });
      aggregateCons.push({
        $group: {
          _id: {
            type: "$_id.type",
            phase: "$_id.phase",
            createtime: "$_id.createtime"
          },
          equips: {
            $sum: 1
          }
        }
      });
      return this.commonService.reportingService.aggregateTasks({
        filter: scope.project.getIds(),
        pipeline: aggregateCons,
        options: {
          allowDiskUse: true
        }
      }, (function(_this) {
        return function(err, records) {
          if (!records) {
            return;
          }
          if (records.length === 0) {
            return _.each(["defect", "plan", "predict", "total"], function(d) {
              return scope[d].equipment = [];
            });
          } else {
            scope.total.equipment = [];
            return _.each(["defect", "plan", "predict"], function(d) {
              scope[d].equipment = _.map(_.filter(records, function(m) {
                return m._id.type === d;
              }), function(n) {
                var item;
                item = n._id;
                item.val = n.equips;
                item.time = moment(n._id.createtime).format(formatTypeMap2[scope.type]);
                return item;
              });
              return scope.total.equipment = scope.total.equipment.concat(scope[d].equipment);
            });
          }
        };
      })(this));
    };

    MobileMochaItomDirective.prototype.getExcepEquipCounts = function(scope) {
      var aggregateCons, execCount, filter, formatTypeMap, formatTypeMap2, matchObj, type;
      aggregateCons = [];
      matchObj = {};
      type = scope.type;
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
      filter = scope.project.getIds();
      filter.createtime = {
        $gte: moment().subtract(execCount, type).startOf(type),
        $lte: moment().endOf(type)
      };
      filter = _.extend(filter, {
        "nodes.contents.content.content.status": 1
      });
      matchObj.$match = filter;
      aggregateCons.push(matchObj);
      aggregateCons.push({
        $unwind: "$nodes"
      });
      aggregateCons.push({
        $unwind: "$nodes.contents"
      });
      aggregateCons.push({
        $unwind: "$nodes.contents.content.content"
      });
      aggregateCons.push(matchObj);
      aggregateCons.push({
        $group: {
          _id: {
            type: "$type",
            phase: "$phase.nextNode",
            createtime: {
              $dateToString: {
                format: formatTypeMap[scope.type],
                date: "$createtime"
              }
            },
            task: "$task",
            station: "$nodes.contents.content.content.station",
            equipment: "$nodes.contents.content.content.equipment"
          }
        }
      });
      aggregateCons.push({
        $group: {
          _id: {
            type: "$_id.type",
            phase: "$_id.phase",
            createtime: "$_id.createtime"
          },
          equips: {
            $sum: 1
          }
        }
      });
      return this.commonService.reportingService.aggregateTasks({
        filter: scope.project.getIds(),
        pipeline: aggregateCons,
        options: {
          allowDiskUse: true
        }
      }, (function(_this) {
        return function(err, records) {
          if (!records) {
            return;
          }
          if (records.length === 0) {
            return _.each(["defect", "plan", "predict", "total"], function(d) {
              return scope[d].excepequips = [];
            });
          } else {
            scope.total.excepequips = [];
            return _.each(["defect", "plan", "predict"], function(d) {
              scope[d].excepequips = _.map(_.filter(records, function(m) {
                return m._id.type === d;
              }), function(n) {
                var item;
                item = n._id;
                item.val = n.equips;
                item.time = moment(n._id.createtime).format(formatTypeMap2[scope.type]);
                return item;
              });
              return scope.total.excepequips = scope.total.excepequips.concat(scope[d].excepequips);
            });
          }
        };
      })(this));
    };

    MobileMochaItomDirective.prototype.getExcepWorkItems = function(scope) {
      var aggregateCons, execCount, filter, formatTypeMap, formatTypeMap2, matchObj, type;
      aggregateCons = [];
      matchObj = {};
      type = scope.type;
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
      filter = scope.project.getIds();
      filter.createtime = {
        $gte: moment().subtract(execCount, type).startOf(type),
        $lte: moment().endOf(type)
      };
      filter = _.extend(filter, {
        "nodes.contents.content.content.status": 1
      });
      matchObj.$match = filter;
      aggregateCons.push(matchObj);
      aggregateCons.push({
        $unwind: "$nodes"
      });
      aggregateCons.push({
        $unwind: "$nodes.contents"
      });
      aggregateCons.push({
        $unwind: "$nodes.contents.content.content"
      });
      aggregateCons.push(matchObj);
      if (scope.type === "day") {
        aggregateCons.push({
          $group: {
            _id: {
              type: "$type",
              phase: "$phase.nextNode",
              createtime: {
                $dateToString: {
                  format: formatTypeMap.day,
                  date: "$createtime"
                }
              }
            },
            equips: {
              $sum: 1
            }
          }
        });
      } else if (scope.type === "month") {
        aggregateCons.push({
          $group: {
            _id: {
              type: "$type",
              phase: "$phase.nextNode",
              createtime: {
                $dateToString: {
                  format: formatTypeMap.month,
                  date: "$createtime"
                }
              }
            },
            equips: {
              $sum: 1
            }
          }
        });
      } else if (scope.type === "year") {
        aggregateCons.push({
          $group: {
            _id: {
              type: "$type",
              phase: "$phase.nextNode",
              createtime: {
                $dateToString: {
                  format: formatTypeMap.year,
                  date: "$createtime"
                }
              }
            },
            equips: {
              $sum: 1
            }
          }
        });
      }
      return this.commonService.reportingService.aggregateTasks({
        filter: scope.project.getIds(),
        pipeline: aggregateCons,
        options: {
          allowDiskUse: true
        }
      }, (function(_this) {
        return function(err, records) {
          if (!records) {
            return;
          }
          if (records.length === 0) {
            return _.each(["defect", "plan", "predict", "total"], function(d) {
              return scope[d].excepworkitems = [];
            });
          } else {
            scope.total.excepworkitems = [];
            return _.each(["defect", "plan", "predict"], function(d) {
              scope[d].excepworkitems = _.map(_.filter(records, function(m) {
                return m._id.type === d;
              }), function(n) {
                var item;
                item = n._id;
                item.val = n.equips;
                item.time = moment(n._id.createtime).format(formatTypeMap2[scope.type]);
                return item;
              });
              return scope.total.excepworkitems = scope.total.excepworkitems.concat(scope[d].excepworkitems);
            });
          }
        };
      })(this));
    };

    MobileMochaItomDirective.prototype.getEquipDefectCounts = function(scope) {
      var aggregateCons, execCount, filter, formatTypeMap, matchObj, type;
      aggregateCons = [];
      matchObj = {};
      type = scope.type;
      execCount = type === "year" ? 3 : 5;
      formatTypeMap = {
        day: "%Y-%m-%d",
        month: "%Y-%m",
        year: "%Y"
      };
      filter = scope.project.getIds();
      filter.type = "defect";
      filter.createtime = {
        $gte: moment().subtract(execCount, type).startOf(type),
        $lte: moment().endOf(type)
      };
      matchObj.$match = filter;
      aggregateCons.push(matchObj);
      if (scope.type === "day") {
        aggregateCons.push({
          $group: {
            _id: {
              station: "$source.station",
              stationName: "$source.stationName",
              equipment: "$source.equipment",
              equipmentName: "$source.equipmentName"
            },
            equips: {
              $sum: 1
            }
          }
        });
      } else if (scope.type === "month") {
        aggregateCons.push({
          $group: {
            _id: {
              station: "$source.station",
              stationName: "$source.stationName",
              equipment: "$source.equipment",
              equipmentName: "$source.equipmentName"
            },
            equips: {
              $sum: 1
            }
          }
        });
      } else if (scope.type === "year") {
        aggregateCons.push({
          $group: {
            _id: {
              station: "$source.station",
              stationName: "$source.stationName",
              equipment: "$source.equipment",
              equipmentName: "$source.equipmentName"
            },
            equips: {
              $sum: 1
            }
          }
        });
      }
      return this.commonService.reportingService.aggregateTasks({
        filter: scope.project.getIds(),
        pipeline: aggregateCons,
        options: {
          allowDiskUse: true
        }
      }, (function(_this) {
        return function(err, records) {
          if (!records) {

          }
        };
      })(this));
    };

    MobileMochaItomDirective.prototype.resize = function(scope) {};

    MobileMochaItomDirective.prototype.dispose = function(scope) {};

    return MobileMochaItomDirective;

  })(base.BaseDirective);
  return exports = {
    MobileMochaItomDirective: MobileMochaItomDirective
  };
});