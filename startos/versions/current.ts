import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '3.2.6:3',
  releaseNotes: {
    en_US: `Importing a large scrobble history no longer fails partway through.

- Set Admin Password asks for confirmation before replacing an existing password.
- Import Scrobbles shows Maloja's report in a box you can copy, with its line breaks kept and without stray formatting codes.`,
    es_ES: `Importar un historial grande de scrobbles ya no falla a mitad del proceso.

- Establecer contraseña de administrador pide confirmación antes de reemplazar una contraseña existente.
- Importar Scrobbles muestra el informe de Maloja en un cuadro que puedes copiar, con sus saltos de línea y sin códigos de formato sueltos.`,
    de_DE: `Der Import eines großen Scrobble-Verlaufs bricht nicht mehr mittendrin ab.

- „Admin-Passwort festlegen“ fragt nach einer Bestätigung, bevor ein vorhandenes Passwort ersetzt wird.
- „Scrobbles importieren“ zeigt Malojas Bericht in einem kopierbaren Feld, mit erhaltenen Zeilenumbrüchen und ohne störende Formatierungscodes.`,
    pl_PL: `Import dużej historii scrobbli nie kończy się już błędem w trakcie.

- „Ustaw hasło administratora” prosi o potwierdzenie przed zastąpieniem istniejącego hasła.
- „Importuj Scrobble” pokazuje raport Maloja w polu, które można skopiować, z zachowanymi podziałami wierszy i bez zbędnych kodów formatowania.`,
    fr_FR: `L'importation d'un historique de scrobbles volumineux n'échoue plus en cours de route.

- Définir le mot de passe administrateur demande une confirmation avant de remplacer un mot de passe existant.
- Importer les scrobbles affiche le rapport de Maloja dans un champ copiable, avec ses retours à la ligne et sans codes de formatage parasites.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
