import { HeLxAnalyticsTracker, TrackingEvent, TrackingResponse } from "./Analytics";
import * as ReactGA from 'react-ga';

export interface GASetupData {
    trackingId: string,
    options?: ReactGA.InitializeOptions
};

export default class GAAnalytiics extends HeLxAnalyticsTracker {
    async setup(setupData: GASetupData): Promise<void> {
        const { trackingId, options } = setupData;
        ReactGA.initialize(trackingId, options);
    }
    async trackEvent(event: TrackingEvent): Promise<TrackingResponse> {
        // ReactGA initializes synchronously, but just put this here as a reference.
        await this.setupPromise;
        // Google Analytics currently uses the keys exactly as-is in TrackingEvent.
        // (because TrackingEvent is based off GA, this will change with more trackers). 
        const { ...gaEvent } = event;
        // ReactGA does not expose the GA response through its methods, so just assume
        // it went through. It's not really consequential whether it's successful or not
        // anyways.
        ReactGA.event(gaEvent);
        return {
            success: true
        };
    }
    // ReactGA offers no way to destroy a tracker.
    async teardown(): Promise<void> {}
}