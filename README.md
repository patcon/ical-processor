# iCal Tracking Processor

![](/screenshot.png)

This simple app allows a given ical feed to be processed to swap out urls with trackable redirects links. These redirect links can then be monitored to understand popularity of the overall calendar and individual events.

## Development To Do

- [x] Create `/parse-ical` endpoint to substitute event urls with trackable links
- [x] Create stub `/redirect` endpoint to redirect trackable link to destination
- [ ] Deploy demo app
- [ ] Track link visit count in backend (Google Analytics as MVP)
- [ ] Create front splash page
- [ ] Make ical links user-specific, so can track unique user visits

## Usage

```
pipenv install
pipenv run python app.py
```

The app will now be served from http://127.0.0.1:5000

### Endpoint: `/parse-ical`

This processes an ical feed provided via the `ical_url` query param. It generates a new ical feed where any URLs within the event description fields gets turned into a redirect through the `/redirect` endpoint, which can be logged.

A sample ical feed is `https://calendar.google.com/calendar/ical/8ba1e5d2f51d2872501c5a28473e8e954c0cae2471468db75ba740bc1abc8036%40group.calendar.google.com/public/basic.ics`.

Normally, the returned mimetype is for downloadable ical format, but we can force an inspectable text response in the browser via query param `debug=1`.

For example, you may view this endpoint working at:
http://127.0.0.1:5000/parse-ical?debug=1&ical_url=https://calendar.google.com/calendar/ical/8ba1e5d2f51d2872501c5a28473e8e954c0cae2471468db75ba740bc1abc8036%40group.calendar.google.com/public/basic.ics

Be sure to remove `debug=1` when adding the ical feed to Google Calendar.

### Endpoint: `/redirect`

This endpoint 302 redirects to a url that is base64-encoded in the `data` query param.

For example, `https://example.com` is base64-encoded as `aHR0cHM6Ly9leGFtcGxlLmNvbS8=`. You can view this endpoint working at:
http://127.0.0.1:5000/redirect?data=aHR0cHM6Ly9leGFtcGxlLmNvbS8=