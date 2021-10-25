# HeLx Analytics Proof of Concept
A proof of concept for analytics collection within HeLX applications.

## Info
The project is built using Typescript and compiled to ES6 using Babel/tsc. It can be built
using `npm run build`. This will build the project to [lib](./lib).

It [exports](./src/index.ts) specific analytics tracker implementations of the abstract HeLXAnalyticsTracker.

#### Note: further, comprehensive explanations can be found in the actual definitions.

### HeLXAnalyticsTracker
The abstract class which each tracker implements. Made up of three methods:
- `setup` initializes the tracking platform so that it is ready to be used to track events.
- `trackEvent` tracks a specific event (e.g. visiting a page, clicking a button) and sends it to
  the tracking platform. This method takes the broad `TrackingEvent`, which the specific implementation then
  translates for its associated tracking platform.
- `trackRoute` tracks the specific route (page) which subsequent events will occur on.
- `teardown` should destroy the tracker.

### Trackers
#### GAAnalytics (Google Analytics via ReactGA)
- setup takes a GA tracking id and other associated options (see type definitions).
- trackEvent relays an event to Google Analytics.
- trackRoute conveys a special Google Analytic route event to the platform.
- teardown is a no-op, since ReactGA offers no method for destroying a tracker.

#### MixPanelAnalytics (Mixpanel using the mixpanel-browser client)
- setup takes a Mixpanel project token. Can also optionally enable debugging.
- trackEvent relays an event to Mixpanel
- trackRoute relays a custom-made tracking event to Mixpanel using trackEvent which conveys routing information.
- teardown is a no-op, since mixpanel-client doesn't allow deinitializing.

### Usage
1. A tracker (`GAAnalytics`, `MixPanelAnalytics`) should be imported and constructed using the appropriate setup data.
2. Its tracking methods (`trackEvent`, `trackRoute`) should be called accordingly to track usage statistics.
3. Teardown should be performed using `teardown` upon termination of analytics collection.