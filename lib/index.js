"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  GAAnalytics: true,
  MixPanelAnalytics: true,
  NoAnalytics: true
};
Object.defineProperty(exports, "GAAnalytics", {
  enumerable: true,
  get: function () {
    return _GAAnalytics.default;
  }
});
Object.defineProperty(exports, "MixPanelAnalytics", {
  enumerable: true,
  get: function () {
    return _MixPanelAnalytics.default;
  }
});
Object.defineProperty(exports, "NoAnalytics", {
  enumerable: true,
  get: function () {
    return _NoAnalytics.default;
  }
});

var _GAAnalytics = _interopRequireWildcard(require("./GAAnalytics"));

Object.keys(_GAAnalytics).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _GAAnalytics[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _GAAnalytics[key];
    }
  });
});

var _MixPanelAnalytics = _interopRequireWildcard(require("./MixPanelAnalytics"));

Object.keys(_MixPanelAnalytics).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _MixPanelAnalytics[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MixPanelAnalytics[key];
    }
  });
});

var _NoAnalytics = _interopRequireWildcard(require("./NoAnalytics"));

Object.keys(_NoAnalytics).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _NoAnalytics[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _NoAnalytics[key];
    }
  });
});

var _Analytics = require("./Analytics");

Object.keys(_Analytics).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Analytics[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Analytics[key];
    }
  });
});

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }