const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'http://localhost:3000',
    video: false
  },
  env: {
    BACKEND: 'http://localhost:8080/api'
  }
})
