
/*
* File: station-racks
* User: Dow
* Date: 4/27/2016
* Desc:
 */
var iced, __iced_k, __iced_k_noop,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

iced = {
  Deferrals: (function() {
    function _Class(_arg) {
      this.continuation = _arg;
      this.count = 1;
      this.ret = null;
    }

    _Class.prototype._fulfill = function() {
      if (!--this.count) {
        return this.continuation(this.ret);
      }
    };

    _Class.prototype.defer = function(defer_params) {
      ++this.count;
      return (function(_this) {
        return function() {
          var inner_params, _ref;
          inner_params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (defer_params != null) {
            if ((_ref = defer_params.assign_fn) != null) {
              _ref.apply(null, inner_params);
            }
          }
          return _this._fulfill();
        };
      })(this);
    };

    return _Class;

  })(),
  findDeferral: function() {
    return null;
  },
  trampoline: function(_fn) {
    return _fn();
  }
};
__iced_k = __iced_k_noop = function() {};

if (typeof define !== 'function') { var define = require('amdefine')(module) };

define(['clc.foundation.angular/disposable', './racks', 'iced-coffee-script'], function(base, rs, iced) {
  var StationRacks, exports;
  if (iced.iced) {
    iced = iced.iced;
  }
  StationRacks = (function(_super) {
    __extends(StationRacks, _super);

    function StationRacks(station) {
      this.station = station;
      StationRacks.__super__.constructor.apply(this, arguments);
      this.racks = new rs.Racks(this.station);
    }

    StationRacks.prototype.loadRack = function(id, callback, refresh) {
      var err, filter, m, model, rack, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      m = this.station.model;
      filter = {
        user: m.user,
        project: m.project,
        station: m.station,
        type: 'rack',
        equipment: id
      };
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "E:\\projects\\clc.mobile\\app\\scripts\\ionic\\src\\models\\business\\station-racks.coffee",
            funcname: "StationRacks.loadRack"
          });
          _this.racks.load(filter, null, __iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                err = arguments[0];
                return model = arguments[1];
              };
            })(),
            lineno: 29
          }), refresh);
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          _this.rack = rack = typeof model !== "undefined" && model !== null ? model[0] : void 0;
          (function(__iced_k) {
            if (rack) {
              (function(__iced_k) {
                __iced_deferrals = new iced.Deferrals(__iced_k, {
                  parent: ___iced_passed_deferral,
                  filename: "E:\\projects\\clc.mobile\\app\\scripts\\ionic\\src\\models\\business\\station-racks.coffee",
                  funcname: "StationRacks.loadRack"
                });
                rack.loadProperties(null, __iced_deferrals.defer({
                  assign_fn: (function() {
                    return function() {
                      return err = arguments[0];
                    };
                  })(),
                  lineno: 32
                }), refresh);
                __iced_deferrals._fulfill();
              })(function() {
                (function(__iced_k) {
                  __iced_deferrals = new iced.Deferrals(__iced_k, {
                    parent: ___iced_passed_deferral,
                    filename: "E:\\projects\\clc.mobile\\app\\scripts\\ionic\\src\\models\\business\\station-racks.coffee",
                    funcname: "StationRacks.loadRack"
                  });
                  rack.loadSignals(null, __iced_deferrals.defer({
                    assign_fn: (function() {
                      return function() {
                        return err = arguments[0];
                      };
                    })(),
                    lineno: 33
                  }), refresh);
                  __iced_deferrals._fulfill();
                })(function() {
                  (function(__iced_k) {
                    __iced_deferrals = new iced.Deferrals(__iced_k, {
                      parent: ___iced_passed_deferral,
                      filename: "E:\\projects\\clc.mobile\\app\\scripts\\ionic\\src\\models\\business\\station-racks.coffee",
                      funcname: "StationRacks.loadRack"
                    });
                    rack.loadServers(null, __iced_deferrals.defer({
                      assign_fn: (function() {
                        return function() {
                          return err = arguments[0];
                        };
                      })(),
                      lineno: 34
                    }), refresh);
                    __iced_deferrals._fulfill();
                  })(function() {
                    (function(__iced_k) {
                      __iced_deferrals = new iced.Deferrals(__iced_k, {
                        parent: ___iced_passed_deferral,
                        filename: "E:\\projects\\clc.mobile\\app\\scripts\\ionic\\src\\models\\business\\station-racks.coffee",
                        funcname: "StationRacks.loadRack"
                      });
                      rack.loadPdus(null, __iced_deferrals.defer({
                        assign_fn: (function() {
                          return function() {
                            return err = arguments[0];
                          };
                        })(),
                        lineno: 35
                      }), refresh);
                      __iced_deferrals._fulfill();
                    })(__iced_k);
                  });
                });
              });
            } else {
              return __iced_k();
            }
          })(function() {
            return typeof callback === "function" ? callback(err, rack) : void 0;
          });
        };
      })(this));
    };

    StationRacks.prototype.loadRacks = function(ids, callback, refresh) {
      var filter, m;
      m = this.station.model;
      filter = {
        user: m.user,
        project: m.project,
        station: m.station,
        type: 'rack'
      };
      if (ids) {
        filter.equipment = ids;
      }
      return this.racks.load(filter, null, (function(_this) {
        return function(err, model) {
          var rack, _i, _len;
          if (model) {
            for (_i = 0, _len = model.length; _i < _len; _i++) {
              rack = model[_i];
              rack.loadProperties(null, null, refresh);
              rack.loadSignals(null, null, refresh);
              rack.loadServers(null, null, refresh);
              rack.loadPdus(null, null, refresh);
            }
            _this.rack = model[0];
          }
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    StationRacks.prototype.dispose = function(disposing) {
      StationRacks.__super__.dispose.call(this, disposing);
      return this.racks.dispose(disposing);
    };

    StationRacks.prototype.updateModel = function(m) {
      var rack, result, _i, _len, _ref;
      if (m.type === 'rack') {
        rack = this.racks.getItemByIds(m);
        return rack != null ? rack.updateModel(m) : void 0;
      } else if (m.type === 'server') {
        _ref = this.racks.items;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          rack = _ref[_i];
          result = rack.updateModel(m);
          if (result) {
            return result;
          }
        }
      }
    };

    return StationRacks;

  })(base.Disposable);
  return exports = {
    StationRacks: StationRacks
  };
});
