import { HeLxAnalyticsTracker, TrackingEvent, TrackingResponse, waitsForSetup } from "./Analytics";
import mixpanel, { RequestOptions } from 'mixpanel-browser';

export interface MixPanelSetupData {
    projectToken: string,
    debug?: boolean
};

export default class MixPanelAnalytics extends HeLxAnalyticsTracker {
    constructor(setupData: MixPanelSetupData) {
        super(setupData);
    }
    // If unspecified, debug will be set to false
    async setup({ projectToken, debug=false }: MixPanelSetupData) {
        mixpanel.init(projectToken, {
            debug
        });
    }
    /**
     * Mixpanel tracks events in the following structure: event name, event properties, options, callback
     */
    @waitsForSetup()
    trackEvent(event: TrackingEvent) {
        // Destructure the event into only the parameters that can be used in Mixpanel. Others aren't supported.
        const { category, action, label, value, customParameters={}, nonInteraction=false, transport } =  event;
        /* Store metadata parameters describing the event as custom parameters. */
        customParameters["_nonInteraction"] = nonInteraction;
        customParameters["_category"] = category;
        customParameters["_label"] = label;
        /* Construct Mixpanel options */
        const options: RequestOptions = {};
        switch (transport) {
            case "beacon":
                options.transport = "sendBeacon";
                break;
            case "xhr":
                options.transport = "xhr";
                break;
            case "image":
                // Mixpanel transport only supports beacon and xhr. "image" will be discarded.
                break;
            case undefined:
                break;
            default:
                // Unrecognized transport option
                break;
        };
        // Setup promise response.
        return new Promise<TrackingResponse>((resolve) => {
            // Track the event name as the action
            mixpanel.track(action, customParameters, options, (response) => {
                const success = response === 1 ? true : false;
                resolve({
                    success
                });
            });
        });
    }
    /**
     * Mixpanel does not offer native support for route tracking, so it will be tracked via custom events.
     * 
     */
    @waitsForSetup()
    trackRoute(route: string) {
        const customParameters = {
            "Route": route,
        };
        return this.trackEvent({
            category: "Routing",
            action: "Opened page",
            customParameters,
            
        });
    }
    /**
     * Mixpanel does not offer support for uninitializing the tracker.
     * 
     */
    @waitsForSetup()
    async teardown() {}
}