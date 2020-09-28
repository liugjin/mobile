if (typeof define !== 'function') { var define = require('amdefine')(module) };
define(['angular', 'clc.materialize', 'clc.graphic'], function(angular) {
  return angular.module('clc.mobile', ['clc.materialize', 'clc.graphic']);
});
