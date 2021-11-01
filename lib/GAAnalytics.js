"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Analytics = require("./Analytics");

var ReactGA = _interopRequireWildcard(require("react-ga"));

var _dec, _dec2, _dec3, _class;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

;
let GAAnalytiics = (_dec = (0, _Analytics.trackingEvent)(), _dec2 = (0, _Analytics.trackingEvent)(), _dec3 = (0, _Analytics.waitsForSetup)(), (_class = class GAAnalytiics extends _Analytics.HeLxAnalyticsTracker {
  constructor(setupData, globalCustomParameters = {}) {
    super(setupData, globalCustomParameters);
  }

  async setup(setupData) {
    const {
      trackingId,
      options
    } = setupData;
    ReactGA.initialize(trackingId, options);
  }

  async trackEvent(event) {
    // Google Analytics currently uses the keys exactly as-is in TrackingEvent.
    // (because TrackingEvent is based off GA, this will change with more trackers).
    const {
      customParameters,
      ...gaEvent
    } = event; // ReactGA does not expose the GA response through its methods, so just assume
    // it went through. It's not really consequential whether it's successful or not
    // anyways.

    ReactGA.event(gaEvent);
    return {
      success: true
    };
  }

  async trackRoute(event) {
    const {
      route
    } = event;
    ReactGA.pageview(route);
    return {
      success: true
    };
  } // ReactGA offers no way to destroy a tracker.


  async teardown() {}

}, (_applyDecoratedDescriptor(_class.prototype, "trackEvent", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "trackEvent"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "trackRoute", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "trackRoute"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "teardown", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "teardown"), _class.prototype)), _class));
exports.default = GAAnalytiics;