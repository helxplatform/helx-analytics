import { HeLxAnalyticsTracker, RouteEvent, TrackingEvent } from "./Analytics";
/**
 * A no-op tracker that can be substituted for a real tracking implementation
 * to easily disable tracking without impairing functionality.
 */
export default class NoAnalytics extends HeLxAnalyticsTracker {
    setup(setupData: Object): Promise<void>;
    trackEvent(event: TrackingEvent): Promise<{
        success: boolean;
    }>;
    trackRoute(event: RouteEvent): Promise<{
        success: boolean;
    }>;
    teardown(): Promise<void>;
}
//# sourceMappingURL=NoAnalytics.d.ts.map