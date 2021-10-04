# HeLx Analytics Proof of Concept
A proof of concept for analytics collection within HeLX applications.

## Info
The project is built using Typescript and compiled to ES6 using Babel/tsc. It can be built
using `npm run build`. This will build the project to [lib](./lib).

It [exports](./src/index.ts) specific analytics tracker implementations of the abstract HeLXAnalyticsTracker.
### HeLXAnalyticsTracker
The abstract class which each tracker implements. Made up of three methods:
- `setup` initializes the tracking platform so that it is ready to be used to track events.
- `trackEvent` tracks a specific event (e.g. visiting a page, clicking a button) and sends it to
  the tracking platform. This method takes the broad `TrackingEvent`, which the specific implementation then
  translates for its associated tracking platform.
- `teardown` should destroy the tracker.

### Trackers
There is currently only one analytics tracker implementation.

#### GAAnalytics (Google Analytics via ReactGA)
- setup takes a GA tracking id and other associated options (see type definitions).
- trackEvent relays an event to Google Analytics
- teardown is a no-op, since ReactGA offers no method for destroying a tracker.