type Transport = 'beacon' | 'xhr' | 'image';

/**
 * Custom parameters will be handled differently by different platforms. For example, while Mixpanel has native support for custom parameters,
 * Google Analytics does not.
 * 
 * Note that it is recommended that custom parameter values stick to primitives, promises, and Functions. The values of functions will be automatically
 * resolved to its actual value before the event is posted to a tracker. Async functions *are* supported, and their values will be properly resolved. 
 */
export interface CustomParameters {
    // Any string is valid as a key, anything is valid as a value.
    // Gererally, only primitive types should be used as values. Functions will automatically be executed with no arguments
    // to resolve their value.
    [key: string]: any
}

interface Event {
    // Optional custom event parameters.
    customParameters?: CustomParameters,
    // An optional string corresponding to the preferred transport mechanism to be used.
    transport?: Transport
}

export interface TrackingEvent extends Event {
    // Basically a higher-level event 'type', referring to the
    // category of the event on the page (e.g. "Navigation").
    category: string,
    // Specific event 'type', or action, referring to the action
    // which triggered the event (e.g. "Clicked button", "Loaded page").
    action: string,
    // An optional, more-precise label for the action
    // (e.g. if action is "Clicked button", label could be "Knowledge graph details").
    label?: string,
    // An optional, numerical value corresponding to the event being tracked.
    value?: number,
    // An optional boolean representing if an event is programatic,
    // i.e., not triggered by user interaction, for example page load, usage time, etc.
    nonInteraction?: boolean
};

export interface RouteEvent extends Event {
    route: string,
    customParameters?: CustomParameters
};

export interface TrackingResponse {
    success: boolean;
}

/**
 * Decorator that awaits _setupPromise before proceeding with analytics method
 * (for use within an async function).
 * 
 * @decorator
 */
export function waitsForSetup(): Function {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        const method = descriptor.value;
        descriptor.value = async function(...args: any[]) {
            await this._setupPromise;
            return method.apply(this, args);
        };
        return descriptor;
    }
}

/**
 * Decorator that adds instance-defined `globalCustomParameters` to each event's custom parameters.
 * The values of custom parameters with Function values are also resolved in this decorator. 
 * 
 * 
 * @waitsForSetup
 */
export function trackingEvent(): Function {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        const method = descriptor.value;
        descriptor.value = async function(event: Event) {
            const params = event.customParameters || {};
            event.customParameters = {
                ...this.globalCustomParameters,
                ...params
            };
            for (let i=0; i<Object.keys(event.customParameters).length; i++) {
                const key = Object.keys(event.customParameters)[i];
                // If the value of a custom parameter is a Function, call the function to resolve its actual value.
                if (event.customParameters[key] instanceof Function) event.customParameters[key] = event.customParameters[key]();
                // If the value of a custom parameter is a Promise, await the promise to resolve its actual value.
                // Note: `await` automatically wraps non-Promise inputs into Promises, so there is no need for a type check.
                event.customParameters[key] = await event.customParameters[key];
            }
            return method.apply(this, [event]);
        };
        // Apply the `waitsForSetup` decorator to `trackingEvent` decorated methods.
        const decoratedDescriptor = waitsForSetup()(
            target,
            propertyKey,
            descriptor
        )
        Object.defineProperty(target, propertyKey, decoratedDescriptor);
        return descriptor;
    }
}

export abstract class HeLxAnalyticsTracker {
    /**
     * Used internally by trackers to buffer event tracking until the tracker has completed setup.
     */
    protected _setupPromise: Promise<void> = null;
    /** 
     * These custom parameters will be sent to the analytics platform on every event.
     * Specific customParameters attached to an event will override these. 
     * 
     */
    public globalCustomParameters: CustomParameters;
    /**
     * 
     * @param setupData - Data required in order to initialize a tracker
     * @param globalCustomParameters - These will be added to every event created by tracking methods. Specific customParameters on the event will override these instance-wide ones.
     */
    constructor(setupData: Object, globalCustomParameters: CustomParameters={}) {
        this._setupPromise = this.setup(setupData);
        this.globalCustomParameters = globalCustomParameters;
    }
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
    public abstract trackEvent(event: TrackingEvent): Promise<TrackingResponse>;

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
    public abstract trackRoute(event: RouteEvent): Promise<TrackingResponse>;

    /**
     * Perform final tracking (e.g. how long a tracker/page was used) and perform 
     * any teardown required to cease analytics collection.
     * 
     * Note: implementation should call @waitsForSetup
     * 
     * @async
     */
    public abstract teardown(): Promise<void>;
}