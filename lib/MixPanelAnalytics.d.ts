import { HeLxAnalyticsTracker, TrackingEvent, TrackingResponse, RouteEvent, CustomParameters } from "./Analytics";
export interface MixPanelSetupData {
    /**
     * Refers to the Mixpanel project token.
     * See {@link https://help.mixpanel.com/hc/en-us/articles/115004502806-Find-Project-Token-|here} for instructions on how to find a project's token.
     */
    projectToken: string;
    /**
     * A setting used by `mixpanel-browser` to enable debugging.
     */
    debug?: boolean;
}
export default class MixPanelAnalytics extends HeLxAnalyticsTracker {
    constructor(setupData: MixPanelSetupData, globalCustomParameters?: CustomParameters);
    setup({ projectToken, debug }: MixPanelSetupData): Promise<void>;
    /**
     * Mixpanel tracks events in the following structure: event name, event properties, options, callback
     */
    trackEvent(event: TrackingEvent): Promise<TrackingResponse>;
    /**
     * Mixpanel does not offer native support for route tracking, so it will be tracked via custom events.
     *
     */
    trackRoute(event: RouteEvent): Promise<TrackingResponse>;
    /**
     * Mixpanel does not offer support for uninitializing the tracker.
     *
     */
    teardown(): Promise<void>;
}
//# sourceMappingURL=MixPanelAnalytics.d.ts.map