import { ss } from '@/utils/storage'
import { t } from '@/locales'
import { getSyncKey } from '../user/helper'
import { getSyncState, setSyncState } from '@/api'

const LOCAL_NAME = 'chatStorage'

export function defaultState(): Chat.ChatState {
  const uuid = 1002
  return {
    active: uuid,
    usingContext: true,
    history: [{ uuid, title: t('chat.newChatTitle'), isEdit: false }],
    chat: [{ uuid, data: [] }],
  }
}

export function getLocalState(): Chat.ChatState {
  const syncKey = getSyncKey()
  const localState = ss.get(LOCAL_NAME + syncKey)
  return { ...defaultState(), ...localState }
}

export function setLocalState(state: Chat.ChatState) {
  const syncKey = getSyncKey()
  ss.set(LOCAL_NAME + syncKey, state)
}

export async function getRemoteState(): Promise<Chat.ChatState | null> {
  const syncKey = getSyncKey()
  if (!syncKey) {
    return null
  }

  let response = await getSyncState<Chat.ChatState>({ key: syncKey })
  let remoteState: Chat.ChatState = response.data
  if (remoteState && remoteState.active) {
    ss.set(LOCAL_NAME + syncKey, remoteState)
    return remoteState
  }

  return null
}

export async function setRemoteState(state: Chat.ChatState) {
  const syncKey = getSyncKey()
  setSyncState({ key: syncKey, state })
}
