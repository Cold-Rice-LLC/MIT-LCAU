import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ztsecwdy',
    dataset: 'production',
  },
  // Deployed to mit-lcau.sanity.studio
  studioHost: 'mit-lcau',
  deployment: {
    // The deployed studio, so `sanity deploy` doesn't ask which it is
    appId: 'fhg4urs76n7xn6130mww0ess',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
