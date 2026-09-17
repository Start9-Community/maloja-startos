import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '3.2.6:1',
  releaseNotes: {
    en_US: "Adds a donation link to Maloja's developer on the marketplace listing.",
    es_ES: 'Añade un enlace de donación al desarrollador de Maloja en la ficha del marketplace.',
    de_DE: 'Fügt einen Spendenlink zum Maloja-Entwickler im Marktplatz-Eintrag hinzu.',
    pl_PL: 'Dodaje link do wsparcia finansowego twórcy Maloja na stronie w markecie.',
    fr_FR: "Ajoute un lien de don vers le développeur de Maloja sur la fiche du marketplace.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
