import { HeLxAnalyticsTracker, RouteEvent, TrackingEvent, TrackingResponse } from "./Analytics";
import * as ReactGA from 'react-ga';
export interface GASetupData {
    trackingId: string;
    options?: ReactGA.InitializeOptions;
}
export default class GAAnalytiics extends HeLxAnalyticsTracker {
    constructor(setupData: GASetupData);
    setup(setupData: GASetupData): Promise<void>;
    trackEvent(event: TrackingEvent): Promise<TrackingResponse>;
    trackRoute(event: RouteEvent): Promise<TrackingResponse>;
    teardown(): Promise<void>;
}
//# sourceMappingURL=GAAnalytics.d.ts.map