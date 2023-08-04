from flask import Flask, request, Response, redirect, render_template
from icalendar import Calendar
import re
import urllib.parse
import base64
import logging
import os

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)

def strip_html_tags(text):
    return re.sub('<[^<]+?>', '', text)

def get_base_url():
    if os.environ.get('RENDER_EXTERNAL_URL'):
        return os.environ.get('RENDER_EXTERNAL_URL')

    if os.environ.get('ICALPROC_BASE_URL'):
        return os.environ.get('ICALPROC_BASE_URL')

    return 'http://127.0.0.1:8000'

def generate_encoded_redirect_url(url):
    encoded_url = base64.b64encode(url.encode()).decode()
    return f'{get_base_url()}/redirect?data={encoded_url}'

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html', base_url=get_base_url())

@app.route('/js/app.js', methods=['GET'])
def app_script():
    return render_template('app.js', base_url=get_base_url())

@app.route('/parse-ical', methods=['GET'])
def parse_ical():
    ical_url = request.args.get('ical_url')
    if not ical_url:
        return {"error": "No ical url provided"}, 400

    # Fetch the ical feed
    ical_feed = urllib.request.urlopen(ical_url).read().decode()

    # Parse the ical feed
    cal = Calendar.from_ical(ical_feed)

    # Process all events
    for component in cal.walk():
        if component.name == "VEVENT":
            description = component.get('description')
            if description:
                # Strip HTML from the description
                description = strip_html_tags(description)

                # Find all URLS in the description
                urls = re.findall('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', description)

                # Replace all URLS with something else
                for url in urls:
                    description = description.replace(url, generate_encoded_redirect_url(url))

                component['description'] = description

    mimetype = 'text/calendar'
    # Return plaintext response if debugging
    if request.args.get('debug'):
        mimetype = 'text/plain'

    # Return debug response with all the urls found
    return Response(cal.to_ical(), mimetype=mimetype)

@app.route('/redirect', methods=['GET'])
def redirect_url():
    encoded_url = request.args.get('data')
    if not encoded_url:
        return {"error": "No encoded data provided"}, 400

    # Decode the URL
    decoded_url = base64.b64decode(encoded_url).decode()

    # Log the URL visit event
    # TODO: Log this to a database or analytics service
    logging.debug("Redirect event: %s", decoded_url)

    # Redirect to the decoded URL
    return redirect(decoded_url)

if __name__ == '__main__':
    app.run(debug=True)
