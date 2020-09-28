
/*
* File: grid-table-directive
* User: bingo
* Date: 2018/11/23
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", "angularGrid"], function(base, css, view, _, moment, agGrid) {
  var GridTableDirective, exports;
  GridTableDirective = (function(_super) {
    __extends(GridTableDirective, _super);

    function GridTableDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "grid-table";
      GridTableDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    GridTableDirective.prototype.setScope = function() {};

    GridTableDirective.prototype.setCSS = function() {
      return css;
    };

    GridTableDirective.prototype.setTemplate = function() {
      return view;
    };

    GridTableDirective.prototype.show = function($scope, element, attrs) {
      var createGrid, createGridOptions, gridOptions, onSelectionChanged, _ref;
      if (!$scope.firstload) {
        return;
      }
      $scope.agrid = null;
      onSelectionChanged = (function(_this) {
        return function() {
          return _this.commonService.publishEventBus("grid-single-selection", gridOptions.api.getSelectedRows());
        };
      })(this);
      createGridOptions = function(header) {
        var gridOptions;
        gridOptions = {
          columnDefs: header,
          rowData: null,
          enableFilter: false,
          enableSorting: true,
          rowSelection: 'single',
          enableColResize: true,
          overlayNoRowsTemplate: "无数据",
          headerHeight: 35,
          singleClickEdit: false,
          rowHeight: 50,
          onSelectionChanged: onSelectionChanged
        };
        return gridOptions;
      };
      gridOptions = null;
      createGrid = (function(_this) {
        return function() {
          var _ref;
          gridOptions = createGridOptions($scope.parameters.header);
          if ((_ref = $scope.agrid) != null) {
            _ref.destroy();
          }
          return $scope.agrid = new agGrid.Grid(element.find("#grid")[0], gridOptions);
        };
      })(this);
      createGrid();
      $scope.setting = setting;
      $scope.$watch('setting.theme', function(theme) {
        if (theme && theme !== 'teal') {
          return element.find(".ag-header").addClass(theme + " lighten-2");
        }
      });
      $scope.$watchCollection('parameters.header', function(header) {
        var _ref, _ref1, _ref2;
        if (!header) {
          return;
        }
        if (!gridOptions) {
          createGrid();
        }
        if ((_ref = gridOptions.api) != null) {
          _ref.setColumnDefs(header);
        }
        if ((_ref1 = gridOptions.api) != null) {
          _ref1.setRowData($scope.parameters.data);
        }
        if ((header != null ? header.length : void 0) <= 7) {
          return (_ref2 = gridOptions.api) != null ? _ref2.sizeColumnsToFit() : void 0;
        }
      });
      $scope.$watchCollection('parameters.data', function(data) {
        var _ref;
        if (!gridOptions) {
          createGrid();
        }
        if (gridOptions.api) {
          gridOptions.api.setColumnDefs($scope.parameters.header);
          gridOptions.api.setRowData(data);
          if (((_ref = $scope.parameters.header) != null ? _ref.length : void 0) <= 7) {
            return gridOptions.api.sizeColumnsToFit();
          }
        }
      });
      if ((_ref = $scope.subscribe) != null) {
        _ref.dispose();
      }
      return $scope.subscribe = this.subscribeEventBus("export-report", function(msg) {
        if (msg.message.header === $scope.parameters.header) {
          return gridOptions.api.exportDataAsCsv({
            fileName: msg.message.name,
            allColumns: true,
            skipGroups: true
          });
        }
      });
    };

    GridTableDirective.prototype.resize = function($scope) {};

    GridTableDirective.prototype.dispose = function($scope) {
      var _ref;
      return (_ref = $scope.subscribe) != null ? _ref.dispose() : void 0;
    };

    return GridTableDirective;

  })(base.BaseDirective);
  return exports = {
    GridTableDirective: GridTableDirective
  };
});
