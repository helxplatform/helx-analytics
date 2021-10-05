function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

;

/**
 * 
 * @decorator
 */
export function waitsForSetup() {
  return function (target, propertyKey, descriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args) {
      await this._setupPromise;
      return method.apply(this, args);
    };
  };
}
export class HeLxAnalyticsTracker {
  constructor(setupData) {
    _defineProperty(this, "_setupPromise", null);

    this._setupPromise = this.setup(setupData);
  }
  /**
   * The setup method should initialize whatever tracking platform is being used
   * by the implementation so that it is ready to be used in trackEvent.
   * 
   * @async
   */


}