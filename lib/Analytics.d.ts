declare type Transport = 'beacon' | 'xhr' | 'image';
/**
 * Custom parameters will be handled differently by different platforms. For example, while Mixpanel has native support for custom parameters,
 * Google Analytics does not.
 *
 * Note that it is recommended that custom parameter values stick to primitives, promises, and Functions. The values of functions will be automatically
 * resolved to its actual value before the event is posted to a tracker. Async functions *are* supported, and their values will be properly resolved.
 */
export interface CustomParameters {
    [key: string]: any;
}
interface Event {
    customParameters?: CustomParameters;
    transport?: Transport;
}
export interface TrackingEvent extends Event {
    category: string;
    action: string;
    label?: string;
    value?: number;
    nonInteraction?: boolean;
}
export interface RouteEvent extends Event {
    route: string;
    customParameters?: CustomParameters;
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
/**
 * Decorator that adds instance-defined `globalCustomParameters` to each event's custom parameters.
 * The values of custom parameters with Function values are also resolved in this decorator.
 *
 *
 * @waitsForSetup
 */
export declare function trackingEvent(): Function;
export declare abstract class HeLxAnalyticsTracker {
    /**
     * Used internally by trackers to buffer event tracking until the tracker has completed setup.
     */
    protected _setupPromise: Promise<void>;
    /**
     * These custom parameters will be sent to the analytics platform on every event.
     * Specific customParameters attached to an event will override these.
     *
     */
    globalCustomParameters: CustomParameters;
    /**
     *
     * @param setupData - Data required in order to initialize a tracker
     * @param globalCustomParameters - These will be added to every event created by tracking methods. Specific customParameters on the event will override these instance-wide ones.
     */
    constructor(setupData: Object, globalCustomParameters?: CustomParameters);
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
     * Note: implementation should call @trackingEvent
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
     * TODO: in the future, could add a parameter "oldRoute" that tracks which page the user left.
     * TODO: in the future, the custom parameter "Duration" could be added to track how long a user spent on a page.
     * Note: implementation should call @trackingEvent
     *
     * @async
     */
    abstract trackRoute(event: RouteEvent): Promise<TrackingResponse>;
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