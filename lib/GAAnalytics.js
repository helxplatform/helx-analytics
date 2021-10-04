import { HeLxAnalyticsTracker } from "./Analytics";
import * as ReactGA from 'react-ga';
;
export default class GAAnalytiics extends HeLxAnalyticsTracker {
  async setup(setupData) {
    const {
      trackingId,
      options
    } = setupData;
    ReactGA.initialize(trackingId, options);
  }

  async trackEvent(event) {
    // ReactGA initializes synchronously, but just put this here as a reference.
    await this.setupPromise; // Google Analytics currently uses the keys exactly as-is in TrackingEvent.
    // (because TrackingEvent is based off GA, this will change with more trackers). 

    const { ...gaEvent
    } = event; // ReactGA does not expose the GA response through its methods, so just assume
    // it went through. It's not really consequential whether it's successful or not
    // anyways.

    ReactGA.event(gaEvent);
    return {
      success: true
    };
  } // ReactGA offers no way to destroy a tracker.


  async teardown() {}

}