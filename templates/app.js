const app = Vue.createApp({
  data() {
      return {
          icalUrl: "https://calendar.google.com/calendar/ical/8ba1e5d2f51d2872501c5a28473e8e954c0cae2471468db75ba740bc1abc8036%40group.calendar.google.com/public/basic.ics",
          icalUrlPlaceholder: "https://example.com/calendar.ics",
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
        this.generateUrls();
      },
      generateUrls() {
        let icalUrl = this.icalUrl
        if (icalUrl == "") {
          icalUrl = this.icalUrlPlaceholder;
        }
        this.trackedUrl = `{{ base_url }}/parse-ical?ical_url=${icalUrl}`;
        this.trackedUrlPreview = `{{ base_url }}/parse-ical?debug=1&ical_url=${icalUrl}`;
      },
      initialize() {
        this.generateUrls();
      },
      copyTrackedUrl() {
        const input = this.$refs.trackedUrl;
        // Source: https://stackoverflow.com/a/60239236
        if (!navigator.clipboard) {
          input.select();
          input.setSelectionRange(0, 99999);
          document.execCommand('copy');
        } else {
          navigator.clipboard.writeText(input.value);
        }
      },
  }
})
// Delimiters changed to ES6 template string style
// See: https://mokkapps.de/vue-tips/change-the-interpolation-delimiter
app.config.compilerOptions.delimiters = ['[[', ']]']
app.mount('#app')
