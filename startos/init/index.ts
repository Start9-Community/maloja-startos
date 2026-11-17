import { sdk } from '../sdk'
import { dependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { versionGraph } from '../versions'
import { actions } from '../actions'
import { clearUploads } from '../actions/importScrobbles'
import { restoreInit } from '../backups'
import { watchCredentials } from './watchCredentials'

export const init = sdk.setupInit(
  restoreInit,
  clearUploads,
  versionGraph,
  setInterfaces,
  actions,
  dependencies,
  watchCredentials,
)

export const uninit = sdk.setupUninit(versionGraph)
