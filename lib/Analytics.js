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
  };
}
export class HeLxAnalyticsTracker {
  constructor(setupData) {
    this._setupPromise = null;
    this._setupPromise = this.setup(setupData);
  }
  /**
   * The setup method should initialize whatever tracking platform is being used
   * by the implementation so that it is ready to be used in trackEvent.
   * 
   * @async
   */


}