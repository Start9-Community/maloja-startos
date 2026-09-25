import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '3.2.6:2',
  releaseNotes: {
    en_US:
      'Importing a large scrobble history no longer fails partway through.',
    es_ES:
      'Importar un historial grande de scrobbles ya no falla a mitad del proceso.',
    de_DE:
      'Der Import eines großen Scrobble-Verlaufs bricht nicht mehr mittendrin ab.',
    pl_PL:
      'Import dużej historii scrobbli nie kończy się już błędem w trakcie.',
    fr_FR:
      "L'importation d'un historique de scrobbles volumineux n'échoue plus en cours de route.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
