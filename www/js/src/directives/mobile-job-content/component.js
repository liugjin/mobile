
/*
* File: mobile-job-content-directive
* User: David
* Date: 2019/11/13
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var MobileJobContentDirective, exports;
  MobileJobContentDirective = (function(_super) {
    __extends(MobileJobContentDirective, _super);

    function MobileJobContentDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "mobile-job-content";
      MobileJobContentDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
      this.taskService = commonService.modelEngine.modelManager.getService("tasks");
    }

    MobileJobContentDirective.prototype.setScope = function() {};

    MobileJobContentDirective.prototype.setCSS = function() {
      return css;
    };

    MobileJobContentDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileJobContentDirective.prototype.show = function(scope, element, attrs) {
      var endNodeImage, endNodeImage2, filter, getCurrentNode, getData, msg, nodeImage, nodeImage2, severityMap, timeTranform, updateData, updateWorkLine, x, _i, _len, _ref, _ref1;
      scope.taskID = this.$routeParams.task;
      element.find('.collapsible').collapsible();
      severityMap = {};
      _.each(scope.project.dictionary.eventseverities.items, (function(_this) {
        return function(d) {
          return severityMap[d.model.severity] = d.model.name;
        };
      })(this));
      scope.stateOption = [
        {
          value: 0,
          name: '正常'
        }, {
          value: 1,
          name: '异常'
        }
      ];
      scope.uploadUrl = setting.urls.uploadUrl;
      scope.task = {};
      scope.works = [];
      scope.memos = [];
      scope.files = [];
      timeTranform = (function(_this) {
        return function(d) {
          if (!d) {
            return null;
          }
          return moment(d).utcOffset(480).format('YYYY-MM-DD HH:MM:SS');
        };
      })(this);
      if (scope.subscribeSigs) {
        _ref = scope.subscribeSigs;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          x = _ref[_i];
          if (x != null) {
            x.dispose();
          }
        }
      }
      scope.subscribeSigs = {};
      scope.subscribeSigVal = {};
      scope.showType = 1;
      scope.showBtns = {
        accept: false,
        approval: false,
        reject: false,
        cancel: false,
        save: false
      };
      scope.addModel = {
        content: "",
        memo: "",
        id: "",
        utl: "",
        type: "",
        name: ""
      };
      scope.detailType = 1;
      scope.handle = false;
      getData = (function(_this) {
        return function(data, attr) {
          var filter, _ref1;
          filter = scope.project.getIds();
          if (_.has(data, attr) && ((_ref1 = data[attr]) != null ? _ref1.length : void 0) > 0) {
            if (attr === "content" && scope.task.type === "plan") {
              return _.map(data[attr], function(d, i) {
                var key;
                filter.station = d.station;
                filter.equipment = d.equipment;
                filter.signal = d.signal;
                key = d.station + "-" + d.equipment + "-" + d.signal;
                scope.subscribeSigs[key] = _this.commonService.signalLiveSession.subscribeValues(filter, function(err, m) {
                  var _ref2;
                  if (m) {
                    return scope.subscribeSigVal[key] = m != null ? (_ref2 = m.message) != null ? _ref2.value : void 0 : void 0;
                  }
                });
                if (!d["status"]) {
                  d["status"] = 0;
                }
                if (typeof d["status"] === "string") {
                  d["status"] = parseInt(d["status"]);
                }
                if (typeof d["work_status"] !== "boolean") {
                  d["work_status"] = parseInt(d["work_status"]) === 1 ? true : false;
                }
                return d;
              });
            } else if (attr === "content" && scope.task.type === "defect") {
              return _.map(data[attr], function(d, i) {
                if (typeof d["work_status"] !== "boolean") {
                  d["work_status"] = d["work_status"] === 1 ? true : false;
                }
                return d;
              });
            } else if (attr === "attachments") {
              return _.map(data[attr], function(d, i) {
                d.url = typeof (d != null ? d.url : void 0) === "string" ? d.url : "";
                return d;
              });
            }
            return data[attr];
          }
          return [];
        };
      })(this);
      getCurrentNode = (function(_this) {
        return function() {
          var nextNode, node, nodes, _ref1, _ref2, _ref3, _ref4;
          nodes = getData(scope.task, "nodes");
          nextNode = (_ref1 = scope.task) != null ? (_ref2 = _ref1.phase) != null ? _ref2.nextNode : void 0 : void 0;
          node = (_ref3 = scope.task) != null ? (_ref4 = _ref3.phase) != null ? _ref4.node : void 0 : void 0;
          if (nextNode) {
            return _.find(nodes, function(n) {
              return n.node === nextNode;
            });
          } else if (node) {
            return _.find(nodes, function(n) {
              return n.node === node;
            });
          }
          return nodes != null ? nodes[0] : void 0;
        };
      })(this);
      scope.updateWorks = (function(_this) {
        return function(item) {
          var detail, json, works, _ref1;
          detail = _.find((_ref1 = scope.selectNode) != null ? _ref1.contents : void 0, function(d) {
            return d.type === "json";
          });
          json = detail.content;
          if (typeof json === "string") {
            json = JSON.parse(json);
          }
          works = getData(json, "content");
          scope.works = _.map(works, function(d) {
            d.severityName = severityMap[d.severity];
            return d;
          });
          if (item) {
            scope.works = _.filter(scope.works, function(n) {
              return n.station === item.station && n.equipment === item.equipment;
            });
          }
          return scope.$applyAsync();
        };
      })(this);
      scope.workRouter = [];
      nodeImage = this.getComponentPath('images/startnode.png');
      nodeImage2 = this.getComponentPath('images/startnode-red.png');
      endNodeImage = this.getComponentPath('images/endnode.png');
      endNodeImage2 = this.getComponentPath('images/endnode-red.png');
      updateWorkLine = (function(_this) {
        return function(works, state, isEdit) {
          scope.works = _.map(works, function(d) {
            d.severityName = severityMap[d.severity];
            return d;
          });
          scope.workRouter = _.map(_.groupBy(works, function(d) {
            return d.station + "_" + d.equipment;
          }), function(m, i) {
            var isWarn;
            isWarn = _.find(m, function(n) {
              return n.status === 1 || n.status === '1';
            });
            return {
              name: m[0].stationName + "." + m[0].equipName,
              station: m[0].station,
              equipment: m[0].equipment,
              signals: _.map(m, function(n) {
                return n.signalName;
              }),
              imgurl: isWarn ? nodeImage2 : nodeImage,
              isWarn: isWarn ? true : false
            };
          });
          if (scope.workRouter.length > 0) {
            return scope.workRouter[scope.workRouter.length - 1].imgurl = scope.workRouter[scope.workRouter.length - 1].isWarn ? endNodeImage2 : endNodeImage;
          }
        };
      })(this);
      updateData = (function(_this) {
        return function(msg) {
          var detail, json, showBtns, showType, state, _j, _len1, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
          showBtns = {
            accept: false,
            approval: false,
            reject: false,
            cancel: false,
            save: false
          };
          scope.showType = msg.isEdit ? 2 : 1;
          scope.task = msg.task;
          if (scope.subscribeSigs) {
            _ref1 = scope.subscribeSigs;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              x = _ref1[_j];
              if (x != null) {
                x.dispose();
              }
            }
          }
          state = _this.getStatusName((_ref2 = scope.task) != null ? _ref2.phase : void 0);
          if (scope.showType === 2) {
            if (state === 1) {
              scope.showType = 1;
              showBtns.accept = true;
              if (((_ref3 = scope.task) != null ? (_ref4 = _ref3.creator) != null ? _ref4.id : void 0 : void 0) === scope.$root.user.user) {
                showBtns.cancel = true;
              }
            } else if (state === 2 || state === 3 || state === 5) {
              scope.showType = 1;
            } else if (state === 4) {
              showType = 2;
              showBtns.save = true;
              showBtns.approval = true;
              showBtns.reject = true;
              if (((_ref5 = scope.task) != null ? (_ref6 = _ref5.creator) != null ? _ref6.id : void 0 : void 0) === scope.$root.user.user) {
                showBtns.cancel = true;
              }
            }
          }
          scope.showBtns = showBtns;
          scope.selectNode = getCurrentNode();
          if (scope.selectNode) {
            if (scope.task.type === "defect") {
              scope.works = [scope.task.source];
              scope.works[0].equipName = scope.works[0].equipmentName;
              scope.memos = [];
              scope.files = [];
              updateWorkLine(scope.works, state, msg.isEdit);
              return scope.$applyAsync();
            }
            detail = _.find((_ref7 = scope.selectNode) != null ? _ref7.contents : void 0, function(d) {
              return d.type === "json";
            });
            if (detail) {
              json = detail.content;
              if (typeof json === "string") {
                json = JSON.parse(json);
              }
              scope.works = getData(json, "content");
              scope.memos = getData(json, "handle_details");
              scope.files = getData(json, "attachments");
              updateWorkLine(scope.works, state, msg.isEdit);
              return scope.$applyAsync();
            }
          }
          scope.state = 0;
          scope.works = [];
          scope.memos = [];
          scope.files = [];
          return scope.$applyAsync();
        };
      })(this);
      scope.setTask = (function(_this) {
        return function(d) {
          var map, node, schema, url, user;
          map = {
            1: 'approval',
            2: 'reject',
            3: 'cancel'
          };
          schema = _this.taskService.url;
          url = _this.taskService.replaceUrlParam(schema, scope.task, true);
          node = scope.selectNode;
          if (node != null ? node.node : void 0) {
            url += "/" + node.node;
            user = scope.$root.user;
            return scope.saveTask(function(taskData) {
              var data;
              data = {
                _id: scope.task._id,
                data: {
                  _id: node._id,
                  node: node.node,
                  parameters: node != null ? node.parameters : void 0,
                  contents: node != null ? node.contents : void 0,
                  state: map[d],
                  timestamp: new Date(),
                  manager: {
                    id: user.user,
                    name: user.name
                  }
                }
              };
              return _this.taskService.postData(url, data, function(err, result) {
                if (result) {
                  return _this.display("操作成功", 500);
                } else {
                  return _this.display("操作失败", 500);
                }
              });
            });
          } else {
            return _this.display("无法获取当前节点", 500);
          }
        };
      })(this);
      scope.saveAddModel = (function(_this) {
        return function() {
          var id, memo, _file, _memo;
          if (scope.detailType === 1) {
            if (scope.addModel.content !== '') {
              _memo = _.max(scope.memos, function(memo) {
                return parseInt(memo.id);
              });
              id = scope.memos.length !== 0 ? parseInt(_memo.id) + 1 : 1;
              memo = {
                id: id,
                content: scope.addModel.content,
                memo: scope.addModel.memo
              };
              return scope.memos = scope.memos.concat([memo]);
            } else {
              return _this.display("内容不可为空!!", 500);
            }
          } else {
            scope.handle = true;
            if (scope.addModel.name !== "") {
              _file = _.max(scope.files, function(file) {
                return parseInt(file.id);
              });
              id = scope.files.length !== 0 ? parseInt(_file.id) + 1 : 1;
              return scope.files = scope.files.concat([
                {
                  id: id,
                  name: scope.addModel.name,
                  type: scope.addModel.type,
                  url: scope.addModel.url
                }
              ]);
            } else {
              return _this.display("请先上传文件!!", 500);
            }
          }
        };
      })(this);
      scope.pubSig = (function(_this) {
        return function(work) {
          if (!(work != null ? work.setvalue : void 0)) {
            return _this.display("请输入阈值", 500);
          }
          return _this.commonService.loadStation(work.station, function(err, station) {
            if (!station) {
              return _this.display("阈值发布失败!!", 500);
            }
            return station.loadEquipment(work.equipment, null, function(err2, equipment) {
              var equipid, sendValue, suPath, topic, _ref1;
              if (!equipment) {
                return _this.display("阈值发布失败!!", 500);
              }
              suPath = (_ref1 = _.find(equipment.sampleUnits, function(d) {
                return d.id === "su";
              })) != null ? _ref1.value : void 0;
              if (suPath) {
                equipid = equipment.model.user + "." + equipment.model.project + "." + equipment.model.station + "." + equipment.model.equipment;
                topic = "sample-values/_mu_points/" + equipid + "/" + work.signal;
                sendValue = {
                  "monitoringUnitId": "_mu_points",
                  "sampleUnitId": equipid,
                  "channelId": work.signal,
                  "value": work.setvalue,
                  "cov": true,
                  "state": 0,
                  "timestamp": new Date()
                };
                _this.commonService.liveService.publish(topic, sendValue, {
                  qos: 0,
                  retain: true
                });
                return _this.display("阈值发布成功!!", 500);
              } else {
                return equipment.loadProperties(null, function(err, properties) {
                  var _ref2;
                  suPath = (_ref2 = _.find(equipment.sampleUnits, function(d) {
                    return d.id === "su";
                  })) != null ? _ref2.value : void 0;
                  if (suPath) {
                    equipid = equipment.model.user + "." + equipment.model.project + "." + equipment.model.station + "." + equipment.model.equipment;
                    topic = "sample-values/_mu_points/" + equipment.model.user + "." + equipment.model.project + "." + equipment.model.station + "." + equipment.model.equipment + "/" + work.signal;
                    sendValue = {
                      "monitoringUnitId": "_mu_points",
                      "sampleUnitId": equipid,
                      "channelId": work.signal,
                      "value": work.setvalue,
                      "cov": true,
                      "state": 0,
                      "timestamp": new Date()
                    };
                    _this.commonService.liveService.publish(topic, sendValue, {
                      qos: 0,
                      retain: true
                    });
                    return _this.display("阈值发布成功!!", 500);
                  } else {
                    return _this.display("设备没有设置通道su!!", 500);
                  }
                });
              }
            });
          });
        };
      })(this);
      scope.saveTask = (function(_this) {
        return function(callback) {
          var _ref1, _ref2, _ref3;
          if ((_ref1 = scope.selectNode) != null) {
            _ref1.contents[0].content = {
              content: _.map(scope.works, function(d) {
                if (typeof d.work_status === "string") {
                  d.work_status = parseInt(d.work_status);
                } else if (typeof d.work_status === "boolean") {
                  d.work_status = d.work_status ? 1 : 0;
                }
                d.status = parseInt(d.status);
                return d;
              }),
              handle_details: scope.memos,
              attachments: scope.files
            };
          }
          if ((_ref2 = scope.task) != null) {
            _ref2.nodes = _.map((_ref3 = scope.task) != null ? _ref3.nodes : void 0, function(node) {
              if (scope.selectNode.node === node.node) {
                return scope.selectNode;
              }
              return node;
            });
          }
          return _this.taskService.save(scope.task, function(err, taskData) {
            if (typeof callback === "function") {
              callback(taskData);
              return;
            }
            if (taskData) {
              updateData({
                isEdit: true,
                task: taskData
              });
              return _this.display("操作成功", 500);
            } else {
              return _this.display("操作失败", 500);
            }
          }, true);
        };
      })(this);
      msg = scope.parameters.message;
      if (!(msg != null ? msg.message : void 0)) {
        return;
      }
      if (typeof msg.message === "string") {
        filter = scope.project.getIds();
        filter.task = msg.message;
        return this.commonService.loadProjectModelByService('tasks', filter, null, (function(_this) {
          return function(err, resp) {
            if (!resp || (resp != null ? resp.task : void 0) !== msg.message) {
              return _this.dispose("未查询到该工单!!", 500);
            }
            return updateData({
              isEdit: true,
              task: resp
            });
          };
        })(this), true);
      } else if (typeof ((_ref1 = msg.message) != null ? _ref1.task : void 0) === "object") {
        return updateData(msg.message);
      }
    };

    MobileJobContentDirective.prototype.getStatusName = function(phase) {
      var manager, progress, state;
      state = phase != null ? phase.state : void 0;
      manager = phase != null ? phase.nextManager : void 0;
      progress = phase != null ? phase.progress : void 0;
      if (_.isEmpty(manager) && !(progress >= 0)) {
        return 1;
      } else if (state === "reject") {
        return 2;
      } else if (state === "cancel") {
        return 3;
      } else if ((progress < 1) || !_.isEmpty(manager)) {
        return 4;
      } else {
        return 5;
      }
    };

    MobileJobContentDirective.prototype.resize = function(scope) {};

    MobileJobContentDirective.prototype.dispose = function(scope) {
      var x, _i, _len, _ref, _ref1, _results;
      if ((_ref = scope.subModel) != null) {
        _ref.dispose();
      }
      if (scope.subscribeSigs) {
        _ref1 = scope.subscribeSigs;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          x = _ref1[_i];
          _results.push(x != null ? x.dispose() : void 0);
        }
        return _results;
      }
    };

    return MobileJobContentDirective;

  })(base.BaseDirective);
  return exports = {
    MobileJobContentDirective: MobileJobContentDirective
  };
});
