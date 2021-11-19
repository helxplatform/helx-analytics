"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeLxAnalyticsTracker = void 0;
exports.trackingEvent = trackingEvent;
exports.waitsForSetup = waitsForSetup;

/**
 * Custom parameters will be handled differently by different platforms. For example, while Mixpanel has native support for custom parameters,
 * Google Analytics does not.
 * 
 * Note that it is recommended that custom parameter values stick to primitives, promises, and Functions. The values of functions will be automatically
 * resolved to its actual value before the event is posted to a tracker. Async functions *are* supported, and their values will be properly resolved. 
 */
;
;

/**
 * Decorator that awaits _setupPromise before proceeding with analytics method
 * (for use within an async function).
 * 
 * @decorator
 */
function waitsForSetup() {
  return (target, propertyKey, descriptor) => {
    const method = descriptor.value;

    descriptor.value = async function (...args) {
      await this._setupPromise;
      return method.apply(this, args);
    };

    return descriptor;
  };
}
/**
 * Decorator that adds instance-defined `globalCustomParameters` to each event's custom parameters.
 * The values of custom parameters with Function values are also resolved in this decorator. 
 * 
 * 
 * @waitsForSetup
 */


function trackingEvent() {
  return (target, propertyKey, descriptor) => {
    const method = descriptor.value;

    descriptor.value = async function (event) {
      const params = event.customParameters || {};
      event.customParameters = { ...this.globalCustomParameters,
        ...params
      };

      for (let i = 0; i < Object.keys(event.customParameters).length; i++) {
        const key = Object.keys(event.customParameters)[i]; // If the value of a custom parameter is a Function, call the function to resolve its actual value.

        if (event.customParameters[key] instanceof Function) event.customParameters[key] = event.customParameters[key](); // If the value of a custom parameter is a Promise, await the promise to resolve its actual value.
        // Note: `await` automatically wraps non-Promise inputs into Promises, so there is no need for a type check.

        event.customParameters[key] = await event.customParameters[key];
      }

      return method.apply(this, [event]);
    }; // Apply the `waitsForSetup` decorator to `trackingEvent` decorated methods.


    const decoratedDescriptor = waitsForSetup()(target, propertyKey, descriptor);
    Object.defineProperty(target, propertyKey, decoratedDescriptor);
    return descriptor;
  };
}

class HeLxAnalyticsTracker {
  /**
   * Used internally by trackers to buffer event tracking until the tracker has completed setup.
   */

  /** 
   * These custom parameters will be sent to the analytics platform on every event.
   * Specific customParameters attached to an event will override these. 
   * 
   */

  /**
   * 
   * @param setupData - Data required in order to initialize a tracker
   * @param globalCustomParameters - These will be added to every event created by tracking methods. Specific customParameters on the event will override these instance-wide ones.
   */
  constructor(setupData, globalCustomParameters = {}) {
    this._setupPromise = null;
    this.globalCustomParameters = void 0;
    this._setupPromise = this.setup(setupData);
    this.globalCustomParameters = globalCustomParameters;
  }
  /**
   * The setup method should initialize whatever tracking platform is being used
   * by the implementation so that it is ready to be used in trackEvent.
   * 
   * @async
   */


}

exports.HeLxAnalyticsTracker = HeLxAnalyticsTracker;