import { CustomParameters, HeLxAnalyticsTracker, RouteEvent, TrackingEvent, TrackingResponse } from "./Analytics";
import type { GaOptions } from 'react-ga4/types/ga4';
export interface GASetupData {
    /**
     * Refers to a GA4 property ID for the project.
     */
    trackingId: string;
    options?: {
        nonce?: string;
        testMode?: boolean;
        gtagUrl?: string;
        gaOptions?: GaOptions | any;
        gtagOptions?: any;
    };
}
export default class GAAnalytiics extends HeLxAnalyticsTracker {
    constructor(setupData: GASetupData, globalCustomParameters?: CustomParameters);
    setup(setupData: GASetupData): Promise<void>;
    trackEvent(event: TrackingEvent): Promise<TrackingResponse>;
    trackRoute(event: RouteEvent): Promise<TrackingResponse>;
    teardown(): Promise<void>;
}
//# sourceMappingURL=GAAnalytics.d.ts.map