var _dec, _dec2, _dec3, _class;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

import { HeLxAnalyticsTracker, waitsForSetup } from "./Analytics";
/**
 * A no-op tracker that can be substituted for a real tracking implementation
 * to easily disable tracking without impairing functionality.
 */

let NoAnalytics = (_dec = waitsForSetup(), _dec2 = waitsForSetup(), _dec3 = waitsForSetup(), (_class = class NoAnalytics extends HeLxAnalyticsTracker {
  async setup(setupData) {}

  async trackEvent(event) {
    return {
      success: true
    };
  }

  async trackRoute(route) {
    return {
      success: true
    };
  }

  async teardown() {}

}, (_applyDecoratedDescriptor(_class.prototype, "trackEvent", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "trackEvent"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "trackRoute", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "trackRoute"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "teardown", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "teardown"), _class.prototype)), _class));
export { NoAnalytics as default };