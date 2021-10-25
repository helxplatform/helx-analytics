import { CustomParameters, HeLxAnalyticsTracker, RouteEvent, TrackingEvent, TrackingResponse } from "./Analytics";
import * as ReactGA from 'react-ga';
export interface GASetupData {
    /**
     * Refers to a UA property ID for the project.
     */
    trackingId: string;
    /**
     * See `ReactGA.InitializeOptions`.
     */
    options?: ReactGA.InitializeOptions;
}
export default class GAAnalytiics extends HeLxAnalyticsTracker {
    constructor(setupData: GASetupData, globalCustomParameters?: CustomParameters);
    setup(setupData: GASetupData): Promise<void>;
    trackEvent(event: TrackingEvent): Promise<TrackingResponse>;
    trackRoute(event: RouteEvent): Promise<TrackingResponse>;
    teardown(): Promise<void>;
}
//# sourceMappingURL=GAAnalytics.d.ts.map