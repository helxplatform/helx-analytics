"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Analytics = require("./Analytics");

var _mixpanelBrowser = _interopRequireDefault(require("mixpanel-browser"));

var _dec, _dec2, _dec3, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

;
let MixPanelAnalytics = (_dec = (0, _Analytics.trackingEvent)(), _dec2 = (0, _Analytics.trackingEvent)(), _dec3 = (0, _Analytics.waitsForSetup)(), (_class = class MixPanelAnalytics extends _Analytics.HeLxAnalyticsTracker {
  constructor(setupData, globalCustomParameters = {}) {
    super(setupData, globalCustomParameters);
  } // If unspecified, debug will be set to false


  async setup({
    projectToken,
    debug = false
  }) {
    _mixpanelBrowser.default.init(projectToken, {
      debug
    });
  }
  /**
   * Mixpanel tracks events in the following structure: event name, event properties, options, callback
   */


  trackEvent(event) {
    // Destructure the event into only the parameters that can be used in Mixpanel. Others aren't supported.
    const {
      category,
      action,
      label,
      value,
      customParameters = {},
      nonInteraction = false,
      transport
    } = event;
    /* Store metadata parameters describing the event as custom parameters. */

    customParameters["_nonInteraction"] = nonInteraction;
    customParameters["_category"] = category;
    customParameters["_label"] = label;
    /* Construct Mixpanel options */

    const options = {};

    switch (transport) {
      case "beacon":
        options.transport = "sendBeacon";
        break;

      case "xhr":
        options.transport = "xhr";
        break;

      case "image":
        // Mixpanel transport only supports beacon and xhr. "image" will be discarded.
        break;

      case undefined:
        break;

      default:
        // Unrecognized transport option
        break;
    }

    ; // Setup promise response.

    return new Promise(resolve => {
      // Track the event name as the action
      _mixpanelBrowser.default.track(action, customParameters, options, response => {
        const success = response === 1 ? true : false;
        resolve({
          success
        });
      });
    });
  }
  /**
   * Mixpanel does not offer native support for route tracking, so it will be tracked via custom events.
   * 
   */


  trackRoute(event) {
    const {
      route,
      customParameters = {},
      transport
    } = event;
    const parameters = {
      "Route": route,
      ...customParameters
    };
    return this.trackEvent({
      category: "Routing",
      action: "Opened page",
      customParameters: parameters,
      nonInteraction: false,
      transport
    });
  }
  /**
   * Mixpanel does not offer support for uninitializing the tracker.
   * 
   */


  async teardown() {}

}, (_applyDecoratedDescriptor(_class.prototype, "trackEvent", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "trackEvent"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "trackRoute", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "trackRoute"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "teardown", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "teardown"), _class.prototype)), _class));
exports.default = MixPanelAnalytics;