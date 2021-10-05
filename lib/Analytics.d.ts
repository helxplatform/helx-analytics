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
/**
 * Decorator that awaits _setupPromise before proceeding with analytics method
 * (for use within an async function).
 *
 * @decorator
 */
export declare function waitsForSetup(): Function;
export declare abstract class HeLxAnalyticsTracker {
    _setupPromise: Promise<void>;
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
     * Note: implementation should call @waitsForSetup
     *
     * @async
     */
    abstract trackEvent(event: TrackingEvent): Promise<TrackingResponse>;
    /**
     * Tracks the specific route (page) which following events will be taking place.
     * Some implementations, such as Google Analytics, require route tracking in order
     * to work properly.
     *
     * @param {string} route - Should be the relative path for the URL (e.g. "/search/foobar").
     *
     * Note: implementation should call @waitsForSetup
     *
     * @async
     */
    abstract trackRoute(route: string): Promise<TrackingResponse>;
    /**
     * Perform final tracking (e.g. how long a tracker/page was used) and perform
     * any teardown required to cease analytics collection.
     *
     * Note: implementation should call @waitsForSetup
     *
     * @async
     */
    abstract teardown(): Promise<void>;
}
export {};
//# sourceMappingURL=Analytics.d.ts.map