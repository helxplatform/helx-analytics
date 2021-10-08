;
;

/**
 * Decorator that awaits _setupPromise before proceeding with analytics method
 * (for use within an async function).
 * 
 * @decorator
 */
export function waitsForSetup() {
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
 * Decorator that adds instance-defined `globalCustomParameters` to each events' custom parameters.
 * 
 * 
 * @waitsForSetup
 */

export function trackingEvent() {
  return (target, propertyKey, descriptor) => {
    const method = descriptor.value;

    descriptor.value = async function (event) {
      const params = event.customParameters || {};
      event.customParameters = { ...this.globalCustomParameters,
        ...params
      };
      return method.apply(this, [event]);
    }; // Apply the `waitsForSetup` decorator to `trackingEvent` decorated methods.


    const decoratedDescriptor = waitsForSetup()(target, propertyKey, descriptor);
    Object.defineProperty(target, propertyKey, decoratedDescriptor);
    return descriptor;
  };
}
export class HeLxAnalyticsTracker {
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