# iCal Tracking Processor

This simple app allows a given ical feed to be processed to swap out urls with trackable redirects.

## Usage

```
pipenv install
pipenv run python app.py
```

The app will be served from http://127.0.0.1:5000

A sample ical feed is `https://calendar.google.com/calendar/ical/8ba1e5d2f51d2872501c5a28473e8e954c0cae2471468db75ba740bc1abc8036%40group.calendar.google.com/public/basic.ics`.

With the app running, you may view it at: http://127.0.0.1:5000/parse-ical?ical_url=https://calendar.google.com/calendar/ical/8ba1e5d2f51d2872501c5a28473e8e954c0cae2471468db75ba740bc1abc8036%40group.calendar.google.com/public/basic.ics
