const app = Vue.createApp({
  data() {
      return {
          icalUrl: "https://calendar.google.com/calendar/ical/8ba1e5d2f51d2872501c5a28473e8e954c0cae2471468db75ba740bc1abc8036%40group.calendar.google.com/public/basic.ics",
          trackedUrl: "",
          trackedUrlPreview: "",
      }
  },
  mounted() {
    this.initialize();
  },
  methods: {
      handleIcalUrlInput(event) {
        this.icalUrl = event.target.value;
        this.trackedUrl = `http://127.0.0.1:5000/parse-ical?ical_url=${this.icalUrl}`;
        this.trackedUrlPreview = `http://127.0.0.1:5000/parse-ical?debug=1&ical_url=${this.icalUrl}`;
      },
      initialize() {
        this.trackedUrl = `http://127.0.0.1:5000/parse-ical?ical_url=${this.icalUrl}`;
      },
  }
})
// Delimiters changed to ES6 template string style
// See: https://mokkapps.de/vue-tips/change-the-interpolation-delimiter
app.config.compilerOptions.delimiters = ['[[', ']]']
app.mount('#app')
