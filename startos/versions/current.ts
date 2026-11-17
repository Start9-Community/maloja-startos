import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '3.2.10:2',
  releaseNotes: {
    en_US:
      'Import Scrobbles now takes an uploaded file instead of pasted text, so exports of any size can be imported, and it accepts Last.fm, Spotify, ListenBrainz, and Rockbox exports as well as Maloja’s own. Rebuilt with start-sdk 4.1.0; requires StartOS 0.4.2 or later.',
    es_ES:
      'Importar Scrobbles ahora recibe un archivo subido en lugar de texto pegado, por lo que se pueden importar exportaciones de cualquier tamaño, y acepta exportaciones de Last.fm, Spotify, ListenBrainz y Rockbox además de las de Maloja. Recompilado con start-sdk 4.1.0; requiere StartOS 0.4.2 o posterior.',
    de_DE:
      'Scrobbles importieren nimmt jetzt eine hochgeladene Datei statt eingefügten Text entgegen, sodass Exporte jeder Größe importiert werden können, und akzeptiert neben Maloja-Exporten auch Exporte von Last.fm, Spotify, ListenBrainz und Rockbox. Neu gebaut mit start-sdk 4.1.0; erfordert StartOS 0.4.2 oder neuer.',
    pl_PL:
      'Importuj Scrobble przyjmuje teraz przesłany plik zamiast wklejonego tekstu, więc można importować eksporty dowolnej wielkości, i obsługuje oprócz eksportów Maloja także eksporty z Last.fm, Spotify, ListenBrainz i Rockbox. Przebudowano z start-sdk 4.1.0; wymaga StartOS 0.4.2 lub nowszego.',
    fr_FR:
      'Importer les scrobbles reçoit désormais un fichier envoyé au lieu de texte collé, ce qui permet d’importer des exports de toute taille, et accepte les exports Last.fm, Spotify, ListenBrainz et Rockbox en plus de ceux de Maloja. Recompilé avec start-sdk 4.1.0 ; nécessite StartOS 0.4.2 ou une version ultérieure.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
