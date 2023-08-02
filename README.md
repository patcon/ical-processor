# iCal Tracking Processor

![](/screenshot.png)

This simple app allows a given ical feed to be processed to swap out urls with trackable redirects links. These redirect links can then be monitored to understand popularity of the overall calendar and individual events.

## Development To Do

- [x] Create `/parse-ical` endpoint to substitute event urls with trackable links
- [x] Create stub `/redirect` endpoint to redirect trackable link to destination
- [x] Deploy demo app
- [ ] Add Deploy button to README
- [ ] Track link visit count in backend (Google Analytics as MVP)
- [ ] Create front splash page
- [ ] Make ical links user-specific, so can track unique user visits

## Usage

```
pipenv install
pipenv run gunicorn app:app
```

The app will now be served from http://127.0.0.1:8000

If serving from any other non-local domain, be sure to set the envvar `ICALPROC_BASE_URL` at runtime like so:

```
ICALPROC_BASE_URL=http://mydomain.com pipenv run gunicorn app:app
```

### Endpoint: `/parse-ical`

This processes an ical feed provided via the `ical_url` query param. It generates a new ical feed where any URLs within the event description fields gets turned into a redirect through the `/redirect` endpoint, which can be logged.

A sample ical feed is `https://calendar.google.com/calendar/ical/8ba1e5d2f51d2872501c5a28473e8e954c0cae2471468db75ba740bc1abc8036%40group.calendar.google.com/public/basic.ics`.

Normally, the returned mimetype is for downloadable ical format, but we can force an inspectable text response in the browser via query param `debug=1`.

For example, you may view this endpoint working at:
http://127.0.0.1:8000/parse-ical?debug=1&ical_url=https://calendar.google.com/calendar/ical/8ba1e5d2f51d2872501c5a28473e8e954c0cae2471468db75ba740bc1abc8036%40group.calendar.google.com/public/basic.ics

Be sure to remove `debug=1` when adding the ical feed to Google Calendar.

### Endpoint: `/redirect`

This endpoint 302 redirects to a url that is base64-encoded in the `data` query param.

For example, `https://example.com` is base64-encoded as `aHR0cHM6Ly9leGFtcGxlLmNvbS8=`. You can view this endpoint working at:
http://127.0.0.1:8000/redirect?data=aHR0cHM6Ly9leGFtcGxlLmNvbS8=

### Development

For local development, feel free to use a tool that exposes localhost on the public internet. This will allow you to import an ical feed that is being processed on your local machine.

`ngrok` is a great tool that can be [installed](https://ngrok.com/download) and used for free via:

```
# Run this in first terminal
ICALPROC_BASE_URL=https://my-ical-processor.ngrok.io pipenv run gunicorn app:app

# Run this in another terminal
ngrok http -subdomain=my-ical-processor 8000
```

In browser, confirm working via: https://my-ical-processor.ngrok.io/parse-ical?debug=1&ical_url=https://calendar.google.com/calendar/ical/8ba1e5d2f51d2872501c5a28473e8e954c0cae2471468db75ba740bc1abc8036%40group.calendar.google.com/public/basic.ics

In Google Calendar, import this URL to test: `https://my-ical-processor.ngrok.io/parse-ical?dical_url=https://calendar.google.com/calendar/ical/8ba1e5d2f51d2872501c5a28473e8e954c0cae2471468db75ba740bc1abc8036%40group.calendar.google.com/public/basic.ics

## Deployment

### Render

Render is a platform that offers free hosting of small apps.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/patcon/ical-processor)
