# iCal Tracking Processor

This simple app allows a given ical feed to be processed to swap out urls with trackable redirects.

## Usage

```
pipenv install
pipenv run python app.py
```

The app will now be served from http://127.0.0.1:5000

### Endpoint: `/parse-ical`

A sample ical feed is `https://calendar.google.com/calendar/ical/8ba1e5d2f51d2872501c5a28473e8e954c0cae2471468db75ba740bc1abc8036%40group.calendar.google.com/public/basic.ics`.

For example, you may view this endpoint working at:
http://127.0.0.1:5000/parse-ical?ical_url=https://calendar.google.com/calendar/ical/8ba1e5d2f51d2872501c5a28473e8e954c0cae2471468db75ba740bc1abc8036%40group.calendar.google.com/public/basic.ics

### Endpoint: `/redirect`

This endpoint 302 redirects to a url that is base64-encoded in the `data` query param.

For example, `https://example.com` is base64-encoded as `aHR0cHM6Ly9leGFtcGxlLmNvbS8=`. You can view this endpoint working at:
http://127.0.0.1:5000/redirect?data=aHR0cHM6Ly9leGFtcGxlLmNvbS8=