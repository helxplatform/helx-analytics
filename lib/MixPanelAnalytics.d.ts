import { HeLxAnalyticsTracker, TrackingEvent, TrackingResponse } from "./Analytics";
export interface MixPanelSetupData {
    projectToken: string;
    debug?: boolean;
}
export default class MixPanelAnalytics extends HeLxAnalyticsTracker {
    constructor(setupData: MixPanelSetupData);
    setup({ projectToken, debug }: MixPanelSetupData): Promise<void>;
    /**
     * Mixpanel tracks events in the following structure: event name, event properties, options, callback
     */
    trackEvent(event: TrackingEvent): Promise<TrackingResponse>;
    /**
     * Mixpanel does not offer native support for route tracking, so it will be tracked via custom events.
     *
     */
    trackRoute(route: string): Promise<TrackingResponse>;
    /**
     * Mixpanel does not offer support for uninitializing the tracker.
     *
     */
    teardown(): Promise<void>;
}
//# sourceMappingURL=MixPanelAnalytics.d.ts.map