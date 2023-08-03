const app = Vue.createApp({
  data() {
      return {
          message: "banana"
      }
  },
  methods: {
      testMethod() {
          return this.message + "!";
      }
  }
})
// Delimiters changed to ES6 template string style
// See: https://mokkapps.de/vue-tips/change-the-interpolation-delimiter
app.config.compilerOptions.delimiters = ['[[', ']]']
app.mount('#app')
