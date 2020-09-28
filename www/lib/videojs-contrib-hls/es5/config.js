"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
  GOAL_BUFFER_LENGTH: 30,
  // A fudge factor to apply to advertised playlist bitrates to account for
  // temporary flucations in client bandwidth
  BANDWIDTH_VARIANCE: 1.2
};
module.exports = exports["default"];