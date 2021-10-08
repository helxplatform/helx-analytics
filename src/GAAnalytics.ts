import { CustomParameters, HeLxAnalyticsTracker, RouteEvent, trackingEvent, TrackingEvent, TrackingResponse, waitsForSetup } from "./Analytics";
import * as ReactGA from 'react-ga';

export interface GASetupData {
    trackingId: string,
    options?: ReactGA.InitializeOptions
};

export default class GAAnalytiics extends HeLxAnalyticsTracker {
    constructor(setupData: GASetupData, globalCustomParameters: CustomParameters={}) {
        super(setupData, globalCustomParameters);
    }
    async setup(setupData: GASetupData): Promise<void> {
        const { trackingId, options } = setupData;
        ReactGA.initialize(trackingId, options);
    }
    @trackingEvent()
    async trackEvent(event: TrackingEvent): Promise<TrackingResponse> {
        // Google Analytics currently uses the keys exactly as-is in TrackingEvent.
        // (because TrackingEvent is based off GA, this will change with more trackers).
        const { customParameters, ...gaEvent } = event;
        // ReactGA does not expose the GA response through its methods, so just assume
        // it went through. It's not really consequential whether it's successful or not
        // anyways.
        ReactGA.event(gaEvent);
        return {
            success: true
        };
    }
    @trackingEvent()
    async trackRoute(event: RouteEvent): Promise<TrackingResponse> {
        const { route } = event;
        ReactGA.pageview(route);
        return {
            success: true
        };
    }
    // ReactGA offers no way to destroy a tracker.
    @waitsForSetup()
    async teardown(): Promise<void> {}
}