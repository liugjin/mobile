"use strict";
/* global angular */

var CONF = {
    baseUrl: 'lib/ion-tree-list',
    digestTtl: 35
};

function addDepthToTree(obj, depth, collapsed) {
    for (var key in obj) {
        if (obj[key] && typeof(obj[key]) == 'object') {
            obj[key].depth = depth;
            obj[key].collapsed = collapsed;
            addDepthToTree(obj[key], key === 'tree' ? ++ depth : depth, collapsed)
        }
    }
    return obj
}

function toggleCollapse(obj) {
    for (var key in obj) {
        if (obj[key] && typeof(obj[key]) == 'object') {
            obj[key].collapsed = !obj[key].collapsed;
            toggleCollapse(obj[key])
        }
    }
    return obj
}

function toggleCheck(item, check) {
  item.checked = check;
  if (item.tree) {
    for(var i = 0, l = item.tree.length; i < l; i++) {
      toggleCheck(item.tree[i], check);
    }
  }
}

function clone(obj) {
  if (obj === null) return null;
  var o = angular.isArray(obj) ? [] : {};
  for (var i in obj) {
    o[i] = (obj[i] instanceof Date) ? new Date(obj[i].getTime()) : (typeof obj[i] === "object" ? clone(obj[i]) : obj[i]);
  }
  return o;
}

function transformTozTreeFormat(sNodes) {
  var setting = {
    data: {
      key: {
        children: "tree"
      },
      simpleData: {
        idKey: 'id',
        pIdKey: 'pId',
        rootPid: null
      }
    }
  };
  var i, l,
    key = setting.data.simpleData.idKey,
    parentKey = setting.data.simpleData.pIdKey,
    childKey = setting.data.key.children;
  if (!key || key == "" || !sNodes) return [];

  sNodes = sNodes ? clone(angular.isArray(sNodes) ? sNodes : [sNodes]) : [];

  if (angular.isArray(sNodes)) {
    var r = [];
    var tmpMap = {};
    for (i = 0, l = sNodes.length; i < l; i++) {
      tmpMap[sNodes[i][key]] = sNodes[i];
    }
    for (i = 0, l = sNodes.length; i < l; i++) {
      if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] != sNodes[i][parentKey]) {
        if (!tmpMap[sNodes[i][parentKey]][childKey])
          tmpMap[sNodes[i][parentKey]][childKey] = [];
        tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i]);
      } else {
        r.push(sNodes[i]);
      }
    }
    return r;
  } else {
    return [sNodes];
  }
}

angular.module('ion-tree-list', [], ['$rootScopeProvider', function($rootScopeProvider){
    $rootScopeProvider.digestTtl(CONF.digestTtl)
}])
.directive('ionTreeList', [function() {
    return {
        restrict: 'E',
        scope: {
            // items: '=',
            source: '=',
            collapsed: '=',
            templateUrl: '@',
            radio: '=',
            showReorder: '='
        },
        // templateUrl: CONF.baseUrl + '/ion-tree-list.tmpl.html',
        template: '<ng-include src="getTemplateUrl()"/>',
        controller: ['$scope', '$timeout', function($scope, $timeout) {
            $scope.baseUrl = CONF.baseUrl;

            $scope.getTemplateUrl = function() {
              if($scope.radio) {
                return $scope.baseUrl + '/ion-tree-list.tmpl-radio.html';
              } else {
                return $scope.baseUrl + '/ion-tree-list.tmpl.html';
              }
            };


            $scope.toggleCollapse = function(item) {
                if (item && item.collapsible !== false) {
                    toggleCollapse(item);
                }
            };

            $scope.toggleCheck = function(item) {
              if (item) {
                // item.checked = !item.checked;
                toggleCheck(item, !item.checked);
              }
            };

            $scope.emitEvent = function(item){
                $scope.$emit('$ionTreeList:ItemClicked', item)
            };

            $scope.moveItem = function(item, fromIndex, toIndex) {
                $scope.items.splice(fromIndex, 1);
                $scope.items.splice(toIndex, 0, item)
            };

            $scope.$watch('collapsed', function() {
                $scope.toggleCollapse($scope.items)
            });

            $scope.$watchCollection('source', function(source) {
                if (!source) return;
                // $timeout(function() {
                $scope.items = [];
                $scope.items = transformTozTreeFormat(source);
                $scope.items = addDepthToTree($scope.items, 1, $scope.collapsed);
                  // $scope.$emit('$ionTreeList:LoadComplete', $scope.items);
                // }, 1000);


            })
        }],
        compile: function(element, attrs){
            attrs.templateUrl = attrs.templateUrl ? attrs.templateUrl : 'item_default_renderer';
        }
    }
}]);
