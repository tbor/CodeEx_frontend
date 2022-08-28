import { defineConfig } from 'cypress';

// Cypress end-to-end testing has not yet been implemented
export default defineConfig({
  projectId: 'nbix2p',
  e2e: {
    //npx cypress run --record --key 1620e971-a028-41f7-8185-2a0c72ef69a7
    setupNodeEvents(on, config) {
      // implement node event listeners
    },
  },
});

// module.exports = { projectId: "nbix2p"
//   // Cypress config options
// }
