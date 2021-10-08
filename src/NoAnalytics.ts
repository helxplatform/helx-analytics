import { HeLxAnalyticsTracker, RouteEvent, trackingEvent, TrackingEvent, TrackingResponse, waitsForSetup } from "./Analytics";

/**
 * A no-op tracker that can be substituted for a real tracking implementation
 * to easily disable tracking without impairing functionality.
 */
export default class NoAnalytics extends HeLxAnalyticsTracker {
    async setup(setupData: Object) {}
    @trackingEvent()
    async trackEvent(event: TrackingEvent) {
        return {
            success: true
        };
    }
    @trackingEvent()
    async trackRoute(event: RouteEvent) {
        return {
            success: true
        };
    }
    @waitsForSetup()
    async teardown() {}
}