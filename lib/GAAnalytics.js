var _dec, _dec2, _dec3, _class;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

import { HeLxAnalyticsTracker, trackingEvent, waitsForSetup } from "./Analytics";
import * as ReactGA from 'react-ga';
;
let GAAnalytiics = (_dec = trackingEvent(), _dec2 = trackingEvent(), _dec3 = waitsForSetup(), (_class = class GAAnalytiics extends HeLxAnalyticsTracker {
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
export { GAAnalytiics as default };