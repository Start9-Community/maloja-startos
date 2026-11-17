import { types as T } from '@start9labs/start-sdk'
import { randomUUID } from 'node:crypto'
import { mkdir, rm } from 'node:fs/promises'
import { dirname } from 'node:path'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { uploadDir } from '../utils'

const { InputSpec, Value } = sdk

const inputSpec = async ({ effects }: { effects: T.Effects }) => {
  // Each form owns its staging directory; other uploads cannot replace its file.
  const uploadPath = `${uploadDir}/${randomUUID()}`
  await mkdir(sdk.volumes.main.subpath(uploadPath), { recursive: true })
  return InputSpec.of({
    exportFile: Value.file({
      name: i18n('Export File'),
      description: i18n(
        'A Maloja, Last.fm, Spotify, ListenBrainz, or Rockbox export. Keep the filename the export was downloaded with: Maloja identifies the format by it.',
      ),
      // A directory target keeps the uploaded filename, which Maloja's
      // importer dispatches on.
      uploadId: await sdk.prepareUpload(effects, {
        volume: 'main',
        path: uploadPath,
        mode: 0o644,
      }),
      extensions: ['.json', '.csv', '.log'],
      required: true,
    }),
  })
}

export const importScrobbles = sdk.Action.withInput(
  'import-scrobbles',
  async () => ({
    name: i18n('Import Scrobbles'),
    description: i18n(
      'Import scrobble history from a Maloja, Last.fm, Spotify, ListenBrainz, or Rockbox export file.',
    ),
    warning: i18n(
      'Stop the service first. Existing scrobbles are not duplicated, but a large import may take a while.',
    ),
    allowedStatuses: 'only-stopped',
    group: null,
    visibility: 'enabled',
  }),
  inputSpec,
  async () => ({}),
  async ({ effects, input }) => {
    const uploadPath = dirname(input.exportFile.path)
    // The cleanup below deletes this directory recursively; a path that
    // resolved to the volume root would wipe the whole volume.
    if (!new RegExp(`^${uploadDir}/[0-9a-f-]{36}$`).test(uploadPath)) {
      throw new Error(`Unexpected upload path: ${input.exportFile.path}`)
    }
    try {
      const { stdout } = await sdk.SubContainer.withTemp(
        effects,
        { imageId: 'maloja' },
        sdk.Mounts.of().mountVolume({
          volumeId: 'main',
          subpath: null,
          mountpoint: '/data',
          readonly: false,
        }),
        'maloja-import',
        async (sub) =>
          sub.execFail(
            [
              '/venv/bin/python',
              '-m',
              'maloja',
              'import',
              `/data/${input.exportFile.path}`,
            ],
            {
              env: { MALOJA_DATA_DIRECTORY: '/data' },
              // Maloja's generic-JSON fallback opens the bare filename.
              cwd: `/data/${uploadPath}`,
              timeout: null,
            },
          ),
      )

      // Maloja's importer exits 0 on a file it cannot identify.
      const report = stdout.toString()
      if (report.includes('could not be identified as a valid import source')) {
        throw new Error(
          i18n(
            'Maloja did not recognise that file as an export it can import. Rename it back to the filename it was downloaded with and try again.',
          ),
        )
      }

      return {
        version: '1',
        title: i18n('Import Complete'),
        message: i18n('Maloja’s report on the import is below.'),
        result: {
          type: 'multiline',
          // Maloja colours its console output unconditionally.
          value: report.replace(/\x1b\[[0-9;]*m/g, ''),
          copyable: true,
          masked: false,
          qr: false,
          filename: null,
        },
      }
    } finally {
      await rm(sdk.volumes.main.subpath(uploadPath), {
        recursive: true,
        force: true,
      })
    }
  },
)

// Clears staging directories left by forms that were never submitted or whose
// run failed before the handler. At container init no form or prepared upload
// from before can still be live. It watches nothing, so it never reruns while a
// form is open.
export const clearUploads = sdk.setupOnInit(async () => {
  await rm(sdk.volumes.main.subpath(uploadDir), {
    recursive: true,
    force: true,
  })
})
