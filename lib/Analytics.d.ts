declare type Transport = 'beacon' | 'xhr' | 'image';
export interface TrackingEvent {
    category: string;
    action: string;
    label?: string;
    value?: number;
    nonInteraction?: boolean;
    transport?: Transport;
}
export interface TrackingResponse {
    success: boolean;
}
export declare abstract class HeLxAnalyticsTracker {
    protected setupPromise: Promise<void>;
    constructor(setupData: Object);
    /**
     * The setup method should initialize whatever tracking platform is being used
     * by the implementation so that it is ready to be used in trackEvent.
     *
     * @async
     */
    protected abstract setup(setupData: Object): Promise<void>;
    /**
     * Tracks a specific event (e.g. visiting a page, clicking a button, etc.)
     * by sending it to the analytics platform.
     *
     * TrackingEvent is broad and should contain data required by all trackers
     * (which has great overlap).
     *
     * This method should choose/transform the data specifically relevant
     * to the implementation's tracking platform and relay it accordingly.
     *
     * Note: implementation should await setupPromise (if setup is asynchronous).
     *
     * @async
     */
    abstract trackEvent(event: TrackingEvent): Promise<TrackingResponse>;
    /**
     * Perform final tracking (e.g. how long a tracker/page was used) and perform
     * any teardown required to cease analytics collection.
     *
     * @async
     */
    abstract teardown(): Promise<void>;
}
export {};
//# sourceMappingURL=Analytics.d.ts.map